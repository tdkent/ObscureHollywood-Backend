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

  public findById(userId: string) {
    return this.quizResultRepository.find({
      where: { userId },
      relations: { quiz: true },
    });
  }

  public findQuizResultsById(userId: string, quizSlug: string) {
    return { userId, quizSlug };
  }
}
