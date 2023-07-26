import { Module } from '@nestjs/common';
import { QueryModule } from './query/query.module';

@Module({
  imports: [QueryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
