import { PaginatedDataDto } from 'src/common/pagination/dtos/paginated-data-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PersonResponseDto } from 'src/persons/dto/person-response.dto';

export class GetPersonsResponseDto extends PaginatedDataDto {
  @ApiProperty({ type: [PersonResponseDto] })
  data: PersonResponseDto[];
}
