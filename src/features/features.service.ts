import { Injectable } from '@nestjs/common';
import { GetFeaturesDto } from 'src/features/dto/get-features.dto';

@Injectable()
export class FeaturesService {
  findAll(reqQuery: GetFeaturesDto) {
    return reqQuery;
  }

  findOne(id: number) {
    return `This action returns a #${id} feature`;
  }
}
