import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  SequelizeModuleAsyncOptions,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';
import { resolve } from 'path';

export class PostgresConfig {
  static getOrmConfig(configService: ConfigService): SequelizeModuleOptions {
    return {
      dialect: 'postgres',
      host: configService.get('PG_HOST'),
      port: Number(configService.get('PG_PORT')),
      username: configService.get('PG_USERNAME'),
      password: configService.get('PG_PASSWORD'),
      database: configService.get('PG_DATABASE'),
      models: [resolve(process.cwd() + '/src/app/**/*.model')],
      autoLoadModels: true,
      logging: false,
    };
  }
}

export const DbConfigAsync: SequelizeModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<SequelizeModuleOptions> =>
    PostgresConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
