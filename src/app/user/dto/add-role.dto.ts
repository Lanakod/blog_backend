import SwaggerConstants from '@constants/swagger.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty(SwaggerConstants.ROLE_VALUE)
  @IsString({ message: 'Должно быть строкой' })
  readonly value: string;

  @ApiProperty(SwaggerConstants.USER_ID)
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly userId: number;
}
