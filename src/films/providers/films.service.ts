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
    const { limit, orderBy, page } = reqQuery;

    const films = await this.filmsRepository.find({
      order:
        orderBy === 'nameDesc'
          ? { sortName: 'DESC', releaseYear: 'ASC' }
          : orderBy === 'yearAsc'
            ? { releaseYear: 'ASC', sortName: 'ASC' }
            : orderBy === 'yearDesc'
              ? { releaseYear: 'DESC', sortName: 'ASC' }
              : { sortName: 'ASC', releaseYear: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    const finalResponse =
      await this.paginationProvider.createPaginationMetadata({
        repository: this.filmsRepository,
        limit,
        page,
        data: films,
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
