import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}
