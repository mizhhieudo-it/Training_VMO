import { AWSUploadFile } from './upload-files-aws.const';
//import { AWS } from './upload-files-aws.const';
import { Inject, Injectable } from '@nestjs/common';

import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import { AWSProvider } from './upload-files-aws.provider';

@Injectable()
export class AWSUploadFileService {
  private s3: S3;
  constructor(
    private readonly configService: ConfigService,
    @Inject(AWSUploadFile) private getConfigService,
  ) {
    this.s3 = new S3({
      accessKeyId: this.getConfigService.awsAccessKeyId,
      secretAccessKey: this.getConfigService.awsSecretAccessKey,
      endpoint: this.getConfigService.awsHost,
      s3ForcePathStyle: true, // needed with minio?
      signatureVersion: 'v4',
    });
  }

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    try {
      const uploadResult = await this.s3
        .upload({
          Bucket: this.getConfigService.bucketsName,
          Body: dataBuffer,
          Key: `${uuid()}-${filename}`,
        })
        .promise();
      return uploadResult;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  //   async deletePublicFile(fileId: number) {
  //     const file = await this.publicFilesRepository.findOne({ id: fileId });
  //     const s3 = new S3();
  //     await s3
  //       .deleteObject({
  //         Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
  //         Key: file.key,
  //       })
  //       .promise();
  //     await this.publicFilesRepository.delete(fileId);
  //   }
}
