import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticlesService {
  findAll() {
    return `This action returns all articles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }
}
