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
exports.UpdateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dto_1 = require("../../../../auth/dto");
class UpdateUserDto extends (0, mapped_types_1.PartialType)(dto_1.RegisterDto) {
    email;
    password;
    role;
    firstName;
    lastName;
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: false, type: () => String, maxLength: 50, format: "email" }, password: { required: false, type: () => String, minLength: 8, maxLength: 50, pattern: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$/" }, role: { required: false, type: () => String, enum: ['DIRECTIVO', 'SENSOR', 'TECNICO', 'SERVICIOS_GENERALES'] }, firstName: { required: false, type: () => String, maxLength: 50 }, lastName: { required: false, type: () => String, maxLength: 50 } };
    }
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({ example: 'admin@admin.com' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, { message: 'The password does not meet the minimum requirements' }),
    (0, swagger_1.ApiProperty)({ example: 'password1!A' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['DIRECTIVO', 'SENSOR', 'TECNICO', 'SERVICIOS_GENERALES'], { message: 'Role must be one of the following: DIRECTIVO, SENSOR, TECNICO, or SERVICIOS_GENERALES' }),
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    (0, swagger_1.ApiProperty)({ example: 'Carlos' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    (0, swagger_1.ApiProperty)({ example: 'Fernandez' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "lastName", void 0);
//# sourceMappingURL=updateUser.dto.js.map