import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Article } from 'src/articles/entities/article.entity';
import { GetArticlesDto } from 'src/articles/dto/get-articles.dto';
import { DataSource } from 'typeorm';
import { ArticleResponse } from 'src/articles/dto/article-response.dto';

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

    let articles: ArticleResponse[];
    let totalItems: number;

    if (!searchString) {
      articles = await this.articlesRepository.find({
        order: orderBy === 'nameDesc' ? { name: 'DESC' } : { name: 'ASC' },
        take: limit,
        skip: (page - 1) * limit,
      });

      totalItems = await this.articlesRepository.count();
    } else {
      const sortDirection = orderBy === 'nameAsc' ? 'ASC' : 'DESC';

      /**
       * Search feature, film, person, and studio tables
       */
      const searchResultsQb = await this.dataSource
        .createQueryBuilder()
        .addCommonTableExpression(
          `
          SELECT feature.slug, feature.name, 'feature' AS category, article."textContent", article."htmlContent"
          FROM feature
          LEFT JOIN article ON feature.slug = article.slug

          UNION

          SELECT film.slug, film.name, 'film' AS category, article."textContent", article."htmlContent"
          FROM film
          LEFT JOIN article ON film.slug = article.slug

          UNION

          SELECT person.slug, person.name, 'person' AS category, article."textContent", article."htmlContent"
          FROM person
          LEFT JOIN article ON person.slug = article.slug

          UNION

          SELECT studio.slug, studio.name, 'studio' AS category, '' AS "textContent", '' AS "htmlContent"
          FROM studio
        `,
          'search',
        )
        .select('row_number() over () as id')
        .addSelect('s.name')
        .addSelect('s.slug')
        .addSelect('s.category')
        .addSelect('s."htmlContent"')
        .addSelect('COUNT(*) OVER() as count') // Get total row count w/o grouping
        .from('search', 's') // Same as `FROM search AS s`
        .where(
          's.name ILIKE :searchString OR s."textContent" ILIKE :searchString',
          { searchString: `%${searchString}%` },
        )
        .orderBy('name', sortDirection)
        .take(limit)
        .skip((page - 1) * limit)
        .getRawMany();

      const results = searchResultsQb as (ArticleResponse & {
        count: string;
      })[];

      totalItems = results.length ? Number(results[0].count) : 0;

      articles = results.map((result) => {
        return {
          id: Number(result.id),
          name: result.name,
          slug: result.slug,
          category: result.category,
          htmlContent: result.htmlContent,
        };
      });
    }

    const finalResponse = this.paginationProvider.createPaginationMetadata({
      data: articles,
      limit,
      orderBy,
      page,
      totalItems,
    });

    return finalResponse;
  }
}
