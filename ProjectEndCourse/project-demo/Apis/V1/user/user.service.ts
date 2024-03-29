import { IListParams } from 'Shared/Database/Pagination/IPaginate';
import { AWSUploadFileService } from './../../../Shared/Common/upload-files/AWS/upload-files-aws.service';
import {
  BadRequestException,
  Inject,
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
import { CloudinaryService } from 'Shared/Common/upload-files/Cloudinary/cloudinary.service';
import { ResponSchema } from 'Shared/utils/dataRespon_schema';
import { ResponSchemaConst } from 'Shared/Common/respon-mess.const';
import { AWSUploadFile } from 'Shared/Common/upload-files/AWS/upload-files-aws.const';
@Injectable()
export class UserService {
  constructor(
    private _userRepo: UserRepository,
    private _awsUploadFiles: AWSUploadFileService,
  ) {}
  async getById(userId: string) {
    try {
      let result = await this._userRepo.findByCodition({ userId });
      if (!result) {
        throw new NotFoundException(ERROR.USER_NOT_FOUND.MESSAGE);
      } else {
        return Promise.resolve(
          ResponSchema(ResponSchemaConst.Schema_Get, result),
        );
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
  async CreateAsync(createUserDto: CreateUserDto, fileUpload?: any) {
    const { userId, email, password, name, avatar } = createUserDto;
    const { originalname, buffer } = fileUpload;
    let fileName: string = <string>originalname;
    try {
      let isIdUnique = await this._userRepo.findByCodition({ userId });
      let isEmailUnique = await this._userRepo.findByCodition({ email });
      if (isIdUnique) {
        throw new NotFoundException(ERROR.USERID_EXISTED.MESSAGE);
      }
      if (isEmailUnique) {
        throw new NotFoundException(ERROR.EMAIL_EXISTED.MESSAGE);
      }
      let handlerFileUpload = await this._awsUploadFiles.uploadPublicFile(
        buffer,
        fileName.replace(/\s/g, ''),
      );
      let { Location, Key } = handlerFileUpload;

      let encodePassword = bcrypt.hashSync(password, 10);
      let user = await this._userRepo.store(<UserDocument>{
        userId,
        email,
        password: encodePassword,
        name,
        avatar: Location,
        issuedBy: '',
        issuedDate: '',
        daysInTrial: '',
      });
      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Create, user),
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async GetAllAsync() {
    try {
      const result = await this._userRepo.getAll();
      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Get, result),
      );
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
      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Update, result),
      );
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
      if (isUserExits.avatar) {
        let keyFiles = this._awsUploadFiles.getIdPublicFile(isUserExits.avatar);
        await this._awsUploadFiles.deletePublicFile(keyFiles);
      }
      let user = await this._userRepo.remove(isUserExits._id);
      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Delete, user),
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async GetAsync(params) {
    try {
      let { search, page, pageSize, sortBy, orderBy } = params;
      let listOfCondition = [];
      search
        ? listOfCondition.push({
            name: { $regex: '.*' + search + '.*', $options: 'i' },
          })
        : null;
      let condition = {};
      if (listOfCondition.length > 0) {
        condition = { $and: listOfCondition };
      }
      // console.log(condition);
      let searchParams: IListParams = {
        conditions: condition,
        projections: '',
        paginate: {
          pageSize,
          page,
          sortBy,
          orderBy,
        },
      };
      let result = await this._userRepo.get(searchParams);
      let respon = ResponSchema(ResponSchemaConst.Schema_Get, result);
      return Promise.resolve(respon);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
