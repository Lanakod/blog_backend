import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '@pipes/validation.pipe';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './post.service';
import { Post as PostModel } from './post.model';
// import { TransformInterceptor } from '@interceptors/transform.interceptor';

@ApiTags('Посты')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @ApiOperation({ summary: 'Создание поста' })
  @ApiResponse({ status: 200, type: PostModel })
  @UsePipes(ValidationPipe)
  @Post()
  @UseInterceptors(
    // new TransformInterceptor(CreatePostDto),
    FileInterceptor('image'),
  )
  createPost(
    @Body() dto: CreatePostDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.postService.create(dto, image);
  }

  @ApiOperation({ summary: 'Получить все посты' })
  @ApiResponse({ status: 200, type: [PostModel] })
  @HttpCode(200)
  @Get()
  get() {
    return this.postService.get();
  }

  @ApiOperation({ summary: 'Получить пост по ID' })
  @ApiResponse({ status: 200, type: PostModel })
  @ApiParam({ name: 'id', description: 'ID поста', example: 1 })
  @HttpCode(200)
  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.postService.getById(id);
  }
}
