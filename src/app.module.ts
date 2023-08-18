import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), CoreModule, LoggerModule, AuthModule,],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule { }
