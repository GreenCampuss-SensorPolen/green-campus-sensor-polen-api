import { Repository } from 'typeorm';
import { CreateReadingDto } from './dto';
import { Reading } from './entities/reading.entity';
import { Node } from '../node/entities/node.entity';
export declare class ReadingService {
    private readingRepository;
    private nodeRepository;
    constructor(readingRepository: Repository<Reading>, nodeRepository: Repository<Node>);
    getAllReadings(): Promise<Reading[]>;
    createReading(body: CreateReadingDto): Promise<Reading>;
}
