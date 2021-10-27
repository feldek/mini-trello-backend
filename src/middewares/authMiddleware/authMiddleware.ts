import { AuthReq } from "../../routes/auth";
import { Response, NextFunction, Request } from "express";
import { jwtVerify } from "./token";
const tokenSecret = process.env.TOKEN_SECRET;

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers;
  const token = authHeader.authorization && authHeader.authorization.split(" ")[1];

  if (!token) {
    res.status(401).json({});
    throw new Error("Token not exist");
  }
  try {
    const user = await jwtVerify(token, tokenSecret);
    (req as AuthReq).user = user;
    return next();
  } catch (err) {
    console.log(err);
    if (err.name === "TokenExpiredError") {
      res.status(403).json({});
    } else {
      res.status(401).json({});
    }
  }
};
