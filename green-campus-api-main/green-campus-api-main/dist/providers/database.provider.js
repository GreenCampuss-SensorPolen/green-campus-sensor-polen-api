"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseProvider = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
exports.DatabaseProvider = typeorm_1.TypeOrmModule.forRootAsync({
    inject: [config_1.ConfigService],
    useFactory(configService) {
        const dbConfig = {
            type: configService.get('DB_TYPE'),
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USER'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_DBNAME'),
            logging: configService.get('DB_LOGGING'),
            autoLoadEntities: true,
            synchronize: true,
            dropSchema: process.env.NODE_ENV === 'development',
        };
        return dbConfig;
    },
});
//# sourceMappingURL=database.provider.js.map