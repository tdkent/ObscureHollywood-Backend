import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from 'src/tags/entities/tag.entity';
import { GetFilmsByTagDto } from 'src/tags/dto/get-tag.dto';
import { Film } from 'src/films/entities/film.entity';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { validateParams } from 'src/common/utils/validate';

@Injectable()
export class TagsService {
  constructor(
    /**
     * Tags repository
     */
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
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
  public async findAll() {
    const tags = await this.tagsRepository.find({
      order: { type: 'ASC', name: 'ASC' },
    });

    return tags;
  }

  public async findOne(slug: string) {
    const tag = await this.tagsRepository.findOne({
      where: {
        slug,
      },
      relations: {
        filmTags: {
          film: true,
        },
      },
    });

    if (!tag) throw new NotFoundException();

    return tag;
  }

  public async findFilmsByTag(slug: string, reqQuery: GetFilmsByTagDto) {
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
        filmTags: {
          tag: {
            slug,
          },
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
