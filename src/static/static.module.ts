import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(process.cwd(), 'src', 'static', 'images'),
      serveRoot: '/static',
    }),
  ],
})
export class StaticModule {}
