import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CUSTOMER_CONST } from './customer.const';
import { customerController } from './customer.controller';
import { CustomerRepository } from './customer.repository';
import { CustomerSchema } from './customer.scheme';
import { customerService } from './customer.service';

@Module({
  providers: [CustomerRepository, customerService],
  imports: [
    MongooseModule.forFeature([
      {
        name: CUSTOMER_CONST.MODEL_NAME,
        schema: CustomerSchema,
      },
    ]),
  ],
  controllers: [customerController],
  exports: [CustomerRepository],
})
export class CustomerModule {}
