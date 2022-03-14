import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ValidationPipe } from '@pipes/validation.pipe';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import SwaggerConstants from '@constants/swagger.constant';

class Token {
  @ApiProperty(SwaggerConstants.TOKEN)
  readonly token: string;
}

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Авторизация' })
  @ApiResponse({ status: 200, type: Token })
  @UsePipes(ValidationPipe)
  @Post('/login')
  @HttpCode(200)
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Регистрация' })
  @ApiResponse({ status: 200, type: Token })
  @UsePipes(ValidationPipe)
  @Post('/register')
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }
}
