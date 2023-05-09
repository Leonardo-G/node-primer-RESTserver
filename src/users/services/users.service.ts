import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../schema/user.schema';
import { CreateUserDTO } from '../dto/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUsersWithLimit(limit: number, skip: number) {
    const [total, users] = await Promise.all([
      this.countUsers(),
      this.userModel.find({ estado: true }).skip(skip).limit(limit),
    ]);

    return { total, users };
  }

  async newUser(createUserDTO: CreateUserDTO): Promise<UserDocument> {
    const user = new this.userModel(createUserDTO);
    user.password = bcrypt.hashSync(createUserDTO.password, 10);

    await user.save();

    return user;
  }

  async countUsers() {
    try {
      const users = await this.userModel.countDocuments({ estado: true });
      return users;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }
}
