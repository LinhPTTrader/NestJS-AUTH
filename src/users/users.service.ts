import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
const saltRounds = 10;
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }


  async create(createUserDto: CreateUserDto) {

    const user = new this.userModel(createUserDto);
    user.password = await bcrypt.hash(user.password, saltRounds);
    return user.save();
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id)
      if (!user) {
        throw new Error('Không tìm thấy người dùng với id là : ' + id);
      }
      return user
    } catch (error) {
      throw new Error('Invalid Id')
    }
  }

  async update(updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ _id: updateUserDto._id }, { ...updateUserDto });
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }

  async findUserByUserName(username: string) {
    return await this.userModel.findOne({ email: username })
  }
}
