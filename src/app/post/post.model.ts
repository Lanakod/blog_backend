import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '@app/user/user.model';
import SwaggerConstants from '@constants/swagger.constant';
import { Exclude, Expose } from 'class-transformer';

interface PostCreationAttrs {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table({ tableName: 'posts' })
@Exclude()
export class Post extends Model<Post, PostCreationAttrs> {
  @ApiProperty(SwaggerConstants.POST_ID)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty(SwaggerConstants.POST_TITLE)
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  @Expose()
  title: string;

  @ApiProperty(SwaggerConstants.POST_CONTENT)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @Expose()
  content: string;

  @ApiProperty(SwaggerConstants.POST_IMAGE)
  @Column({ type: DataType.STRING })
  @Expose()
  image: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  @Expose()
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
