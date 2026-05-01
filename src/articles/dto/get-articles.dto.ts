import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import {
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class GetArticlesBaseDto {
  @ApiProperty({
    description: "Option to sort article list. Default: 'nameAsc'.",
    example: 'nameAsc',
  })
  @IsIn(['nameAsc', 'nameDesc'])
  orderBy: 'nameAsc' | 'nameDesc' = 'nameAsc';

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  q?: string;
}

export class GetArticlesDto extends IntersectionType(
  GetArticlesBaseDto,
  PaginationQueryDto,
) {}
