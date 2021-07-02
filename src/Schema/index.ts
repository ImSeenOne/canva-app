import {GraphQLObjectType, GraphQLSchema} from "graphql";
import { GET_ALL_USERS } from './Queries/User';
import {CREATE_USER, DELETE_USER, UPDATE_PASSWORD} from './Mutations/User';
import { getAllCanvas, getAllCanvaByUser, getSelectedCanva } from "./Queries/Canva";
import { createCanva, updateCanva, deleteCanva } from "./Mutations/Canva";

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getAllUsers: GET_ALL_USERS,
        getAllCanvas: getAllCanvas,
        getAllCanvaByUser: getAllCanvaByUser,
        getSelectedCanva: getSelectedCanva,
    }//properties of the object
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: CREATE_USER,
        deleteUser: DELETE_USER,
        updatePassword: UPDATE_PASSWORD,
        createCanva: createCanva,
        updateCanva: updateCanva,
        deleteCanva: deleteCanva
    }//properties of the object
});


export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
