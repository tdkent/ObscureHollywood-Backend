import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';
import { GetFilmsDto } from 'src/films/dto/get-films.dto';

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

export class GetFilmsByStudioDto extends OmitType(GetFilmsDto, ['tag']) {}
