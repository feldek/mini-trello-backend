import { Response, NextFunction, Request } from "express";
import multer from "multer";

const MAX_IMG_SIZE = 5242880;

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: MAX_IMG_SIZE } });

export const multerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  upload.single("picture")(req, res, (err) => {
    if (err) {
      res.status(400).json(err);
    } else next();
  });
};
