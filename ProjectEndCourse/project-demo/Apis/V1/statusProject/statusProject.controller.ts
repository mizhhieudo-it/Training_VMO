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
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'Shared/Auth/Decorator/checkOpenRoute.decorator';
import { SWAGGER_RESPONSE } from 'Shared/Common/swagger-respon/swaggerCheck';
import { CreateStatusProjectDto } from './dto/CreateStatusProject.dto';
import { UpdateUserDto } from './dto/UpdateProject.dto';
import {
  PROJECT_SWAGGER_RESPONSE,
  STATUS_PROJECT_CONST,
} from './statusProject.const';
import { StautsProjectService } from './statusProject.service';
import { Roles } from 'Shared/Auth/Decorator/roles.decorator';

@Controller(STATUS_PROJECT_CONST.MODEL_NAME)
@ApiTags(STATUS_PROJECT_CONST.MODEL_NAME)
export class statusProjectController {
  constructor(private readonly _statusProjectService: StautsProjectService) {}
  //@Public()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @ApiOkResponse(PROJECT_SWAGGER_RESPONSE.CREATE_STATUS_PROJECT)
  @Post()
  async CreateAsync(@Body() project: CreateStatusProjectDto) {
    try {
      let result = await this._statusProjectService.CreateAsync(project);
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
      let result = await this._statusProjectService.RemoveAsync(userId);
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
    @Body() project: CreateStatusProjectDto,
  ) {
    try {
      let result = await this._statusProjectService.UpdateAsync(
        projectId,
        project,
      );
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
      let result = await this._statusProjectService.GetAllAsync();
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
      let result = await this._statusProjectService.GetById(projectId);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
