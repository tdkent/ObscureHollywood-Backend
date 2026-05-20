import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class GetArticlesBaseDto {
  @ApiProperty({
    description: "Option to sort article list. Default: 'nameAsc'.",
    example: 'nameAsc',
  })
  @IsString()
  orderBy: string = 'nameAsc';

  @IsOptional()
  @IsString()
  q?: string;
}

export class GetArticlesDto extends IntersectionType(
  GetArticlesBaseDto,
  PaginationQueryDto,
) {}
