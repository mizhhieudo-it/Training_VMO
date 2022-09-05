import { Module } from '@nestjs/common';
import { AWSProvider } from './upload-files-aws.provider';
import { AWSUploadFileService } from './upload-files-aws.service';

@Module({
  providers: [AWSProvider, AWSUploadFileService],
  exports: [AWSUploadFileService],
})
export class AWSMoudle {}
