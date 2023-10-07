import { Request, Response } from "express";
import { validatePassword } from "../../utils/helpers";
import { sessionService } from "./session.service";
import { customJWT } from "../../utils/jwt";
import config from "config";

export const sessionController = {
  async createSession(req: Request, res: Response) {
    //Validate user's password
    const user = await validatePassword(req.body);
    
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    //create a session
    const session = await sessionService.createSession(
      user._id,
      req.get("user-agent") || ""
    );

    //create an access token
    const accessToken = customJWT.signJWT(
      { ...user, session: session._id },
      { expiresIn: config.get<string>("JWT_ACCESS_TOKEN_TTL") }
    );

    const refreshToken = customJWT.signJWT(
      { ...user, session: session._id },
      { expiresIn: config.get<string>("JWT_REFRESH_TOKEN_TTL") }
    );
    //retrun  tokens

    return res.status(200).json({ accessToken, refreshToken });
  },

  async getSessions(req: Request, res: Response) {
    const user = res.locals.user;
    
    const sessions = await sessionService.findSessions({ user: user._id , valid:true});

    return res.send(sessions);
  },

  async deleteSessions(req: Request, res: Response) {
    
    const user = res.locals.user;
  
    await sessionService.deleteSessions({ user: user._id,valid:true });
    return res.json({
      message:"Logged out successfully",
      accessToken:null,
      refreshToken:null
    
    });
  
  }
}
