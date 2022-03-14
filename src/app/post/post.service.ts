import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '@utils/files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private filesService: FilesService,
  ) {}

  create = async (dto: CreatePostDto, image: Express.Multer.File) => {
    const fileName = await this.filesService.createFile(image);
    const post = await this.postRepository.create({ ...dto, image: fileName });
    return post;
  };

  get = async () => {
    const posts = await this.postRepository.findAll({
      include: {
        all: true,
      },
    });
    return posts;
  };

  getById = async (id: number) => {
    const post = await this.postRepository.findOne({
      where: {
        id,
      },
      include: {
        all: true,
      },
    });
    if (post) return post;
    throw new HttpException('Пост не найден', HttpStatus.NOT_FOUND);
  };
}
