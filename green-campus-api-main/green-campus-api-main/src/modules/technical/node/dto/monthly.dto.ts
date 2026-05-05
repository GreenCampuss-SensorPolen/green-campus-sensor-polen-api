import { Type } from 'class-transformer';
import { IsInt, Min, Max } from 'class-validator';

export class MonthlyDto {
  @Type(() => Number)
  @IsInt()
  @Min(2025)
  year: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  month: number;
}
