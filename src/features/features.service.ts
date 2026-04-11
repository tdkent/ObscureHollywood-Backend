import { Injectable } from '@nestjs/common';

@Injectable()
export class FeaturesService {
  findAll() {
    return `This action returns all features`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feature`;
  }
}
