import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'Shared/Auth/Decorator/checkOpenRoute.decorator';
import { SWAGGER_RESPONSE } from 'Shared/Common/swagger-respon/swaggerCheck';
import { CreateProjectDto } from './dto/CreateStatusProject.dto';
import { UpdateUserDto } from './dto/UpdateProject.dto';
import { PROJECT_SWAGGER_RESPONSE, STATUS_PROJECT_CONST } from './statusProject.const';
import { StautsProjectService } from './statusProject.service';

@Controller(STATUS_PROJECT_CONST.MODEL_NAME)
@ApiTags(STATUS_PROJECT_CONST.MODEL_NAME)
export class statusProjectController {
    constructor(private readonly _repositoryService: StautsProjectService) {

    }
    @Public()
    @ApiOkResponse(PROJECT_SWAGGER_RESPONSE.CREATE_STATUS_PROJECT)
    @Post()
    async CreateAsync(@Body() project: CreateProjectDto,) {
        try {
            let result = await this._repositoryService.CreateAsync(project);
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
            let result = await this._repositoryService.RemoveAsync(userId);
            return result;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Public()
    @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
    @Patch('/:projectId')
    async UpdateAsync(@Param('projectId') projectId: string, @Body() project: UpdateUserDto) {
        try {
            let result = await this._repositoryService.UpdateAsync(projectId, project);
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
            let result = await this._repositoryService.GetAllAsync();
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
            let result = await this._repositoryService.GetById(projectId);
            return result
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}