import { ApiProperty } from '@nestjs/swagger';

export class ArticleResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'the-americano-1916' })
  slug: string;

  @ApiProperty({ example: 'film' })
  category: 'feature' | 'film' | 'person';

  @ApiProperty({ example: '<article>Hello world!</article>' })
  htmlContent: string;

  @ApiProperty({ example: 'Hello world!' })
  textContent: string;
}
