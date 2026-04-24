import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Article } from 'src/articles/entities/article.entity';
import { GetArticlesDto } from 'src/articles/dto/get-articles.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class ArticlesService {
  constructor(
    /**
     * Inject data source (for raw query)
     */
    private readonly dataSource: DataSource,
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

    let articles: Article[];
    let count: number | undefined;

    if (!searchString) {
      articles = await this.articlesRepository.find({
        order: orderBy === 'nameDesc' ? { name: 'DESC' } : { name: 'ASC' },
        take: limit,
        skip: (page - 1) * limit,
      });
    } else {
      // const sortDirection = orderBy === 'nameAsc' ? 'ASC' : 'DESC';

      /**
       * Search feature, film, person, and studio tables
       */
      const searchResults = await this.dataSource
        .createQueryBuilder()
        // Create CTE with all searchable columns from tables
        .addCommonTableExpression(
          `
          SELECT feature.slug, feature.name, 'feature' AS category, article."textContent"
          FROM feature
          LEFT JOIN article ON feature.slug = article.slug

          UNION

          SELECT film.slug, film.name, 'film' AS category, article."textContent"
          FROM film
          LEFT JOIN article ON film.slug = article.slug

          UNION

          SELECT person.slug, person.name, 'person' AS category, article."textContent"
          FROM person
          LEFT JOIN article ON person.slug = article.slug

          UNION

          SELECT studio.slug, studio.name, 'studio' AS category, '' AS "textContent"
          FROM studio
        `,
          'search',
        )
        .select('*')
        // Same as `FROM search AS s`
        .from('search', 's')
        .where(
          's.name ILIKE :searchString OR s."textContent" ILIKE :searchString',
          { searchString: `%${searchString}%` },
        )
        .getRawMany();

      const rawResults = searchResults as Article[];

      articles = rawResults;
      count = searchResults.length;
    }

    const finalResponse =
      await this.paginationProvider.createPaginationMetadata({
        repository: this.articlesRepository,
        limit,
        orderBy,
        page,
        data: articles,
        count,
      });

    return finalResponse;
  }
}
