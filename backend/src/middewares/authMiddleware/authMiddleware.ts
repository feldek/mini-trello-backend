import { Response, NextFunction, Request } from "express";
import { AuthReq } from "../../routes/auth";
import { jwtVerify } from "./token";

const tokenSecret = process.env.TOKEN_SECRET;

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers;
  const token = authHeader.authorization && authHeader.authorization.split(" ")[1];

  if (!token) {
    res.status(401).json({});

    throw new Error("There is no token");
  }

  try {
    (req as AuthReq).user = await jwtVerify(token, tokenSecret);
    return next();
  } catch (err) {
    if ((err as { name: string }).name === "TokenExpiredError") {
      res.status(403).json({});
    } else {
      res.status(401).json({});
    }
  }
};
