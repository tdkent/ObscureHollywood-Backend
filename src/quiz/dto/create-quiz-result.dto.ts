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
  @IsUUID()
  userId: string;

  @IsObject()
  @ValidateNested()
  @Type(() => Answers)
  answers: Answers;
}
