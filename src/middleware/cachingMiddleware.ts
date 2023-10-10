import { Request, Response,NextFunction } from "express";
import { myCache } from "../app";
import logger from "../utils/logger";
export  function caching(){
    
    return async function(req:Request,res:Response,next:NextFunction){
        console.log("caching middleware")

        try {
           
            const path = `${req.method}:${req.url}`
           
            const cacheResults = await myCache.get(path);
            
            if (cacheResults) {
                logger.info("Response is received from cache.") 
           
                res.status(200).send(cacheResults)
              } else{
                logger.info("Response is new, caching it.") 
             
                return next()
              }
           
        } catch (error) {
            console.log(error)
        }
      
     
    
        }
     }
 
    
