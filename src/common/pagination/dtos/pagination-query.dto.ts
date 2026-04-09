import { IsIn, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsIn([10, 25])
  limit: number = 10;

  @IsPositive()
  page: number = 1;
}
