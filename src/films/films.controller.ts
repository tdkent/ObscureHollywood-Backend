import { Controller, Get, Param, Query } from '@nestjs/common';
import { FilmsService } from 'src/films/providers/films.service';
import { GetFilmsDto } from 'src/films/dto/get-films.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetFilmResponseDto } from 'src/films/dto/get-film-response.dto';
import { GetFilmsResponseDto } from 'src/films/dto/get-films-response.dto';
import { SlugDto } from 'src/common/dtos/slug.dto';

@Controller('films')
@ApiTags('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get films',
    description:
      'Returns a paginated list of films. Supports pagination and sorting query parameters.',
  })
  @ApiOkResponse({
    description: 'An array of films or an empty array if no data can be found.',
    type: GetFilmsResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'One or more query parameters are invalid.',
  })
  findAll(@Query() reqQuery: GetFilmsDto) {
    return this.filmsService.findAll(reqQuery);
  }

  @Get(':slug')
  @ApiOperation({
    summary: 'Get one film by unique slug',
    description:
      'Returns a single film, including its related article, people, studios, and tags.',
  })
  @ApiOkResponse({
    description: 'Object containing film and relations data.',
    type: GetFilmResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'The slug parameter is invalid.',
  })
  @ApiNotFoundResponse({
    description: 'No film was found for the provided slug.',
  })
  findOne(@Param() reqParams: SlugDto) {
    return this.filmsService.findOne(reqParams.slug);
  }
}
