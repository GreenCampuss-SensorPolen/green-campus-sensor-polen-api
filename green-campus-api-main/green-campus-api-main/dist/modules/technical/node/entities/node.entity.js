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
exports.Node = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const reading_entity_1 = require("../../reading/entities/reading.entity");
let Node = class Node {
    nodeId;
    time;
    name;
    type;
    status;
    battery;
    location;
    building;
    floor;
    readings;
    static _OPENAPI_METADATA_FACTORY() {
        return { nodeId: { required: true, type: () => Number }, time: { required: true, type: () => Date }, name: { required: true, type: () => String }, type: { required: true, type: () => String }, status: { required: true, type: () => String }, battery: { required: true, type: () => Number }, location: { required: true, type: () => String }, building: { required: true, type: () => String }, floor: { required: true, type: () => String }, readings: { required: true, type: () => [require("../../reading/entities/reading.entity").Reading] } };
    }
};
exports.Node = Node;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Node.prototype, "nodeId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' }),
    __metadata("design:type", Date)
], Node.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Node.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Node.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Node.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Node.prototype, "battery", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Node.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Node.prototype, "building", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Node.prototype, "floor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reading_entity_1.Reading, reading => reading.nodeId),
    __metadata("design:type", Array)
], Node.prototype, "readings", void 0);
exports.Node = Node = __decorate([
    (0, typeorm_1.Entity)()
], Node);
//# sourceMappingURL=node.entity.js.map