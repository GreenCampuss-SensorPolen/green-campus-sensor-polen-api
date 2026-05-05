import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailProvider {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: this.configService.get<string>('MAIL_ADDRESS'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
  }

  async sendRecoveryCode(email: string, code: string) {
    const mailOptions = {
      from: `"Nebrija Green" <${this.configService.get<string>('MAIL_ADDRESS')}}>`,
      to: email,
      subject: 'Password Recovery Code',
      html: `
        <p>A request has been made to reset your account password. If you made this request, please use the following code to recover your password:</p>
        <h3>${code}</h3>
        <p>This code will expire in 5 minutes.</p>
        <p>If you did not make this request, please contact your IT administrator immediately.</p>
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }

  async sendNotification(email: string, title: string, description: string) {
    const mailOptions = {
      from: `"Nebrija Green" <${this.configService.get<string>('MAIL_ADDRESS')}}>`,
      to: email,
      subject: 'Mail Notification',
      html: `
        <h3>${title}</h3>
        <p>${description}</p>
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
