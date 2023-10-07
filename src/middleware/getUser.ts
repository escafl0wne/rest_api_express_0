import { NextFunction,Request,Response } from "express"
import { get } from "lodash"
import { customJWT } from "../utils/jwt"
import logger from "../utils/logger"
import { sessionService } from "../resources/session/session.service"
export const getUser =async(req:Request,res:Response,next:NextFunction)=>{
    
    const accessToken = get(req,"headers.authorization","").replace(/^Bearer\s/,"")
    
    const refreshToken = get(req,"headers.x-refresh","")
    
    if(!accessToken){
        logger.error("No Access Token present")
        return next()}
    
    //decode existing access token and check if it is expired
    const {decoded,expired} = customJWT.verifyJWT(accessToken,"accessTokenPublicKey")
    if(decoded) res.locals.user = decoded
    
    if(expired && refreshToken){
        logger.warn("Access Token expired,issuing a new token")

        //provide a refresh token and issue a new access token
        const newToken = await sessionService.reissueAccessToken(refreshToken)
        if(!newToken) return res.status(401).send("Refresh Token is invalid")
        
        //provide the new access token to the client
        logger.warn("New access Token has been issued")
        res.setHeader("x-access-token",newToken)
        const result = customJWT.verifyJWT(newToken,"accessTokenPublicKey")
        //set the user on the reponse
        res.locals.user = result.decoded
        return next() 
    
    }

   
    return next()

}