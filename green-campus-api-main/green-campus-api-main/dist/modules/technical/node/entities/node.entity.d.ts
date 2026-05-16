import { Reading } from '../../reading/entities/reading.entity';
export declare class Node {
    nodeId: number;
    time: Date;
    name: string;
    type: string;
    status: string;
    battery: number;
    location: string;
    building: string;
    floor: string;
    readings: Reading[];
}
