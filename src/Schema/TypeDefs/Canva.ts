import { GraphQLObjectType, GraphQLString } from "graphql";

export const CanvaType = new GraphQLObjectType({
    name: "Canva",
    fields: () => ({
        id: { type: GraphQLString },
        user_id: { type: GraphQLString },
        pjson: { type: GraphQLString },
        name: { type: GraphQLString },
        create_date: { type: GraphQLString },
    }),
});
