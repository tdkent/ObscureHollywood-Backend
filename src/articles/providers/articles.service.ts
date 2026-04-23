import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Article } from 'src/articles/entities/article.entity';
import { GetArticlesDto } from 'src/articles/dto/get-articles.dto';

@Injectable()
export class ArticlesService {
  constructor(
    /**
     * Inject article repository
     */
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
    /**
     * Pagination provider
     */
    private paginationProvider: PaginationProvider,
  ) {}

  /**
   * Send a list of features with pagination and sorting.
   */
  public async findAll(reqQuery: GetArticlesDto) {
    const { limit, orderBy, page, searchString } = reqQuery;

    console.log(searchString);

    const features = await this.articlesRepository.find({
      // order: orderBy === 'nameDesc' ? { name: 'DESC' } : { name: 'ASC' },
      take: limit,
      skip: (page - 1) * limit,
    });

    const finalResponse =
      await this.paginationProvider.createPaginationMetadata({
        repository: this.articlesRepository,
        limit,
        orderBy,
        page,
        data: features,
      });

    return finalResponse;
  }
}
