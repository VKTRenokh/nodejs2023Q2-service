import { Module } from '@nestjs/common';
import { FavsController } from './favs/favs.controller';

@Module({
  controllers: [FavsController],
})
export class FavsModule {}
