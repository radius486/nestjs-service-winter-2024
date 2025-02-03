import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePasswordDto } from './dto/update-password-dto';
import { UserService } from './user.service';
import { userExample } from 'src/common/examples/open-api-examples';
import { UUIDParam } from 'src/common/helpers/decorators';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, example: [userExample] })
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'id', example: 'b2a93819-d28c-465c-9402-a612fec77f85' })
  @ApiResponse({ status: HttpStatus.OK, example: userExample })
  @Get(':id')
  getUserById(@UUIDParam('id') id: string) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: HttpStatus.CREATED, example: userExample })
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: "Update user's password by id" })
  @ApiParam({ name: 'id', example: 'b2a93819-d28c-465c-9402-a612fec77f85' })
  @ApiResponse({ status: HttpStatus.OK, example: userExample })
  @Put(':id')
  updateUserPassword(
    @Body() passwordDto: UpdatePasswordDto,
    @UUIDParam('id') id: string,
  ) {
    return this.userService.updateUserPassword(id, passwordDto);
  }

  @ApiOperation({ summary: 'Remove existing user by id' })
  @ApiParam({ name: 'id', example: 'b2a93819-d28c-465c-9402-a612fec77f85' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUserById(@UUIDParam('id') id: string) {
    return this.userService.deleteUserById(id);
  }
}
