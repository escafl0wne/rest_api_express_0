import { Express, Request, Response } from "express";
import { sessionController } from "./session.controller";
import validateBody from "../../middleware/validateResource";
import { createSessionSchema } from "./session.schema";
import { requireUser } from "../../middleware/requireUser";
export default function sessionRoutes(app: Express, path: string) {
  app.post(
    path,
    validateBody(createSessionSchema),
    sessionController.createSession
  );
  app.get(path,requireUser, sessionController.getSessions);
  app.delete(path,requireUser, sessionController.deleteSessions);

}
