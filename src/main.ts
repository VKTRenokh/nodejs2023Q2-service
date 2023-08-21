import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { components, paths, security } from 'doc/doc';
import { AppModule } from './app.module';
import { LoggerService } from './logger/services/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = new ConfigService().get('PORT') || 4000;
  app.enableCors();

  const logger = await app.resolve(LoggerService)

  app.useLogger(logger)

  process.on('uncaughtException', (reason) => {
    logger.log('uncaught exception')
    logger.error(reason)
  })

  process.on('unhandledRejection', (reason) => {
    logger.log('unhandled rejection')
    logger.error(reason)
  })

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  document.components = components;
  document.security = security;
  document.paths = paths;

  SwaggerModule.setup('docs', app, document);

  await app.listen(port);

  logger.log(`app starteds on port ${port}`)
}
bootstrap();
