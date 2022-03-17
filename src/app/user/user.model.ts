import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Post } from '@app/post/post.model';
import { Role } from '@app/role/role.model';
import { UserRoles } from '@app/role/user-roles.model';
import SwaggerConstants from '@constants/swagger.constant';
import { Exclude, Expose } from 'class-transformer';

interface UserCreationAttrs {
  password: string;
  username: string;
}

@Table({ tableName: 'users' })
@Exclude()
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty(SwaggerConstants.USER_ID)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty(SwaggerConstants.USERNAME)
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  @Expose()
  username: string;

  @ApiProperty(SwaggerConstants.PASSWORD)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @BelongsToMany(() => Role, () => UserRoles)
  @Expose()
  roles: Role[];

  @ApiProperty({ example: 'TEST', description: 'DESC' })
  @HasMany(() => Post)
  @Expose()
  posts: Post[];
}
