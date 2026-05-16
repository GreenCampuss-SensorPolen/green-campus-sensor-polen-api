import { Node } from '../../node/entities/node.entity';
export declare class Reading {
    readingId: number;
    time: Date;
    node: Node;
    nodeId: number;
    value: number;
}
