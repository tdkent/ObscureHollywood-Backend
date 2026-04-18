import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { GetTagsDto } from 'src/tags/dto/get-tag.dto';
import { Repository } from 'typeorm';
import { Tag } from 'src/tags/entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    /**
     * Tags repository
     */
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
    /**
     * Pagination provider
     */
    private paginationProvider: PaginationProvider,
  ) {}
  public async findAll(reqQuery: GetTagsDto) {
    const { limit, orderBy, page } = reqQuery;

    const tags = await this.tagsRepository.find({
      order:
        orderBy === 'nameDesc'
          ? { name: 'DESC', type: 'DESC' }
          : orderBy === 'typeAsc'
            ? { type: 'ASC', name: 'ASC' }
            : orderBy === 'typeDesc'
              ? { type: 'DESC', name: 'DESC' }
              : { name: 'ASC', type: 'ASC' },
      take: limit,
      skip: (page - 1) * limit,
    });

    const finalResponse =
      await this.paginationProvider.createPaginationMetadata({
        repository: this.tagsRepository,
        limit,
        orderBy,
        page,
        data: tags,
      });

    return finalResponse;
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
}
