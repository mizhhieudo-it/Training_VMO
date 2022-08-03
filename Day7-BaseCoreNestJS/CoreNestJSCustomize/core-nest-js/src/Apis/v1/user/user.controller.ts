import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { USER_SWAGGER_RESPONSE } from './user.constant';
import { CreateUserDto } from './dtos/user.req';
//import { UpdateUserDto } from './dto/UpdateUser.dto';
// import { USER_SWAGGER_RESPONSE } from './user.constant';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiOkResponse()
    @Get()
    public getUsers() {
        return this.userService.getAsync();
    }

    // @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
    // @Get('/:userId')
    // public getUserById(@Param('userId') userId: string) {
    //     return this.userService.getByUserId(userId);
    // }

    @ApiOkResponse(USER_SWAGGER_RESPONSE.CREATE_USER)
    @Post()
    public createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createAsync(createUserDto);
    }

    // @Patch('/:userId')
    // public updateUser(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
    //     return this.userService.updateUser(userId, updateUserDto);
    // }

    // @Delete('/:userId')
    // public deleteUser(@Param('userId') userId: string) {
    //     return this.userService.deleteUser(userId);
    // }
}
