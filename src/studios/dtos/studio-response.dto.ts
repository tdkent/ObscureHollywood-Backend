import { ApiProperty } from '@nestjs/swagger';

export class StudioResponseDto {
  @ApiProperty({ example: 31 })
  id: number;

  @ApiProperty({ example: 'Triangle Motion Picture Company' })
  name: string;

  @ApiProperty({ example: 'triangle-motion-picture-company' })
  slug: string;
}
