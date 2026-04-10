import { Controller, Get, Param, Query } from '@nestjs/common';
import { FilmsService } from 'src/films/providers/films.service';
import { GetFilmsDto } from 'src/films/dto/get-films.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetFilmDto } from 'src/films/dto/get-film.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  @ApiOperation({
    summary: 'Finds many films with pagination and sorting.',
  })
  @ApiResponse({
    status: 200,
    description:
      'An array of Film objects or an empty array if no data can be found.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request error',
  })
  findAll(@Query() reqQuery: GetFilmsDto) {
    return this.filmsService.findAll(reqQuery);
  }

  @Get(':slug')
  findOne(@Param() reqParams: GetFilmDto) {
    return this.filmsService.findOne(reqParams.slug);
  }
}
