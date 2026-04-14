import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class GetFilmsBaseDto {
  @ApiProperty({
    description: "Option to sort film list. Default: 'nameAsc'.",
    example: 'nameAsc',
  })
  @IsIn(['nameAsc', 'nameDesc', 'yearAsc', 'yearDesc'])
  orderBy: 'nameAsc' | 'nameDesc' | 'yearAsc' | 'yearDesc' = 'nameAsc';

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @Length(6, 64, { each: true })
  tag?: string[];
}

export class GetFilmsDto extends IntersectionType(
  GetFilmsBaseDto,
  PaginationQueryDto,
) {}
