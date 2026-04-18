import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { GetStudiosDto } from 'src/studios/dto/get-studio.dto';
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
     * Pagination provider
     */
    private paginationProvider: PaginationProvider,
  ) {}
  public async findAll(reqQuery: GetStudiosDto) {
    const { limit, orderBy, page } = reqQuery;

    const studios = await this.studiosRepository.find({
      order: orderBy === 'nameAsc' ? { name: 'ASC' } : { name: 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
    });

    const finalResponse =
      await this.paginationProvider.createPaginationMetadata({
        repository: this.studiosRepository,
        limit,
        orderBy,
        page,
        data: studios,
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
}
