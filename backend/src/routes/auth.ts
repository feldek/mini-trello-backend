import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { Error } from "sequelize";
import { User } from "../../db/models/users";
import { jwtToken, jwtVerify } from "../middewares/authMiddleware/token";
import { mail } from "../report/mail";
import { notification } from "../report/notification";
import { getOrThrow } from "../utils/GetOrThrow";
import { ENV } from "../constants/Envs";

const bcryptVerify = (target: string): Promise<string> => new Promise((resolve, reject) => {
  bcrypt.hash(
    target,
    8,
    (err, hash) => {
      if (err) {
        reject(err);

        return;
      }

      resolve(getOrThrow(hash));
    },
  );
});

interface ISign extends Request {
  body: { password: string; email: string; };
}

interface IAuthReq extends Request {
  user: { id: string; };
}

interface IChangePassword extends IAuthReq {
  body: { oldPassword: string; newPassword: string; };
}

type TConfirmEmail = Request & { params: { confirmToken: string; }; };

type TRecoveryPassword = Request & { params: { token: string; }; };

const userRepository = {
  async signUp(req: ISign, res: Response) {
    try {
      const { password, email } = req.body;

      const encryptedPassword = await bcryptVerify(password);

      const user = await User.create({ email, password: encryptedPassword });

      await this.signIn(req, res);

      const confirmEmailToken = jwtToken.generateCommonToken({ id: user.id });

      await mail.sendLinkConfirmEmail({ confirmEmailToken, email: user.email });
    } catch (err) {
      //@ts-ignore
      if (err.original.code !== "23505") {
        res.status(500).json({});

        return;
      }

      res.status(400).json({
        message: "This E-mail already registered",
      });
    }
  },

  async fetchUser(req: IAuthReq, res: Response) {
    try {
      const userId = req.user.id;

      const user = await User.findOne({
        where: { id: userId },
        attributes: ["avatar"],
      });

      res.status(200).json({ avatar_url: user?.avatar });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async confirmEmail(req: TConfirmEmail, res: Response) {
    try {
      const user = await jwtVerify(req.params.confirmToken, ENV.TOKEN_SECRET);

      const result = await User.update({ confirm: true }, { where: { id: user.id } });

      let status = true;
      let message = "The operation was successful, your mail has been confirmed.";

      if (!result[0]) {
        status = false;
        message = "Something went wrong";
      }

      notification(res, { status, message });
    } catch (err) {
      const isTokenExpiredError = err instanceof Error && err.name === "TokenExpiredError";

      if (!isTokenExpiredError) {
        notification(res, { status: false, message: "Something went wrong" });

        return;
      }

      notification(res, { status: false, message: "Link expired" });
    }
  },

  async recoveryPassword(req: TRecoveryPassword, res: Response) {
    let status = false;
    let message = "";
    let description = "";

    try {
      const user = (await jwtVerify(req.params.token, ENV.RECOVERY_PASSWORD_TOKEN_SECRET)) as unknown as {
        password: string;
        id: string;
      };

      const encryptedPassword = await bcryptVerify(user.password);
      const result = await User.update({ password: encryptedPassword }, { where: { id: user.id } });
      if (result) {
        status = true;
        message = "Password changed successfully";
      } else {
        status = false;
        message = "Something went wrong";
        description = "Please go through the password recovery procedure a little later.";
      }
      notification(res, { status, message, description });
    } catch (err) {
      console.log(__filename, "err:", err);
      if (err.name === "TokenExpiredError") {
        status = false;
        message = "Link expired";
        description = "Please go through the password recovery procedure again";
      } else {
        status = false;
        message = "Link invalid";
      }
      notification(res, { status, message, description });
    }
  },

  async generateRecoveryLink(req: ISign, res: Response) {
    try {
      const user = await User.findOne({
        where: { email: req.body.email },
        attributes: ["id", "confirm", "password"],
      });
      if (!user) {
        throw new Error("This email not found");
      } else {
        if (user.confirm === false) {
          throw new Error("Please confirm your email address before proceeding");
        } else {
          const recoveryPasswordToken = jwtToken.generateRecoveryPasswordToken({
            id: user.id,
            password: req.body.password,
          });
          await mail.generateRecoveryLink(req.body.email, recoveryPasswordToken);
          res.status(200).json({
            message: "A message with a password has been sent to you email",
          });
          console.log("A message with a password has been sent to you email");
        }
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: `${err}`,
      });
    }
  },

  async signIn(req: ISign, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: { email },
        attributes: ["id", "email", "password"],
        raw: true,
      }).then((res) => getOrThrow(res));

      const verification: boolean = await bcrypt.compare(password, user.password);

      if (!verification) {
        res.status(401).json({ message: "Incorrect username or password" });
      } else {
        const tokens = jwtToken.generatePairTokens({ id: user.id });

        res.status(200).json({
          message: "You are successfully logged in",
          ...tokens,
        });
      }
    } catch (err) {
      res.status(500).json({ message: `${err}` });
    }
  },

  async changePassword(req: IChangePassword, res: Response) {
    try {
      const user = await User.findOne({
        where: { id: req.user.id },
        attributes: ["password"],
        raw: true,
      }).then((res) => getOrThrow(res));

      const verification: boolean = await bcrypt.compare(req.body.oldPassword, user?.password);

      if (verification) {
        const encryptedPassword: string = await bcryptVerify(req.body.newPassword);

        await User.update({ password: encryptedPassword }, { where: { id: req.user.id } });

        res.status(200).json({
          message: "Password changed successfully",
        });
      } else {
        res.status(400).json({ message: "Wrong password" });
      }
    } catch (e) {
      res.status(500).json({});

      console.log("func changePassword", e);
    }
  },
};

export { userRepository };
export type { IAuthReq };
