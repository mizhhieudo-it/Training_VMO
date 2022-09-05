import { fileMimetypeFilter } from 'Shared/Common/upload-files/Local/api-file.filter';
import { diskStorage, memoryStorage } from 'multer';
import { editFileName } from 'Shared/Common/helper/upload-file.helper';

// Options 1:  save in local
// export const uploadFileUser = {
//   storage: diskStorage({
//     destination: './Uploadfiles/avatar',
//     filename: editFileName,
//   }),
//   fileFilter: fileMimetypeFilter('image'),
// };
// Options 2 : save in AWS -
export const uploadFileUser = {
  storage: memoryStorage(),
  fileFilter: fileMimetypeFilter('image'),
};
