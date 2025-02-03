import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePasswordDto } from './dto/update-password-dto';
import * as uuid from 'uuid';
import { ErrorMessages } from 'src/common/constants/error-messages';
import { PrismaService } from 'src/prisma/prisma.service';

export type User = {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number | bigint;
  updatedAt: number | bigint;
};

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return await this.prisma.user.findMany({ omit: { password: true } });
  }

  async getUserById(id: string, withPass = false): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      omit: {
        password: !withPass,
      },
    });

    if (!user) {
      throw new HttpException(
        ErrorMessages.recordDoestExist,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async createUser(dto: CreateUserDto) {
    const existedUser = await this.prisma.user.findUnique({
      where: { login: dto.login },
    });

    if (existedUser) {
      throw new HttpException(
        ErrorMessages.userAlreadyExists,
        HttpStatus.CONFLICT,
      );
    }

    const data = {
      id: uuid.v4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    return await this.prisma.user.create({ data, omit: { password: true } });
  }

  async updateUserPassword(id: string, dto: UpdatePasswordDto) {
    const user = await this.getUserById(id, true);

    if (user.password !== dto.oldPassword) {
      throw new HttpException(
        ErrorMessages.oldPasswordIsWrong,
        HttpStatus.FORBIDDEN,
      );
    }

    return await this.prisma.user.update({
      where: { id },
      data: {
        password: dto.newPassword,
        version: ++user.version,
        updatedAt: new Date().getTime(),
      },
      omit: {
        password: true,
      },
    });
  }

  async deleteUserById(id: string) {
    await this.getUserById(id);
    await this.prisma.user.delete({ where: { id } });
  }
}
