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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const role_enum_1 = require("../../../constants/enums/role.enum");
const hashing_provider_1 = require("../../../providers/hashing.provider");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    userRepository;
    hashingProvider;
    constructor(userRepository, hashingProvider) {
        this.userRepository = userRepository;
        this.hashingProvider = hashingProvider;
    }
    async updateUser(email, body) {
        const user = await this.userRepository.findOneBy({ email: email });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (body.password != null && body.password != undefined && body.password != '') {
            body.password = await this.hashingProvider.hash(body.password);
        }
        if (body.role != null && body.role != undefined && body.role != '') {
            throw new common_1.UnauthorizedException('Can not edit user role');
        }
        await this.userRepository.update(user.userId, body);
        const updatedUser = await this.userRepository.findOneBy({ email: email });
        if (!updatedUser)
            throw new common_1.NotFoundException('User not found');
        return {
            userId: updatedUser.userId,
            role: role_enum_1.RoleLabels[updatedUser.role],
            email: updatedUser.email,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hashing_provider_1.HashingProvider])
], UserService);
//# sourceMappingURL=user.service.js.map