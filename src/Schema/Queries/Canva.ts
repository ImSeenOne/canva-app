import { graphql, GraphQLList, GraphQLString } from "graphql";
import { CanvaType } from "../TypeDefs/Canva";
import { JsonType } from "../TypeDefs/Response"
import { Canvas } from "../../Entities/Canvas";
import fs from 'fs';
import GraphQLJSON from "graphql-type-json";

export const getAllCanvaByUser = {
    type: new GraphQLList(CanvaType),
    args: {
        user_id: { type: GraphQLString },
    },
    resolve(parent: any, args: any) {
        const user_id = args.user_id;
        return Canvas.find({ user_id: user_id });
    },
};

export const getSelectedCanva = {
    type: JsonType,
    args: {
        id: { type: GraphQLString },
        user_id: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { id, user_id } = args;
        const canva = await Canvas.findOne({ id: id, user_id: user_id });
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