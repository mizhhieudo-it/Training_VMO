import { Role } from './../../../Shared/Auth/Roles/role.enum';
import { RolesGuard } from './../../../Shared/Auth/guards/checkRole.guards';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public } from 'Shared/Auth/Decorator/checkOpenRoute.decorator';
import {
  EMPLOYEE_CONST,
  EMPLOYEE_CONST_PARAMETERS,
  PROJECT_SWAGGER_RESPONSE,
} from './employee.const';
import { EmployeeService } from './employee.service';
import { EmployeeDocument } from './employee.schema';
import { CreateEmployeeDto } from './dtos/CreateEmployee.dto';
import { SWAGGER_RESPONSE } from 'Shared/Common/swagger-respon/swaggerCheck';
import { UpdateEmployeeDto } from './dtos/UpdateEmployee.dto';
import { Roles } from 'Shared/Auth/Decorator/roles.decorator';

@Controller(EMPLOYEE_CONST.MODEL_NAME)
@ApiTags(EMPLOYEE_CONST.MODEL_NAME)
@UseGuards(RolesGuard)
@Roles(Role.Admin)
export class employeeController {
  constructor(private _employeeService: EmployeeService) {}
  // @Public()
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

  //@Public()
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  @Get('get')
  @ApiQuery(EMPLOYEE_CONST_PARAMETERS.PAGE_PARAMS)
  @ApiQuery(EMPLOYEE_CONST_PARAMETERS.PAGE_SIZE_PARAMS)
  @ApiQuery(EMPLOYEE_CONST_PARAMETERS.SEARCH_PARAMS)
  @ApiQuery(EMPLOYEE_CONST_PARAMETERS.SORT_BY__PARAMS)
  @ApiQuery(EMPLOYEE_CONST_PARAMETERS.ORDER_BY__PARAMS)
  @ApiQuery(EMPLOYEE_CONST_PARAMETERS.PROJECT_FILTER_PARAMS)
  @ApiQuery(EMPLOYEE_CONST_PARAMETERS.TECH_FILTER_PARAMS)
  async GetAsync(
    @Query('technology') technologyFilter: string,
    @Query('project') projectFilter: string,
    @Query('search') search: string,
    @Query('page') page: Number,
    @Query('pageSize') pageSize: Number,
    @Query('sortBy') sortBy: string,
    @Query('orderBy') orderBy: string,
  ) {
    try {
      let result = await this._employeeService.GetAsync({
        search,
        page,
        pageSize,
        technologyFilter,
        projectFilter,
        sortBy,
        orderBy,
      });
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //@Public()
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
  // @Public()
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
  //@Public()
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

  //@Public()
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
