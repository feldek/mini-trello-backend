import { Response, Request } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { ENVconfig } from "../ENVconfig";
const sharp = require("sharp");

interface IGetAvatar extends Request {
  params: { folder: string; fileName: string };
}
interface IUploadFile extends Request {
  file: any;
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

  async uploadFile(req: IUploadFile, res: Response) {
    const { folder } = req.params;
    const pathToFile = `./src/files/${folder}`;

    fs.access(pathToFile, (error) => {
      if (error) {
        fs.mkdirSync(pathToFile);
      }
    });

    if (!req.file) {
      res.send("Ошибка при загрузке файла");
    }
    console.log(req.file);
    const { buffer, originalname } = req.file;
    await sharp(buffer)
      .resize(200, 200)
      .toFile(pathToFile + "/" + originalname);

    const link = `${ENVconfig.apiUrl}files/${folder}/${originalname}`;
    return res.json({ link });
  },
};
