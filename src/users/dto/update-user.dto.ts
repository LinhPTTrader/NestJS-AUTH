import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto extends OmitType(CreateUserDto, ['password']) {
    @IsNotEmpty()
    @IsString()
    _id: string
}
