import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from '@utils/files/files.module';
import { User } from '@app/user/user.model';
import { PostsController } from './post.controller';
import { Post } from './post.model';
import { PostsService } from './post.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [SequelizeModule.forFeature([User, Post]), FilesModule],
})
export class PostsModule {}
