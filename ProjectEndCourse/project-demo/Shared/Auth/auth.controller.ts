import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AUTH_SWAGGER_RESPONSE } from "./auth.constant";
import { AuthService } from "./auth.service";
import { Public } from "./Decorator/checkOpenRoute.decorator";
import { LoginResponseDto } from "./dtos/login-respon.dto";
import { LoginDto } from "./dtos/login.dto";
import { refreshTokenDto } from "./dtos/refresh-token.dto";
import { GoogleService } from "./LoginThirdParty/Google/google.service";

@ApiTags('Authentication')
@Controller('accounts')
export class AuthController {
    constructor(private _authService: AuthService,private _googleService: GoogleService) {

    }

    @ApiOkResponse(AUTH_SWAGGER_RESPONSE.LOGIN_SUCCESS)
    @ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
    @ApiNotFoundResponse(AUTH_SWAGGER_RESPONSE.LOGIN_FAIL)
    @ApiInternalServerErrorResponse(AUTH_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
    @Post('login')
    @Public()
    @HttpCode(HttpStatus.OK)
    Login(@Body() account: LoginDto): Promise<LoginResponseDto> {
        return this._authService.LoginService(account);
    }
    @ApiOkResponse(AUTH_SWAGGER_RESPONSE.LOGIN_SUCCESS)
    @ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
    @ApiNotFoundResponse(AUTH_SWAGGER_RESPONSE.LOGIN_FAIL)
    @ApiInternalServerErrorResponse(AUTH_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
    @Post('refresh-token')
    @Public()
    @HttpCode(HttpStatus.OK)
    RefreshToken(@Body() token: refreshTokenDto): Promise<LoginResponseDto>{
        console.log(token);
        
        return this._authService.AutoGenerateToken(token);
    }

    @Public()
    @UseGuards(AuthGuard("google"))
    @Get("google")
    async signInWithGoogle() {}


    @Public()
    @UseGuards(AuthGuard("google"))
    @Get("google/redirect")
    async signInWithGoogleRedirect(@Req() req) {
     return this._googleService.signInWithGoogle(req);
    }

    
}