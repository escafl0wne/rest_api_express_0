import { NextFunction,Request,Response } from "express";
import { AnyZodObject } from "zod";


export default function validateBody(schema:AnyZodObject){
   
    return function(req:Request,res:Response,next:NextFunction){
       try {
        schema.parse({
            body:req.body,
            query:req.query,
            params:req.params
        })
        return next()
       } catch (error:any) {
            return res.status(400).send(error);
       }
    }

}