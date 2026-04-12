import { Controller, Get, Param, Query } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { GetPersonsDto } from 'src/persons/dto/get-persons.dto';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Get()
  findAll(@Query() reqQuery: GetPersonsDto) {
    return this.personsService.findAll(reqQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personsService.findOne(+id);
  }
}
