import SwaggerConstants from '@constants/swagger.constant';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty(SwaggerConstants.ROLE_VALUE)
  @IsString({ message: 'Должно быть строкой' })
  readonly value: string;

  @ApiProperty(SwaggerConstants.ROLE_DESCRIPTION)
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;
}
