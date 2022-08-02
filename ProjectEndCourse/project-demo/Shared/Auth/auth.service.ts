import { JwtPayload } from './payloads/JWTpayload';
import { NotFoundException, BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ERROR } from 'Shared/Common/err-code.const';
import { UserService } from '../../Apis/V1/user/user.service';
import { LoginResponseDto } from './dtos/login-respon.dto';
import { LoginDto } from './dtos/login.dto';
import { ValidatorService } from './validators/check-expiration-time';
import * as bcrypt from 'bcrypt';
import { USER_CONST } from '../../Apis/V1/user/user.const';
import { JWT_CONFIG } from 'Configs/constant.config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly _UserService: UserService, private readonly validatorService: ValidatorService, private readonly jwtService: JwtService) {
    }

    async LoginService(account: LoginDto): Promise<LoginResponseDto> {
        const { username, password } = account;
        try {
            let isUserExits = await this._UserService.getByMail(username);
            if (isUserExits.issuedDate && isUserExits.daysInTrial && isUserExits.daysInTrial !== '-') {
                if (this.validatorService.checkExpirationTime(isUserExits.issuedDate, parseInt(isUserExits.daysInTrial))) {
                    throw new NotFoundException(ERROR.USER_NOT_FOUND.MESSAGE);
                }
            }
            const checkPassword = bcrypt.compare(password, isUserExits.password);
            if (!checkPassword) {
                throw new BadRequestException(ERROR.USERNAME_OR_PASSWORD_INCORRECT.MESSAGE);
            } else {
                let payload: JwtPayload = {
                    userId: isUserExits.userId,
                    email: isUserExits.email,
                    roles: isUserExits.roles
                }
                const jwtExpiresIn = parseInt(JWT_CONFIG.expiresIn);
                return {
                    accessToken: await this.jwtService.signAsync(payload, { secret: JWT_CONFIG.secret || 'hieuthunhat', expiresIn: jwtExpiresIn || 2592000 }),
                    accessTokenExpire: jwtExpiresIn || 2592000,
                };
            }
        } catch (error) {
            return Promise.reject(error);
        }


    }
}