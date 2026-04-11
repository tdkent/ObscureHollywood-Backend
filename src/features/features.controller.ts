import { Controller, Get, Param } from '@nestjs/common';
import { FeaturesService } from './features.service';

@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Get()
  findAll() {
    return this.featuresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.featuresService.findOne(+id);
  }
}
