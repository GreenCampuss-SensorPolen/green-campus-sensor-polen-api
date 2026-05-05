import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsIn, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

import { CreateNodeDto } from './createNode.dto';

export class UpdateNodeDto extends PartialType(CreateNodeDto) {
  @IsOptional()
  @IsDateString()
  readonly time?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'sensorX' })
  readonly name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'this is a sensor' })
  readonly type?: string;

  @IsOptional()
  @IsString()
  @IsIn(['ONLINE', 'SENSOR', 'OFFLINE', 'STANDBY'], { message: 'Status must be one of the following: ONLINE, OFFLINE or STANDBY' })
  @ApiProperty({ example: 'ONLINE' })
  readonly status?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty({ example: '100' })
  readonly battery?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'class x' })
  readonly location?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'building x' })
  readonly building?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'floor x' })
  readonly floor?: string;
}
