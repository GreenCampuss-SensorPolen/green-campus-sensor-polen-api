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
exports.NodeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const node_entity_1 = require("./entities/node.entity");
const reading_entity_1 = require("../reading/entities/reading.entity");
let NodeService = class NodeService {
    nodeRepository;
    readingRepository;
    constructor(nodeRepository, readingRepository) {
        this.nodeRepository = nodeRepository;
        this.readingRepository = readingRepository;
    }
    async getAllNodes() {
        return await this.nodeRepository.find();
    }
    async getMetadataForXNode(id) {
        return await this.nodeRepository.findOneBy({ nodeId: id });
    }
    async getXReadingsForXNode(id, pagination) {
        const readings = await this.readingRepository.find({
            where: { nodeId: id },
            order: { time: 'DESC' },
            take: pagination.take,
            skip: pagination.skip,
        });
        return readings.map(reading => ({
            value: Number(reading.value),
            timestamp: reading.time.toISOString(),
        }));
    }
    async getMonthlyReadingsForXNode(id, year, month) {
        const rawData = await this.readingRepository.createQueryBuilder('reading')
            .select('EXTRACT(DAY FROM reading.time)', 'day')
            .addSelect('AVG(reading.value)', 'value')
            .where('reading.nodeId = :id', { id })
            .andWhere('EXTRACT(YEAR FROM reading.time) = :year', { year })
            .andWhere('EXTRACT(MONTH FROM reading.time) = :month', { month })
            .groupBy('EXTRACT(DAY FROM reading.time)')
            .orderBy('day', 'ASC')
            .getRawMany();
        return rawData.map((row) => ({
            day: row.day,
            value: Number(row.value).toFixed(2),
        }));
    }
    async getAnnualReadingsForXNode(id, year) {
        const rawData = await this.readingRepository.createQueryBuilder('reading')
            .select('EXTRACT(MONTH FROM reading.time)', 'monthNum')
            .addSelect('AVG(reading.value)', 'avg')
            .where('reading.nodeId = :id', { id })
            .andWhere('EXTRACT(YEAR FROM reading.time) = :year', { year })
            .groupBy('EXTRACT(MONTH FROM reading.time)')
            .getRawMany();
        const month = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const result = month.map(month => ({ month: month, avg: 0 }));
        rawData.forEach((row) => {
            result[parseInt(row.monthNum) - 1].avg = parseFloat(Number(row.avg).toFixed(2));
        });
        return result;
    }
    async getMonthlyReadingsForXType(type, year, month) {
        const rawData = await this.readingRepository.createQueryBuilder('reading')
            .innerJoin('reading.node', 'node')
            .select('EXTRACT(DAY FROM reading.time)', 'day')
            .addSelect('AVG(reading.value)', 'value')
            .where('node.type = :type', { type })
            .andWhere('EXTRACT(YEAR FROM reading.time) = :year', { year })
            .andWhere('EXTRACT(MONTH FROM reading.time) = :month', { month })
            .groupBy('EXTRACT(DAY FROM reading.time)')
            .orderBy('day', 'ASC')
            .getRawMany();
        return rawData.map((row) => ({
            day: row.day,
            value: Number(row.value).toFixed(2),
        }));
    }
    async getAnnualReadingsForXType(type, year) {
        const rawData = await this.readingRepository.createQueryBuilder('reading')
            .innerJoin('reading.node', 'node')
            .select('EXTRACT(MONTH FROM reading.time)', 'monthNum')
            .addSelect('AVG(reading.value)', 'avg')
            .where('node.type = :type', { type })
            .andWhere('EXTRACT(YEAR FROM reading.time) = :year', { year })
            .groupBy('EXTRACT(MONTH FROM reading.time)')
            .getRawMany();
        const month = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const result = month.map(month => ({ month: month, avg: 0 }));
        rawData.forEach((row) => {
            result[parseInt(row.monthNum) - 1].avg = parseFloat(Number(row.avg).toFixed(2));
        });
        return result;
    }
    async getMonthlyTimeForXType(type, year, month) {
        const rawData = await this.readingRepository.createQueryBuilder('reading')
            .innerJoin('reading.node', 'node')
            .select('EXTRACT(DAY FROM reading.time)', 'day')
            .addSelect('AVG(reading.value)', 'value')
            .where('node.type = :type', { type })
            .andWhere('EXTRACT(YEAR FROM reading.time) = :year', { year })
            .andWhere('EXTRACT(MONTH FROM reading.time) = :month', { month })
            .groupBy('EXTRACT(DAY FROM reading.time)')
            .orderBy('day', 'ASC')
            .getRawMany();
        return rawData.map((row) => ({
            day: row.day,
            value: 100,
        }));
    }
    async getAnnualTimeForXType(type, year) {
        const rawData = await this.readingRepository.createQueryBuilder('reading')
            .innerJoin('reading.node', 'node')
            .select('EXTRACT(MONTH FROM reading.time)', 'monthNum')
            .addSelect('AVG(reading.value)', 'avg')
            .where('node.type = :type', { type })
            .andWhere('EXTRACT(YEAR FROM reading.time) = :year', { year })
            .groupBy('EXTRACT(MONTH FROM reading.time)')
            .orderBy('monthNum', 'ASC')
            .getRawMany();
        const month = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const result = month.map(month => ({ month: month, avg: 0 }));
        rawData.forEach((row) => {
            result[parseInt(row.monthNum) - 1].avg = 100;
        });
        return result;
    }
    async createNode(body) {
        const node = this.nodeRepository.create({
            time: body.time,
            name: body.name,
            type: body.type,
            status: body.status,
            battery: body.battery,
            location: body.location,
            building: body.building,
            floor: body.floor,
        });
        return await this.nodeRepository.save(node);
    }
    async updateNode(id, body) {
        await this.nodeRepository.update(id, body);
        const updatedNode = await this.nodeRepository.findOneBy({ nodeId: id });
        if (!updatedNode)
            throw new common_1.NotFoundException('Node not found');
        return {
            nodeId: updatedNode.nodeId,
            time: updatedNode.time,
            name: updatedNode.name,
            type: updatedNode.type,
            status: updatedNode.status,
            battery: updatedNode.battery,
            location: updatedNode.location,
            building: updatedNode.building,
            floor: updatedNode.floor,
        };
    }
    async deleteNode(id) {
        const node = await this.nodeRepository.findOneBy({ nodeId: id });
        if (!node)
            throw new common_1.NotFoundException('Node not found');
        else {
            await this.nodeRepository.remove(node);
            return { deletedId: id };
        }
    }
};
exports.NodeService = NodeService;
exports.NodeService = NodeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(node_entity_1.Node)),
    __param(1, (0, typeorm_1.InjectRepository)(reading_entity_1.Reading)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], NodeService);
//# sourceMappingURL=node.service.js.map