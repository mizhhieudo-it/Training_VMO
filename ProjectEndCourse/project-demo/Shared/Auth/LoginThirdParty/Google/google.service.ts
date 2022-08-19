import { LoginDto } from './../../dtos/login.dto';
import { AuthService } from './../../auth.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserRepository } from 'Apis/V1/user/user.repository';
import { UserDocument } from 'Apis/V1/user/user.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GoogleService {
  //login with google service
  constructor(
    private readonly _authService: AuthService,
    private readonly _userRepo: UserRepository,
  ) {}

  async signInWithGoogle(req) {
    if (!req.user) {
      throw new BadRequestException();
    } else {
      const { email, id, firstName, lastName } = req.user;
      // search accounts containing id google
      let userExsit = await this._userRepo.findByCodition({ idGoogle: id });
      // if account already exists => login
      if (userExsit) {
        return await this._authService.LoginService(<LoginDto>{
          username: userExsit.email,
        });
      } else {
        // check account connect google auth => is register mail
        let userAuth = await this._userRepo.findByCodition({ email });
        if (userAuth) {
          throw new ForbiddenException(
            "User already exists, but Google account was not connected to user's account",
          );
        } else {
          let acccount = {
            userId: uuidv4(),
            email: email,
            name: firstName + lastName,
            idGoogle: id,
            password: '-',
          };
          await this._userRepo.store(<UserDocument>acccount);
          return this._authService.LoginService(<LoginDto>{
            username: acccount.email,
          });
        }
      }
    }
  }
}
