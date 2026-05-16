import { ConfigService } from '@nestjs/config';
export declare class MailProvider {
    private configService;
    private transporter;
    constructor(configService: ConfigService);
    sendRecoveryCode(email: string, code: string): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
    sendNotification(email: string, title: string, description: string): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
}
