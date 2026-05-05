import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class AnnualDto {
  @Type(() => Number)
  @IsInt()
  @Min(2025)
  year: number;
}
