import { ApiProperty } from '@nestjs/swagger';
import { PersonResponseDto } from 'src/persons/dto/person-response.dto';

class PersonFilm {
  @ApiProperty({ example: 36 })
  id: number;

  @ApiProperty({ example: 'actor' })
  role: 'actor' | 'director' | 'writer';

  @ApiProperty({ example: 2 })
  castPosition: number | null;
}

export class PersonFilmResponseDto extends PersonFilm {
  @ApiProperty({ type: PersonResponseDto })
  person: PersonResponseDto;
}
