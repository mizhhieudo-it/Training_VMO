import { Role } from './../../../Shared/Auth/Roles/role.enum';
import { RolesGuard } from './../../../Shared/Auth/guards/checkRole.guards';
import { CUSTOMER_CONST } from './../customer/customer.const';
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
import { SWAGGER_RESPONSE } from 'Shared/Common/swagger-respon/swaggerCheck';
import { CreateProjectDto } from './dto/CreateProject.dto';
import { UpdateProjectDto } from './dto/UpdateProject.dto';
import {
  PROJECT_CONST,
  PROJECT_SWAGGER_RESPONSE,
  PROJECT_CONST_PARAMETERS,
} from './project.const';
import { ProjectService } from './project.service';
import { Roles } from 'Shared/Auth/Decorator/roles.decorator';

@Controller(PROJECT_CONST.MODEL_NAME)
@ApiTags(PROJECT_CONST.MODEL_NAME)
@UseGuards(RolesGuard)
@Roles(Role.Admin)
export class ProjectController {
  constructor(private readonly _projectService: ProjectService) {}
  //@Public()
  @ApiOkResponse(PROJECT_SWAGGER_RESPONSE.CREATE_PROJECT)
  @Post()
  async CreateAsync(@Body() project: CreateProjectDto) {
    try {
      let result = await this._projectService.CreateAsync(project);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //@Public()
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  @Get('get')
  @ApiQuery(PROJECT_CONST_PARAMETERS.PAGE_PARAMS)
  @ApiQuery(PROJECT_CONST_PARAMETERS.PAGE_SIZE_PARAMS)
  @ApiQuery(PROJECT_CONST_PARAMETERS.SEARCH_PARAMS)
  @ApiQuery(PROJECT_CONST_PARAMETERS.SORT_BY__PARAMS)
  @ApiQuery(PROJECT_CONST_PARAMETERS.ORDER_BY__PARAMS)
  @ApiQuery(PROJECT_CONST_PARAMETERS.STATUS_FILTER_PARAMS)
  @ApiQuery(PROJECT_CONST_PARAMETERS.TYPE_PROJECT_FILTER_PARAMS)
  @ApiQuery(PROJECT_CONST_PARAMETERS.TECH_FILTER_PARAMS)
  @ApiQuery(PROJECT_CONST_PARAMETERS.PROJECT_TIME_CREATED_AT_FILTER_PARAMS)
  @ApiQuery(PROJECT_CONST_PARAMETERS.CUSTOMER_FILTER_PARAMS)
  async GetAsync(
    @Query('search') search: string,
    @Query('page') page: Number,
    @Query('pageSize') pageSize: Number,
    @Query('sortBy') sortBy: string,
    @Query('orderBy') orderBy: string,
    @Query('status') statusProject: string,
    @Query('typeProject') typeProject: string,
    @Query('technology') technology: string,
    @Query('customer') customer: string,
    @Query('startDate') startDate: string,
  ) {
    try {
      let result = await this._projectService.GetAsync({
        search,
        page,
        pageSize,
        sortBy,
        orderBy,
        statusProject,
        typeProject,
        technology,
        customer,
        startDate,
      });
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //@Public()
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  @Delete('/:id')
  async DeleteAsync(@Param('id') userId: string) {
    try {
      let result = await this._projectService.DeleteAsync(userId);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //@Public()
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  @Patch('/:id')
  async UpdateAsync(
    @Param('id') projectId: string,
    @Body() project: UpdateProjectDto,
  ) {
    try {
      let result = await this._projectService.UpdateAsync(projectId, project);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  //@Public()
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  async GetAllAsync() {
    try {
      let result = await this._projectService.GetAllAsync();
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // @Public()
  @Get('/:id')
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  async GetByIdAsync(@Param('id') projectId: string) {
    try {
      let result = await this._projectService.GetByIdAsync(projectId);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
