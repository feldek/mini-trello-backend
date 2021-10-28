import { User } from "../../db/models/users";
import { fileRepository, IUploadFile } from "../repositories/fileRepository";

interface IUploadUserAvatar extends IUploadFile {
  userId: string;
}

export const fileService = {
  async uploadUserAvatar({ folder, file, userId }: IUploadUserAvatar) {
    const existFiles = fileRepository.searchFilesInFolderByUserId({ userId, folder });
    const link = await fileRepository.uploadFile({ folder, file });
    if (existFiles.length !== 0) {
      fileRepository.removeFileInFolderByFileName({ folder, fileName: existFiles });
    }
    await User.update({ avatar: link }, { where: { id: userId } });
    return { link };
  },
};
