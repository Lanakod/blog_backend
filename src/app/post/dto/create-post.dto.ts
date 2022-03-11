import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'Почему земля круглая?',
    description: 'Заголовок поста',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;

  @ApiProperty({
    example: 'Текст, который будет внутри поста',
    description: 'Описание поста',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly content: string;

  @ApiProperty({
    example: 5,
    description: 'ID пользователя',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly userId: number;
}
