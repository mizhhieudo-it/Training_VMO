import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ERROR } from 'Shared/Common/err-code.const';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/CreateUser.dto';
import * as bcrypt from 'bcrypt';
import { UserDocument, User } from './user.schema';
import mongoose, { Schema } from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';
@Injectable()
export class UserService {
  constructor(private _userRepo: UserRepository) {}
  async getById(userId: string) {
    try {
      let result = await this._userRepo.findByCodition({ userId });
      if (!result) {
        throw new NotFoundException(ERROR.USER_NOT_FOUND.MESSAGE);
      } else {
        return Promise.resolve(result);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getByMail(userMail: string) {
    try {
      let result = await this._userRepo.findByCodition({ email: userMail });
      if (!result) {
        throw new NotFoundException(ERROR.USER_NOT_FOUND.MESSAGE);
      } else {
        return Promise.resolve(result);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async CreateAsync(createUserDto: CreateUserDto) {
    const { userId, email, password, name } = createUserDto;
    try {
      let isIdUnique = await this._userRepo.findByCodition({ userId });
      let isEmailUnique = await this._userRepo.findByCodition({ email });
      if (isIdUnique) {
        throw new NotFoundException(ERROR.USERID_EXISTED.MESSAGE);
      }
      if (isEmailUnique) {
        throw new NotFoundException(ERROR.EMAIL_EXISTED.MESSAGE);
      }
      let encodePassword = bcrypt.hashSync(password, 10);
      let user = await this._userRepo.store(<UserDocument>{
        userId,
        email,
        password: encodePassword,
        name,
        issuedBy: '',
        issuedDate: '',
        daysInTrial: '',
      });
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async GetAllAsync() {
    try {
      const result = await this._userRepo.getAll();
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async UpdateAsync(userId: string, updateUserDto: UpdateUserDto) {
    const { name, issuedBy, issuedDate, daysInTrial, refreshToken } =
      updateUserDto;
    let isUserExits = await this._userRepo.findByCodition({ userId });
    if (!isUserExits) {
      throw new BadRequestException(ERROR.USER_NOT_FOUND.MESSAGE);
    }
    const updateData = {};
    if (name) updateData['name'] = name;
    if (issuedBy) updateData['issuedBy'] = issuedBy;
    if (issuedDate) updateData['issuedDate'] = issuedDate;
    if (daysInTrial) updateData['daysInTrial'] = daysInTrial;
    if (refreshToken) updateData['refreshToken'] = refreshToken;
    try {
      let result = await this._userRepo.update(isUserExits._id, updateData);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async DeleteAsync(userId: string) {
    let isUserExits = await this._userRepo.findByCodition({ userId });
    if (!isUserExits) {
      throw new BadRequestException(ERROR.USER_NOT_FOUND.MESSAGE);
    }
    try {
      let user = await this._userRepo.remove(isUserExits._id);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
