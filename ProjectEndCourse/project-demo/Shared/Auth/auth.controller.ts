import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AUTH_SWAGGER_RESPONSE } from './auth.constant';
import { AuthService } from './auth.service';
import { Public } from './Decorator/checkOpenRoute.decorator';
import { ActiveAccount, confirmMail } from './dtos/confirm-mail';
import { LoginResponseDto } from './dtos/login-respon.dto';
import { LoginDto } from './dtos/login.dto';
import { refreshTokenDto } from './dtos/refresh-token.dto';
import { GoogleService } from './LoginThirdParty/Google/google.service';
import { TwoFactorAuthenticationService } from './Two-FactoryAuthentication/TwoFactoryAuthen.service';

@ApiTags('Authentication')
@Controller('accounts')
export class AuthController {
  constructor(
    private _authService: AuthService,
    private _googleService: GoogleService,
    private _twoFactorAuthenticationService: TwoFactorAuthenticationService,
  ) {}

  @ApiOkResponse(AUTH_SWAGGER_RESPONSE.LOGIN_SUCCESS)
  @ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiNotFoundResponse(AUTH_SWAGGER_RESPONSE.LOGIN_FAIL)
  @ApiInternalServerErrorResponse(
    AUTH_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION,
  )
  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  Login(@Body() account: LoginDto): Promise<LoginResponseDto> {
    return this._authService.LoginService(account);
  }
  @ApiOkResponse(AUTH_SWAGGER_RESPONSE.LOGIN_SUCCESS)
  @ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiNotFoundResponse(AUTH_SWAGGER_RESPONSE.LOGIN_FAIL)
  @ApiInternalServerErrorResponse(
    AUTH_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION,
  )
  @Post('refresh-token')
  @Public()
  @HttpCode(HttpStatus.OK)
  async RefreshToken(
    @Body() token: refreshTokenDto,
  ): Promise<LoginResponseDto> {
    try {
      let tokenResult = await this._authService.AutoGenerateToken(token);
      return tokenResult;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('google')
  async signInWithGoogle() {}

  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('google/redirect')
  async signInWithGoogleRedirect(@Req() req) {
    return this._googleService.signInWithGoogle(req);
  }

  @Public()
  @Post('confirm')
  async confirmEmail(@Body() email: confirmMail) {
    const { mail } = email;
    try {
      let result = await this._twoFactorAuthenticationService.confirmAccount(
        mail,
      );
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Public()
  @Get('active')
  async UpdateActiveAccount(@Query('access_token') token: string) {
    try {
      let result = await this._twoFactorAuthenticationService.activeAccount(
        token,
      );
      return `<h3>Status : ${result.status} - Message : ${result.message}</h3>`;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
