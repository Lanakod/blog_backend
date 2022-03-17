import SwaggerConstants from '@constants/swagger.constant';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class AddRoleDto {
  @ApiProperty(SwaggerConstants.ROLE_VALUE)
  @IsString({ message: 'Должно быть строкой' })
  @Expose()
  readonly value: string;

  @ApiProperty(SwaggerConstants.USER_ID)
  @IsNumber({}, { message: 'Должно быть числом' })
  @Expose()
  readonly userId: number;
}
