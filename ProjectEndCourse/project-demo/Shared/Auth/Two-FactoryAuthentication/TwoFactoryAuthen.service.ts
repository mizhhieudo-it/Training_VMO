import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable, Param, Req } from '@nestjs/common';
import { UserRepository } from 'Apis/V1/user/user.repository';
import { CONFIRM_MAIL_TOKEN_CONFIG } from 'Configs/constant.config';
import { ERROR } from 'Shared/Common/err-code.const';
import { v4 as uuidv4 } from 'uuid';
import { Headers } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer/dist/mailer.service';
import e from 'express';
import { MailService } from 'Shared/Common/mails/mail.service';
import { JwtPayload } from '../payloads/JWTpayload';

@Injectable()
export class TwoFactorAuthenticationService {
  constructor(
    private readonly _userRepo: UserRepository,
    private readonly jwtService: JwtService,
    private readonly _mailerService: MailService,
  ) {}
  async confirmAccount(emailUser: string) {
    let user = await this._userRepo.findByCodition({ email: emailUser });
    if (!user) {
      throw new BadRequestException(ERROR.USER_NOT_FOUND);
    } else {
      let payload = {
        email: user.email,
      };
      const timeJWTExpiresIn =
        parseInt(CONFIRM_MAIL_TOKEN_CONFIG.expiresIn) || 300000;
      let token = await this.jwtService.signAsync(payload, {
        secret: CONFIRM_MAIL_TOKEN_CONFIG.secret || 'hieuthunhat',
        expiresIn: timeJWTExpiresIn,
      });
      try {
        let result = await this._mailerService.sendUserConfirmation(
          user,
          token,
          timeJWTExpiresIn / 60000,
        );
        return Promise.resolve(result);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
  async activeAccount(tokenAccount: string) {
    let user = await this.jwtService.decode(tokenAccount);
    if (!user) {
      throw new BadRequestException();
    } else {
      let isUserExits = await this._userRepo.findByCodition({
        email: user['email'],
      });
      try {
        await this._userRepo.update(isUserExits._id, {
          isEmailConfirmed: true,
        });
        return Promise.resolve({
          status: 'active',
          message: 'account active successfully',
        });
      } catch (error) {
        return Promise.reject(error.message);
      }
    }
  }
}
