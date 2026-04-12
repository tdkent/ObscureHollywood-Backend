import { ArticleResponseDto } from 'src/articles/dto/article-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { FeatureResponseDto } from 'src/features/dto/feature-response.dto';

export class GetFeatureResponseDto extends FeatureResponseDto {
  @ApiProperty({ type: ArticleResponseDto })
  article: ArticleResponseDto;
}
