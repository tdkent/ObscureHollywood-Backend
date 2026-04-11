import { ApiProperty } from '@nestjs/swagger';
import { FilmResponseDto } from 'src/films/dto/film-response.dto';

class PaginationMetaDto {
  @ApiProperty({ example: 10 })
  itemsPerPage: number;

  @ApiProperty({ example: 178 })
  totalItems: number;

  @ApiProperty({ example: 1 })
  currentPage: number;

  @ApiProperty({ example: 18 })
  totalPages: number;
}

class PaginationLinksDto {
  @ApiProperty({ example: 'http://localhost:3000/films?limit=10&page=1' })
  first: string;

  @ApiProperty({ example: 'http://localhost:3000/films?limit=10&page=18' })
  last: string;

  @ApiProperty({ example: 'http://localhost:3000/films?limit=10&page=1' })
  current: string;

  @ApiProperty({ example: 'http://localhost:3000/films?limit=10&page=2' })
  next: string;

  @ApiProperty({ example: 'http://localhost:3000/films?limit=10&page=1' })
  previous: string;
}

export class GetFilmsResponseDto {
  @ApiProperty({ type: [FilmResponseDto] })
  data: FilmResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;

  @ApiProperty({ type: PaginationLinksDto })
  links: PaginationLinksDto;
}
