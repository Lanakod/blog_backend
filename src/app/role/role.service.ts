import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
  createRole = async (dto: CreateRoleDto) => {
    const role = await this.roleRepository.create(dto);
    return role;
  };

  getRoleByValue = async (value: string) => {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  };
}
