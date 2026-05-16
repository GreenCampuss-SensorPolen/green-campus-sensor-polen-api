import { DiscoveryService, MetadataScanner } from '@nestjs/core';
import { RouteDefinition } from './constants/types/routeDefinition.type';
export declare class AppService {
    private readonly discoveryService;
    private readonly metadataScanner;
    constructor(discoveryService: DiscoveryService, metadataScanner: MetadataScanner);
    getAllRoutes(): RouteDefinition[];
}
