import {UserType} from "../TypeDefs/User";
import {GraphQLID, GraphQLString} from "graphql";
import { Users } from './../../Entities/Users'

export const CREATE_USER = {
    type: UserType,
    args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { username, password } = args;
        await Users.insert({username, password});
        return args;
    }
};

export const UPDATE_PASSWORD = {
    type: UserType,
    args: {
        username: { type: GraphQLString },
        oldPassword: { type: GraphQLString },
        newPassword: { type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
        const { username, oldPassword, newPassword } = args;
        const user = await Users.findOne({username: username});
        const userPassword = user?.password;

        if(oldPassword === userPassword) {
            await Users.update(
                {username: username},
                {password: newPassword}
                );
        } else {
            throw new Error("PASSWORDS DO NOT MATCH")
        }
        return user;
    }
}

export const DELETE_USER = {
    type: UserType,
    args: {
        id: { type: GraphQLID }
    },
    async resolve(parent: any, args: any) {
        const { id } = args;
        await Users.delete({id});
        return args;
    }
};
