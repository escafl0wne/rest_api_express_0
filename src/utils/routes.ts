import { Express,Request,Response } from "express";

export default function routes (app: Express) {
    app.get("/health", (req:Request, res:Response) => res.status(200).json({message: "OK" }))
}