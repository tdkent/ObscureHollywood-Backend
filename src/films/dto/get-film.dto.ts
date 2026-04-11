import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class GetFilmDto {
  @ApiProperty({
    description: 'Film title slug',
    example: 'the-americano-1916',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  slug: string;
}
