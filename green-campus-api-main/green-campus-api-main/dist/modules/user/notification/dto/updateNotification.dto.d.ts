import { CreateNotificationDto } from './createNotification.dto';
declare const UpdateNotificationDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateNotificationDto>>;
export declare class UpdateNotificationDto extends UpdateNotificationDto_base {
    readonly email: string;
    readonly time?: Date;
    readonly read?: boolean;
    readonly title: string;
    readonly description: string;
}
export {};
