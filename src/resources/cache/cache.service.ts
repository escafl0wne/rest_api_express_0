import { Request } from "express"
import NodeCache from "node-cache"

export const casheService={
    set(req:Request,value:any,cache:NodeCache){
        const path = `${req.method}:${req.url}`
        cache.set(path,value)
        
    }
}