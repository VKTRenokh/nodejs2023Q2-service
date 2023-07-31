import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Global()
@Module({
  imports: [DatabaseService],
  exports: [DatabaseService],
  providers: [DatabaseService],
})
export class SharedModule {}
