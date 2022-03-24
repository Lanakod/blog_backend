import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { join as pathJoin, resolve as pathResolve } from 'path';
import {
  existsSync as fsExistsSync,
  mkdirSync as fsMkdirSync,
  writeFileSync as fsWriteFileSync,
  rmSync as fsRemoveFileSync,
} from 'fs';
import { v4 as uuidV4 } from 'uuid';
import { FilesDirectories } from '@mytypes/files-directories';

@Injectable()
export class FilesService {
  async createFile(
    file: Express.Multer.File,
    folderName: FilesDirectories,
  ): Promise<string> {
    try {
      const fileName = uuidV4() + '.jpg';
      const filePath = pathResolve(
        process.cwd(),
        'static',
        'images',
        folderName,
      );
      if (!fsExistsSync(filePath)) {
        fsMkdirSync(filePath, { recursive: true });
      }
      fsWriteFileSync(pathJoin(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeFile(
    filename: string,
    folderName: FilesDirectories,
  ): Promise<void> {
    const filePath = pathResolve(process.cwd(), 'static', 'images', folderName);
    if (fsExistsSync(filePath)) {
      fsRemoveFileSync(filePath);
    }
  }
}
