import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { LoggerService } from 'src/logger/services/logger/logger.service';
import { UsersController } from './users/users.controller';

@Module({
  imports: [LoggerModule],
  providers: [LoggerService],
  controllers: [UsersController],
})
export class UsersModule { }
