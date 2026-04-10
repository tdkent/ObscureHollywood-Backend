import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetFilmsDto } from 'src/films/dto/get-films.dto';
import { Film } from 'src/films/entities/film.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import type { PaginatedResponse } from 'src/common/pagination/paginated-response.interface';

@Injectable()
export class FilmsService {
  constructor(
    /**
     * Film Repository
     */
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
    /**
     * Config Service
     */
    private readonly configService: ConfigService,
  ) {}

  /**
   * Send a list of Films with pagination and sorting.
   */
  public async findAll(
    reqQuery: GetFilmsDto,
  ): Promise<PaginatedResponse<Film>> {
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
      relations: {
        article: true,
        filmTags: {
          tag: true,
        },
        personFilms: {
          person: true,
        },
        studio: true,
      },
    });

    const totalItems = await this.filmsRepository.count();

    const totalPages = Math.ceil(totalItems / limit);
    const nextPage = page >= totalPages ? totalPages : page + 1;
    const prevPage =
      page >= totalPages ? totalPages - 1 : page <= 1 ? 1 : page - 1;

    const baseUrl = `${this.configService.get('BASE_URL')}`;

    /**
     * Create response object with pagination metadata.
     */
    const finalResponse: PaginatedResponse<Film> = {
      data: films,
      meta: {
        itemsPerPage: limit,
        totalItems,
        currentPage: page,
        totalPages,
      },
      links: {
        first: `${baseUrl}/films?limit=${limit}&page=1`,
        last: `${baseUrl}/films?limit=${limit}&page=${totalPages}`,
        current: `${baseUrl}/films?limit=${limit}&page=${page}`,
        next: `${baseUrl}/films?limit=${limit}&page=${nextPage}`,
        previous: `${baseUrl}/films?limit=${limit}&page=${prevPage}`,
      },
    };

    return finalResponse;
  }

  public async findOne(slug: string) {
    const film = await this.filmsRepository.findOneBy({ slug });

    if (!film) throw new NotFoundException();

    return film;
  }
}
