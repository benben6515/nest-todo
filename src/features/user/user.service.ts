import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { CommonUtility } from '../../core/utils/common.utility';
import { SearchDto } from '../../core/bases';

import { USER_MODEL_TOKEN, UserDocument } from '../../common/models/user.model';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_MODEL_TOKEN)
    private readonly userModel: Model<UserDocument>,
  ) {}

  public async createUser(user: CreateUserDto) {
    const { username, email, role } = user;
    const password = CommonUtility.encryptBySalt(user.password);
    const document = await this.userModel.create({
      username,
      email,
      password,
      role,
    });
    return document?.toJSON();
  }

  public async findUser(filter: FilterQuery<UserDocument>, select?: any) {
    const query = this.userModel.findOne(filter).select(select);
    const document = await query.exec();
    return document?.toJSON();
  }

  public async findUsers(search: SearchDto, select?: any) {
    const { skip, limit } = search;
    const query = this.userModel.find().select(select);
    const documents = await query.skip(skip).limit(limit).exec();
    return documents.map((document) => document?.toJSON());
  }

  public async deleteUser(userId: string) {
    const document = await this.userModel.findByIdAndRemove(userId).exec();
    if (!document) return;
    return {};
  }

  public async updateUser(userId: string, data: UpdateUserDto, select?: any) {
    const obj: Record<string, any> = { ...data };
    if (obj.password) {
      obj.password = CommonUtility.encryptBySalt(obj.password);
    }
    const query = this.userModel
      .findByIdAndUpdate(userId, obj, { new: true })
      .select(select);
    const document = await query.exec();
    return document?.toJSON();
  }

  public async existUser(filter: FilterQuery<UserDocument>) {
    return this.userModel.exists(filter);
  }

  public async hasUser() {
    const count = await this.userModel.estimatedDocumentCount().exec();
    return count > 0;
  }
}
