import { Controller, Get, Param } from '@nestjs/common';
import { ArticlesService } from './providers/articles.service';
import { FindOneParamDto } from 'src/articles/dto/find-one-param.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Finds one article using the ID provided in the route param.',
  })
  @ApiResponse({
    status: 200,
    description: 'Fetches the requested resource.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error if param is invalid.',
  })
  @ApiResponse({
    status: 404,
    description: 'Error if resource does not exist.',
  })
  findOne(@Param() findOneParamsDto: FindOneParamDto) {
    return this.articlesService.findOne(findOneParamsDto.id);
  }
}
