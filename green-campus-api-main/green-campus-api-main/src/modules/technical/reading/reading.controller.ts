import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateReadingDto } from './dto';
import { ReadingService } from './reading.service';
import { Roles } from '../../../auth/passport/decorators/roles.decorator';
import { Role } from '../../../constants/enums/role.enum';

@Controller({ path: 'readings', version: '1' })
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @Get()
  @Roles(Role.ADMIN, Role.MANAGER, Role.VIEWER)
  getAllReadings() {
    return this.readingService.getAllReadings();
  }

  @Post()
  @Roles(Role.ADMIN, Role.SENSOR)
  createReading(@Body() body: CreateReadingDto) {
    return this.readingService.createReading(body);
  }
}
