import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'ADMIN',
    description: 'Ключ роли',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly value: string;

  @ApiProperty({
    example: 'Администратор',
    description: 'Название роли',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;
}
