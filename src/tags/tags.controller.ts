import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SlugDto } from 'src/common/dtos/slug.dto';
import { GetTagResponseDto } from 'src/tags/dto/get-tag-response.dto';
import { GetFilmsByTagDto } from 'src/tags/dto/get-tag.dto';
import { TagResponseDto } from 'src/tags/dto/tag-response.dto';
import { TagsService } from 'src/tags/providers/tags.service';

@Controller('tags')
@ApiTags('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get tags',
    description: 'Returns a list of all tags sorted by type and name.',
  })
  @ApiOkResponse({
    description: 'An array of tags or an empty array if no data can be found.',
    type: [TagResponseDto],
  })
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(':slug')
  @ApiOperation({
    summary: 'Get one tag by unique slug',
    description: 'Returns a single tag and related article and films.',
  })
  @ApiParam({
    name: 'slug',
    description: 'Unique slug to identify the tag.',
    example: 'decade-1930s',
  })
  @ApiOkResponse({
    description: 'Object containing tag and relations data.',
    type: GetTagResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'The slug parameter is invalid.',
  })
  @ApiNotFoundResponse({
    description: 'No tag was found for the provided slug.',
  })
  findOne(@Param() reqParams: SlugDto) {
    return this.tagsService.findOne(reqParams.slug);
  }

  @Get(':slug/films')
  findFilmsByTag(
    @Param() reqParams: SlugDto,
    @Query() reqQuery: GetFilmsByTagDto,
  ) {
    return this.tagsService.findFilmsByTag(reqParams.slug, reqQuery);
  }
}
