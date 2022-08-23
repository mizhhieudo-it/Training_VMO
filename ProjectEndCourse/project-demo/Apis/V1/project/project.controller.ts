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
import { CreateProjectDto } from './dto/CreateProject.dto';
import { UpdateProjectDto } from './dto/UpdateProject.dto';
import { PROJECT_CONST, PROJECT_SWAGGER_RESPONSE } from './project.const';
import { ProjectService } from './project.service';

@Controller(PROJECT_CONST.MODEL_NAME)
@ApiTags(PROJECT_CONST.MODEL_NAME)
export class ProjectController {
  constructor(private readonly _projectService: ProjectService) {}
  @Public()
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

  @Public()
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

  @Public()
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
  @Public()
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  async GetAllAsync() {
    try {
      let result = await this._projectService.GetAllAsync();
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Public()
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
