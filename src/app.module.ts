import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), CoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
