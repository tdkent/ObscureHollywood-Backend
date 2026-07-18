import { ApiProperty } from '@nestjs/swagger';

export class StudioResponseDto {
  @ApiProperty({ example: 31 })
  id: number;

  @ApiProperty({ example: 'Triangle Motion Picture Company' })
  name: string;

  @ApiProperty({ example: 'triangle-motion-picture-company' })
  slug: string;

  @ApiProperty({ example: 1915 })
  yearFounded: number | null;

  @ApiProperty({ example: 1922 })
  yearClosed: number | null;

  @ApiProperty({
    example:
      'The "Triangle" in the name referred to prestigious producers D.W. Griffith, Thomas Ince, and Mack Sennett. Purchased by Goldwyn Pictures in 1918.',
  })
  country: 'England' | 'France' | 'Germany' | 'United States' | null;

  @ApiProperty({ example: ['Triangle Film Corporation'] })
  otherNames: string[] | null;

  @ApiProperty({ example: 'United States' })
  description: string | null;
}
