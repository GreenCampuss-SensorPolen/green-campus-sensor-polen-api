export declare class CreateNotificationDto {
    readonly email: string;
    readonly time?: Date;
    readonly sendEmail?: boolean;
    readonly read?: boolean;
    readonly title: string;
    readonly description: string;
}
