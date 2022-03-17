import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@auth/auth.module';
import { UtilsModule } from '@utils/utils.module';
import { ApplicationModule } from '@app/app.module';
import { DatabaseModule } from '@database/database.module';
import { StaticModule } from '@static/static.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    ApplicationModule,
    AuthModule,
    UtilsModule,
    DatabaseModule,
    StaticModule,
  ],
})
export class AppModule {}
