import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Reading } from './entities/reading.entity';
import { ReadingController } from './reading.controller';
import { ReadingService } from './reading.service';
import { Node } from '../node/entities/node.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reading]), TypeOrmModule.forFeature([Node])],
  controllers: [ReadingController],
  providers: [ReadingService],
})
export class ReadingModule {}
