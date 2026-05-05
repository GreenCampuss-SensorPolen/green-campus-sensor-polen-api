import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { RegisterDto } from 'src/auth/dto';

export class UpdateUserDto extends PartialType(RegisterDto) {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @IsEmail()
  @ApiProperty({ example: 'admin@admin.com' })
  readonly email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, { message: 'The password does not meet the minimum requirements' })
  @ApiProperty({ example: 'password1!A' })
  password?: string;

  @IsOptional()
  @IsString()
  @IsIn(['DIRECTIVO', 'SENSOR', 'TECNICO', 'SERVICIOS_GENERALES'], { message: 'Role must be one of the following: DIRECTIVO, SENSOR, TECNICO, or SERVICIOS_GENERALES' })
  @ApiProperty({ example: 0 })
  role?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'Carlos' })
  readonly firstName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'Fernandez' })
  readonly lastName?: string;
}
