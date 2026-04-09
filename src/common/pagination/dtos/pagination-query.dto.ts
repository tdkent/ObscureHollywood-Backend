import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({
    description: 'Maximum results to return per page. Default: 10.',
    example: 10,
  })
  @IsIn([10, 25])
  limit: number = 10;

  @ApiProperty({
    description: 'Pagination page. Default: 1.',
    example: 1,
  })
  @IsPositive()
  page: number = 1;
}
