import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDocument } from 'Apis/V1/user/user.schema';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: UserDocument, token: string, time: number) {
    const url = `http://localhost:3000/api/v1/accounts/active?access_token=${token}`;

    try {
      await this.mailerService.sendMail({
        to: user.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Welcome to Nice App! Confirm your Email',
        template: './confirmation', // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          name: user.name,
          url,
          time,
        },
      });
      return Promise.resolve({
        success: true,
        message: 'Email sent  successfully',
      });
    } catch (error) {
      return Promise.reject({
        success: false,
        message: error.message,
      });
    }
  }
}
