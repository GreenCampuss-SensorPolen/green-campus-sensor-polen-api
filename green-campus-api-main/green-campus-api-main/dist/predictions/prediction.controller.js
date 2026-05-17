"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictionController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let PredictionController = class PredictionController {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getWeeklyPrediction() {
        console.log('🤖 Petición recibida en NestJS. Llamando a Python...');
        try {
            const url = 'http://127.0.0.1:8000/predict/co2/week';
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url));
            console.log('✅ Python respondió correctamente.');
            return response.data;
        }
        catch (error) {
            console.error('❌ Error llamando a Python:', error);
            throw new common_1.HttpException('Error de comunicación con el motor IA', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.PredictionController = PredictionController;
__decorate([
    (0, common_1.Get)('week'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PredictionController.prototype, "getWeeklyPrediction", null);
exports.PredictionController = PredictionController = __decorate([
    (0, common_1.Controller)('predictions'),
    __metadata("design:paramtypes", [axios_1.HttpService])
], PredictionController);
//# sourceMappingURL=prediction.controller.js.map