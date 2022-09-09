import { CustomerProcessor } from './customer.processor';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CUSTOMER_CONST } from './customer.const';
import { customerController } from './customer.controller';
import { CustomerRepository } from './customer.repository';
import { CustomerSchema } from './customer.scheme';
import { customerService } from './customer.service';

@Module({
  providers: [CustomerRepository, customerService, CustomerProcessor],
  imports: [
    MongooseModule.forFeature([
      {
        name: CUSTOMER_CONST.MODEL_NAME,
        schema: CustomerSchema,
      },
    ]),
    BullModule.registerQueue({
      name: 'upload-file-customers',
    }),
  ],
  controllers: [customerController],
  exports: [CustomerRepository],
})
export class CustomerModule {}
