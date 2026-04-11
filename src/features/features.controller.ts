import { Controller, Get, Param, Query } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { GetFeaturesDto } from 'src/features/dto/get-features.dto';
import { SlugDto } from 'src/common/dtos/slug.dto';

@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Get()
  findAll(@Query() reqQuery: GetFeaturesDto) {
    return this.featuresService.findAll(reqQuery);
  }

  @Get(':slug')
  findOne(@Param() params: SlugDto) {
    return this.featuresService.findOne(params.slug);
  }
}
