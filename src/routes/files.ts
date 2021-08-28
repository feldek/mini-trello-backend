import { Response, Request } from "express";
import fs from "fs";
import path, { dirname } from "path";

interface IGetAvatar extends Request {
  params: { folder: string; fileName: string };
}

export const filesRepository = {
  async getFile(req: IGetAvatar, res: Response) {
    try {
      const { folder, fileName } = req.params;
      const __dirname = dirname(__filename);
      const filePath = path.join(__dirname, "../files/", folder, fileName);
      fs.readFile(filePath, function (error, data) {
        if (error) {
          res.statusCode = 404;
          res.end("Resourse not found!");
        } else {
          res.end(data);
        }
      });
    } catch (err) {}
  },
};
