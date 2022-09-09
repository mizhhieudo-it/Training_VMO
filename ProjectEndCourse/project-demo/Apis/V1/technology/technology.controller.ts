import { Role } from './../../../Shared/Auth/Roles/role.enum';
import { RolesGuard } from './../../../Shared/Auth/guards/checkRole.guards';
import { UpdateTechDto } from './dtos/updateTechnology.dto';
import { CreateTechDto } from './dtos/createTechnology.dto';
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
  TECH_CONST,
  TECH_CONST_PARAMETERS,
  TECH_SWAGGER_RESPONSE,
} from './technology.const';
import { technologyService } from './technology.service';
import { Roles } from 'Shared/Auth/Decorator/roles.decorator';

@Controller(TECH_CONST.MODEL_NAME)
@ApiTags(TECH_CONST.MODEL_NAME)
@ApiBearerAuth('defaultBearerAuth')
export class TechController {
  constructor(private readonly _techService: technologyService) {}
  //@Public()
  @ApiOkResponse(TECH_SWAGGER_RESPONSE.CREATE_TECH)
  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async CreateAsync(@Body() project: CreateTechDto) {
    try {
      let result = await this._techService.createAsync(project);
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
  async DeleteAsync(@Param('id') userId: string) {
    try {
      let result = await this._techService.RemoveAsync(userId);
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
    @Param('id') projectId: string,
    @Body() project: UpdateTechDto,
  ) {
    try {
      let result = await this._techService.UpdateAsync(projectId, project);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  //@Public()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.User)
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  async GetAllAsync() {
    try {
      let result = await this._techService.GetAllAsync();
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiQuery(TECH_CONST_PARAMETERS.PAGE_PARAMS)
  @ApiQuery(TECH_CONST_PARAMETERS.PAGE_SIZE_PARAMS)
  @ApiQuery(TECH_CONST_PARAMETERS.SEARCH_PARAMS)
  @ApiQuery(TECH_CONST_PARAMETERS.SORT_BY__PARAMS)
  @ApiQuery(TECH_CONST_PARAMETERS.ORDER_BY__PARAMS)
  @Get('get')
  @Roles(Role.Admin, Role.User)
  //@UseGuards(RolesGuard)
  //@Roles(Role.Admin)
  async GetAsync(
    @Query('search') search: string,
    @Query('page') page: Number,
    @Query('pageSize') pageSize: Number,
    @Query('sortBy') sortBy: string,
    @Query('orderBy') orderBy: string,
  ) {
    try {
      let result = this._techService.GetAsync({
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
      let result = await this._techService.GetById(projectId);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
