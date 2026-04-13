import { Controller, Get, Param, Query } from '@nestjs/common';
import { SlugDto } from 'src/common/dtos/slug.dto';
import { GetTagsDto } from 'src/tags/dto/get-tag.dto';
import { TagsService } from 'src/tags/providers/tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  findAll(@Query() reqQuery: GetTagsDto) {
    return this.tagsService.findAll(reqQuery);
  }

  @Get(':slug')
  findOne(@Param() reqParams: SlugDto) {
    return this.tagsService.findOne(reqParams.slug);
  }
}
