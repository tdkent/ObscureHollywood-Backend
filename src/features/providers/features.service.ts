import { Injectable, NotFoundException } from '@nestjs/common';
import { GetFeaturesDto } from 'src/features/dto/get-features.dto';
import { Repository } from 'typeorm';
import { Feature } from 'src/features/entities/feature.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { validateParams } from 'src/common/utils/validate';

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
    const {
      limit: limitParam,
      orderBy: orderParam,
      page: pageParam,
    } = reqQuery;

    const { limit, orderBy, page } = validateParams({
      limitParam,
      orderParam,
      pageParam,
      route: 'features',
    });

    const [data, count] = await this.featuresRepository.findAndCount({
      order: orderBy === 'nameDesc' ? { name: 'DESC' } : { name: 'ASC' },
      take: limit,
      skip: (page - 1) * limit,
    });

    const finalResponse = this.paginationProvider.createPaginationMetadata({
      limit,
      orderBy,
      page,
      data,
      totalItems: count,
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
