import { Module } from '@nestjs/common';
import { QuizService } from 'src/quiz/providers/quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { QuizQuestion } from 'src/quiz/entities/quiz-question.entity';

@Module({
  controllers: [QuizController],
  providers: [QuizService, PaginationProvider],
  imports: [TypeOrmModule.forFeature([Quiz, QuizQuestion])],
})
export class QuizModule {}
