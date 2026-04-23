import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetArticlesResponseDto } from 'src/articles/dto/get-articles-response.dto';
import { GetArticlesDto } from 'src/articles/dto/get-articles.dto';
import { ArticlesService } from 'src/articles/providers/articles.service';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get articles',
    description:
      'Returns a paginated list of articles. Supports pagination and sorting query parameters.',
  })
  @ApiOkResponse({
    description:
      'An array of articles or an empty array if no data can be found.',
    type: GetArticlesResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'One or more query parameters are invalid.',
  })
  findAll(@Query() reqQuery: GetArticlesDto) {
    return this.articlesService.findAll(reqQuery);
  }
}
