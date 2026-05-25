import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateQuizResultDto {
  @IsUUID()
  userId: string;

  @IsArray()
  @ArrayMinSize(10)
  @ArrayMaxSize(10)
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(4, { each: true })
  answers: number[];
}
