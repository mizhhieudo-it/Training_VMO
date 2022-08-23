import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'Shared/Auth/Decorator/checkOpenRoute.decorator';
import { SWAGGER_RESPONSE } from 'Shared/Common/swagger-respon/swaggerCheck';

import { LoggingInterceptor } from 'Shared/Middlewares/Interception/logging.interceptor';
import {
  CUSTOMER_CONST,
  CUSTOMER_CONST_SWAGGER_RESPONSE,
} from './customer.const';
import { customerService } from './customer.service';
import { createCustomerDto } from './dtos/createCustomer.dto';
import { updateCustomerDto } from './dtos/updateCustomer.dto';

@Controller(CUSTOMER_CONST.MODEL_NAME)
@ApiTags(CUSTOMER_CONST.MODEL_NAME)
export class customerController {
  constructor(private _customerService: customerService) {}
  @Public()
  @ApiOkResponse(CUSTOMER_CONST_SWAGGER_RESPONSE.CREATE_CUSTOMER)
  @Post()
  async CreateAsync(@Body() employee: createCustomerDto) {
    try {
      let result = await this._customerService.CreateAsync(employee);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Public()
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  @Get()
  async GetAllAsync() {
    try {
      let result = await this._customerService.GetAllAsync();
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Public()
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  @Get('/:id')
  async FindByIdAsync(@Param('id') id: string) {
    try {
      let result = await this._customerService.GetById(id);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Public()
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  @Delete('/:id')
  async RemoveAsync(@Param('id') id: string) {
    try {
      let result = await this._customerService.RemoveAsync(id);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Public()
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  @Patch('/:id')
  async UpdateAsync(
    @Param('id') id: string,
    @Body() customer: updateCustomerDto,
  ) {
    try {
      let result = await this._customerService.UpdateAsync(id, customer);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
