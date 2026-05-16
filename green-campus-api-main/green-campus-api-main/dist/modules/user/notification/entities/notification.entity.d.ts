import { User } from '../../userData/entities/user.entity';
export declare class Notification {
    notificationId: number;
    time?: Date;
    user: User;
    userId: number;
    sendEmail?: boolean;
    read?: boolean;
    title: string;
    description: string;
}
