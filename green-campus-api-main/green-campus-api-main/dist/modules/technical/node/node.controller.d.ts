import { AnnualDto, CreateNodeDto, MonthlyDto, UpdateNodeDto } from './dto';
import { NodeService } from './node.service';
import { PaginationDto } from '../../pagination.dto';
export declare class NodeController {
    private readonly nodeService;
    constructor(nodeService: NodeService);
    getAllNodes(): Promise<import("./entities/node.entity").Node[]>;
    getMetadataForXNode(id: number): Promise<import("./entities/node.entity").Node | null>;
    getXReadingsForXNode(id: number, pagination: PaginationDto): Promise<{
        value: number;
        timestamp: string;
    }[]>;
    getMonthlyReadingsForXNode(identifier: number | string, monthly: MonthlyDto): Promise<{
        day: string;
        value: string;
    }[]>;
    getAnnualReadingsForXNode(identifier: number | string, annual: AnnualDto): Promise<{
        month: string;
        avg: number;
    }[]>;
    getMonthlyTimeForXNode(type: string, monthly: MonthlyDto): Promise<{
        day: string;
        value: number;
    }[]>;
    getAnnualTimeForXNode(type: string, annual: AnnualDto): Promise<{
        month: string;
        avg: number;
    }[]>;
    createNode(body: CreateNodeDto): Promise<import("./entities/node.entity").Node>;
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
