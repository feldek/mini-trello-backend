import { type NextFunction, type Request, type Response } from "express";
import { type IAuthReq } from "../../routes/auth";
import { ENV } from "../../constants/Envs";
import { jwtVerify } from "./token";

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers;

  const token = authHeader.authorization && authHeader.authorization.split(" ")[1];

  if (!token) {
    res.status(401).json({});

    throw new Error("There is no token");
  }

  try {
    (req as IAuthReq).user = await jwtVerify(token, ENV.TOKEN_SECRET);

    return next();
  } catch (err) {
    if (err instanceof Error && err.name === "TokenExpiredError") {
      res.status(403).json({});
    } else {
      res.status(401).json({});
    }
  }
};
