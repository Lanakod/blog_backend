import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
  createRole = async (dto: CreateRoleDto) => {
    return await this.roleRepository.create(dto);
  };

  getRoleByValue = async (value: string) => {
    const role = await this.roleRepository.findOne({ where: { value } });
    if (role) return role;
    throw new HttpException('Роль не найдена', HttpStatus.NOT_FOUND);
  };
}
