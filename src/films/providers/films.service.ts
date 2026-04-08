import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';
import { Film } from 'src/films/entities/film.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmsService {
  constructor(
    /**
     * Injecting filmsRepository
     */
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
  ) {}

  /**
   * Send a list of Films with pagination and sorting.
   */
  public async findAll(reqQuery: PaginationQueryDto) {
    const { limit, page } = reqQuery;

    const films = await this.filmsRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
    return films;
  }

  findOne(id: number) {
    return `This action returns a #${id} film`;
  }
}
