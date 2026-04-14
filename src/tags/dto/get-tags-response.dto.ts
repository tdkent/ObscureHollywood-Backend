import { PaginatedDataDto } from 'src/common/pagination/dtos/paginated-data-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { TagResponseDto } from 'src/tags/dto/tag-response.dto';

export class GetTagsResponseDto extends PaginatedDataDto {
  @ApiProperty({ type: [TagResponseDto] })
  data: TagResponseDto[];
}
