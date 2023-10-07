import jwt from "jsonwebtoken";
import config from "config";
import { generateKeyPair } from "./helpers";

const pub_key = config.get<string>("PUBLIC_KEY");
const priv_key = config.get<string>("PRIVATE_KEY");

export const customJWT = {
  signJWT(object: Object, options?: jwt.SignOptions | undefined) {
   return jwt.sign(object, priv_key, { ...(options && options),algorithm:"RS256" });
  },

  verifyJWT(token: string, keyName: "accessTokenPublicKey" | "refreshTokenPublicKey") {
    try {
        const decoded = jwt.verify(token, priv_key);
        return {
            valid:true,
            expired:false,
            decoded
        
        }
    } catch (error:any) {
        return {valid:false, expired:error.message.includes("expired"),decoded:null}
    }
  }
};
