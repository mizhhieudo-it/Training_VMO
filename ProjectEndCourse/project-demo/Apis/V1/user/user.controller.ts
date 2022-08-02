import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "Shared/Auth/guards/jwt.guards";
import { SWAGGER_RESPONSE } from "Shared/Common/swagger-respon/swaggerCheck";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { USER_CONST, USER_SWAGGER_RESPONSE } from "./user.const";
import { UserService } from "./user.service";
import { log } from 'console';
import { Request } from "express";
import { Roles } from "Shared/Auth/Decorator/roles.decorator";
import { Role } from "Shared/Auth/Roles/role.enum";
import { RolesGuard } from "Shared/Auth/guards/checkRole.guards";


@Controller(USER_CONST.MODEL_NAME)
@ApiTags(USER_CONST.MODEL_NAME)
export class UserController {
    constructor(private _userService: UserService) {
    }

    @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
    @Get()
    @UseGuards(JwtAuthGuard)
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    async getListUser(@Req() request: Request) {
        log(request.user)
        return this._userService.GetAllAsync();
    }

    @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
    @Get('/:userId')
    public getUserById(@Param('userId') userId: string) {
        return this._userService.getById(userId);
    }

    @ApiOkResponse(USER_SWAGGER_RESPONSE.CREATE_USER)
    @Post()
    public createUser(@Body() createUserDto: CreateUserDto) {
        return this._userService.CreateAsync(createUserDto);
    }

    @Patch('/:userId')
    public updateUser(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
        return this._userService.UpdateAsync(userId, updateUserDto);
    }

    @Delete('/:userId')
    public deleteUser(@Param('userId') userId: string) {
        return this._userService.DeleteAsync(userId);
    }

}