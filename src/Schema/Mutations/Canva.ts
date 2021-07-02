import { graphql, GraphQLString, graphqlSync } from 'graphql';
import { CanvaType } from '../TypeDefs/Canva';
import { Canvas } from '../../Entities/Canvas';
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');

import fs from 'fs';
import { ResponseType } from '../TypeDefs/Response';

export const createCanva = {
    type: CanvaType,
    args: {
        id: { type: GraphQLString },
        user_id: { type: GraphQLString },
        pjson: { type: GraphQLString },
        name: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { id, user_id, pjson, name } = args;
        await Canvas.insert({ id, user_id, pjson, name });

        const data = JSON.stringify([]);
        fs.writeFileSync(`./src/JSONFiles/${pjson}`, data);
        return args;
    },
};

function replacer(key: any, value: any) {
    if (value === '') {
        return undefined;
    }
    return value;
}

export const updateCanva = {
    type: ResponseType,
    args: {
        id: { type: GraphQLString },
        user_id: { type: GraphQLString },
        name: { type: GraphQLString },
        jsonFile: {type: GraphQLJSON}
    },
    async resolve(parent: any, args: any) {
        const { id, user_id, name, jsonFile } = args;
        const canvaToUpdate = await Canvas.findOne({
            id: id,
            user_id: user_id,
        });
        if (canvaToUpdate) {
            canvaToUpdate.name = name ? name : canvaToUpdate.name;
            await canvaToUpdate.save();
            const data = JSON.stringify(jsonFile, replacer, 4);
            fs.writeFileSync(`./src/JSONFiles/${canvaToUpdate.pjson}`, data);
            return {seccessful: true, message:"Update Successful!"};
        }
        return {seccessful: false, message:"Canva not found!"};
    },
};

export const deleteCanva = {
    type: ResponseType,
    args: {
        id: { type: GraphQLString },
        user_id: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { id, user_id } = args;
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
