import { v2 } from 'cloudinary';
import { CLOUDINARY } from './cloudinary.const';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
  import: [ConfigModule],
  provide: CLOUDINARY,
  useFactory: (config: ConfigService) => {
    return v2.config({
      cloud_name: config.get('CLOUD_NAME'),
      api_key: config.get('API_KEY'),
      api_secret: config.get('API_SECRET'),
    });
  },
};
