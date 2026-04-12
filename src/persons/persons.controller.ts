import { Controller, Get, Param, Query } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { GetPersonsDto } from 'src/persons/dto/get-persons.dto';
import { SlugDto } from 'src/common/dtos/slug.dto';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Get()
  findAll(@Query() reqQuery: GetPersonsDto) {
    return this.personsService.findAll(reqQuery);
  }

  @Get(':slug')
  findOne(@Param() reqParams: SlugDto) {
    return this.personsService.findOne(reqParams.slug);
  }
}
