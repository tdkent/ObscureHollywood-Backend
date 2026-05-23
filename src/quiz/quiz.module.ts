import { Module } from '@nestjs/common';
import { QuizService } from 'src/quiz/providers/quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

@Module({
  controllers: [QuizController],
  providers: [QuizService, PaginationProvider],
  imports: [TypeOrmModule.forFeature([Quiz])],
})
export class QuizModule {}
