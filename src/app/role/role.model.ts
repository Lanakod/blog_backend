import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '@app/user/user.model';
import { UserRoles } from './user-roles.model';
import SwaggerConstants from '@constants/swagger.constant';
import { Exclude, Expose } from 'class-transformer';

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
@Exclude()
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty(SwaggerConstants.ROLE_ID)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty(SwaggerConstants.ROLE_VALUE)
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  @Expose()
  value: string;

  @ApiProperty(SwaggerConstants.ROLE_DESCRIPTION)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @Expose()
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
