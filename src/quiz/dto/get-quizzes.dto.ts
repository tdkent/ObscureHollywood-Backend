import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class GetQuizzesBaseDto {
  @ApiProperty({
    description: "Option to sort quiz list. Default: 'nameAsc'.",
    example: 'nameAsc',
  })
  @IsString()
  orderBy: string = 'nameAsc';
}

export class GetQuizzesDto extends IntersectionType(
  GetQuizzesBaseDto,
  PaginationQueryDto,
) {}
