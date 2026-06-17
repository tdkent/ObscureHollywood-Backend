import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetFilmsDto } from 'src/films/dto/get-films.dto';
import { Film } from 'src/films/entities/film.entity';
import { Repository } from 'typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { validateParams } from 'src/common/utils/validate';
import { PAGINATION_TAKE_COUNT } from 'src/common/constants/constants';

@Injectable()
export class FilmsService {
  constructor(
    /**
     * Film Repository
     */
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
    /**
     * Pagination Metadata Provider
     */
    private paginationProvider: PaginationProvider,
  ) {}

  /**
   * Send a list of films with pagination and sorting.
   */
  public async findAll(reqQuery: GetFilmsDto) {
    const { orderBy: orderParam, page: pageParam, tag: tags } = reqQuery;

    const { orderBy, page } = validateParams({
      orderParam,
      pageParam,
      route: 'films',
    });

    const sortField =
      orderBy === 'nameAsc' || orderBy === 'nameDesc'
        ? 'film.sortName'
        : 'film.releaseYear';
    const sortDirection =
      orderBy === 'nameAsc' || orderBy === 'yearAsc' ? 'ASC' : 'DESC';

    let films: Film[];
    let totalItems: number;

    if (tags) {
      //? Combine into a single query with window function to get count?
      const rows = await this.filmsRepository
        .createQueryBuilder('film')
        .innerJoin('film.filmTags', 'filmTag')
        .innerJoin('filmTag.tag', 'tag')
        .where('tag.slug IN (:...tags)', { tags })
        .groupBy('film.id')
        .addGroupBy('film.slug')
        .having('COUNT(*) = :count', { count: tags.length })
        .getMany();

      totalItems = rows.length;

      films = await this.filmsRepository
        .createQueryBuilder('film')
        .innerJoin('film.filmTags', 'filmTag')
        .innerJoin('filmTag.tag', 'tag')
        .where('tag.slug IN (:...tags)', { tags })
        .groupBy('film.id')
        .addGroupBy('film.slug')
        .having('COUNT(*) = :count', { count: tags.length })
        .orderBy(sortField, sortDirection)
        .take(PAGINATION_TAKE_COUNT)
        .skip((page - 1) * PAGINATION_TAKE_COUNT)
        .getMany();
    } else {
      films = await this.filmsRepository
        .createQueryBuilder('film')
        .orderBy(sortField, sortDirection)
        .take(PAGINATION_TAKE_COUNT)
        .skip((page - 1) * PAGINATION_TAKE_COUNT)
        .getMany();

      totalItems = await this.filmsRepository.count();
    }

    const finalResponse = this.paginationProvider.createPaginationMetadata({
      data: films,
      orderBy,
      page,
      tags,
      totalItems,
    });

    return finalResponse;
  }

  public async findRecent() {
    return this.filmsRepository.find({
      relations: {
        article: true,
      },
      select: {
        article: {
          publishDate: true,
        },
      },
      order: {
        article: {
          publishDate: 'DESC',
        },
      },
      take: 3,
    });
  }

  /**
   * Send a single film with relations.
   */
  public async findOne(slug: string) {
    const film = await this.filmsRepository.findOne({
      where: { slug },
      relations: {
        article: true,
        personFilms: {
          person: true,
        },
        studio: true,
        filmTags: {
          tag: true,
        },
      },
    });

    if (!film) throw new NotFoundException();

    return film;
  }
}
