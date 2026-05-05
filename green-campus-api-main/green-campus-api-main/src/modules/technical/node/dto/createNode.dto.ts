import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsIn, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateNodeDto {
  @IsOptional()
  @IsDateString()
  readonly time?: Date;

  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'sensorX' })
  readonly name: string;

  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'this is a sensor' })
  readonly type: string;

  @IsString()
  @IsIn(['ONLINE', 'SENSOR', 'OFFLINE', 'STANDBY'], { message: 'Status must be one of the following: ONLINE, OFFLINE or STANDBY' })
  @ApiProperty({ example: 'ONLINE' })
  readonly status: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty({ example: '100' })
  readonly battery?: number;

  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'class x' })
  readonly location: string;

  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'building x' })
  readonly building: string;

  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'floor x' })
  readonly floor: string;
}
