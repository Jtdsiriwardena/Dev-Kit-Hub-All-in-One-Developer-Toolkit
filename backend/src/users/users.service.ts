import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

type CreateUserInput = {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  // CREATE
  async create(data: CreateUserInput) {
    const user = new this.userModel(data);
    return user.save();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findById(id: string) {
    return this.userModel.findById(id).select('-password');
  }

  async updateRole(userId: string, role: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { role },
      { new: true },
    ).select('-password');
  }

  async updatePassword(userId: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    return this.userModel.findByIdAndUpdate(userId, {
      password: hashed,
    });
  }

  async deleteUser(userId: string) {
    return this.userModel.findByIdAndDelete(userId);
  }
}
