import { PaginationDto } from 'src/modules/pagination.dto';
import { Repository } from 'typeorm';
import { CreateNodeDto, UpdateNodeDto } from './dto';
import { Node } from './entities/node.entity';
import { Reading } from '../reading/entities/reading.entity';
export declare class NodeService {
    private nodeRepository;
    private readingRepository;
    constructor(nodeRepository: Repository<Node>, readingRepository: Repository<Reading>);
    getAllNodes(): Promise<Node[]>;
    getMetadataForXNode(id: number): Promise<Node | null>;
    getXReadingsForXNode(id: number, pagination: PaginationDto): Promise<{
        value: number;
        timestamp: string;
    }[]>;
    getMonthlyReadingsForXNode(id: number, year: number, month: number): Promise<{
        day: string;
        value: string;
    }[]>;
    getAnnualReadingsForXNode(id: number, year: number): Promise<{
        month: string;
        avg: number;
    }[]>;
    getMonthlyReadingsForXType(type: string, year: number, month: number): Promise<{
        day: string;
        value: string;
    }[]>;
    getAnnualReadingsForXType(type: string, year: number): Promise<{
        month: string;
        avg: number;
    }[]>;
    getMonthlyTimeForXType(type: string, year: number, month: number): Promise<{
        day: string;
        value: number;
    }[]>;
    getAnnualTimeForXType(type: string, year: number): Promise<{
        month: string;
        avg: number;
    }[]>;
    createNode(body: CreateNodeDto): Promise<Node>;
    updateNode(id: number, body: UpdateNodeDto): Promise<{
        nodeId: number;
        time: Date;
        name: string;
        type: string;
        status: string;
        battery: number;
        location: string;
        building: string;
        floor: string;
    }>;
    deleteNode(id: number): Promise<{
        deletedId: number;
    }>;
}
