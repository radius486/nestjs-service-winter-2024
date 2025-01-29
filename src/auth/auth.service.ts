import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { ErrorMessages } from 'src/common/constants/error-messages';
import * as bcrypt from 'bcrypt';
import { InfoMessages } from 'src/common/constants/info-messages';
import { RefreshDto } from './dto/refresh.dto';
import { JWT_ERROR_NAMES } from 'src/common/constants/common';

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

    const accessToken = await this.generateToken(user as User);

    return {
      message: InfoMessages.userHasBeenSuccessfullyCreated,
      id: user.id,
      ...accessToken,
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
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async refresh(refreshDto: RefreshDto) {
    try {
      const payload = await this.jwtService.verifyAsync(
        refreshDto.refreshToken,
        {
          secret: process.env.PRIVATE_KEY || 'secret',
        },
      );

      if (payload) {
        const { userId: id, login } = payload;

        const user = {
          id,
          login,
        };

        return this.generateToken(user as User);
      }
    } catch (error) {
      if (
        error.name === JWT_ERROR_NAMES.TOKEN_EXPIRED_ERROR ||
        error.name === JWT_ERROR_NAMES.JSON_WEB_TOKEN_ERROR
      ) {
        throw new ForbiddenException({
          message: ErrorMessages.tokenIsInvalidOrExpired,
        });
      }

      throw new Error();
    }
  }
}
