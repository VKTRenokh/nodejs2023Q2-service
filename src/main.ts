import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { components, paths, security } from 'doc/docs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  document.components = components;
  document.security = security;
  document.paths = paths;

  SwaggerModule.setup('doc', app, document);

  await app.listen(4000);
}
bootstrap();
