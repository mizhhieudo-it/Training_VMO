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
      /*
      {
    _id: '62f46d5060d156ed4485c471',
    userId: '1de750c5-0214-4638-ab16-29fe2a4860a3',
    name: 'HiếuĐỗ Minh',
    email: 'minhhieudo.it@gmail.com',
    password: '-',
    issuedBy: '',
    issuedDate: '',
    daysInTrial: '',
    isEmailConfirmed: true,
    roles: ['user'],
    idGoogle: '110615788478010332810',
    __v: 0,
  };
      
      */

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

        const jwtExpiresIn = parseInt(JWT_CONFIG.expiresIn);
        const refreshTokenExpiresIn = parseInt(Refersh_JWT_CONFIG.expiresIn);
        // sign token with UserDocument
        let refreshToken = await this.jwtService.signAsync(payload, {
          secret: Refersh_JWT_CONFIG.secret || 'hieuthunhat',
          expiresIn: refreshTokenExpiresIn || 12592000,
        });
        await this._UserService.UpdateAsync(isUserExits.userId, <UpdateUserDto>{
          refreshToken,
        });

        return {
          accessToken: await this.jwtService.signAsync(payload, {
            secret: JWT_CONFIG.secret || 'hieuthunhat',
            expiresIn: jwtExpiresIn || 2592000,
          }),
          accessTokenExpire: jwtExpiresIn || 2592000,
          refreshToken: refreshToken,
          refreshTokenExpire: refreshTokenExpiresIn || 12592000,
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
        const checkPassword = bcrypt.compare(password, isUserExits.password);
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
          const jwtExpiresIn = parseInt(JWT_CONFIG.expiresIn);
          const refreshTokenExpiresIn = parseInt(Refersh_JWT_CONFIG.expiresIn);
          let refreshToken = await this.jwtService.signAsync(payload, {
            secret: Refersh_JWT_CONFIG.secret || 'hieuthunhat',
            expiresIn: refreshTokenExpiresIn || 12592000,
          });
          await this._UserService.UpdateAsync(isUserExits.userId, <
            UpdateUserDto
          >{ refreshToken });

          return {
            accessToken: await this.jwtService.signAsync(payload, {
              secret: JWT_CONFIG.secret || 'hieuthunhat',
              expiresIn: jwtExpiresIn || 2592000,
            }),
            accessTokenExpire: jwtExpiresIn || 2592000,
            refreshToken: refreshToken,
            refreshTokenExpire: refreshTokenExpiresIn || 12592000,
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
      const jwtExpiresIn = parseInt(JWT_CONFIG.expiresIn);
      return {
        accessToken: await this.jwtService.signAsync(payload, {
          secret: JWT_CONFIG.secret || 'hieuthunhat',
          expiresIn: jwtExpiresIn || 2592000,
        }),
        accessTokenExpire: jwtExpiresIn || 2592000,
      };
    }
  }
}
