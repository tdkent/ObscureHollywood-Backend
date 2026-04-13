import { ApiProperty } from '@nestjs/swagger';

export class TagResponseDto {
  @ApiProperty({ example: 2 })
  id: number;

  @ApiProperty({ example: '1910s' })
  name: string;

  @ApiProperty({ example: 'decade-1910s' })
  slug: string;

  @ApiProperty({ example: 'decade' })
  type: 'decade' | 'genre' | 'production' | 'theme';
}
