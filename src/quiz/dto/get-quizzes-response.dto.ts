import { ApiProperty } from '@nestjs/swagger';
import { PaginatedDataDto } from 'src/common/pagination/dtos/paginated-data-response.dto';
import { QuizResponseDto } from 'src/quiz/dto/quiz-response.dto';

export class GetQuizzesResponseDto extends PaginatedDataDto {
  @ApiProperty({ type: [QuizResponseDto] })
  data: QuizResponseDto[];
}
