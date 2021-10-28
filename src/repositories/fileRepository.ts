import { Response, Request } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { ENVconfig, PATH_TO_SRC } from "../ENVconfig";
const sharp = require("sharp");

interface IGetAvatar extends Request {
  params: { folder: string; fileName: string };
}
export interface IUploadFile {
  folder: string;
  file: { buffer: any; originalname: any };
}

export const fileRepository = {
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

  async uploadFile({ folder, file }: IUploadFile) {
    const pathToFile = `${PATH_TO_SRC}/files/${folder}`;

    fs.access(pathToFile, (error) => {
      if (error) {
        fs.mkdirSync(pathToFile);
      }
    });

    if (!file) {
      throw { message: "Ошибка при загрузке файла" };
    }
    const { buffer, originalname } = file;
    await sharp(buffer)
      .resize(200, 200)
      .toFile(pathToFile + "/" + originalname);

    const link = `${ENVconfig.apiUrl}files/${folder}/${originalname}`;
    return link;
  },

  // remove all files in folder, if filename includes userId
  removeFilesInFolderByUserId({ userId, folder }: { userId: string; folder: string }) {
    const pathToFolder = `${PATH_TO_SRC}/files/${folder}`;
    const fileNames = this.searchFilesInFolderByUserId({ userId, folder });
    fileNames.forEach((file) => fs.unlinkSync(`${pathToFolder}/${file}`));
  },
  searchFilesInFolderByUserId({ userId, folder }: { userId: string; folder: string }) {
    const regExpSearchText = new RegExp(`(${userId})`, "gi");
    const pathToFolder = `${PATH_TO_SRC}/files/${folder}`;
    const fileNames = fs.readdirSync(pathToFolder).filter((file) => !!file.match(regExpSearchText));
    return fileNames;
  },

  removeFileInFolderByFileName({ fileName, folder }: { fileName: string[]; folder: string }) {
    const pathToFolder = `${PATH_TO_SRC}/files/${folder}`;
    fileName.map((fileName) => fs.unlinkSync(`${pathToFolder}/${fileName}`));
  },
};
