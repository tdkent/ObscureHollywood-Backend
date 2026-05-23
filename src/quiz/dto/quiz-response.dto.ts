import { ApiProperty } from '@nestjs/swagger';

export class QuizResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'At the Movies' })
  name: string;

  @ApiProperty({ example: 'films' })
  theme: 'films' | 'genres' | 'people';

  @ApiProperty({ example: 'at-the-movies' })
  slug: string;
}
