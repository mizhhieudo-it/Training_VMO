import { ParseFile } from './../../../Shared/Common/upload-files/Local/api-file.pipe';
import { USER_SWAGGER_RESPONSE } from './../user/user.const';
import { join } from 'path';
import { createReadStream } from 'fs';
import { Role } from './../../../Shared/Auth/Roles/role.enum';
import { RolesGuard } from './../../../Shared/Auth/guards/checkRole.guards';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
  Query,
  Request,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'Shared/Auth/Decorator/checkOpenRoute.decorator';
import { SWAGGER_RESPONSE } from 'Shared/Common/swagger-respon/swaggerCheck';
import { PaginationParams } from 'Shared/Database/Pagination/Paginate.const';

import { LoggingInterceptor } from 'Shared/Middlewares/Interception/logging.interceptor';
import {
  CUSTOMER_CONST,
  CUSTOMER_CONST_PARAMETERS,
  CUSTOMER_CONST_SWAGGER_RESPONSE,
  uploadFileXLSX,
} from './customer.const';
import { customerService } from './customer.service';
import { createCustomerDto } from './dtos/createCustomer.dto';
import { updateCustomerDto } from './dtos/updateCustomer.dto';
import { Roles } from 'Shared/Auth/Decorator/roles.decorator';
import { ApiFile } from 'Shared/Common/upload-files/Local/api-file.decorator';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Controller(CUSTOMER_CONST.MODEL_NAME)
@ApiTags(CUSTOMER_CONST.MODEL_NAME)
@ApiBearerAuth('defaultBearerAuth')
export class customerController {
  constructor(private _customerService: customerService) {}
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
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

  //@ApiOkResponse(USER_SWAGGER_RESPONSE.CREATE_USER)
  @Post('add-mutiple-customers')
  @Public()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiFile('file', uploadFileXLSX)
  public CreateUser(
    @Request() request,
    @UploadedFile(ParseFile) file?: Express.Multer.File,
  ) {
    return this._customerService.CreateCustomerFromFileAsync(file);
  }

  //@Public()
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  async GetAllAsync() {
    try {
      let result = await this._customerService.GetAllAsync();
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  @Get('get-temple')
  @Header('Content-Type', 'application/json')
  @Header(
    'Content-Disposition',
    'attachment; filename="template-customer.xlsx"',
  )
  async GetTemplateUserAsync(@Res({ passthrough: true }) res: Response) {
    try {
      const file = createReadStream(
        join(
          process.cwd(),
          'Shared/Common/helper/templates/template-upload-customers.xlsx',
        ),
      );
      return new StreamableFile(file);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  //@Public()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  @Get('get')
  @ApiQuery(CUSTOMER_CONST_PARAMETERS.PAGE_PARAMS)
  @ApiQuery(CUSTOMER_CONST_PARAMETERS.PAGE_SIZE_PARAMS)
  @ApiQuery(CUSTOMER_CONST_PARAMETERS.SEARCH_PARAMS)
  async GetAsync(
    @Query('search') search: string,
    @Query('page') page: Number,
    @Query('pageSize') pageSize: Number,
  ) {
    try {
      let result = await this._customerService.GetAsync({
        search,
        page,
        pageSize,
      });
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //@Public()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
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
  //@Public()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
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

  //@Public()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
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
