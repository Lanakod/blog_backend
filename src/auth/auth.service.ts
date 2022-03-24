import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash as bcryptHash, compare as bcryptCompare } from 'bcryptjs';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { UsersService } from '@app/user/user.service';
import { User } from '@app/user/user.model';
import { TwoFactorService } from '@auth/services/two-factor.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private twoFactorService: TwoFactorService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async register(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByUsername(
      userDto.username,
    );
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким логином уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcryptHash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { username: user.username, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByUsername(userDto.username);
    if (!user) {
      throw new UnauthorizedException({ message: 'Неверный логин или пароль' });
    }
    const passwordEquals = await bcryptCompare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Неверный логин или пароль' });
  }
}
