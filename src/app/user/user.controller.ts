import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Roles } from '@decorators/role-auth.decorator';
import { RolesGuard } from '@guards/role.guard';
import { ValidationPipe } from '@pipes/validation.pipe';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UsersService } from './user.service';
import { TransformInterceptor } from '@interceptors/transform.interceptor';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseInterceptors(new TransformInterceptor(CreateUserDto))
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получение пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  // @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Получение пользователя по логину' })
  @ApiResponse({ status: 200, type: User })
  // @UseGuards(JwtAuthGuard)
  @Get('/:username')
  // @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  @ApiParam({
    name: 'username',
    description: 'Имя пользователя',
    example: 'Alex',
  })
  get(@Param('username') username: string) {
    return this.usersService.getUserByUsername(username);
  }

  @ApiOperation({ summary: 'Выдать роль' })
  @ApiResponse({ status: 200, type: AddRoleDto })
  @UsePipes(ValidationPipe)
  // @UseGuards(JwtAuthGuard)
  // @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  @Post('/role')
  @UseInterceptors(new TransformInterceptor(AddRoleDto))
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }
}
