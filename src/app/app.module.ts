import { Module } from '@nestjs/common';
import { PostsModule } from './post/post.module';
import { RolesModule } from './role/role.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [PostsModule, RolesModule, UsersModule],
  exports: [PostsModule, RolesModule, UsersModule],
})
export class ApplicationModule {}
