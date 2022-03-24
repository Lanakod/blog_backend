import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { address as MyIP } from 'ip';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { green, yellow } from 'colors';
import { IpType, IpVersion } from '@mytypes/get-ip';
import { TransformPipe } from '@pipes/transform.pipe';
import { LoggerInterceptor } from '@interceptors/logger.interceptor';

const bootstrap = async () => {
  const PORT = process.env.PORT || 4040;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new TransformPipe());
  app.useGlobalInterceptors(new LoggerInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Blog Backend')
    .setDescription('Документация по REST API')
    .setVersion('0.2.5')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => {
    const GetIP = (type: IpType, version: IpVersion) =>
      yellow(`http://${MyIP(type, version)}:${PORT}`);
    console.log(
      `\n🟢 ${green('Server started')}`,
      `\n📢 PUBLIC IPV4 - "${GetIP('public', 'ipv4')}"`,
      `\n📢 PUBLIC IPV6 - "${GetIP('public', 'ipv6')}"`,
      `\n\n🔒 PRIVATE IPV4 - "${GetIP('private', 'ipv4')}"`,
      `\n🔒 PRIVATE IPV6 - "${GetIP('private', 'ipv6')}"`,
    );
  });
};
bootstrap();
