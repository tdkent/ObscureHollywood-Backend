import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    const {
      limit: limitParam,
      orderBy: orderParam,
      page: pageParam,
    } = reqQuery;

    const { limit, orderBy, page } = validateParams({
      limitParam,
      orderParam,
      pageParam,
      route: 'studios',
    });

    const studios = await this.studiosRepository.find({
      order: orderBy === 'nameAsc' ? { name: 'ASC' } : { name: 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalItems = await this.studiosRepository.count();

    const finalResponse = this.paginationProvider.createPaginationMetadata({
      data: studios,
      limit,
      orderBy,
      page,
      totalItems,
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
    const {
      limit: limitParam,
      orderBy: orderParam,
      page: pageParam,
    } = reqQuery;

    const { limit, orderBy, page } = validateParams({
      limitParam,
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
      take: limit,
      skip: (page - 1) * limit,
    });

    const finalResponse = this.paginationProvider.createPaginationMetadata({
      data: films,
      limit,
      orderBy,
      page,
      totalItems: count,
    });

    return finalResponse;
  }
}
