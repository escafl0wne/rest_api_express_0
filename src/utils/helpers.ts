import { omit } from "lodash";
import UserModel from "../models/user.model";
import crypto from "crypto";
import  Buffer  from "buffer";


export async function validatePassword({email, password}:{email:string,password:string}){
    const user = await UserModel.findOne({email});

    if(!user){
        return false;
    }

    const isValid = await user.comparePassword(password); 

    if(!isValid){
        return false;
    }
    return omit(user.toJSON(), "password");

}
export function generateKeyPair () {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        // The standard secure default length for RSA keys is 2048 bits
        modulusLength: 2048,
      });
      console.log(publicKey)
      const exportedPublicKeyBuffer = publicKey.export({
        type: "pkcs1",
        format: "pem",
      });
      console.log(exportedPublicKeyBuffer)
      const exportedPrivateKeyBuffer = privateKey.export({
        type: "pkcs1",
        format: "pem",
      }); console.log(exportedPrivateKeyBuffer)
      
      return { publicKey: exportedPublicKeyBuffer, privateKey: exportedPrivateKeyBuffer };
}
