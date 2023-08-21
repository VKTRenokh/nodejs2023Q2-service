import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Global()
@Module({
  exports: [DatabaseService],
  providers: [DatabaseService, /* ConfigService */],
})
export class SharedModule { }
