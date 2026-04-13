import { FilmResponseDto } from 'src/films/dto/film-response.dto';
import { ArticleResponseDto } from 'src/articles/dto/article-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { StudioResponseDto } from 'src/studios/dto/studio-response.dto';
import { PersonFilmResponseDto } from 'src/persons/dto/person-film-response.dto';
import { FilmTagResponseDto } from 'src/films/dto/film-tag-response.dto';

export class GetFilmResponseDto extends FilmResponseDto {
  @ApiProperty({ type: ArticleResponseDto })
  article: ArticleResponseDto;

  @ApiProperty({ type: StudioResponseDto })
  studio: StudioResponseDto;

  @ApiProperty({ type: [PersonFilmResponseDto] })
  personFilms: PersonFilmResponseDto[];

  @ApiProperty({ type: [FilmTagResponseDto] })
  filmTags: FilmTagResponseDto[];
}
