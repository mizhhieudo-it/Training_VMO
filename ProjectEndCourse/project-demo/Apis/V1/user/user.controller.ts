import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'Shared/Auth/guards/jwt.guards';
import { SWAGGER_RESPONSE } from 'Shared/Common/swagger-respon/swaggerCheck';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { USER_CONST, USER_SWAGGER_RESPONSE } from './user.const';
import { UserService } from './user.service';
import { log } from 'console';
import { Roles } from 'Shared/Auth/Decorator/roles.decorator';
import { Role } from 'Shared/Auth/Roles/role.enum';
import { RolesGuard } from 'Shared/Auth/guards/checkRole.guards';
import { Public } from 'Shared/Auth/Decorator/checkOpenRoute.decorator';
import { LoggingInterceptor } from 'Shared/Middlewares/Interception/logging.interceptor';
import { configFilesInterceptor } from 'Shared/Middlewares/Interception/ConfigFilesUpload.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  customFileFilter,
  editFileName,
} from 'Shared/Common/helper/upload-file.helper';
import { diskStorage } from 'multer';
import { request } from 'http';

@Controller(USER_CONST.MODEL_NAME)
@ApiTags(USER_CONST.MODEL_NAME)
export class UserController {
  constructor(private _userService: UserService) {}

  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  @Get()
  // @UseGuards(RolesGuard)
  // @Roles(Role.User)
  @Public() // true
  async getListUser(@Req() request: Request) {
    return this._userService.GetAllAsync();
  }

  @Public()
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  @Get('/:userId')
  public getUserById(@Param('userId') userId: string) {
    return this._userService.getById(userId);
  }

  @ApiOkResponse(USER_SWAGGER_RESPONSE.CREATE_USER)
  @Post()
  @Public()
  @UseInterceptors(configFilesInterceptor)
  public createUser(
    @Request() request,
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this._userService.CreateAsync(createUserDto);
  }

  @Patch('/:userId')
  public updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this._userService.UpdateAsync(userId, updateUserDto);
  }

  @Delete('/:userId')
  public deleteUser(@Param('userId') userId: string) {
    return this._userService.DeleteAsync(userId);
  }
}
