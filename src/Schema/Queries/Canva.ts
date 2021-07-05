import { GraphQLList, GraphQLString } from "graphql";
import { CanvaType } from "../TypeDefs/Canva";
import { JsonType } from "../TypeDefs/Response"
import { Canvas } from "../../Entities/Canvas";
import fs from 'fs';
import { Users } from "../../Entities/Users";

export const getAllCanvaByUser = {
    type: new GraphQLList(CanvaType),
    args: {
        username: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        let user = await Users.findOne({username:args.username})
        if(!user){
            await Users.insert({username: args.username, password: " "})
            user = await Users.findOne({username:args.username})
        }
        const user_id = user?.id;
        return Canvas.find({ user_id: user_id });
    },
};

export const getSelectedCanva = {
    type: JsonType,
    args: {
        id: { type: GraphQLString },
        username: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { id, username } = args;
        const user = await Users.findOne({username: username})
        const canva = await Canvas.findOne({ id: id, user_id: user?.id });
        const jsonFile = fs.readFileSync(`./src/JSONFiles/${canva?.pjson}`, {encoding:'utf-8'})
        
        return {object : canva, jsonData : jsonFile}
    },
};

export const getAllCanvas = {
    type: new GraphQLList(CanvaType),
    async resolve() {
        const canvas = await Canvas.find()
        return canvas;
    },
};