import { Injectable } from '@nestjs/common';

@Injectable()
export class StudiosService {
  findAll() {
    return `This action returns all studios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studio`;
  }
}
