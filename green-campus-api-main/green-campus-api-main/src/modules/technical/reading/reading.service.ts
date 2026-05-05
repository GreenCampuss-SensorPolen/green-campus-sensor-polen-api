import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateReadingDto } from './dto';
import { Reading } from './entities/reading.entity';
import { Node } from '../node/entities/node.entity';

@Injectable()
export class ReadingService {
  constructor(
    @InjectRepository(Reading) private readingRepository: Repository<Reading>,
    @InjectRepository(Node) private nodeRepository: Repository<Node>,
  ) {}

  async getAllReadings() {
    return await this.readingRepository.find();
  }

  async createReading(body: CreateReadingDto) {
    // Get the ndoe from the id
    const node: Node | null = await this.nodeRepository.findOne({ where: { nodeId: body.nodeId } });
    if(!node) throw new NotFoundException('Node not found');
    // Create and store the notification
    const reading: Reading = this.readingRepository.create({
      node: node,
      nodeId: body.nodeId,
      time: body.time,
      value: body.value,
    });
    return await this.readingRepository.save(reading);
  }
}
