import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { identity } from 'rxjs';


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || '987455517305-f9joekbdb6b1k63i5lrfi8amova9cn0j.apps.googleusercontent.com',
      clientSecret: process.env.GOOGLE_SECRET || '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',
      callbackURL: 'http://localhost:3000/api/v1/accounts/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos,id } = profile
    const user = {
      id:id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken // so sánh db => // 
    }
    done(null, user);
  }
}