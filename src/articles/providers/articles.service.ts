import { Injectable } from '@nestjs/common';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { GetArticlesDto } from 'src/articles/dto/get-articles.dto';
import { DataSource } from 'typeorm';
import { ArticleResponse } from 'src/articles/dto/article-response.dto';
import { validateParams } from 'src/common/utils/validate';
import { PAGINATION_TAKE_COUNT } from 'src/common/constants/constants';

@Injectable()
export class ArticlesService {
  constructor(
    /**
     * Inject data source (for raw query)
     */
    private readonly dataSource: DataSource,
    /**
     * Pagination provider
     */
    private paginationProvider: PaginationProvider,
  ) {}

  /**
   * Send a list of features with pagination and sorting.
   */
  public async findAll(reqQuery: GetArticlesDto) {
    const { orderBy: orderParam, page: pageParam, q: searchString } = reqQuery;

    const { orderBy, page } = validateParams({
      orderParam,
      pageParam,
      route: 'articles',
    });

    let articles: ArticleResponse[];
    let totalItems: number;

    if (!searchString || searchString.length < 2) {
      articles = [];
      totalItems = 0;
    } else {
      const sortDirection = orderBy === 'nameAsc' ? 'ASC' : 'DESC';

      /**
       * Search feature, film, person, and studio tables
       */
      const searchResultsQb = await this.dataSource
        .createQueryBuilder()
        .addCommonTableExpression(
          `
          SELECT feature.slug, feature.name, CAST(null as person_gender_enum) AS gender, 'feature' AS category, article."textContent", article."htmlContent"
          FROM feature
          LEFT JOIN article ON feature.slug = article.slug

          UNION

          SELECT film.slug, film.name, CAST(null as person_gender_enum) AS gender, 'film' AS category, article."textContent", article."htmlContent"
          FROM film
          LEFT JOIN article ON film.slug = article.slug

          UNION

          SELECT person.slug, person.name, person.gender AS gender, 'person' AS category, article."textContent", article."htmlContent"
          FROM person
          LEFT JOIN article ON person.slug = article.slug

          UNION

          SELECT studio.slug, studio.name, CAST(null as person_gender_enum) AS gender, 'studio' AS category, '' AS "textContent", '' AS "htmlContent"
          FROM studio
        `,
          'search',
        )
        .select('row_number() over () as id')
        .addSelect('s.name')
        .addSelect('s.slug')
        .addSelect('s.gender')
        .addSelect('s.category')
        .addSelect('s."htmlContent"')
        .addSelect('COUNT(*) OVER() as count') // Get total row count w/o grouping
        .from('search', 's') // Same as `FROM search AS s`
        .where(
          's.name ILIKE :searchString OR s."textContent" ILIKE :searchString',
          { searchString: `%${searchString}%` },
        )
        .orderBy('name', sortDirection)
        .take(PAGINATION_TAKE_COUNT)
        .skip((page - 1) * PAGINATION_TAKE_COUNT)
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
          gender: result.gender,
          category: result.category,
          htmlContent: result.htmlContent,
        };
      });
    }

    const finalResponse = this.paginationProvider.createPaginationMetadata({
      data: articles,
      orderBy,
      page,
      q: searchString,
      totalItems,
    });

    return finalResponse;
  }
}
