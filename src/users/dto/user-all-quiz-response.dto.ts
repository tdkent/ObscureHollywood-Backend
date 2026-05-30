import { ApiProperty } from '@nestjs/swagger';
import { QuizResult } from 'src/quiz/entities/quiz-result.entity';

export class UserQuizResponseDto {
  @ApiProperty({ example: 10 })
  totalCount: number;

  @ApiProperty({ example: 5 })
  distinctCount: number;

  @ApiProperty({ example: 7.5 })
  avgScore: number;

  @ApiProperty({ example: 50 })
  quizCount: number;

  @ApiProperty({ example: 10 })
  percentComplete: number;

  @ApiProperty({ example: [] })
  recentActivity: QuizResult[];
}
