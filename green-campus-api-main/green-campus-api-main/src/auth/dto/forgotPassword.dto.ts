import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength } from 'class-validator';

export class ForgotPasswordDto {
  @IsString()
  @MaxLength(50)
  @IsEmail()
  @ApiProperty({ example: 'admin@admin.com' })
  readonly email: string;
}
