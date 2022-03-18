import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { join as pathJoin, resolve as pathResolve } from 'path';
import {
  existsSync as fsExistsSync,
  mkdirSync as fsMkdirSync,
  writeFileSync as fsWriteFileSync,
} from 'fs';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file: Express.Multer.File): Promise<string> {
    try {
      const fileName = uuidV4() + '.jpg';
      const filePath = pathResolve(process.cwd(), 'src', 'static', 'images');
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
}
