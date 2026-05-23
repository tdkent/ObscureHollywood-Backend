import { Controller, Get, Param, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { GetQuizzesDto } from 'src/quiz/dto/get-quizzes.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  findAll(@Query() reqQuery: GetQuizzesDto) {
    return this.quizService.findAll(reqQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(+id);
  }
}
