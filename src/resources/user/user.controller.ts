import { Request, Response } from "express";
import logger from "../../utils/logger";
import { UserService } from "./user.service";
import { CreateUserInput } from "./user.schema";
import { omit } from "lodash";
export const userController = {
  async createUser(
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response
  ) {
    try {
      //create user in the database
      const user = await UserService.createUser(req.body);
      return res.send(user);
    } catch (e: any) {
      logger.error("Error creating user");
      res.status(409).send("Error creating user");
    }
  },

  async getUsers(req: Request,res: Response){
    const user = res.locals.user;
    console.log({user})
    const result  = await UserService.getUsers(user._id); 
    
    return res.send(result);
  },

 
};
