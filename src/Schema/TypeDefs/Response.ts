import {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean} from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import { CanvaType } from "../TypeDefs/Canva"

export const ResponseType = new GraphQLObjectType({
    name: 'Response',
    fields: () => ({
        id: {type: GraphQLID},
        successful: {type: GraphQLBoolean},
        message: {type: GraphQLString}
    })
});

export const JsonType = new GraphQLObjectType({
    name: 'Json',
    fields: () => ({
        object: {type: CanvaType},
        jsonData: {type: GraphQLJSON},
    })
})
