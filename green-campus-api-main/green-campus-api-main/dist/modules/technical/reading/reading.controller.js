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
exports.ReadingController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const reading_service_1 = require("./reading.service");
const roles_decorator_1 = require("../../../auth/passport/decorators/roles.decorator");
const role_enum_1 = require("../../../constants/enums/role.enum");
let ReadingController = class ReadingController {
    readingService;
    constructor(readingService) {
        this.readingService = readingService;
    }
    getAllReadings() {
        return this.readingService.getAllReadings();
    }
    createReading(body) {
        return this.readingService.createReading(body);
    }
};
exports.ReadingController = ReadingController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.MANAGER, role_enum_1.Role.VIEWER),
    openapi.ApiResponse({ status: 200, type: [require("./entities/reading.entity").Reading] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReadingController.prototype, "getAllReadings", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SENSOR),
    openapi.ApiResponse({ status: 201, type: require("./entities/reading.entity").Reading }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateReadingDto]),
    __metadata("design:returntype", void 0)
], ReadingController.prototype, "createReading", null);
exports.ReadingController = ReadingController = __decorate([
    (0, common_1.Controller)({ path: 'readings', version: '1' }),
    __metadata("design:paramtypes", [reading_service_1.ReadingService])
], ReadingController);
//# sourceMappingURL=reading.controller.js.map