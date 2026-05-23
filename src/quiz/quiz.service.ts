import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { validateParams } from 'src/common/utils/validate';
import { GetQuizzesDto } from 'src/quiz/dto/get-quizzes.dto';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizService {
  constructor(
    /**
     * Quiz repository
     */
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    /**
     * Pagination provider
     */
    private paginationProvider: PaginationProvider,
  ) {}
  public async findAll(reqQuery: GetQuizzesDto) {
    const {
      limit: limitParam,
      orderBy: orderParam,
      page: pageParam,
    } = reqQuery;

    const { limit, orderBy, page } = validateParams({
      limitParam,
      orderParam,
      pageParam,
      route: 'quiz',
    });

    const [data, count] = await this.quizRepository.findAndCount({
      order: orderBy === 'nameDesc' ? { name: 'DESC' } : { name: 'ASC' },
      take: limit,
      skip: (page - 1) * limit,
    });

    const finalResponse = this.paginationProvider.createPaginationMetadata({
      limit,
      orderBy,
      page,
      data,
      totalItems: count,
    });

    return finalResponse;
  }

  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }
}
