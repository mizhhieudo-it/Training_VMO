import { TECH_CONST_PARAMETERS } from './../technology/technology.const';
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
import { CreateProjectTypeDto } from './dto/createProjectTypes.dto';
import { UpdateProjectDto } from './dto/updateProjectTypes.dto';
import {
  PROJECT_TYPE_CONST,
  PROJECT_TYPE_SWAGGER_RESPONSE,
} from './projectTypes.const';
import { projectTypesService } from './projectTypes.service';
import { Roles } from 'Shared/Auth/Decorator/roles.decorator';

@Controller(PROJECT_TYPE_CONST.MODEL_NAME)
@ApiTags(PROJECT_TYPE_CONST.MODEL_NAME)
@ApiBearerAuth('defaultBearerAuth')
export class projectTypesController {
  constructor(private readonly _projectService: projectTypesService) {}
  //@Public()
  @ApiOkResponse(PROJECT_TYPE_SWAGGER_RESPONSE.CREATE_PROJECT_TYPE)
  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async CreateAsync(@Body() project: CreateProjectTypeDto) {
    try {
      let result = await this._projectService.CreateAsync(project);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //@Public()
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  @Delete('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async DeleteAsync(@Param('id') userId: string) {
    try {
      let result = await this._projectService.RemoveAsync(userId);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //@Public()
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  @Patch('/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
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
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  async GetAllAsync() {
    try {
      let result = await this._projectService.GetAllAsync();
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //@UseGuards(RolesGuard)
  //@Roles(Role.Admin)
  @ApiQuery(TECH_CONST_PARAMETERS.PAGE_PARAMS)
  @ApiQuery(TECH_CONST_PARAMETERS.PAGE_SIZE_PARAMS)
  @ApiQuery(TECH_CONST_PARAMETERS.SEARCH_PARAMS)
  @ApiQuery(TECH_CONST_PARAMETERS.SORT_BY__PARAMS)
  @ApiQuery(TECH_CONST_PARAMETERS.ORDER_BY__PARAMS)
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
      let result = this._projectService.GetAsync({
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

  //@Public()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Get('/:id')
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  async GetByIdAsync(@Param('id') projectId: string) {
    try {
      let result = await this._projectService.GetById(projectId);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
