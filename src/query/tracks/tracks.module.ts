import { Module } from '@nestjs/common';
import { TracksController } from './tracks/tracks.controller';

@Module({
  controllers: [TracksController],
})
export class TracksModule {}
