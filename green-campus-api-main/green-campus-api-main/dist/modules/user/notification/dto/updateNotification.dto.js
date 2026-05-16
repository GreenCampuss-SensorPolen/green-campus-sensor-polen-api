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
exports.UpdateNotificationDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const createNotification_dto_1 = require("./createNotification.dto");
class UpdateNotificationDto extends (0, mapped_types_1.PartialType)(createNotification_dto_1.CreateNotificationDto) {
    email;
    time;
    read;
    title;
    description;
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String, format: "email" }, time: { required: false, type: () => Date }, read: { required: false, type: () => Boolean }, title: { required: true, type: () => String, maxLength: 50 }, description: { required: true, type: () => String } };
    }
}
exports.UpdateNotificationDto = UpdateNotificationDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({ example: 'admin@admin.com' }),
    __metadata("design:type", String)
], UpdateNotificationDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateNotificationDto.prototype, "time", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], UpdateNotificationDto.prototype, "read", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    (0, swagger_1.ApiProperty)({ example: 'title' }),
    __metadata("design:type", String)
], UpdateNotificationDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'Description' }),
    __metadata("design:type", String)
], UpdateNotificationDto.prototype, "description", void 0);
//# sourceMappingURL=updateNotification.dto.js.map