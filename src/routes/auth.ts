import { Request, Response } from "express";
import { User } from "../../db/models/users";
import { mail } from "../report/mail";
import bcrypt from "bcryptjs";
import {
  getTokensAuth,
  getTokenRecoveryPassword,
  recoveryPasswordTokenSecret,
  generateToken,
  tokenSecretAuth,
  jwtVerify,
} from "../middewares/authMiddleware/token";
import { notification } from "../report/notification";

const bcryptVerify = (target: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(target, 8, (err, hash: string) => {
      if (err) return reject(err);
      return resolve(hash);
    });
  });
};

interface ISign extends Request {
  body: { password: string; email: string };
}
export interface AuthReq extends Request {
  user: { id: string };
}

interface IChangePassword extends AuthReq {
  body: { oldPassword: string; newPassword: string };
}

type IConfirmEmail = Request & { params: { confirmToken: string } };

type IRecoveryPassword = Request & { params: { token: string } };
export const userRepository = {
  async signUp(req: ISign, res: Response) {
    try {
      const { password, email } = req.body;
      const encryptedPassword = await bcryptVerify(password);
      const user = await User.create({ email, password: encryptedPassword });
      console.log("user:", user);
      await this.signIn(req, res);
      const confirmEmailToken = generateToken({ id: user.id }, tokenSecretAuth);
      await mail.sendLinkConfirmEmail({ confirmEmailToken, email: user.email });
    } catch (e) {
      console.log("func signUp", e);
      if (e.original.code === "23505") {
        res.status(400).json({
          message: "This E-mail already registered",
        });
        console.log("This E-mail already registered");
      } else {
        res.status(500).json({});
      }
    }
  },

  async fetchUser(req: AuthReq, res: Response) {
    try {
      const userId = req.user.id;
      console.log(userId);
      const user = await User.findOne({
        where: { id: userId },
        attributes: ["avatar"],
      });
      console.log(user?.avatar);

      res.status(200).json({ avatar_url: user?.avatar });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async confirmEmail(req: IConfirmEmail, res: Response) {
    try {
      const user = (await jwtVerify(req.params.confirmToken, tokenSecretAuth)) as unknown as {
        id: string;
      };
      console.log(__filename, "user:", user);
      const result = await User.update({ confirm: true }, { where: { id: user.id } });
      let status, message;
      if (!result[0]) {
        status = false;
        message = "Something went wrong";
      } else {
        status = true;
        message = "The operation was successful, your mail has been confirmed.";
      }
      notification(res, { status, message });
    } catch (err) {
      console.log("func confirmEmail", err);
      if (err.name === "TokenExpiredError") {
        notification(res, { status: false, message: "Link expired" });
      } else {
        notification(res, { status: false, message: "Something went wrong" });
      }
    }
  },

  async recoveryPassword(req: IRecoveryPassword, res: Response) {
    let status = false;
    let message = "";
    let description = "";
    try {
      const user = (await jwtVerify(req.params.token, recoveryPasswordTokenSecret)) as unknown as {
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
          const recoveryPasswordToken = getTokenRecoveryPassword({
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
      });

      const verification: boolean = await bcrypt.compare(password, user?.password);
      console.log("verification", verification);

      if (!verification || !user) {
        res.status(401).json({
          message: "Incorrect username or password",
        });
      } else {
        const tokens = getTokensAuth({ id: user.id });
        console.log("user.signIn tokens:", tokens);
        res.status(200).json({
          message: "You are successfully logged in",
          ...tokens,
        });
      }
    } catch (err) {
      console.log("func signIn", err);
      res.status(500).json({ message: `${err}` });
    }
  },

  async changePassword(req: IChangePassword, res: Response) {
    try {
      const user = await User.findOne({
        where: { id: req.user.id },
        attributes: ["password"],
        raw: true,
      });

      const verification: boolean = await bcrypt.compare(req.body.oldPassword, user?.password);
      if (verification) {
        const encryptedPassword: string = await bcryptVerify(req.body.newPassword);
        await User.update({ password: encryptedPassword }, { where: { id: req.user.id } });
        res.status(200).json({
          message: "Password changed successfully",
        });
      } else {
        res.status(400).json({
          message: "Wrong password",
        });
      }
    } catch (e) {
      res.status(500).json({});
      console.log("func changePassword", e);
    }
  },
};
