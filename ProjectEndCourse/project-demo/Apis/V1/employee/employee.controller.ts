import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'Shared/Auth/Decorator/checkOpenRoute.decorator';
import { EMPLOYEE_CONST, PROJECT_SWAGGER_RESPONSE } from './employee.const';
import { EmployeeService } from './employee.service';
import { EmployeeDocument } from './employee.schema';
import { CreateEmployeeDto } from './dtos/CreateEmployee.dto';
import { SWAGGER_RESPONSE } from 'Shared/Common/swagger-respon/swaggerCheck';
import { UpdateEmployeeDto } from './dtos/UpdateEmployee.dto';

@Controller(EMPLOYEE_CONST.MODEL_NAME)
@ApiTags(EMPLOYEE_CONST.MODEL_NAME)
export class employeeController {
  constructor(private _employeeService: EmployeeService) {}
  @Public()
  @ApiOkResponse(PROJECT_SWAGGER_RESPONSE.CREATE_PROJECT)
  @Post()
  async CreateAsync(@Body() employee: CreateEmployeeDto) {
    try {
      let result = await this._employeeService.CreateAsync(employee);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // @Public()
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  @Get()
  async GetAllAsync() {
    try {
      let result = await this._employeeService.GetAllAsync();
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Public()
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  @Get('ViewCreate')
  async ViewCreateAsync() {
    try {
      let result = await this._employeeService.ViewCreate();
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
      let result = await this._employeeService.GetByIdAsync(id);
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
      let result = await this._employeeService.DeleteAsync(id);
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
    @Body() employee: UpdateEmployeeDto,
  ) {
    try {
      let result = await this._employeeService.UpdateAsync(id, employee);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
