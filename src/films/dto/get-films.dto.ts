import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class GetFilmsBaseDto {
  @ApiProperty({
    description: "Option to sort film list. Default: 'nameAsc'.",
    example: 'nameAsc',
  })
  @IsIn(['nameAsc', 'nameDesc', 'yearAsc', 'yearDesc'])
  orderBy: 'nameAsc' | 'nameDesc' | 'yearAsc' | 'yearDesc' = 'nameAsc';
}

export class GetFilmsDto extends IntersectionType(
  GetFilmsBaseDto,
  PaginationQueryDto,
) {}
