import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizResultResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '52809afb-151d-44bc-9cd3-0f3161c1bd46' })
  uuid: string;

  @ApiProperty({ example: 5 })
  score: number;

  @ApiProperty({
    description: 'Array containing question numbers with correct answers.',
    example: [1, 2, 3, 4, 5],
  })
  correct: number[];

  @ApiProperty({ example: '2026-05-28T02:36:09.558Z' })
  createdAt: string;
}
