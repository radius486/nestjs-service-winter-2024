import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { ErrorMessages } from 'src/common/constants/error-messages';
import * as bcrypt from 'bcrypt';
import { InfoMessages } from 'src/common/constants/info-messages';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginDto) {
    const user = await this.validateUser(userDto);

    return this.generateToken(user);
  }

  async signup(userDto: SignupDto) {
    const { login, password } = userDto;

    const user = await this.usersService.createUser({
      login,
      password,
    });

    const token = await this.generateToken(user as User);

    return {
      message: InfoMessages.userHasBeenSuccessfullyCreated,
      ...token,
    };
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
        message: ErrorMessages.LoginOrPasswordIsIncorrect,
      });
    }
  }

  private async generateToken(user: User) {
    const payload = { login: user.login, userId: user.id };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
