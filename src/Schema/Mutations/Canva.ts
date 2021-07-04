import { graphql, GraphQLString, graphqlSync } from 'graphql';
import { CanvaType } from '../TypeDefs/Canva';
import { Canvas } from '../../Entities/Canvas';
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');
const { v4: uuidv4 } = require('uuid');
import fs from 'fs';
import { ResponseType } from '../TypeDefs/Response';
import { Users } from '../../Entities/Users';

export const createCanva = {
    type: CanvaType,
    args: {
        username: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const uuid = uuidv4()
        const name = 'New Design'
        const pjson = uuid+'.json'
        const { username } = args;
        const user =  await Users.findOne({username : username})
        await Canvas.insert({ id : uuid, user_id:user?.id, pjson, name });

        const data = JSON.stringify([]);
        fs.writeFileSync(`./src/JSONFiles/${pjson}`, data);
        return { id : uuid, user_id: user?.id, pjson, name };
    },
};

function replacer(key: any, value: any) {
    if (value === '') {
        return undefined;
    }
    return value;
}

export const updateCanva = {
    type: CanvaType,
    args: {
        id: { type: GraphQLString },
        username: { type: GraphQLString },
        name: { type: GraphQLString },
        jsonFile: {type: GraphQLJSON}
    },
    async resolve(parent: any, args: any) {
        const { id, username, name, jsonFile } = args;
        const user =  await Users.findOne({username : username})
        const user_id = user?.id
        const canvaToUpdate = await Canvas.findOne({
            id: id,
            user_id: user_id,
        });
        if (canvaToUpdate) {
            canvaToUpdate.name = name ? name : canvaToUpdate.name;
            await canvaToUpdate.save();
            const data = JSON.parse(jsonFile);
            
            // const data = JSON.stringify(jsonFile, replacer, 4);
            fs.writeFileSync(`./src/JSONFiles/${canvaToUpdate.pjson}`, JSON.stringify(data, replacer, 4));
            return { id , user_id: user?.id, pjson:canvaToUpdate.pjson, name };
        }
        return {successful: false, message:"Canva not found!"};
    },
};

export const deleteCanva = {
    type: ResponseType,
    args: {
        id: { type: GraphQLString },
        username: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { id, username } = args;
        const user = await Users.findOne({username: username})
        const user_id = user?.id
        const canva = await Canvas.findOne({ id: id, user_id: user_id });
        await Canvas.delete({ id: id, user_id: user_id });
        if (canva) {
            // const fileExist = fs.readFileSync(`./src/JSONFiles/${canva.pjson}`);
            if (fs.existsSync(`./src/JSONFiles/${canva.pjson}`)) {
                fs.rmSync(`./src/JSONFiles/${canva.pjson}`);
            }
        }
        return {successful: true, message: "Delete successful!"};
    },
};
