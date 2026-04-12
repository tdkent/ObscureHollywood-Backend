import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonsService {
  findAll() {
    return `This action returns all persons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }
}
