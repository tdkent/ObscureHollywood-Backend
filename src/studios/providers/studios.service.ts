import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PAGINATION_TAKE_COUNT } from 'src/common/constants/constants';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { validateParams } from 'src/common/utils/validate';
import { Film } from 'src/films/entities/film.entity';
import {
  GetFilmsByStudioDto,
  GetStudiosDto,
} from 'src/studios/dto/get-studio.dto';
import { Studio } from 'src/studios/entities/studio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudiosService {
  constructor(
    /**
     * Studios repository
     */
    @InjectRepository(Studio)
    private studiosRepository: Repository<Studio>,
    /**
     * Films repository
     */
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
    /**
     * Pagination provider
     */
    private paginationProvider: PaginationProvider,
  ) {}
  public async findAll(reqQuery: GetStudiosDto) {
    const { orderBy: orderParam, page: pageParam } = reqQuery;

    const { orderBy, page } = validateParams({
      orderParam,
      pageParam,
      route: 'studios',
    });

    const [data, count] = await this.studiosRepository.findAndCount({
      order: orderBy === 'nameAsc' ? { name: 'ASC' } : { name: 'DESC' },
      take: PAGINATION_TAKE_COUNT,
      skip: (page - 1) * PAGINATION_TAKE_COUNT,
    });

    const finalResponse = this.paginationProvider.createPaginationMetadata({
      data,
      orderBy,
      page,
      totalItems: count,
    });

    return finalResponse;
  }

  public async findOne(slug: string) {
    const studio = await this.studiosRepository.findOne({
      where: {
        slug,
      },
      relations: {
        films: true,
      },
    });

    if (!studio) throw new NotFoundException();

    return studio;
  }

  public async findFilmsByStudio(slug: string, reqQuery: GetFilmsByStudioDto) {
    const { orderBy: orderParam, page: pageParam } = reqQuery;

    const { orderBy, page } = validateParams({
      orderParam,
      pageParam,
      route: 'films',
    });

    const [films, count] = await this.filmsRepository.findAndCount({
      where: {
        studio: {
          slug,
        },
      },
      order:
        orderBy === 'nameDesc'
          ? { name: 'DESC', releaseYear: 'ASC' }
          : orderBy === 'yearAsc'
            ? { releaseYear: 'ASC', name: 'ASC' }
            : orderBy === 'yearDesc'
              ? { releaseYear: 'DESC', name: 'ASC' }
              : { name: 'ASC', releaseYear: 'ASC' },
      take: PAGINATION_TAKE_COUNT,
      skip: (page - 1) * PAGINATION_TAKE_COUNT,
    });

    const finalResponse = this.paginationProvider.createPaginationMetadata({
      data: films,
      orderBy,
      page,
      totalItems: count,
    });

    return finalResponse;
  }
}
