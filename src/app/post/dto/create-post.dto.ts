import SwaggerConstants from '@constants/swagger.constant';
import { ApiProperty } from '@nestjs/swagger';
import { /*IsNumber,*/ IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty(SwaggerConstants.POST_TITLE)
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;

  @ApiProperty(SwaggerConstants.POST_CONTENT)
  @IsString({ message: 'Должно быть строкой' })
  readonly content: string;

  @ApiProperty(SwaggerConstants.USER_ID)
  // @IsNumber({}, { message: 'Должно быть числом' })
  readonly userId: number;
}
