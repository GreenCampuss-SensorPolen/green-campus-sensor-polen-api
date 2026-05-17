import { HttpService } from '@nestjs/axios';
export declare class PredictionController {
    private readonly httpService;
    constructor(httpService: HttpService);
    getWeeklyPrediction(): Promise<any>;
}
