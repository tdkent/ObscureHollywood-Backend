import { IntersectionType } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class GetPersonsBaseDto {
  @IsIn(['firstNameAsc', 'firstNameDesc', 'lastNameAsc', 'lastNameDesc'])
  orderBy: 'firstNameAsc' | 'firstNameDesc' | 'lastNameAsc' | 'lastNameDesc';
}

export class GetPersonsDto extends IntersectionType(
  GetPersonsBaseDto,
  PaginationQueryDto,
) {}
