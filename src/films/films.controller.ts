import { Controller, Get, Param, Query } from '@nestjs/common';
import { FilmsService } from './providers/films.service';
import { PaginationQueryDto } from '../common/pagination/dtos/pagination-query.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  findAll(@Query() reqQuery: PaginationQueryDto) {
    return this.filmsService.findAll(reqQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmsService.findOne(+id);
  }
}
