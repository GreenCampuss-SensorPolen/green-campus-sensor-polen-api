import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/auth/passport/decorators/roles.decorator';
import { Role } from 'src/constants/enums/role.enum';
import * as authenticatedRequestInterface from 'src/constants/interfaces/authenticatedRequest.interface';

import { CreateNotificationDto } from './dto/createNotification.dto';
import { UpdateNotificationDto } from './dto/updateNotification.dto';
import { NotificationService } from './notification.service';
import { PaginationDto } from '../../pagination.dto';

@ApiBearerAuth('token')
@ApiBearerAuth('jwt')
@Controller({ path: 'user/notification', version: '1' })
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {};

  @Get()
  @Roles(Role.ADMIN, Role.SENSOR, Role.MANAGER, Role.VIEWER)
  getXNotificationForId(@Query() pagination: PaginationDto, @Req() req: authenticatedRequestInterface.AuthenticatedRequest) {
    return this.notificationService.getXNotificationForId(pagination, req.user.email);
  }

  @Post()
  @Roles(Role.ADMIN, Role.SENSOR, Role.MANAGER)
  createNotification(@Body() body: CreateNotificationDto) {
    return this.notificationService.createNotification(body);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.SENSOR, Role.MANAGER)
  updateNotification(@Param('id') id: number, @Body() body: UpdateNotificationDto) {
    return this.notificationService.updateNotification(id, body);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SENSOR, Role.MANAGER)
  deleteNotification(@Param('id') id: number): Promise<{ deletedId: number }> {
    return this.notificationService.deleteNotification(id);
  }
}
