import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailProvider } from 'src/providers/mail.provider';

import { Notification } from './entities/notification.entity';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { User } from '../userData/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notification]), TypeOrmModule.forFeature([User])],
  controllers: [NotificationController],
  providers: [NotificationService, MailProvider],
})
export class NotificationModule {}
