import { IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsPositive()
  limit: number = 10;

  @IsPositive()
  page: number = 1;
}
