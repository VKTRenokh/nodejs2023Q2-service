import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { components, paths, security } from 'doc/docs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = new ConfigService().get('PORT') || 4000;
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

  await app.listen(port);
}
bootstrap();

console.log('bootstrap console log hot reload test');
