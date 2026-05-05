import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailProvider } from 'src/providers/mail.provider';
import { Repository } from 'typeorm';

import { CreateNotificationDto, UpdateNotificationDto } from './dto/index';
import { Notification } from './entities/notification.entity';
import { PaginationDto } from '../../pagination.dto';
import { User } from '../userData/entities/user.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification) private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private mailProvider: MailProvider,
  ) {}

  async getXNotificationForId(pagination: PaginationDto, email: string): Promise<Notification[]> {
    // Get current user based on JWT
    const user: User | null = await this.userRepository.findOne({ where: { email: email } });
    if(!user) throw new NotFoundException('User not found');
    // Find the notifications for said user
    const notifications: Notification[] | null = await this.notificationRepository.find({
      where: { userId: user.userId },
      order: { notificationId: { direction: 'DESC' } },
      take: pagination.take,
      skip: pagination.skip,
    });
    if(!notifications) throw new NotFoundException('Notification not found');
    // Return the notifications
    else return notifications;
  }

  async createNotification(body: CreateNotificationDto) {
    // Get the user from the email
    const user: User | null = await this.userRepository.findOne({ where: { email: body.email } });
    if(!user) throw new NotFoundException('User not found');
    // Create and store the notification
    const notification: Notification = this.notificationRepository.create({
      time: body.time,
      user: user,
      userId: user.userId,
      sendEmail: body.sendEmail,
      read: body.read,
      title: body.title,
      description: body.description,
    });
    await this.notificationRepository.save(notification);
    // Send notification email if sendEmail == true
    if(body.sendEmail == true) await this.mailProvider.sendNotification(body.email, body.title, body.description);
    // Return the important data
    return {
      notificationId: notification.notificationId,
      userId: notification.userId,
      time: notification.time,
      sendEmail: notification.sendEmail,
      read: notification.read,
      title: notification.title,
      description: notification.description,
    };
  }

  async updateNotification(notificationId: number, body: UpdateNotificationDto) {
    // Get notification User
    const notification: Notification | null = await this.notificationRepository.findOne({ where: { notificationId: notificationId } });
    if(!notification) throw new NotFoundException('Notification not found');
    const user: User | null = await this.userRepository.findOne({ where: { userId: notification.userId } });
    if(!user) throw new NotFoundException('User not found');
    // Update notification
    const notificationUpdated: Notification | undefined = await this.notificationRepository.preload({
      notificationId,
      time: body.time,
      user: user,
      userId: user.userId,
      sendEmail: body.sendEmail,
      read: body.read,
      title: body.title,
      description: body.description,
    });
    if(!notificationUpdated) throw new NotFoundException('Notification not found');
    else await this.notificationRepository.save(notificationUpdated);
    // Send notification email if sendEmail == true
    if(body.sendEmail == true) await this.mailProvider.sendNotification(body.email ?? user.email, notificationUpdated.title, notificationUpdated.description);
    // Return the important data
    return {
      notificationId: notification.notificationId,
      userId: notification.userId,
      time: notification.time,
      sendEmail: notification.sendEmail,
      read: notification.read,
      title: notification.title,
      description: notification.description,
    };
  }

  async deleteNotification(notificationId: number): Promise<{ deletedId: number }> {
    const notification: Notification | null = await this.notificationRepository.findOneBy({ notificationId });
    if(!notification) throw new NotFoundException('Notification not found');
    else {
      await this.notificationRepository.remove(notification);
      return { deletedId: notificationId };
    }
  }
}
