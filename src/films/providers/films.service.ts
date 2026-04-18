import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetFilmsDto } from 'src/films/dto/get-films.dto';
import { Film } from 'src/films/entities/film.entity';
import { Repository } from 'typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

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
    const { limit, orderBy, page, tag: tags } = reqQuery;

    const sortField =
      orderBy === 'nameAsc' || orderBy === 'nameDesc'
        ? 'film.sortName'
        : 'film.releaseYear';
    const sortDirection =
      orderBy === 'nameAsc' || orderBy === 'yearAsc' ? 'ASC' : 'DESC';

    let films: Film[];
    let count: number | undefined;

    if (tags) {
      const rows = await this.filmsRepository
        .createQueryBuilder('film')
        .innerJoin('film.filmTags', 'filmTag')
        .innerJoin('filmTag.tag', 'tag')
        .where('tag.slug IN (:...tags)', { tags })
        .groupBy('film.id')
        .addGroupBy('film.slug')
        .having('COUNT(*) = :count', { count: tags.length })
        .getMany();

      count = rows.length;

      films = await this.filmsRepository
        .createQueryBuilder('film')
        .innerJoin('film.filmTags', 'filmTag')
        .innerJoin('filmTag.tag', 'tag')
        .where('tag.slug IN (:...tags)', { tags })
        .groupBy('film.id')
        .addGroupBy('film.slug')
        .having('COUNT(*) = :count', { count: tags.length })
        .orderBy(sortField, sortDirection)
        .take(limit)
        .skip((page - 1) * limit)
        .getMany();
    } else {
      films = await this.filmsRepository
        .createQueryBuilder('film')
        .orderBy(sortField, sortDirection)
        .take(limit)
        .skip((page - 1) * limit)
        .getMany();
    }

    const finalResponse =
      await this.paginationProvider.createPaginationMetadata({
        repository: this.filmsRepository,
        limit,
        orderBy,
        page,
        data: films,
        count,
      });

    return finalResponse;
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
