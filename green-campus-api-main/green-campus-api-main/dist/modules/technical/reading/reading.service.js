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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reading_entity_1 = require("./entities/reading.entity");
const node_entity_1 = require("../node/entities/node.entity");
let ReadingService = class ReadingService {
    readingRepository;
    nodeRepository;
    constructor(readingRepository, nodeRepository) {
        this.readingRepository = readingRepository;
        this.nodeRepository = nodeRepository;
    }
    async getAllReadings() {
        return await this.readingRepository.find();
    }
    async createReading(body) {
        const node = await this.nodeRepository.findOne({ where: { nodeId: body.nodeId } });
        if (!node)
            throw new common_1.NotFoundException('Node not found');
        const reading = this.readingRepository.create({
            node: node,
            nodeId: body.nodeId,
            time: body.time,
            value: body.value,
        });
        return await this.readingRepository.save(reading);
    }
};
exports.ReadingService = ReadingService;
exports.ReadingService = ReadingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reading_entity_1.Reading)),
    __param(1, (0, typeorm_1.InjectRepository)(node_entity_1.Node)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ReadingService);
//# sourceMappingURL=reading.service.js.map