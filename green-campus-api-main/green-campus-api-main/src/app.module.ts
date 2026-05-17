import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, DiscoveryModule } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CombinedAuthGuard } from './auth/passport/guards/combined-auth.guard';
import { RolesGuard } from './auth/passport/guards/roles.guard';
import { NodeModule } from './modules/technical/node/node.module';
import { ReadingModule } from './modules/technical/reading/reading.module';
import { NotificationModule } from './modules/user/notification/notification.module';
import { UserModule } from './modules/user/userData/user.module';
import { DatabaseProvider } from './providers/database.provider';
import { PredictionController } from './predictions/prediction.controller';

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    AuthModule,
    DiscoveryModule,
    DatabaseProvider,
    // Modules
    UserModule,
    NotificationModule,
    NodeModule,
    ReadingModule,
  ],
  controllers: [AppController, PredictionController],
  providers: [
    { provide: APP_GUARD, useClass: CombinedAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    AppService,
  ],
})
export class AppModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get<number>('PORT') ?? 3000;
  }
}
