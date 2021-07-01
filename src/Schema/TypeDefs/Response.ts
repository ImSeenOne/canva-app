import {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean} from 'graphql';

export const ResponseType = new GraphQLObjectType({
    name: 'Response',
    fields: () => ({
        id: {type: GraphQLID},
        successful: {type: GraphQLBoolean},
        message: {type: GraphQLString}
    })
});
