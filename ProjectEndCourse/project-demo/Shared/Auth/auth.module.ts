import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserModule } from "Apis/V1/user/user.module";
import { UserService } from '../../Apis/V1/user/user.service';
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { GoogleService } from "./LoginThirdParty/Google/google.service";
import { GoogleStrategy } from "./strategies/googleStrategy.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { ValidatorService } from "./validators/check-expiration-time";


@Module({
    imports: [UserModule],
    providers: [ValidatorService, AuthService, JwtService, JwtStrategy,GoogleService,GoogleStrategy,GoogleService],
    controllers: [AuthController],
})
export class AuthModule { }