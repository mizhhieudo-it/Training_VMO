import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'Shared/Auth/Decorator/checkOpenRoute.decorator';
import { SWAGGER_RESPONSE } from 'Shared/Common/swagger-respon/swaggerCheck';
import { CreateProjectDto } from './dto/createProjectTypes.dto';
import { UpdateProjectDto } from './dto/updateProjectTypes.dto';
import { PROJECT_TYPE_CONST, PROJECT_TYPE_SWAGGER_RESPONSE } from './projectTypes.const';
import { projectTypesService } from './projectTypes.service';

@Controller(PROJECT_TYPE_CONST.MODEL_NAME)
@ApiTags(PROJECT_TYPE_CONST.MODEL_NAME)
export class projectTypesController {
    constructor(private readonly _projectService: projectTypesService) {

    }
    @Public()
    @ApiOkResponse(PROJECT_TYPE_SWAGGER_RESPONSE.CREATE_PROJECT)
    @Post()
    async CreateAsync(@Body() project: CreateProjectDto,) {
        try {
            let result = await this._projectService.CreateAsync(project);
            return result;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Public()
    @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
    @Delete('/:projectId')
    async DeleteAsync(@Param('projectId') userId: string) {
        try {
            let result = await this._projectService.RemoveAsync(userId);
            return result;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Public()
    @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
    @Patch('/:projectId')
    async UpdateAsync(@Param('projectId') projectId: string, @Body() project: UpdateProjectDto) {
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
    @Get('/:projectId')
    @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
    async GetByIdAsync(@Param('projectId') projectId: string) {
        try {
            let result = await this._projectService.GetById(projectId);
            return result
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}