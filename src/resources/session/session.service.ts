import { FilterQuery } from "mongoose";
import SessionModel, { SchemaDocument } from "../../models/session.model";
import { customJWT } from "../../utils/jwt";
import { get } from "lodash";
import { UserService } from "../user/user.service";
import config from "config";

export const sessionService = {
  async createSession(userId: string, userAgent: string) {
    const session = await SessionModel.create({ user: userId, userAgent });
    return session.toJSON();
  },

  async findSessions(query: FilterQuery<SchemaDocument>) {
    return await SessionModel.find(query).lean();
  },

  async deleteSessions(query: FilterQuery<SchemaDocument>) {
    return await SessionModel.deleteMany(query);
  },

  async reissueAccessToken(refreshToken: string | string[]) {
    //try to decode the refresh token
   
    const { decoded } = customJWT.verifyJWT(
      refreshToken.toString(),
      "refreshTokenPublicKey"
    );
    
    if (!decoded && !get(decoded, "_id")) return false;

    //get the session from the database
    const session = await SessionModel.findOne({
      user: get(decoded, "_id"),
      valid: true,
    });
    
    if (!session) return false;

    //create a new access token
    const user = await UserService.getUser({ _id: session.user });

    if (!user) return false;
    const accessToken = customJWT.signJWT(
      {
        ...user,
        session: session._id,
      },
      {
        expiresIn: config.get<string>("JWT_ACCESS_TOKEN_TTL"),
      }
    );
    return accessToken;
  },
};
