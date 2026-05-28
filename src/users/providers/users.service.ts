import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizResult } from 'src/quiz/entities/quiz-result.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { Repository } from 'typeorm';

interface QuizResults {
  totalCount: number;
  distinctCount: number;
  avgScore: number | null;
  quizCount: number;
}

@Injectable()
export class UsersService {
  constructor(
    /** Quiz Result repository */
    @InjectRepository(QuizResult)
    private readonly quizResultRepository: Repository<QuizResult>,
  ) {}

  /** Get count of quizzes, attempts, average score for all quizzes.  */
  public async findQuizResultsByUserId(userId: string) {
    const result = (await this.quizResultRepository
      .createQueryBuilder('quizResult')
      .where('quizResult.userId = :userId', { userId })
      .select('CAST(COUNT(*) AS INT)', 'totalCount')
      .addSelect(
        'CAST(COUNT(DISTINCT quizResult.quiz) AS INT)',
        'distinctCount',
      )
      .addSelect('CAST(ROUND(AVG(quizResult.score), 1) AS DECIMAL)', 'avgScore')
      .addSelect((subQuery) => {
        return subQuery
          .select('CAST(COUNT(*) AS INT)', 'quizCount')
          .from(Quiz, 'quiz');
      })
      .getRawOne()) as QuizResults;

    const percentComplete = Math.round(
      Number((result.distinctCount / result.quizCount) * 100),
    );

    return { ...result, avgScore: Number(result.avgScore), percentComplete };
  }

  /** Get count of attempts, high score, and most recent score for a single quiz. */
  public async findSingleQuizResultByUserId(userId: string, quizSlug: string) {
    return this.quizResultRepository
      .createQueryBuilder('quizResult')
      .innerJoin('quizResult.quiz', 'quiz')
      .where('quizResult.userId = :userId', { userId })
      .andWhere('quiz.slug = :quizSlug', { quizSlug })
      .select('CAST(COUNT(*) AS INT)', 'count')
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
