import { ApiProperty } from '@nestjs/swagger';
import { FilmResponseDto } from 'src/films/dto/film-response.dto';
import { PersonResponseDto } from 'src/persons/dto/person-response.dto';

class PersonFilm {
  @ApiProperty({ example: 36 })
  id: number;

  @ApiProperty({ example: 'actor' })
  role: 'actor' | 'director' | 'writer';

  @ApiProperty({ example: 2 })
  castPosition: number | null;
}

export class PersonFilmWithPersonResponseDto extends PersonFilm {
  @ApiProperty({ type: PersonResponseDto })
  person: PersonResponseDto;
}

export class PersonFilmWithFilmResponseDto extends PersonFilm {
  @ApiProperty({ type: FilmResponseDto })
  film: FilmResponseDto;
}
