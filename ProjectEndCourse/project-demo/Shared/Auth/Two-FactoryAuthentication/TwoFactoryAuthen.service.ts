import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { UserRepository } from 'Apis/V1/user/user.repository';
import { CONFIRM_MAIL_TOKEN_CONFIG } from 'Configs/constant.config';
import { ERROR } from 'Shared/Common/err-code.const';
import { v4 as uuidv4 } from 'uuid';
import { Headers } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer/dist/mailer.service';
import e from 'express';
import { MailService } from 'Shared/Common/mails/mail.service';

@Injectable()
export class TwoFactorAuthenticationService {
  constructor(
    private readonly _userRepo: UserRepository,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailService,
  ) {}
  private async generateUrl(emailUser: string, @Headers('host') host?: string) {
    let user = await this._userRepo.findByCodition({ email: emailUser });
    if (!user) {
      throw new BadRequestException(ERROR.USER_NOT_FOUND);
    } else {
      let payload = {
        email: user.email,
      };
      const timeJWTExpiresIn = parseInt(CONFIRM_MAIL_TOKEN_CONFIG.expiresIn);
      let token = await this.jwtService.signAsync(payload, {
        secret: CONFIRM_MAIL_TOKEN_CONFIG.secret || 'hieuthunhat',
        expiresIn: timeJWTExpiresIn || 180000,
      });
      let url =
        'http:localhost3000/api/v1/accounts/confirm?access_token=' + token;
      return Promise.resolve(url);
    }
  }
  async confirmAccount(email: string) {
    let linkConfirm = await this.generateUrl(email);
    await this.mailerService.sendUserConfirmation();
  }
}
