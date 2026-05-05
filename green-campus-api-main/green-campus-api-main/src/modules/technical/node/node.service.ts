import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/modules/pagination.dto';
import { Repository } from 'typeorm';

import { CreateNodeDto, UpdateNodeDto } from './dto';
import { Node } from './entities/node.entity';
import { Reading } from '../reading/entities/reading.entity';

@Injectable()
export class NodeService {
  constructor(
    @InjectRepository(Node) private nodeRepository: Repository<Node>,
    @InjectRepository(Reading) private readingRepository: Repository<Reading>,
  ) {}

  async getAllNodes() {
    return await this.nodeRepository.find();
  }

  async getMetadataForXNode(id: number) {
    return await this.nodeRepository.findOneBy({ nodeId: id });
  }

  async getXReadingsForXNode(id: number, pagination: PaginationDto) {
    const readings = await this.readingRepository.find({
      where: { nodeId: id },
      order: { time: 'DESC' },
      take: pagination.take,
      skip: pagination.skip,
    });

    return readings.map(reading => ({
      value: Number(reading.value),
      timestamp: reading.time.toISOString(),
    }));
  }

  async getMonthlyReadingsForXNode(id: number, year: number, month: number) {
    const rawData = await this.readingRepository.createQueryBuilder('reading')
      .select('EXTRACT(DAY FROM reading.time)', 'day')
      .addSelect('AVG(reading.value)', 'value')
      .where('reading.nodeId = :id', { id })
      .andWhere('EXTRACT(YEAR FROM reading.time) = :year', { year })
      .andWhere('EXTRACT(MONTH FROM reading.time) = :month', { month })
      .groupBy('EXTRACT(DAY FROM reading.time)')
      .orderBy('day', 'ASC')
      .getRawMany();

    return rawData.map((row: { day: string; value: string }) => ({
      day: row.day,
      value: Number(row.value).toFixed(2),
    }));
  }

  async getAnnualReadingsForXNode(id: number, year: number) {
    const rawData = await this.readingRepository.createQueryBuilder('reading')
      .select('EXTRACT(MONTH FROM reading.time)', 'monthNum')
      .addSelect('AVG(reading.value)', 'avg')
      .where('reading.nodeId = :id', { id })
      .andWhere('EXTRACT(YEAR FROM reading.time) = :year', { year })
      .groupBy('EXTRACT(MONTH FROM reading.time)')
      .getRawMany();

    const month = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const result = month.map(month => ({ month: month, avg: 0 }));

    rawData.forEach((row: { monthNum: string; avg: string }) => {
      result[parseInt(row.monthNum) - 1].avg = parseFloat(Number(row.avg).toFixed(2));
    });
    return result;
  }

  async getMonthlyReadingsForXType(type: string, year: number, month: number) {
    const rawData = await this.readingRepository.createQueryBuilder('reading')
      .innerJoin('reading.node', 'node')
      .select('EXTRACT(DAY FROM reading.time)', 'day')
      .addSelect('AVG(reading.value)', 'value')
      .where('node.type = :type', { type })
      .andWhere('EXTRACT(YEAR FROM reading.time) = :year', { year })
      .andWhere('EXTRACT(MONTH FROM reading.time) = :month', { month })
      .groupBy('EXTRACT(DAY FROM reading.time)')
      .orderBy('day', 'ASC')
      .getRawMany();

    return rawData.map((row: { day: string; value: string }) => ({
      day: row.day,
      value: Number(row.value).toFixed(2),
    }));
  }

  async getAnnualReadingsForXType(type: string, year: number) {
    const rawData = await this.readingRepository.createQueryBuilder('reading')
      .innerJoin('reading.node', 'node')
      .select('EXTRACT(MONTH FROM reading.time)', 'monthNum')
      .addSelect('AVG(reading.value)', 'avg')
      .where('node.type = :type', { type })
      .andWhere('EXTRACT(YEAR FROM reading.time) = :year', { year })
      .groupBy('EXTRACT(MONTH FROM reading.time)')
      .getRawMany();

    const month = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const result = month.map(month => ({ month: month, avg: 0 }));

    rawData.forEach((row: { monthNum: string; avg: string }) => {
      result[parseInt(row.monthNum) - 1].avg = parseFloat(Number(row.avg).toFixed(2));
    });
    return result;
  }

  async getMonthlyTimeForXType(type: string, year: number, month: number) {
    // TODO, all this is useless, but cba
    const rawData = await this.readingRepository.createQueryBuilder('reading')
      .innerJoin('reading.node', 'node')
      .select('EXTRACT(DAY FROM reading.time)', 'day')
      .addSelect('AVG(reading.value)', 'value')
      .where('node.type = :type', { type })
      .andWhere('EXTRACT(YEAR FROM reading.time) = :year', { year })
      .andWhere('EXTRACT(MONTH FROM reading.time) = :month', { month })
      .groupBy('EXTRACT(DAY FROM reading.time)')
      .orderBy('day', 'ASC')
      .getRawMany();

    return rawData.map((row: { day: string; value: string }) => ({
      day: row.day,
      value: 100,
    }));
  }

  async getAnnualTimeForXType(type: string, year: number) {
    // TODO, all this is useless, but cba
    const rawData = await this.readingRepository.createQueryBuilder('reading')
      .innerJoin('reading.node', 'node')
      .select('EXTRACT(MONTH FROM reading.time)', 'monthNum')
      .addSelect('AVG(reading.value)', 'avg')
      .where('node.type = :type', { type })
      .andWhere('EXTRACT(YEAR FROM reading.time) = :year', { year })
      .groupBy('EXTRACT(MONTH FROM reading.time)')
      .orderBy('monthNum', 'ASC')
      .getRawMany();

    const month = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const result = month.map(month => ({ month: month, avg: 0 }));

    rawData.forEach((row: { monthNum: string; avg: string }) => {
      result[parseInt(row.monthNum) - 1].avg = 100;
    });
    return result;
  }

  async createNode(body: CreateNodeDto) {
    const node: Node = this.nodeRepository.create({
      time: body.time,
      name: body.name,
      type: body.type,
      status: body.status,
      battery: body.battery,
      location: body.location,
      building: body.building,
      floor: body.floor,
    });
    return await this.nodeRepository.save(node);
  }

  async updateNode(id: number, body: UpdateNodeDto) {
    await this.nodeRepository.update(id, body);
    const updatedNode: Node | null = await this.nodeRepository.findOneBy({ nodeId: id });
    if(!updatedNode) throw new NotFoundException('Node not found');
    return {
      nodeId: updatedNode.nodeId,
      time: updatedNode.time,
      name: updatedNode.name,
      type: updatedNode.type,
      status: updatedNode.status,
      battery: updatedNode.battery,
      location: updatedNode.location,
      building: updatedNode.building,
      floor: updatedNode.floor,
    };
  }

  async deleteNode(id: number): Promise<{ deletedId: number }> {
    const node: Node | null = await this.nodeRepository.findOneBy({ nodeId: id });
    if(!node) throw new NotFoundException('Node not found');
    else {
      await this.nodeRepository.remove(node);
      return { deletedId: id };
    }
  }
}
