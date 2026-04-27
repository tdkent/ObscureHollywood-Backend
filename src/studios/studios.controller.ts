import { Controller, Get, Param, Query } from '@nestjs/common';
import { StudiosService } from './providers/studios.service';
import {
  GetFilmsByStudioDto,
  GetStudiosDto,
} from 'src/studios/dto/get-studio.dto';
import { SlugDto } from 'src/common/dtos/slug.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GetStudiosResponseDto } from 'src/studios/dto/get-studios-response.dto';
import { GetStudioResponseDto } from 'src/studios/dto/get-studio-response.dto';

@Controller('studios')
@ApiTags('studios')
export class StudiosController {
  constructor(private readonly studiosService: StudiosService) {}

  @Get()
  @ApiOperation({
    summary: 'Get studios',
    description:
      'Returns a paginated list of studios. Supports pagination and sorting query parameters.',
  })
  @ApiOkResponse({
    description:
      'An array of studios or an empty array if no data can be found.',
    type: GetStudiosResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'One or more query parameters are invalid.',
  })
  findAll(@Query() reqQuery: GetStudiosDto) {
    return this.studiosService.findAll(reqQuery);
  }

  @Get(':slug')
  @ApiOperation({
    summary: 'Get one studio by unique slug',
    description: 'Returns a single studio and related article and films.',
  })
  @ApiParam({
    name: 'slug',
    description: 'Unique slug to identify the studio.',
    example: 'paramount-pictures',
  })
  @ApiOkResponse({
    description: 'Object containing studio and relations data.',
    type: GetStudioResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'The slug parameter is invalid.',
  })
  @ApiNotFoundResponse({
    description: 'No studio was found for the provided slug.',
  })
  findOne(@Param() reqParams: SlugDto) {
    return this.studiosService.findOne(reqParams.slug);
  }

  @Get(':slug/films')
  findFilmsByStudio(
    @Param() reqParams: SlugDto,
    @Query() reqQuery: GetFilmsByStudioDto,
  ) {
    return this.studiosService.findFilmsByStudio(reqParams.slug, reqQuery);
  }
}
