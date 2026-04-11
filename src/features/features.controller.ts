import { Controller, Get, Param, Query } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { GetFeaturesDto } from 'src/features/dto/get-features.dto';

@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Get()
  findAll(@Query() reqQuery: GetFeaturesDto) {
    return this.featuresService.findAll(reqQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.featuresService.findOne(+id);
  }
}
