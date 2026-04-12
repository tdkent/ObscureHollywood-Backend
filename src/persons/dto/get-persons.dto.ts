import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class GetPersonsBaseDto {
  @ApiProperty({
    description: "Option to sort film list. Default: 'lastNameAsc'.",
    example: 'lastNameAsc',
  })
  @IsIn(['firstNameAsc', 'firstNameDesc', 'lastNameAsc', 'lastNameDesc'])
  orderBy: 'firstNameAsc' | 'firstNameDesc' | 'lastNameAsc' | 'lastNameDesc';
}

export class GetPersonsDto extends IntersectionType(
  GetPersonsBaseDto,
  PaginationQueryDto,
) {}
