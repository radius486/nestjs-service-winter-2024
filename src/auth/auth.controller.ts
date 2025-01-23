import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  login(@Body() userDto: LoginDto) {
    return this.authService.login(userDto);
  }

  @Public()
  @Post('/signup')
  registration(@Body() userDto: SignupDto) {
    return this.authService.signup(userDto);
  }
}
