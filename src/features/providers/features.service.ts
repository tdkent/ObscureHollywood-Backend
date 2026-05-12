import { Injectable, NotFoundException } from '@nestjs/common';
import { GetFeaturesDto } from 'src/features/dto/get-features.dto';
import { Repository } from 'typeorm';
import { Feature } from 'src/features/entities/feature.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

@Injectable()
export class FeaturesService {
  constructor(
    /**
     * Inject film repository
     */
    @InjectRepository(Feature)
    private featuresRepository: Repository<Feature>,
    /**
     * Pagination provider
     */
    private paginationProvider: PaginationProvider,
  ) {}

  /**
   * Send a list of features with pagination and sorting.
   */
  public async findAll(reqQuery: GetFeaturesDto) {
    const { limit, orderBy, page } = reqQuery;

    const features = await this.featuresRepository.find({
      order: orderBy === 'nameDesc' ? { name: 'DESC' } : { name: 'ASC' },
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalItems = await this.featuresRepository.count();

    const finalResponse = this.paginationProvider.createPaginationMetadata({
      limit,
      orderBy,
      page,
      data: features,
      totalItems,
    });

    return finalResponse;
  }

  public async findRecent() {
    return this.featuresRepository.find({
      take: 3,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  /**
   * Send a single feature with relations.
   */
  public async findOne(slug: string) {
    const feature = await this.featuresRepository.findOne({
      where: { slug },
      relations: {
        article: {
          incomingRelations: {
            article: true,
          },
        },
      },
    });

    if (!feature) throw new NotFoundException();

    return feature;
  }
}
