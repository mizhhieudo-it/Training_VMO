import { refreshTokenDto } from './dtos/refresh-token.dto';
import { JwtPayload } from './payloads/JWTpayload';
import {
  NotFoundException,
  BadRequestException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ERROR } from 'Shared/Common/err-code.const';
import { UserService } from '../../Apis/V1/user/user.service';
import { LoginResponseDto } from './dtos/login-respon.dto';
import { LoginDto } from './dtos/login.dto';
import { ValidatorService } from './validators/check-expiration-time';
import * as bcrypt from 'bcrypt';
import { USER_CONST } from '../../Apis/V1/user/user.const';
import { JWT_CONFIG, Refersh_JWT_CONFIG } from 'Configs/constant.config';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from 'Apis/V1/user/dto/UpdateUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _UserService: UserService,
    private readonly validatorService: ValidatorService,
    private readonly jwtService: JwtService,
  ) {}

  async LoginService(account: LoginDto): Promise<LoginResponseDto> {
    const { username, password } = account;
    try {
      // isUserExits returns a UserDocument
      let isUserExits = await this._UserService.getByMail(username);
      if (
        isUserExits.idGoogle ||
        isUserExits.idFacebook ||
        isUserExits.idGithub
      ) {
        let payload: JwtPayload = {
          userId: isUserExits.userId,
          email: isUserExits.email,
          roles: isUserExits.roles,
        };

        const jwtExpiresIn = parseInt(JWT_CONFIG.expiresIn) || 2592000;
        const refreshTokenExpiresIn =
          parseInt(Refersh_JWT_CONFIG.expiresIn) || 12592000;
        // sign token with UserDocument
        let refreshToken = await this.jwtService.signAsync(payload, {
          secret: Refersh_JWT_CONFIG.secret || 'hieuthunhat',
          expiresIn: refreshTokenExpiresIn || 12592000,
        });
        let accessToken = await this.jwtService.signAsync(payload, {
          secret: JWT_CONFIG.secret || 'hieuthunhat',
          expiresIn: jwtExpiresIn || 2592000,
        });
        await this._UserService.UpdateAsync(isUserExits.userId, <UpdateUserDto>{
          refreshToken,
        });

        return {
          accessToken: accessToken,
          accessTokenExpire: jwtExpiresIn,
          refreshToken: refreshToken,
          refreshTokenExpire: refreshTokenExpiresIn,
        };
      } else {
        if (
          isUserExits.issuedDate &&
          isUserExits.daysInTrial &&
          isUserExits.daysInTrial !== '-'
        ) {
          if (
            this.validatorService.checkExpirationTime(
              isUserExits.issuedDate,
              parseInt(isUserExits.daysInTrial),
            )
          ) {
            throw new NotFoundException(ERROR.USER_NOT_FOUND.MESSAGE);
          }
        }
        const checkPassword = await bcrypt.compare(
          password,
          isUserExits.password,
        );
        if (!checkPassword) {
          throw new BadRequestException(
            ERROR.USERNAME_OR_PASSWORD_INCORRECT.MESSAGE,
          );
        } else {
          let payload: JwtPayload = {
            userId: isUserExits.userId,
            email: isUserExits.email,
            roles: isUserExits.roles,
          };
          const jwtExpiresIn = parseInt(JWT_CONFIG.expiresIn) || 2592000;
          const refreshTokenExpiresIn =
            parseInt(Refersh_JWT_CONFIG.expiresIn) || 12592000;
          let refreshToken = await this.jwtService.signAsync(payload, {
            secret: Refersh_JWT_CONFIG.secret || 'hieuthunhat',
            expiresIn: refreshTokenExpiresIn || 12592000,
          });
          let accessToken = await this.jwtService.signAsync(payload, {
            secret: JWT_CONFIG.secret || 'hieuthunhat',
            expiresIn: jwtExpiresIn || 2592000,
          });
          await this._UserService.UpdateAsync(isUserExits.userId, <
            UpdateUserDto
          >{ refreshToken });

          return {
            accessToken: accessToken,
            accessTokenExpire: jwtExpiresIn,
            refreshToken: refreshToken,
            refreshTokenExpire: refreshTokenExpiresIn,
          };
        }
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async AutoGenerateToken(
    refreshToken: refreshTokenDto,
  ): Promise<LoginResponseDto> {
    const { token } = refreshToken;
    try {
      const decode = await this.jwtService.verify(token, {
        secret: JWT_CONFIG.secret || 'hieuthunhat',
      });

      if (!decode) {
        return Promise.reject('Invalid token');
      } else {
        let payload: JwtPayload = {
          userId: decode.userId,
          email: decode.email,
          roles: decode.roles,
        };
        const jwtExpiresIn = parseInt(JWT_CONFIG.expiresIn) || 2592000;
        let accessToken = await this.jwtService.signAsync(payload, {
          secret: JWT_CONFIG.secret || 'hieuthunhat',
          expiresIn: jwtExpiresIn,
        });
        return {
          accessToken,
          accessTokenExpire: jwtExpiresIn,
        };
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
