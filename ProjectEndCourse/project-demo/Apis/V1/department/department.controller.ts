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
import { SWAGGER_RESPONSE } from 'Shared/Common/swagger-respon/swaggerCheck';
import {
  DEPARTMENT_CONST,
  DEPARTMENT_SWAGGER_RESPONSE,
} from './department.const';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dtos/createDepartment.dto';
import { UpdateDepartmentDto } from './dtos/updateDepartment.dto';

@Controller(DEPARTMENT_CONST.MODEL_NAME)
@ApiTags(DEPARTMENT_CONST.MODEL_NAME)
export class DepartmentController {
  constructor(private _departmentService: DepartmentService) {}
  @Public()
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
  @Public()
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  @Get('view-data')
  async ViewDataAsync() {
    try {
      let result = await this._departmentService.ViewData();
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
      let result = await this._departmentService.GetAllAsync();
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
      let result = await this._departmentService.GetByIdAsync(id);
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
      let result = await this._departmentService.DeleteAsync(id);
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
