import { ApiProperty } from '@nestjs/swagger';
import { FilmResponseDto } from 'src/films/dto/film-response.dto';
import { StudioResponseDto } from 'src/studios/dto/studio-response.dto';

export class GetStudioResponseDto extends StudioResponseDto {
  @ApiProperty({ type: [FilmResponseDto] })
  films: FilmResponseDto[];
}
