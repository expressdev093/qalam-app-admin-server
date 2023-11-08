import { diskStorage } from 'multer';
import * as fs from 'fs';
import { extname } from 'path';
const { promisify } = require('util');

export class Utils {
  static myDiskStorage = (folderName: string) => {
    return diskStorage({
      destination: './upload/' + folderName,
      filename: (req, file, cb) => {
        const fileType = extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileType);
      },
    });
  };

  static unlinkAsync = promisify(fs.unlink);
}
