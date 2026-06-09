import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class GetFeaturesBaseDto {
  @ApiProperty({
    description: 'Option to sort feature list.',
    example: 'nameAsc',
  })
  @IsString()
  orderBy: string = 'nameAsc';
}

export class GetFeaturesDto extends IntersectionType(
  GetFeaturesBaseDto,
  PaginationQueryDto,
) {}
