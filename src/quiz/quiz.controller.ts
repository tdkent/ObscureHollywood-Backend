import { Controller, Get, Param, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { GetQuizzesDto } from 'src/quiz/dto/get-quizzes.dto';
import {
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { GetQuizzesResponseDto } from 'src/quiz/dto/get-quizzes-response.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  @ApiOperation({
    summary: 'Get quizzes',
    description:
      'Returns a paginated list of quizzes. Supports pagination and sorting query parameters.',
  })
  @ApiOkResponse({
    description:
      'An array of quizzes or an empty array if no data can be found.',
    type: GetQuizzesResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'One or more query parameters are invalid.',
  })
  findAll(@Query() reqQuery: GetQuizzesDto) {
    return this.quizService.findAll(reqQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(+id);
  }
}
