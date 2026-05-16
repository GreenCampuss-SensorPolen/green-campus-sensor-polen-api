import { CreateReadingDto } from './dto';
import { ReadingService } from './reading.service';
export declare class ReadingController {
    private readonly readingService;
    constructor(readingService: ReadingService);
    getAllReadings(): Promise<import("./entities/reading.entity").Reading[]>;
    createReading(body: CreateReadingDto): Promise<import("./entities/reading.entity").Reading>;
}
