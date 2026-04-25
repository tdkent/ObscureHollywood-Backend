import { ApiProperty } from '@nestjs/swagger';
import { ArticleResponse } from 'src/articles/dto/article-response.dto';
import { PaginatedDataDto } from 'src/common/pagination/dtos/paginated-data-response.dto';

export class GetArticlesResponseDto extends PaginatedDataDto {
  @ApiProperty({ type: [ArticleResponse] })
  data: ArticleResponse[];
}
