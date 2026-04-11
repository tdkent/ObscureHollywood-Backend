import { Injectable } from '@nestjs/common';
import { GetFeaturesDto } from 'src/features/dto/get-features.dto';
import { Repository } from 'typeorm';
import { Feature } from 'src/features/entities/feature.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FeaturesService {
  constructor(
    /**
     * Inject film repository
     */
    @InjectRepository(Feature)
    private featuresRepository: Repository<Feature>,
  ) {}
  findAll(reqQuery: GetFeaturesDto) {
    const { limit, orderBy, page } = reqQuery;

    const features = this.featuresRepository.find({
      order: orderBy === 'nameDesc' ? { name: 'DESC' } : { name: 'ASC' },
      take: limit,
      skip: (page - 1) * limit,
    });

    return features;
  }

  findOne(id: number) {
    return `This action returns a #${id} feature`;
  }
}
