import { Response, Request } from "express";
import jwt from "jsonwebtoken";

export const tokenSecretAuth = process.env.TOKEN_SECRET;
export const expiresInAuth = process.env.TOKEN_LIFE;

const refreshTokenSecretAuth = process.env.REFRESH_TOKEN_SECRET;
const refreshExpiresInAuth = process.env.REFRESH_TOKEN_LIFE;

export const recoveryPasswordTokenSecret = process.env.RECOVERY_PASSWORD_TOKEN_SECRET;
const recoveryPasswordExpiresIn = process.env.RECOVERY_PASSWORD_TOKEN_LIFE;

interface IPayloadToken {
  id: string;
}

export const generateToken = (
  targetObject: IPayloadToken,
  tokenSecret: string = "token",
  expiresIn?: string,
) => {
  let paramsExpiresIn = {};
  if (expiresIn) {
    paramsExpiresIn = { expiresIn };
  }
  const token = jwt.sign(targetObject, tokenSecret, paramsExpiresIn);
  return token;
};

export const getTokensAuth = (targetObject: IPayloadToken) => {
  const tokensAuth = {
    token: generateToken(targetObject, tokenSecretAuth, expiresInAuth),
    refreshToken: generateToken(targetObject, refreshTokenSecretAuth, refreshExpiresInAuth),
  };
  return tokensAuth;
};

export const getTokenRecoveryPassword = (targetObject: { id: string; password: string }) => {
  return generateToken(targetObject, recoveryPasswordTokenSecret, recoveryPasswordExpiresIn);
};

export const refreshTokensAuth = async (req: Request, res: Response) => {
  try {
    const header = req.headers;
    const refreshToken = header["authorization"] && header["authorization"].split(" ")[1];
    if (!refreshToken) {
      return res.status(401).json({});
    }
    const user = await jwtVerify(refreshToken, refreshTokenSecretAuth);
    const newTokens = getTokensAuth({ id: user.id });
    res.status(200).json(newTokens);
  } catch (err) {
    console.log(err);
    res.status(401).json({});
  }
};

export const jwtVerify = (token: string, tokenSecret: string = "token"): Promise<IPayloadToken> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, tokenSecret, async (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data as IPayloadToken);
    });
  });
};
