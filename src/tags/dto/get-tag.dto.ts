import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class GetTagsBaseDto {
  @ApiProperty({
    description: "Option to sort tag list. Default: 'nameAsc'.",
    example: 'nameAsc',
  })
  @IsIn(['nameAsc', 'nameDesc', 'typeAsc', 'typeDesc'])
  orderBy: 'nameAsc' | 'nameDesc' | 'typeAsc' | 'typeDesc';
}

export class GetTagsDto extends IntersectionType(
  GetTagsBaseDto,
  PaginationQueryDto,
) {}
