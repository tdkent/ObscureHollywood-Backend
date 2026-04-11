import { ApiProperty } from '@nestjs/swagger';
import { TagResponseDto } from 'src/tag/dtos/tag-response.dto';

class FilmTag {
  @ApiProperty({ example: 364 })
  id: number;
}

export class FilmTagResponseDto extends FilmTag {
  @ApiProperty({ type: TagResponseDto })
  tag: TagResponseDto;
}
