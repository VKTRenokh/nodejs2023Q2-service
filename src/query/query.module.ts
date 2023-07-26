import { Module } from '@nestjs/common';
import { QueryController } from './query.controller';
import { DatabaseService } from './database/database.service';
import { UsersController } from './users/users.controller';

@Module({
  controllers: [QueryController, UsersController],
  providers: [DatabaseService],
})
export class QueryModule {}
