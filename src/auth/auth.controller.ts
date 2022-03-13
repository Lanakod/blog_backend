import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ValidationPipe } from '@pipes/validation.pipe';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { AuthService } from './auth.service';

class Token {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFsZXgiLCJpZCI6Mywicm9sZXMiOlt7ImlkIjoxLCJ2YWx1ZSI6IlVTRVIiLCJkZXNjcmlwdGlvbiI6ItCf0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCIsImNyZWF0ZWRBdCI6IjIwMjItMDMtMTFUMDg6MzU6MTkuODg0WiIsInVwZGF0ZWRBdCI6IjIwMjItMDMtMTFUMDg6MzU6MTkuODg0WiJ9XSwiaWF0IjoxNjQ2OTg4Mjc3LCJleHAiOjE2NDcwNzQ2Nzd9.5Y6sAeNg05uuuF9Ztodq1TFlFpuvuXe5JqsRRBslRmk',
    description: 'Уникальный идентификатор',
  })
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
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Регистрация' })
  @ApiResponse({ status: 200, type: Token })
  @UsePipes(ValidationPipe)
  @Post('register')
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }
}
