import { ArticleResponseDto } from 'src/articles/dto/article-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PersonResponseDto } from 'src/persons/dto/person-response.dto';
import { PersonFilmResponseDto } from 'src/persons/dto/person-film-response.dto';

export class GetPersonResponseDto extends PersonResponseDto {
  @ApiProperty({ type: ArticleResponseDto })
  article: ArticleResponseDto;

  @ApiProperty({ type: [PersonFilmResponseDto] })
  personFilms: PersonFilmResponseDto[];
}
