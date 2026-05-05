import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MaxLength(50)
  @IsEmail()
  @ApiProperty({ example: 'admin@admin.com' })
  readonly email: string;

  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'Carlos' })
  readonly firstName: string;

  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'Fernandez' })
  readonly lastName: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  /* Regex:
    (?=.*[a-z])            : 1 lowercase
    (?=.*[A-Z])            : 1 uppercase
    (?=.*\d)               : 1 number
    (?=.*[!@#$%^&*])       : 1 special
    [A-Za-z\d!@#$%^&*]{8,} : min length
  */
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, { message: 'The password does not meet the minimum requirements' })
  @ApiProperty({ example: 'password1!A' })
  readonly password: string;

  @IsString()
  @IsIn(['DIRECTIVO', 'SENSOR', 'TECNICO', 'SERVICIOS_GENERALES'], { message: 'Role must be one of the following: DIRECTIVO, SENSOR, TECNICO, or SERVICIOS_GENERALES' })
  @ApiProperty({ example: 'DIRECTIVO' })
  readonly role: string;
}
