import { ApiProperty } from '@nestjs/swagger';

export class PersonResponseDto {
  @ApiProperty({ example: 36 })
  id: number;

  @ApiProperty({ example: 'Alma' })
  firstName: string;

  @ApiProperty({ example: 'Rubens' })
  lastName: string;

  @ApiProperty({ example: '1897-02-19' })
  birthYear: Date;

  @ApiProperty({ example: '1931-02-22' })
  deathYear: Date;

  @ApiProperty({ example: 'San Francisco, California' })
  birthPlace: string;

  @ApiProperty({ example: 'Los Angeles, California' })
  deathPlace: string;
}
