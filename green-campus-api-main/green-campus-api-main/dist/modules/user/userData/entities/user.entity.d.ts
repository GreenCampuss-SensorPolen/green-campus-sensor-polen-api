import { Notification } from '../../notification/entities/notification.entity';
export declare class User {
    userId: number;
    time?: Date;
    email: string;
    password: string;
    role: string;
    firstName: string;
    lastName: string;
    notifications: Notification[];
}
