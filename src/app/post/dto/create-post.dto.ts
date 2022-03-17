import SwaggerConstants from '@constants/swagger.constant';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { /*IsNumber,*/ IsString } from 'class-validator';

@Exclude()
export class CreatePostDto {
  @ApiProperty(SwaggerConstants.POST_TITLE)
  @IsString({ message: 'Должно быть строкой' })
  @Expose()
  readonly title: string;

  @ApiProperty(SwaggerConstants.POST_CONTENT)
  @IsString({ message: 'Должно быть строкой' })
  @Expose()
  readonly content: string;

  @ApiProperty(SwaggerConstants.USER_ID)
  @Expose()
  // @IsNumber({}, { message: 'Должно быть числом' })
  readonly userId: number;
}
