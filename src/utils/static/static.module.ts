import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(process.cwd(), 'static', 'images', 'avatars'),
      serveRoot: '/static/avatars',
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(process.cwd(), 'static', 'images', 'posts'),
      serveRoot: '/static/posts',
    }),
  ],
})
export class StaticModule {}
