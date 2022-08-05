import { UpdateTechDto } from './dtos/updateTechnology.dto';
import { CreateTechDto } from './dtos/createTechnology.dto';
import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'Shared/Auth/Decorator/checkOpenRoute.decorator';
import { SWAGGER_RESPONSE } from 'Shared/Common/swagger-respon/swaggerCheck';
import { TECH_CONST, TECH_SWAGGER_RESPONSE } from './technology.const';
import { technologyService } from './technology.service';


@Controller(TECH_CONST.MODEL_NAME)
@ApiTags(TECH_CONST.MODEL_NAME)
export class TechController {
    constructor(private readonly _techService: technologyService) {

    }
    @Public()
    @ApiOkResponse(TECH_SWAGGER_RESPONSE.CREATE_TECH)
    @Post()
    async CreateAsync(@Body() project: CreateTechDto) {
        try {
            let result = await this._techService.createAsync(project);
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
            let result = await this._techService.RemoveAsync(userId);
            return result;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Public()
    @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
    @Patch('/:projectId')
    async UpdateAsync(@Param('projectId') projectId: string, @Body() project: UpdateTechDto) {
        try {
            let result = await this._techService.UpdateAsync(projectId, project);
            return result;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get()
    // @Public()
    @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
    async GetAllAsync() {
        try {
            let result = await this._techService.GetAllAsync();
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
            let result = await this._techService.GetById(projectId);
            return result
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}