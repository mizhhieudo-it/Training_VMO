import { customerService } from './customer.service';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
var XLSX = require('xlsx');

@Processor('upload-file-customers')
export class CustomerProcessor {
  constructor(private _customerService: customerService) {}
  @Process('info-customer')
  public receivedFileFromRedis(job: Job) {
    let result = XLSX.read(job, { type: 'buffer' });
    console.log(result);

    //this._customerService job.data.buffer.data;
  }
}
