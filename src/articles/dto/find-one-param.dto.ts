import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindOneParamDto {
  @ApiProperty({
    description: 'ID of the article.',
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  id: number;
}
