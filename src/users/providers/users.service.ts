import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizResult } from 'src/quiz/entities/quiz-result.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    /** Quiz Result repository */
    @InjectRepository(QuizResult)
    private readonly quizResultRepository: Repository<QuizResult>,
  ) {}

  public findUserQuizResults(userId: string) {
    return this.quizResultRepository.find({
      where: { userId },
      relations: { quiz: true },
    });
  }

  /** Get count of attempts, high score, and most recent score. */
  public async findUserSingleQuizResults(userId: string, quizSlug: string) {
    return this.quizResultRepository
      .createQueryBuilder('quizResult')
      .innerJoin('quizResult.quiz', 'quiz')
      .where('quizResult.userId = :userId', { userId })
      .andWhere('quiz.slug = :quizSlug', { quizSlug })
      .select('COUNT(*)', 'count')
      .addSelect('MAX(quizResult.score)', 'highScore')
      .addSelect((subQuery) => {
        return subQuery
          .select('quizResult.score', 'prevScore')
          .from(QuizResult, 'quizResult')
          .innerJoin('quizResult.quiz', 'quiz')
          .where('quizResult.userId = :userId', { userId })
          .andWhere('quiz.slug = :quizSlug', { quizSlug })
          .orderBy('quizResult.createdAt', 'DESC')
          .limit(1);
      })
      .getRawOne();
  }
}
