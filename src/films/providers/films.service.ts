import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';
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
    reqQuery: PaginationQueryDto,
  ): Promise<PaginatedResponse<Film>> {
    const { limit, page } = reqQuery;

    const totalItems = await this.filmsRepository.count();
    const totalPages = Math.ceil(totalItems / limit);
    const nextPage = page >= totalPages ? totalPages : page + 1;
    const prevPage =
      page >= totalPages ? totalPages - 1 : page <= 1 ? 1 : page - 1;

    const films = await this.filmsRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });

    const baseUrl = `${this.configService.get('BASE_URL')}`;

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

  findOne(id: number) {
    return `This action returns a #${id} film`;
  }
}
