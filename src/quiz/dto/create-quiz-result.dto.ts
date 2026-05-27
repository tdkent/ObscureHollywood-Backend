import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsObject,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

class Answers {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(4)
  1: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(4)
  2: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(4)
  3: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(4)
  4: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(4)
  5: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(4)
  6: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(4)
  7: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(4)
  8: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(4)
  9: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(4)
  10: number;
}

export class CreateQuizResultDto {
  @ApiProperty({
    example: '52809afb-151d-44bc-9cd3-0f3161c1bd46',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description:
      'Object containing question numbers (1-10) and answers (an integer 1-4).',
    example: {
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '1',
      '6': '2',
      '7': '3',
      '8': '4',
      '9': '1',
      '10': '2',
    },
  })
  @IsObject()
  @ValidateNested()
  @Type(() => Answers)
  answers: Answers;
}
