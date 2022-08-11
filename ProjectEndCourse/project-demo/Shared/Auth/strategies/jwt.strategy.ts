import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWT_CONFIG } from 'Configs/constant.config';
import { log } from 'console';
import { JwtPayload } from '../payloads/JWTpayload';
import { UserService } from '../../../Apis/V1/user/user.service';
import { ModuleRef } from '@nestjs/core';
import { ERROR } from 'Shared/Common/err-code.const';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly _UserService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CONFIG.secret || 'hieuthunhat',
    });
  }

  async validate(payload: JwtPayload) {
    if (payload) {
      let user = await this._UserService.getByMail(payload.email);
      if (!user) {
        throw new UnauthorizedException();
      } else if (user.isEmailConfirmed == false) {
        throw new UnauthorizedException(ERROR.EMAIL_NOT_ACTIVE);
      } else {
        return user;
      }
    }
  }
}
