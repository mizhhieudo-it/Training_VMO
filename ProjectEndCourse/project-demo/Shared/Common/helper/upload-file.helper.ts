import {
  BadRequestException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const customFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
    return callback(new BadRequestException('Only image files are allowed!'));
  }
  callback(null, true);
};

// update the name of an image to make make it unique
export const editFileName = (req: any, file: any, callback: any) => {
  const name = 'upload';
  const fileExtName = extname(file.originalname);
  const randomName = uuidv4() + Date.now();
  const fileName = (randomName + fileExtName).toString().trim();
  // callback(null, `${name}_${randomName}${fileExtName}`);
  callback(null, ` ${fileName}`);
};
