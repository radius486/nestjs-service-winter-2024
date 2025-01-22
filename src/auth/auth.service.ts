import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginDto) {
    console.log(userDto);
  }

  async signup(userDto: SignupDto) {
    const { login, password } = userDto;

    return await this.usersService.createUser({ login, password });
  }
}
