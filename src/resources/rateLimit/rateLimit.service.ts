import {  RateLimitRequestHandler, rateLimit } from 'express-rate-limit'


abstract class RateLimit{
 
    constructor(){
      
    }

   abstract limit(time: number, limitNumber: number):RateLimitRequestHandler

}

export class ProductLimiter extends RateLimit{
    constructor(){
       super()
    }
    
    limit(time: number, limitNumber: number){
        return rateLimit({
            windowMs: time * 60 * 1000, // 15 minutes
            limit:limitNumber, // limit each IP to 100 requests per windowMs
            standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        })
    }
   
}
    
   
