import { PaginatedDataDto } from 'src/common/pagination/dtos/paginated-data-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { StudioResponseDto } from 'src/studios/dto/studio-response.dto';

export class GetStudiosResponseDto extends PaginatedDataDto {
  @ApiProperty({ type: [StudioResponseDto] })
  data: StudioResponseDto[];
}
