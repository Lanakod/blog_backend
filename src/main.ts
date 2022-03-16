import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { address as MyIP } from 'ip';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { green, yellow } from 'colors';

const bootstrap = async () => {
  const PORT = process.env.PORT || 4040;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Blog Backend')
    .setDescription('Документация по REST API')
    .setVersion('0.2.2')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () =>
    console.log(
      `\n🟢 ${green('Server started on')}\n📢 PUBLIC IPV4 - "${yellow(
        `http://${MyIP('public', 'ipv4')}:${PORT}`,
      )}"\n📢 PUBLIC IPV6 - "${yellow(
        `http://${MyIP('public', 'ipv6')}:${PORT}`,
      )}"\n\n🔒 PRIVATE IPV4 - "${yellow(
        `http://${MyIP('private', 'ipv4')}:${PORT}`,
      )}"\n🔒 PRIVATE IPV6 - "${yellow(
        `http://${MyIP('private', 'ipv6')}:${PORT}`,
      )}"`,
    ),
  );
};
bootstrap();
