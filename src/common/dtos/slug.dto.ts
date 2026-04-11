import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class SlugDto {
  @ApiProperty({
    description: 'Unique slug to identify resource',
    example: 'name-of-resource',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  slug: string;
}
