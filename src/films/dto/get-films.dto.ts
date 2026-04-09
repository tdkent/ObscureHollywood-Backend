import { IntersectionType } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class GetFilmsBaseDto {
  @IsIn(['nameAsc', 'nameDesc', 'yearAsc', 'yearDesc'])
  orderBy: string;
}

export class GetFilmsDto extends IntersectionType(
  GetFilmsBaseDto,
  PaginationQueryDto,
) {}
