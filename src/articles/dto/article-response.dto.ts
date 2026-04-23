import { ApiProperty, IntersectionType } from '@nestjs/swagger';

export class ArticleResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'the-americano-1916' })
  slug: string;

  @ApiProperty({ example: 'film' })
  category: 'feature' | 'film' | 'person';

  @ApiProperty({ example: '<article>Hello world!</article>' })
  htmlContent: string;
}

class ArticleRelation {
  @ApiProperty({ example: 2 })
  id: number;

  @ApiProperty({ type: [ArticleResponse] })
  incomingRelations: ArticleResponse[];
}

export class ArticleResponseDto extends IntersectionType(
  ArticleResponse,
  ArticleRelation,
) {}
