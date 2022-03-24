import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from '@app/role/role.service';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  createUser = async (dto: CreateUserDto) => {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    if (!role) {
      throw new HttpException(
        'Стандартная роль не была найдена',
        HttpStatus.NOT_FOUND,
      );
    }
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  };
  getAllUsers = async () => {
    return await this.userRepository.findAll({ include: { all: true } });
  };
  getUserByUsername = async (username: string) => {
    const user = await this.userRepository.findOne({
      where: { username },
      include: { all: true },
    });
    if (user) {
      return user;
    }
    // throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  };
  addRole = async (dto: AddRoleDto) => {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add('roles', role.id);
      return dto;
    }
    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  };
  saveSecret = async (secret: string, user: User) => {
    user.twoFactor = secret;
    await user.save();
  };
}
