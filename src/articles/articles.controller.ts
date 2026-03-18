import { Controller, Get, Param } from '@nestjs/common';
import { ArticlesService } from './providers/articles.service';
import { FindOneParamDto } from 'src/articles/dto/find-one-param.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param() findOneParamsDto: FindOneParamDto) {
    return this.articlesService.findOne(findOneParamsDto.id);
  }
}
