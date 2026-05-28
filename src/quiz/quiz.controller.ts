import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { QuizService } from 'src/quiz/providers/quiz.service';
import { GetQuizzesDto } from 'src/quiz/dto/get-quizzes.dto';
import {
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';
import { GetQuizzesResponseDto } from 'src/quiz/dto/get-quizzes-response.dto';
import { SlugDto } from 'src/common/dtos/slug.dto';
import { GetQuizResponseDto } from 'src/quiz/dto/get-quiz-response.dto';
import { CreateQuizResultDto } from 'src/quiz/dto/create-quiz-result.dto';
import { CreateQuizResultResponseDto } from 'src/quiz/dto/create-quiz-result-response.dto';

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

  @Get(':slug')
  @ApiOperation({
    summary: 'Get one quiz by unique slug',
    description: 'Returns a single quiz, including its related questions.',
  })
  @ApiParam({
    name: 'slug',
    description: 'Unique slug to identify the quiz.',
    example: 'at-the-movies',
  })
  @ApiOkResponse({
    description: 'Object containing quiz and relations data.',
    type: GetQuizResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'The slug parameter is invalid.',
  })
  @ApiNotFoundResponse({
    description: 'No quiz was found for the provided slug.',
  })
  findOne(@Param() params: SlugDto) {
    return this.quizService.findOne(params.slug);
  }

  @Post(':slug/result')
  @ApiOperation({
    summary: 'Create results for one attempted quiz.',
    description:
      'Calculate score from received answers and add result to database.',
  })
  @ApiParam({
    name: 'slug',
    description: 'Unique slug to identify the quiz.',
    example: 'at-the-movies',
  })
  @ApiOkResponse({
    description: 'Object containing score and correct answers.',
    type: CreateQuizResultResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'One or mores parameters are invalid.',
  })
  @ApiNotFoundResponse({
    description: 'No quiz was found for the provided slug.',
  })
  createQuizResult(
    @Param() params: SlugDto,
    @Body() reqBody: CreateQuizResultDto,
  ) {
    return this.quizService.createQuizResult(params.slug, reqBody);
  }
}
