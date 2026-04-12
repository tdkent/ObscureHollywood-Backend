import { ApiProperty } from '@nestjs/swagger';
import { PaginatedDataDto } from 'src/common/pagination/dtos/paginated-data-response.dto';
import { FeatureResponseDto } from 'src/features/dto/feature-response.dto';

export class GetFeaturesResponseDto extends PaginatedDataDto {
  @ApiProperty({ type: [FeatureResponseDto] })
  data: FeatureResponseDto[];
}
