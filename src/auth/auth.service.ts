import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { ErrorMessages } from 'src/common/constants/error-messages';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginDto) {
    const user = await this.validateUser(userDto);

    return user;
  }

  async signup(userDto: SignupDto) {
    const { login, password } = userDto;

    return await this.usersService.createUser({
      login,
      password,
    });
  }

  private async validateUser(userDto: LoginDto) {
    try {
      const user = await this.usersService.getUserByLogin(userDto.login, true);

      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user ? user.password : '',
      );

      if (user && passwordEquals) {
        return user;
      }

      throw new Error();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException({
        message: ErrorMessages.EmailOrPasswordIsIncorrect,
      });
    }
  }
}
