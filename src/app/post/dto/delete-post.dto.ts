import SwaggerConstants from '@constants/swagger.constant';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { /*IsNumber,*/ IsString } from 'class-validator';

@Exclude()
export class DeletePostDto {
  @ApiProperty(SwaggerConstants.POST_TITLE)
  @IsString({ message: 'Должно быть строкой' })
  @Expose()
  readonly title: string;
}
