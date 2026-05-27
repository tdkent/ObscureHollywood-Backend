import { ApiProperty } from '@nestjs/swagger';

export class QuizQuestionResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Which actor did not make a silent film?' })
  questionText: string;

  @ApiProperty({ example: 1 })
  questionNumber: number;

  @ApiProperty({
    example: ['Joan Crawford', 'Loretta Young', 'Kay Francis', 'Marion Davies'],
  })
  answerOptions: string[];
}
