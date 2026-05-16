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
exports.CreateReadingDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateReadingDto {
    time;
    nodeId;
    value;
    static _OPENAPI_METADATA_FACTORY() {
        return { time: { required: false, type: () => Date }, nodeId: { required: true, type: () => Number, minimum: 1 }, value: { required: true, type: () => Number } };
    }
}
exports.CreateReadingDto = CreateReadingDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateReadingDto.prototype, "time", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], CreateReadingDto.prototype, "nodeId", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => { return typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value; }),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ example: 19.2 }),
    __metadata("design:type", Number)
], CreateReadingDto.prototype, "value", void 0);
//# sourceMappingURL=createReading.dto.js.map