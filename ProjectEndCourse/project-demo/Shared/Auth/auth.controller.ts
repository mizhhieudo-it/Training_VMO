import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AUTH_SWAGGER_RESPONSE } from "./auth.constant";
import { AuthService } from "./auth.service";
import { LoginResponseDto } from "./dtos/login-respon.dto";
import { LoginDto } from "./dtos/login.dto";

@ApiTags('Authentication')
@Controller('accounts')
export class AuthController {
    constructor(private _authService: AuthService) {

    }

    @ApiOkResponse(AUTH_SWAGGER_RESPONSE.LOGIN_SUCCESS)
    @ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
    @ApiNotFoundResponse(AUTH_SWAGGER_RESPONSE.LOGIN_FAIL)
    @ApiInternalServerErrorResponse(AUTH_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    Login(@Body() account: LoginDto): Promise<LoginResponseDto> {
        return this._authService.LoginService(account);
    }
}