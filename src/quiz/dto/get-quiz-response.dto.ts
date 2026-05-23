import { ApiProperty } from '@nestjs/swagger';
import { QuizResponseDto } from 'src/quiz/dto/quiz-response.dto';
import { QuizQuestionResponseDto } from 'src/quiz/dto/quiz-question-response.dto';

export class GetQuizResponseDto extends QuizResponseDto {
  @ApiProperty({ type: [QuizQuestionResponseDto] })
  quizQuestions: QuizQuestionResponseDto[];
}
