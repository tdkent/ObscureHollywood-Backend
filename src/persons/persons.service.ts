import { Injectable } from '@nestjs/common';
import { GetPersonsDto } from 'src/persons/dto/get-persons.dto';

@Injectable()
export class PersonsService {
  findAll(reqQuery: GetPersonsDto) {
    return reqQuery;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }
}
