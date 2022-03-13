import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '@pipes/validation.pipe';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './post.service';

@ApiTags('Посты')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @ApiOperation({ summary: 'Создание поста' })
  @ApiResponse({ status: 200, type: Post })
  @UsePipes(ValidationPipe)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(
    @Body() dto: CreatePostDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.postService.create(dto, image);
  }
}
