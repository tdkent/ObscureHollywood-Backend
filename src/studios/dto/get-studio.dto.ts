import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class GetStudiosBaseDto {
  @ApiProperty({
    description: "Option to sort studio list. Default: 'nameAsc'.",
    example: 'nameAsc',
  })
  @IsIn(['nameAsc', 'nameDesc'])
  orderBy: 'nameAsc' | 'nameDesc' = 'nameAsc';
}

export class GetStudiosDto extends IntersectionType(
  GetStudiosBaseDto,
  PaginationQueryDto,
) {}
