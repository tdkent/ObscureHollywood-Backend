import { ApiProperty } from '@nestjs/swagger';

export class FeatureResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Corriganville' })
  name: string;

  @ApiProperty({ example: 'A Brief History' })
  subtitle: string;

  @ApiProperty({ example: 'corriganville' })
  slug: string;
}
