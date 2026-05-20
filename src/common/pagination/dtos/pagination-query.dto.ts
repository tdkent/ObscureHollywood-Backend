import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({
    description: 'Maximum results to return per page.',
    example: '25',
  })
  @IsString()
  limit: string = '25';

  @ApiProperty({
    description: 'Pagination page.',
    example: '1',
  })
  @IsString()
  page: string = '1';
}
