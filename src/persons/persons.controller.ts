import { Controller, Get, Param, Query } from '@nestjs/common';
import { PersonsService } from 'src/persons/providers/persons.service';
import { GetPersonsDto } from 'src/persons/dto/get-persons.dto';
import { SlugDto } from 'src/common/dtos/slug.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GetPersonsResponseDto } from 'src/persons/dto/get-persons-response.dto';
import { GetPersonResponseDto } from 'src/persons/dto/get-person-response.dto';

@Controller('persons')
@ApiTags('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @ApiOperation({
    summary: 'Get persons',
    description:
      'Returns a paginated list of persons. Supports pagination and sorting query parameters.',
  })
  @ApiOkResponse({
    description:
      'An array of persons or an empty array if no data can be found.',
    type: GetPersonsResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'One or more query parameters are invalid.',
  })
  @Get()
  findAll(@Query() reqQuery: GetPersonsDto) {
    return this.personsService.findAll(reqQuery);
  }

  @Get(':slug')
  @ApiOperation({
    summary: 'Get one person by unique slug',
    description: 'Returns a single person and related article and films.',
  })
  @ApiParam({
    name: 'slug',
    description: 'Unique slug to identify the person.',
    example: 'alma-rubens',
  })
  @ApiOkResponse({
    description: 'Object containing person and relations data.',
    type: GetPersonResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'The slug parameter is invalid.',
  })
  @ApiNotFoundResponse({
    description: 'No person was found for the provided slug.',
  })
  findOne(@Param() reqParams: SlugDto) {
    return this.personsService.findOne(reqParams.slug);
  }
}
