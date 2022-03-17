import { Module } from '@nestjs/common';
import { FilesModule } from './files/files.module';
import { StaticModule } from './static/static.module';

@Module({
  imports: [FilesModule, StaticModule],
  exports: [FilesModule, StaticModule],
})
export class UtilsModule {}
