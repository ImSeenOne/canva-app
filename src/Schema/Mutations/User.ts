import {UserType} from "../TypeDefs/User";
import {ResponseType} from "../TypeDefs/Response";
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
    type: ResponseType,
    args: {
        username: { type: GraphQLString },
        oldPassword: { type: GraphQLString },
        newPassword: { type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
        const { username, oldPassword, newPassword } = args;
        const user = await Users.findOne({username: username});
        if(!user) {
            throw new Error('User was not found')
        }
        const userPassword = user?.password;

        if(oldPassword === userPassword) {
            await Users.update(
                {username: username},
                {password: newPassword}
                );
            return {succesful: true, message: 'Password succesfully updated'}
        } else {
            throw new Error('Passwords do not match');
        }
    }
};

export const DELETE_USER = {
    type: ResponseType,
    args: {
        id: { type: GraphQLID }
    },
    async resolve(parent: any, args: any) {
        const { id } = args;
        const user = await Users.findOneOrFail(id).catch(()=>{
            return false;
        });
        try {

            if(user == false) {
                return {successful: false, message: 'User with ID ' + id + ' was not found'};
            }
            await Users.delete({id});
        } catch (err) {
            console.error(err);
            return {successful: false, message: 'An error has occurred'};
        }
        console.log("User: " + user);
        return {successful: true, message: 'User with ID ' + id + " was successfully deleted"};
    }
};
