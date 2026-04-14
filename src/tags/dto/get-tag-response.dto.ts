import { ApiProperty } from '@nestjs/swagger';
import { FilmResponseDto } from 'src/films/dto/film-response.dto';
import { TagResponseDto } from 'src/tags/dto/tag-response.dto';

export class GetTagResponseDto extends TagResponseDto {
  @ApiProperty({ type: [FilmResponseDto] })
  films: FilmResponseDto[];
}
