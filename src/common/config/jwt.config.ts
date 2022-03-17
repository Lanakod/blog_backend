import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';

export class JwtConfig {
  static getJwtConfig(configService: ConfigService): JwtModuleOptions {
    return {
      secret: configService.get('PRIVATE_KEY'),
      signOptions: {
        expiresIn: '24h',
      },
    };
  }
}

export const JwtConfigAsync: JwtModuleAsyncOptions = {
  useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> =>
    JwtConfig.getJwtConfig(configService),
  inject: [ConfigService],
};
