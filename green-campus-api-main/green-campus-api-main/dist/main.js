"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.API_DEFAULT_VERSION = void 0;
const fs = __importStar(require("fs"));
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const validation_pipe_1 = require("@nestjs/common/pipes/validation.pipe");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const logger_interceptor_1 = require("./middleware/logger/logger.interceptor");
exports.API_DEFAULT_VERSION = '1';
const httpsOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
};
const documentOptions = new swagger_1.DocumentBuilder()
    .setTitle('Green API')
    .setDescription('Nebrija Green API documentation')
    .setVersion('v' + exports.API_DEFAULT_VERSION)
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' }, 'jwt')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'Token', in: 'header' }, 'token')
    .build();
const swaggerOptions = {
    customSiteTitle: 'Green API',
    swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        operationsSorter: function (a, b) {
            const order = { get: '0', post: '1', patch: '2', delete: '3' };
            return order[a.get('method')].localeCompare(order[b.get('method')]);
        },
    },
};
async function bootstrap() {
    exports.app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter({ https: httpsOptions }));
    exports.app.enableCors();
    exports.app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: exports.API_DEFAULT_VERSION,
    });
    exports.app.useGlobalPipes(new validation_pipe_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    exports.app.useGlobalInterceptors(new logger_interceptor_1.LoggerInterceptor());
    const swaggerDocument = swagger_1.SwaggerModule.createDocument(exports.app, documentOptions);
    swagger_1.SwaggerModule.setup('api', exports.app, swaggerDocument, swaggerOptions);
    await exports.app.listen(app_module_1.AppModule.port, '0.0.0.0');
}
void bootstrap();
//# sourceMappingURL=main.js.map