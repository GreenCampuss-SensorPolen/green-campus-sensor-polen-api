import { MailProvider } from 'src/providers/mail.provider';
import { Repository } from 'typeorm';
import { CreateNotificationDto, UpdateNotificationDto } from './dto/index';
import { Notification } from './entities/notification.entity';
import { PaginationDto } from '../../pagination.dto';
import { User } from '../userData/entities/user.entity';
export declare class NotificationService {
    private readonly notificationRepository;
    private readonly userRepository;
    private mailProvider;
    constructor(notificationRepository: Repository<Notification>, userRepository: Repository<User>, mailProvider: MailProvider);
    getXNotificationForId(pagination: PaginationDto, email: string): Promise<Notification[]>;
    createNotification(body: CreateNotificationDto): Promise<{
        notificationId: number;
        userId: number;
        time: Date | undefined;
        sendEmail: boolean | undefined;
        read: boolean | undefined;
        title: string;
        description: string;
    }>;
    updateNotification(notificationId: number, body: UpdateNotificationDto): Promise<{
        notificationId: number;
        userId: number;
        time: Date | undefined;
        sendEmail: boolean | undefined;
        read: boolean | undefined;
        title: string;
        description: string;
    }>;
    deleteNotification(notificationId: number): Promise<{
        deletedId: number;
    }>;
}
