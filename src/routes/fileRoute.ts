import * as express from "express";
import { authenticateToken } from "../middewares/authMiddleware/authMiddleware";
import { multerMiddleware } from "../middewares/multerMiddleware/multerMiddleware";
import { AuthReq } from "./auth";
import { fileRepository as files } from "../repositories/fileRepository";
import { fileService } from "../services/fileService";

const router = express.Router();

router.get("/:folder/:fileName", [(req, res) => files.getFile(req, res)]);

interface IUploadFile extends AuthReq {
  file: { buffer: any; originalname: any };
}

router.post("/:folder", [
  authenticateToken,
  multerMiddleware,
  async (req: IUploadFile, res) => {
    try {
      const file = req.file;
      const { folder } = req.params;
      const userId = req.user.id;
      const result = await fileService.uploadUserAvatar({ folder, file, userId });
      res.status(201).json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
]);

router.get("/test", (req, res) => {
  res.status(200).json({ test: "json" });
});

export const fileRoutes = router;
