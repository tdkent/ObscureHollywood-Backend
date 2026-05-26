import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { validateParams } from 'src/common/utils/validate';
import { CreateQuizResultDto } from 'src/quiz/dto/create-quiz-result.dto';
import { GetQuizzesDto } from 'src/quiz/dto/get-quizzes.dto';
import { QuizQuestion } from 'src/quiz/entities/quiz-question.entity';
import { QuizResult } from 'src/quiz/entities/quiz-result.entity';
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
     * Quiz Result repository
     */
    @InjectRepository(QuizResult)
    private readonly quizResultRepository: Repository<QuizResult>,
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
    const { answers, userId } = reqBody;

    const quiz = await this.quizRepository.findOne({
      where: { slug },
      relations: {
        quizQuestions: true,
      },
    });

    if (!quiz) throw new NotFoundException();

    let score = 0;

    for (const { correctAnswer, questionNumber } of quiz.quizQuestions) {
      const userAnswer = answers[questionNumber] as number;
      if (userAnswer === correctAnswer) score++;
    }

    const quizResult = {
      score,
      userId,
      quiz,
    };

    const result = await this.quizResultRepository.save(quizResult);

    return result;
  }
}
