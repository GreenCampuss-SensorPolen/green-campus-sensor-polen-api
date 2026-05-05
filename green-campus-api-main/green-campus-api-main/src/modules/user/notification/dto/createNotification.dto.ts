import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateNotificationDto {
  @IsEmail()
  @ApiProperty({ example: 'admin@admin.com' })
  readonly email: string;

  @IsDateString()
  @IsOptional()
  readonly time?: Date;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: false })
  readonly sendEmail?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: false })
  readonly read?: boolean;

  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'title' })
  readonly title: string;

  @IsString()
  @ApiProperty({ example: 'Description' })
  readonly description: string;
}
