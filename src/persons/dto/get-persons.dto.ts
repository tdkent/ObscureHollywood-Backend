import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class GetPersonsBaseDto {
  @ApiProperty({
    description: "Option to sort film list. Default: 'lastNameAsc'.",
    example: 'lastNameAsc',
  })
  @IsString()
  orderBy: string = 'lastNameAsc';
}

export class GetPersonsDto extends IntersectionType(
  GetPersonsBaseDto,
  PaginationQueryDto,
) {}
