import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'StrongPassw0rd!',
    description: 'Пароль пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16 символов' })
  readonly password: string;

  @ApiProperty({
    example: 'Alex',
    description: 'Имя пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16 символов' })
  readonly username: string;
}
