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
exports.TokenStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_http_bearer_1 = require("passport-http-bearer");
const role_enum_1 = require("../../../constants/enums/role.enum");
let TokenStrategy = class TokenStrategy extends (0, passport_1.PassportStrategy)(passport_http_bearer_1.Strategy, 'token') {
    configService;
    constructor(configService) {
        super({});
        this.configService = configService;
    }
    validate(token) {
        if (token == this.configService.get('TOKEN')) {
            return { email: this.configService.get('PGADMIN_DEFAULT_EMAIL'), role: role_enum_1.Role.ADMIN };
        }
        else if (token == this.configService.get('SENSOR_TOKEN')) {
            return { email: this.configService.get('SENSOR_EMAIL'), role: role_enum_1.Role.SENSOR };
        }
        else
            throw new common_1.UnauthorizedException('Invalid token');
    }
};
exports.TokenStrategy = TokenStrategy;
exports.TokenStrategy = TokenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TokenStrategy);
//# sourceMappingURL=token.strategy.js.map