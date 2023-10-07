import { Request, Response,NextFunction } from "express";

export function requireUser(req:Request,res:Response,next:NextFunction){
    console.log("Require user middleware")
    const user = res.locals.user;
    
    if(!user)return res.sendStatus(403);

    return next()
}
