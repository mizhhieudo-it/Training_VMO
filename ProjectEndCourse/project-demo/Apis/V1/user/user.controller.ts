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
import { ApiFile } from 'Shared/Common/upload-files/Local/api-file.decorator';
import { fileMimetypeFilter } from 'Shared/Common/upload-files/Local/api-file.filter';
import { ParseFile } from 'Shared/Common/upload-files/Local/api-file.pipe';
import { uploadFileUser } from './user.otp';

@Controller(USER_CONST.MODEL_NAME)
@ApiTags(USER_CONST.MODEL_NAME)
export class UserController {
  constructor(private _userService: UserService) {}

  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  // @Public() // true
  async getListUser(@Req() request: Request) {
    return this._userService.GetAllAsync();
  }

  //@Public()
  @ApiOkResponse(SWAGGER_RESPONSE.HEALTH_CHECK)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Get('/:userId')
  public getUserById(@Param('userId') userId: string) {
    return this._userService.getById(userId);
  }

  // Option 1 : Upload file save in local
  // @ApiOkResponse(USER_SWAGGER_RESPONSE.CREATE_USER)
  // @Post()
  // @Public()
  // @ApiFile('avatar', uploadFileUser)
  // public createUser(
  //   @Request() request,
  //   @Body() createUserDto: CreateUserDto,
  //   @UploadedFile(ParseFile) avatar?: Express.Multer.File,
  // ) {
  //   let { path } = avatar;
  //   createUserDto.avatar = path.toString().trim();
  //   return this._userService.CreateAsync(createUserDto);
  // }

  @ApiOkResponse(USER_SWAGGER_RESPONSE.CREATE_USER)
  @Post()
  @Public()
  //@UseGuards(RolesGuard)
  //@Roles(Role.Admin)
  @ApiFile('avatar', uploadFileUser)
  public createUser(
    @Request() request,
    @Body() createUserDto: CreateUserDto,
    @UploadedFile(ParseFile) avatar?: Express.Multer.File,
  ) {
    return this._userService.CreateAsync(createUserDto, avatar);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Patch('/:userId')
  public updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this._userService.UpdateAsync(userId, updateUserDto);
  }

  //@Public()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:userId')
  public deleteUser(@Param('userId') userId: string) {
    return this._userService.DeleteAsync(userId);
  }
}
