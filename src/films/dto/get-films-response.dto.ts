import { ApiProperty } from '@nestjs/swagger';
import { FilmResponseDto } from 'src/films/dto/film-response.dto';
import { PaginatedDataDto } from 'src/common/pagination/dtos/paginated-data-response.dto';

export class GetFilmsResponseDto extends PaginatedDataDto {
  @ApiProperty({ type: [FilmResponseDto] })
  data: FilmResponseDto[];
}
