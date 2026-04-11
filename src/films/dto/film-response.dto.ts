import { ApiProperty } from '@nestjs/swagger';

export class FilmResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'The Americano' })
  name: string;

  @ApiProperty({ example: 'the-americano-1916' })
  slug: string;

  @ApiProperty({ example: 1916 })
  releaseYear: number;
}
