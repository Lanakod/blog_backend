import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Электронная почта' })
  readonly email: string;
  @ApiProperty({
    example: 'StrongPassw0rd!',
    description: 'Пароль пользователя',
  })
  readonly password: string;
}
