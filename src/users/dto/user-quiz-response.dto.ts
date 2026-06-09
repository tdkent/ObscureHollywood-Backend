import { ApiProperty } from '@nestjs/swagger';

export class UserSingleQuizResponseDto {
  @ApiProperty({ example: 20 })
  count: number;

  @ApiProperty({ example: 10 })
  highScore: number;

  @ApiProperty({ example: 10 })
  prevScore: number;
}
