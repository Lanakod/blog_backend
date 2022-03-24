import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '@utils/files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.model';
import { DeletePostDto } from '@app/post/dto/delete-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private filesService: FilesService,
  ) {}

  create = async (dto: CreatePostDto, image: Express.Multer.File) => {
    const fileName = await this.filesService.createFile(image, 'posts');
    return await this.postRepository.create({ ...dto, image: fileName });
  };

  delete = async (dto: DeletePostDto) => {
    const post = await this.postRepository.findOne({
      where: { title: dto.title },
    });
    if (post) {
      await post.destroy();
      await this.filesService.removeFile(post.image, 'posts');
      return post;
    }
    throw new HttpException('Пост не найден', HttpStatus.NOT_FOUND);
  };

  get = async () => {
    return await this.postRepository.findAll({
      include: {
        all: true,
      },
    });
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
