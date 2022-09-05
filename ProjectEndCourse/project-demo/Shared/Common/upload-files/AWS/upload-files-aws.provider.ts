import { AWSUploadFile } from './upload-files-aws.const';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const AWSProvider = {
  provide: AWSUploadFile,
  useFactory: (config: ConfigService) => {
    return {
      bucketsName: config.get('AWS_PUBLIC_BUCKET_NAME'),
      awsAccessKeyId: config.get('AWS_ACCESS_KEY_ID'),
      awsSecretAccessKey: config.get('AWS_SECRET_ACCESS_KEY'),
      awsRegoin: config.get('AWS_REGION'),
      awsHost: config.get('AWS_HOST'),
    };
  },
  inject: [ConfigService],
};
