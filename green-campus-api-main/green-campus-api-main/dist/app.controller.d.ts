import { AppService } from './app.service';
import { RouteDefinition } from './constants/types/routeDefinition.type';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getAllRoutes(): RouteDefinition[];
}
