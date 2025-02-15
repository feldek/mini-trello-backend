import jwt from "jsonwebtoken";
import { type Request, type Response } from "express";
import { ENV } from "../../constants/Envs";

interface IPayloadToken {
  id: string;
}

const refreshTokensAuth = async (req: Request, res: Response) => {
  try {
    const header = req.headers;

    const refreshToken = header["authorization"] && header["authorization"].split(" ")[1];

    if (!refreshToken) {
      return res.status(401).json({});
    }
    const user = await jwtVerify(refreshToken, ENV.REFRESH_TOKEN_SECRET);

    const newTokens = jwtToken.generatePairTokens({ id: user.id });

    res.status(200).json(newTokens);
  } catch (err) {
    res.status(401).json({});
  }
};

const jwtVerify = (token: string, tokenSecret: string): Promise<IPayloadToken> =>
  new Promise((resolve, reject) => {
    jwt.verify(
      token,
      tokenSecret,
      function (err: Error, data: IPayloadToken) {
        if (err) {
          reject(err);

          return;
        }

        resolve(data);

        return;
      },
    );
  });

class JwtToken {
  private readonly TOKEN_SECRET: string;
  private readonly TOKEN_LIFE: string;
  private readonly REFRESH_TOKEN_SECRET: string;
  private readonly REFRESH_TOKEN_LIFE: string;
  private readonly RECOVERY_PASSWORD_TOKEN_SECRET: string;
  private readonly RECOVERY_PASSWORD_TOKEN_LIFE: string;

  constructor(
    secretParams: {
      TOKEN_SECRET: string;
      TOKEN_LIFE: string;
      REFRESH_TOKEN_SECRET: string;
      REFRESH_TOKEN_LIFE: string;
      RECOVERY_PASSWORD_TOKEN_SECRET: string;
      RECOVERY_PASSWORD_TOKEN_LIFE: string;
    },
  ) {
    this.TOKEN_SECRET = secretParams.TOKEN_SECRET;
    this.TOKEN_LIFE = secretParams.TOKEN_LIFE;
    this.REFRESH_TOKEN_SECRET = secretParams.REFRESH_TOKEN_SECRET;
    this.REFRESH_TOKEN_LIFE = secretParams.REFRESH_TOKEN_LIFE;
    this.RECOVERY_PASSWORD_TOKEN_SECRET = secretParams.RECOVERY_PASSWORD_TOKEN_SECRET;
    this.RECOVERY_PASSWORD_TOKEN_LIFE = secretParams.RECOVERY_PASSWORD_TOKEN_LIFE;
  }

  generateCommonToken(targetObject: IPayloadToken): string {
    return this.generateToken(targetObject, this.TOKEN_SECRET, this.TOKEN_LIFE);
  }

  generateRefreshToken(targetObject: IPayloadToken): string {
    return this.generateToken(targetObject, this.REFRESH_TOKEN_SECRET, this.REFRESH_TOKEN_LIFE);
  }

  generateRecoveryPasswordToken(targetObject: { id: string; password: string; }): string {
    return this.generateToken(targetObject, this.RECOVERY_PASSWORD_TOKEN_SECRET, this.RECOVERY_PASSWORD_TOKEN_LIFE);
  }

  generatePairTokens(targetObject: IPayloadToken): { token: string; refreshToken: string; } {
    return {
      token: this.generateCommonToken(targetObject),
      refreshToken: this.generateRefreshToken(targetObject),
    };
  }

  private generateToken(
    targetObject: IPayloadToken,
    tokenSecret: string,
    expiresIn?: string,
  ): string {
    return jwt.sign(targetObject, tokenSecret, { expiresIn });
  };
}

const jwtToken = new JwtToken({
  TOKEN_SECRET: ENV.TOKEN_SECRET,
  TOKEN_LIFE: ENV.TOKEN_LIFE,
  REFRESH_TOKEN_SECRET: ENV.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_LIFE: ENV.REFRESH_TOKEN_LIFE,
  RECOVERY_PASSWORD_TOKEN_SECRET: ENV.RECOVERY_PASSWORD_TOKEN_SECRET,
  RECOVERY_PASSWORD_TOKEN_LIFE: ENV.RECOVERY_PASSWORD_TOKEN_LIFE,
});

export { jwtToken, refreshTokensAuth, jwtVerify };
