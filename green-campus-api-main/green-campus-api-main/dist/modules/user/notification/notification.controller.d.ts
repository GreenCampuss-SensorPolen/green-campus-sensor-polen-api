import * as authenticatedRequestInterface from 'src/constants/interfaces/authenticatedRequest.interface';
import { CreateNotificationDto } from './dto/createNotification.dto';
import { UpdateNotificationDto } from './dto/updateNotification.dto';
import { NotificationService } from './notification.service';
import { PaginationDto } from '../../pagination.dto';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    getXNotificationForId(pagination: PaginationDto, req: authenticatedRequestInterface.AuthenticatedRequest): Promise<import("./entities/notification.entity").Notification[]>;
    createNotification(body: CreateNotificationDto): Promise<{
        notificationId: number;
        userId: number;
        time: Date | undefined;
        sendEmail: boolean | undefined;
        read: boolean | undefined;
        title: string;
        description: string;
    }>;
    updateNotification(id: number, body: UpdateNotificationDto): Promise<{
        notificationId: number;
        userId: number;
        time: Date | undefined;
        sendEmail: boolean | undefined;
        read: boolean | undefined;
        title: string;
        description: string;
    }>;
    deleteNotification(id: number): Promise<{
        deletedId: number;
    }>;
}
