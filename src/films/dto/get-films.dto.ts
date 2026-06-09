import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class GetFilmsBaseDto {
  @ApiProperty({
    description: "Option to sort film list. Default: 'nameAsc'.",
    example: 'nameAsc',
  })
  @IsString()
  orderBy: string = 'nameAsc';

  @IsOptional()
  // Need to transform bc single tag query will not naturally map to []
  @Transform(({ value }) => {
    if (value === undefined) return undefined;
    return Array.isArray(value) ? value : [value];
  })
  @IsArray()
  @IsString({ each: true })
  tag?: string[];
}

export class GetFilmsDto extends IntersectionType(
  GetFilmsBaseDto,
  PaginationQueryDto,
) {}
