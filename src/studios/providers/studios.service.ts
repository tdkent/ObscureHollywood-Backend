import { Injectable } from '@nestjs/common';
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
        page,
        data: studios,
      });

    return finalResponse;
  }

  findOne(id: number) {
    return `This action returns a #${id} studio`;
  }
}
