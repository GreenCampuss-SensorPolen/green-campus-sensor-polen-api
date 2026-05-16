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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("@nestjs/common/constants");
const core_1 = require("@nestjs/core");
const main_1 = require("./main");
let AppService = class AppService {
    discoveryService;
    metadataScanner;
    constructor(discoveryService, metadataScanner) {
        this.discoveryService = discoveryService;
        this.metadataScanner = metadataScanner;
    }
    getAllRoutes() {
        const controllers = this.discoveryService.getControllers();
        return controllers.map((wrapper) => {
            const instance = wrapper.instance;
            const metatype = wrapper.metatype;
            if (!instance || !metatype)
                return [];
            const controllerPath = Reflect.getMetadata(constants_1.PATH_METADATA, metatype);
            return this.metadataScanner.getAllMethodNames(instance).map((methodName) => {
                const methodPath = Reflect.getMetadata(constants_1.PATH_METADATA, instance[methodName]) ?? '';
                const httpMethod = Reflect.getMetadata(constants_1.METHOD_METADATA, instance[methodName]);
                const apiVersionStr = 'v' + main_1.API_DEFAULT_VERSION + '/';
                const apiRouteStr = controllerPath + '/' + methodPath;
                const urlStr = (apiVersionStr + apiRouteStr).replace(/\/+/g, '/');
                return {
                    method: getHttpMethodName(httpMethod),
                    path: urlStr,
                };
            });
        }).flat();
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.DiscoveryService,
        core_1.MetadataScanner])
], AppService);
function getHttpMethodName(type) {
    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'ALL', 'OPTIONS', 'HEAD'];
    return methods[type] || 'UNKNOWN';
}
//# sourceMappingURL=app.service.js.map