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
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'Shared/Auth/Decorator/checkOpenRoute.decorator';
import { SWAGGER_RESPONSE } from 'Shared/Common/swagger-respon/swaggerCheck';
import {
  DEPARTMENT_CONST,
  DEPARTMENT_CONST_PARAMETERS,
  DEPARTMENT_SWAGGER_RESPONSE,
} from './department.const';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dtos/createDepartment.dto';
import { UpdateDepartmentDto } from './dtos/updateDepartment.dto';
import { Roles } from 'Shared/Auth/Decorator/roles.decorator';

@Controller(DEPARTMENT_CONST.MODEL_NAME)
@ApiTags(DEPARTMENT_CONST.MODEL_NAME)
@ApiBearerAuth('defaultBearerAuth')
export class DepartmentController {
  constructor(private _departmentService: DepartmentService) {}
  //@Public()

  @ApiQuery(DEPARTMENT_CONST_PARAMETERS.PAGE_PARAMS)
  @ApiQuery(DEPARTMENT_CONST_PARAMETERS.PAGE_SIZE_PARAMS)
  @ApiQuery(DEPARTMENT_CONST_PARAMETERS.SEARCH_PARAMS)
  @ApiQuery(DEPARTMENT_CONST_PARAMETERS.SORT_BY__PARAMS)
  @ApiQuery(DEPARTMENT_CONST_PARAMETERS.ORDER_BY__PARAMS)
  @Get('get')
  @Public()
  async GetAsync(
    @Query('search') search: string,
    @Query('page') page: Number,
    @Query('pageSize') pageSize: Number,
    @Query('sortBy') sortBy: string,
    @Query('orderBy') orderBy: string,
  ) {
    try {
      let result = await this._departmentService.GetAsync({
        search,
        page,
        pageSize,
        sortBy,
        orderBy,
      });
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @ApiOkResponse(DEPARTMENT_SWAGGER_RESPONSE.CREATE_DEPARTMENT)
  @Post()
  async CreateAsync(@Body() department: CreateDepartmentDto) {
    try {
      let result = await this._departmentService.CreateAsync(department);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  //@Public()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  @Get('view')
  async ViewDataAsync() {
    try {
      let result = await this._departmentService.View();
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //@Public()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  @Get()
  async GetAllAsync() {
    try {
      let result = await this._departmentService.GetAllAsync();
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
      let result = await this._departmentService.GetByIdAsync(id);
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
      let result = await this._departmentService.DeleteAsync(id);
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
    @Body() department: UpdateDepartmentDto,
  ) {
    try {
      let result = await this._departmentService.UpdateAsync(id, department);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
