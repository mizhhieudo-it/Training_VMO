import { fileMimetypeFilter } from 'Shared/Common/upload-files/Local/api-file.filter';
import { diskStorage } from 'multer';
import { editFileName } from 'Shared/Common/helper/upload-file.helper';

export const uploadFileUser = {
  storage: diskStorage({
    destination: './Uploadfiles/avatar',
    filename: editFileName,
  }),
  fileFilter: fileMimetypeFilter('image'),
};
