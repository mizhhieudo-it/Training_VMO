import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  customFileFilter,
  editFileName,
} from 'Shared/Common/helper/upload-file.helper';

@Injectable()
export class configFilesInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    // FileInterceptor('file');
    // console.log(1111, req.file);
    // //
    return next.handle();
  }
}
