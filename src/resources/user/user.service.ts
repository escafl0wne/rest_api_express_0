
import { omit } from "lodash";
import UserModel, { UserDocument } from "../../models/user.model";
import { CreateUserInput } from "./user.schema";
import { FilterQuery } from "mongoose";

 
export module UserService{
    export async function createUser (userDto:CreateUserInput['body']){
        try {
            const user = await UserModel.create(userDto)
            return omit(user.toJSON(), "password")
        } catch (error:any) {
            throw new Error(error)
        }
    
    }

    export async function getUsers(userId:string){
        try {
            const users = await UserModel.find({ _id: { $not: { $eq: userId } } })
            return users.map(user => omit(user.toJSON(), "password"))
        } catch (error:any) {
            throw new Error(error)
        }
    
    }

    export async function getUser(query: FilterQuery<UserDocument>){
        return UserModel.findOne(query).lean()
    }
}
