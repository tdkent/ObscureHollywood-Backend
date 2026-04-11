import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class GetFeaturesBaseDto {
  @ApiProperty({
    description: "Option to sort feature list. Default: 'nameAsc'.",
    example: 'nameAsc',
  })
  @IsIn(['nameAsc', 'nameDesc'])
  orderBy: 'nameAsc' | 'nameDesc' = 'nameAsc';
}

export class GetFeaturesDto extends IntersectionType(
  GetFeaturesBaseDto,
  PaginationQueryDto,
) {}
