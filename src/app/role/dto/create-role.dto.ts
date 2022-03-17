import SwaggerConstants from '@constants/swagger.constant';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class CreateRoleDto {
  @ApiProperty(SwaggerConstants.ROLE_VALUE)
  @IsString({ message: 'Должно быть строкой' })
  @Expose()
  readonly value: string;

  @ApiProperty(SwaggerConstants.ROLE_DESCRIPTION)
  @IsString({ message: 'Должно быть строкой' })
  @Expose()
  readonly description: string;
}
