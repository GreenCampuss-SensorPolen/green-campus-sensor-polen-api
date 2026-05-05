import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { AnnualDto, CreateNodeDto, MonthlyDto, UpdateNodeDto } from './dto';
import { NodeService } from './node.service';
import { Roles } from '../../../auth/passport/decorators/roles.decorator';
import { Role } from '../../../constants/enums/role.enum';
import { PaginationDto } from '../../pagination.dto';

@Controller({ path: 'technical/nodes', version: '1' })
export class NodeController {
  constructor(private readonly nodeService: NodeService) {}

  @Get()
  @Roles(Role.ADMIN, Role.SENSOR, Role.MANAGER, Role.VIEWER)
  getAllNodes() {
    return this.nodeService.getAllNodes();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.SENSOR, Role.MANAGER, Role.VIEWER)
  getMetadataForXNode(@Param('id') id: number) {
    return this.nodeService.getMetadataForXNode(id);
  }

  @Get(':id/readings')
  @Roles(Role.ADMIN, Role.MANAGER, Role.VIEWER)
  getXReadingsForXNode(@Param('id') id: number, @Query() pagination: PaginationDto) {
    return this.nodeService.getXReadingsForXNode(id, pagination);
  }

  @Get(':identifier/readings/monthly')
  @Roles(Role.ADMIN, Role.MANAGER, Role.VIEWER)
  getMonthlyReadingsForXNode(@Param('identifier') identifier: number | string, @Query() monthly: MonthlyDto) {
    if(isNaN(Number(identifier))) {
      return this.nodeService.getMonthlyReadingsForXType(identifier as string, monthly.year, monthly.month);
    } else {
      return this.nodeService.getMonthlyReadingsForXNode(identifier as number, monthly.year, monthly.month);
    }
  }

  @Get(':identifier/readings/annual')
  @Roles(Role.ADMIN, Role.MANAGER, Role.VIEWER)
  getAnnualReadingsForXNode(@Param('identifier') identifier: number | string, @Query() annual: AnnualDto) {
    if(isNaN(Number(identifier))) {
      return this.nodeService.getAnnualReadingsForXType(identifier as string, annual.year);
    } else {
      return this.nodeService.getAnnualReadingsForXNode(identifier as number, annual.year);
    }
  }

  @Get(':type/time-on/monthly')
  @Roles(Role.ADMIN, Role.MANAGER, Role.VIEWER)
  getMonthlyTimeForXNode(@Param('type') type: string, @Query() monthly: MonthlyDto) {
    return this.nodeService.getMonthlyTimeForXType(type, monthly.year, monthly.month);
  }

  @Get(':type/time-on/annual')
  @Roles(Role.ADMIN, Role.MANAGER, Role.VIEWER)
  getAnnualTimeForXNode(@Param('type') type: string, @Query() annual: AnnualDto) {
    return this.nodeService.getAnnualTimeForXType(type, annual.year);
  }

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER, Role.SENSOR)
  createNode(@Body() body: CreateNodeDto) {
    return this.nodeService.createNode(body);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  updateNode(@Param('id') id: number, @Body() body: UpdateNodeDto) {
    return this.nodeService.updateNode(id, body);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  deleteNode(@Param('id') id: number): Promise<{ deletedId: number }> {
    return this.nodeService.deleteNode(id);
  }
}
