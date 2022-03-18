import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CreatePostDto } from '@app/post/dto/create-post.dto';
import { CreateRoleDto } from '@app/role/dto/create-role.dto';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { AddRoleDto } from '@app/user/dto/add-role.dto';

@Injectable()
export class TransformPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return object;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [
      CreatePostDto,
      CreateRoleDto,
      CreateUserDto,
      AddRoleDto,
      Boolean,
      Number,
      Array,
      Object,
    ];
    return types.includes(metatype);
  }
}
