import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({
    description: 'Pagination page.',
    example: '1',
  })
  @IsString()
  page: string = '1';
}
