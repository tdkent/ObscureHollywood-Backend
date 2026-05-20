import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({
    description: 'Maximum results to return per page.',
    example: '10',
  })
  @IsString()
  limit: string = '10';

  @ApiProperty({
    description: 'Pagination page.',
    example: '1',
  })
  @IsString()
  page: string = '1';
}
