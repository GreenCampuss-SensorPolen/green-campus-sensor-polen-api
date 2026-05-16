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
exports.Reading = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const node_entity_1 = require("../../node/entities/node.entity");
let Reading = class Reading {
    readingId;
    time;
    node;
    nodeId;
    value;
    static _OPENAPI_METADATA_FACTORY() {
        return { readingId: { required: true, type: () => Number }, time: { required: true, type: () => Date }, node: { required: true, type: () => require("../../node/entities/node.entity").Node }, nodeId: { required: true, type: () => Number }, value: { required: true, type: () => Number } };
    }
};
exports.Reading = Reading;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Reading.prototype, "readingId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' }),
    __metadata("design:type", Date)
], Reading.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => node_entity_1.Node, node => node.readings, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'nodeId' }),
    __metadata("design:type", node_entity_1.Node)
], Reading.prototype, "node", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Reading.prototype, "nodeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: false }),
    __metadata("design:type", Number)
], Reading.prototype, "value", void 0);
exports.Reading = Reading = __decorate([
    (0, typeorm_1.Entity)()
], Reading);
//# sourceMappingURL=reading.entity.js.map