import { Express, Request, Response } from "express";
import { userController } from "./user.controller";
import validateBody from "../../middleware/validateResource";
import { createUserSchema } from "./user.schema";
import { requireUser } from "../../middleware/requireUser";
export default function userRoutes(app: Express,path:string) {
  app.post(
    path,
    validateBody(createUserSchema),
    userController.createUser
  );
  app.get(
    path,
    requireUser,
    userController.getUsers
  );
}
