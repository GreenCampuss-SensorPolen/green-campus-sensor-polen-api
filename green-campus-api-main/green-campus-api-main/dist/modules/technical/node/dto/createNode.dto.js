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
exports.CreateNodeDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateNodeDto {
    time;
    name;
    type;
    status;
    battery;
    location;
    building;
    floor;
    static _OPENAPI_METADATA_FACTORY() {
        return { time: { required: false, type: () => Date }, name: { required: true, type: () => String, maxLength: 50 }, type: { required: true, type: () => String, maxLength: 50 }, status: { required: true, type: () => String, enum: ['ONLINE', 'SENSOR', 'OFFLINE', 'STANDBY'] }, battery: { required: false, type: () => Number, minimum: 0, maximum: 100 }, location: { required: true, type: () => String, maxLength: 50 }, building: { required: true, type: () => String, maxLength: 50 }, floor: { required: true, type: () => String, maxLength: 50 } };
    }
}
exports.CreateNodeDto = CreateNodeDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateNodeDto.prototype, "time", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    (0, swagger_1.ApiProperty)({ example: 'sensorX' }),
    __metadata("design:type", String)
], CreateNodeDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    (0, swagger_1.ApiProperty)({ example: 'this is a sensor' }),
    __metadata("design:type", String)
], CreateNodeDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['ONLINE', 'SENSOR', 'OFFLINE', 'STANDBY'], { message: 'Status must be one of the following: ONLINE, OFFLINE or STANDBY' }),
    (0, swagger_1.ApiProperty)({ example: 'ONLINE' }),
    __metadata("design:type", String)
], CreateNodeDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    (0, swagger_1.ApiProperty)({ example: '100' }),
    __metadata("design:type", Number)
], CreateNodeDto.prototype, "battery", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    (0, swagger_1.ApiProperty)({ example: 'class x' }),
    __metadata("design:type", String)
], CreateNodeDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    (0, swagger_1.ApiProperty)({ example: 'building x' }),
    __metadata("design:type", String)
], CreateNodeDto.prototype, "building", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    (0, swagger_1.ApiProperty)({ example: 'floor x' }),
    __metadata("design:type", String)
], CreateNodeDto.prototype, "floor", void 0);
//# sourceMappingURL=createNode.dto.js.map