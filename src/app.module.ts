import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { UtilsModule } from './utils/utils.module';
import { ApplicationModule } from './app/app.module';
import { DatabaseModule } from './common/database/database.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    ApplicationModule,
    AuthModule,
    UtilsModule,
    DatabaseModule,
  ],
})
export class AppModule {}
