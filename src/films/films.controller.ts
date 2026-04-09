import { Controller, Get, Param, Query } from '@nestjs/common';
import { FilmsService } from 'src/films/providers/films.service';
import { GetFilmsDto } from 'src/films/dto/get-films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  findAll(@Query() reqQuery: GetFilmsDto) {
    return this.filmsService.findAll(reqQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmsService.findOne(+id);
  }
}
