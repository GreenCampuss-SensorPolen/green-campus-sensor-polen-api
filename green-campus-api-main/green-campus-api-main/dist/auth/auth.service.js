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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const role_enum_1 = require("../constants/enums/role.enum");
const user_entity_1 = require("../modules/user/userData/entities/user.entity");
const hashing_provider_1 = require("../providers/hashing.provider");
const mail_provider_1 = require("../providers/mail.provider");
const typeorm_2 = require("typeorm");
const resetCodes = new Map();
let AuthService = class AuthService {
    userRepository;
    hashingProvider;
    jwtService;
    mailProvider;
    constructor(userRepository, hashingProvider, jwtService, mailProvider) {
        this.userRepository = userRepository;
        this.hashingProvider = hashingProvider;
        this.jwtService = jwtService;
        this.mailProvider = mailProvider;
    }
    async login(body) {
        const user = await this.userRepository.findOneBy({ email: body.email });
        if (user == null)
            throw new common_1.NotFoundException('User not found');
        if (!await this.hashingProvider.compare(body.password, user.password))
            throw new common_1.UnauthorizedException('Invalid credentials');
        const payload = { email: body.email, role: user.role };
        return {
            jwt: this.jwtService.sign(payload),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: role_enum_1.RoleLabels[user.role],
        };
    }
    async forgotPassword(body) {
        const user = await this.userRepository.findOneBy({ email: body.email });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiration = new Date();
        expiration.setMinutes(expiration.getMinutes() + 5);
        resetCodes.set(body.email, { code: code, usesLeft: 5, expiration: expiration });
        await this.mailProvider.sendRecoveryCode(body.email, code);
        return { message: 'Code sent' };
    }
    async resetPassword(body) {
        const resetCodeData = resetCodes.get(body.email);
        if (resetCodeData == null)
            throw new common_1.NotFoundException('No reset code for this email');
        if (new Date() > resetCodeData.expiration) {
            resetCodes.delete(body.email);
            throw new common_1.GoneException('Reset code has expired');
        }
        if (resetCodeData.code != body.code) {
            resetCodeData.usesLeft = resetCodeData.usesLeft - 1;
            if (resetCodeData.usesLeft == 0)
                resetCodes.delete(body.email);
            throw new common_1.UnauthorizedException('Invalid code');
        }
        resetCodes.delete(body.email);
        const user = await this.userRepository.findOneBy({ email: body.email });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const hashedPassword = await this.hashingProvider.hash(body.newPassword);
        user.password = hashedPassword;
        if (!user)
            throw new common_1.NotFoundException('User not found');
        else
            return this.userRepository.save(user);
    }
    async register(body) {
        if (await this.userRepository.findOneBy({ email: body.email }) != null)
            throw new common_1.ConflictException('Email already exists');
        const hashedPassword = await this.hashingProvider.hash(body.password);
        const user = this.userRepository.create({
            email: body.email,
            firstName: body.firstName,
            lastName: body.lastName,
            password: hashedPassword,
            role: getRoleFromLabel(body.role),
        });
        await this.userRepository.save(user);
        return {
            userId: user.userId,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: role_enum_1.RoleLabels[user.role],
        };
    }
    async deleteUser(userId) {
        const user = await this.userRepository.findOneBy({ userId });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        else
            return this.userRepository.remove(user);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hashing_provider_1.HashingProvider,
        jwt_1.JwtService,
        mail_provider_1.MailProvider])
], AuthService);
function getRoleFromLabel(label) {
    return Object.keys(role_enum_1.RoleLabels).find(key => role_enum_1.RoleLabels[key] === label);
}
//# sourceMappingURL=auth.service.js.map