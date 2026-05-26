import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { validateParams } from 'src/common/utils/validate';
import { CreateQuizResultDto } from 'src/quiz/dto/create-quiz-result.dto';
import { GetQuizzesDto } from 'src/quiz/dto/get-quizzes.dto';
import { QuizQuestion } from 'src/quiz/entities/quiz-question.entity';
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
     * Quiz Question repository
     */
    @InjectRepository(QuizQuestion)
    private readonly quizQuestionRepository: Repository<QuizQuestion>,
    /**
     * Pagination provider
     */
    private paginationProvider: PaginationProvider,
  ) {}
  /**
   * Send a list of quizzes with pagination and sorting.
   */
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

  /**
   * Send a single quiz with relations.
   */
  public async findOne(slug: string) {
    const quiz = await this.quizRepository.findOne({
      where: { slug },
      relations: {
        quizQuestions: true,
      },
      order: {
        quizQuestions: {
          questionNumber: 'ASC',
        },
      },
    });

    if (!quiz) throw new NotFoundException();

    return quiz;
  }

  /**
   * Create results from a single quiz.
   */
  public async createQuizResult(slug: string, reqBody: CreateQuizResultDto) {
    const { answers } = reqBody;

    const questions = await this.quizQuestionRepository.find({
      where: { quizSlug: slug },
    });

    if (!questions.length) throw new NotFoundException();

    let score = 0;

    for (const { correctAnswer, questionNumber } of questions) {
      const userAnswer = answers[questionNumber] as number;
      if (userAnswer === correctAnswer) score++;
    }

    return score;
  }
}
