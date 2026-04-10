import { IsString, MaxLength, MinLength } from 'class-validator';

export class GetFilmDto {
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  slug: string;
}
