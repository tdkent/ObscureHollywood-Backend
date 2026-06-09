import { Controller, Get, Param, Query } from '@nestjs/common';
import { FeaturesService } from 'src/features/providers/features.service';
import { GetFeaturesDto } from 'src/features/dto/get-features.dto';
import { SlugDto } from 'src/common/dtos/slug.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GetFeaturesResponseDto } from 'src/features/dto/get-features-response.dto';
import { GetFeatureResponseDto } from 'src/features/dto/get-feature-response.dto';

@Controller('features')
@ApiTags('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get features',
    description:
      'Returns a paginated list of features. Supports pagination and sorting query parameters.',
  })
  @ApiOkResponse({
    description:
      'An array of features or an empty array if no data can be found.',
    type: GetFeaturesResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'One or more query parameters are invalid.',
  })
  findAll(@Query() reqQuery: GetFeaturesDto) {
    return this.featuresService.findAll(reqQuery);
  }

  @Get('recent')
  findRecent() {
    return this.featuresService.findRecent();
  }

  @Get(':slug')
  @ApiOperation({
    summary: 'Get one feature by unique slug',
    description:
      'Returns a single feature, including its related article, people, studios, and tags.',
  })
  @ApiParam({
    name: 'slug',
    description: 'Unique slug to identify the feature.',
    example: 'corriganville',
  })
  @ApiOkResponse({
    description: 'Object containing feature and relations data.',
    type: GetFeatureResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'The slug parameter is invalid.',
  })
  @ApiNotFoundResponse({
    description: 'No feature was found for the provided slug.',
  })
  findOne(@Param() params: SlugDto) {
    return this.featuresService.findOne(params.slug);
  }
}
