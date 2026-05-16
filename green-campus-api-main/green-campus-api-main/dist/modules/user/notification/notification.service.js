"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const mail_provider_1 = require("../../../providers/mail.provider");
const typeorm_2 = require("typeorm");
const notification_entity_1 = require("./entities/notification.entity");
const user_entity_1 = require("../userData/entities/user.entity");
let NotificationService = class NotificationService {
    notificationRepository;
    userRepository;
    mailProvider;
    constructor(notificationRepository, userRepository, mailProvider) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.mailProvider = mailProvider;
    }
    async getXNotificationForId(pagination, email) {
        const user = await this.userRepository.findOne({ where: { email: email } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const notifications = await this.notificationRepository.find({
            where: { userId: user.userId },
            order: { notificationId: { direction: 'DESC' } },
            take: pagination.take,
            skip: pagination.skip,
        });
        if (!notifications)
            throw new common_1.NotFoundException('Notification not found');
        else
            return notifications;
    }
    async createNotification(body) {
        const user = await this.userRepository.findOne({ where: { email: body.email } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const notification = this.notificationRepository.create({
            time: body.time,
            user: user,
            userId: user.userId,
            sendEmail: body.sendEmail,
            read: body.read,
            title: body.title,
            description: body.description,
        });
        await this.notificationRepository.save(notification);
        if (body.sendEmail == true)
            await this.mailProvider.sendNotification(body.email, body.title, body.description);
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
    async updateNotification(notificationId, body) {
        const notification = await this.notificationRepository.findOne({ where: { notificationId: notificationId } });
        if (!notification)
            throw new common_1.NotFoundException('Notification not found');
        const user = await this.userRepository.findOne({ where: { userId: notification.userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const notificationUpdated = await this.notificationRepository.preload({
            notificationId,
            time: body.time,
            user: user,
            userId: user.userId,
            sendEmail: body.sendEmail,
            read: body.read,
            title: body.title,
            description: body.description,
        });
        if (!notificationUpdated)
            throw new common_1.NotFoundException('Notification not found');
        else
            await this.notificationRepository.save(notificationUpdated);
        if (body.sendEmail == true)
            await this.mailProvider.sendNotification(body.email ?? user.email, notificationUpdated.title, notificationUpdated.description);
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
    async deleteNotification(notificationId) {
        const notification = await this.notificationRepository.findOneBy({ notificationId });
        if (!notification)
            throw new common_1.NotFoundException('Notification not found');
        else {
            await this.notificationRepository.remove(notification);
            return { deletedId: notificationId };
        }
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        mail_provider_1.MailProvider])
], NotificationService);
//# sourceMappingURL=notification.service.js.map