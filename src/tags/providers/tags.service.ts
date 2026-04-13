import { Injectable } from '@nestjs/common';
import { GetTagsDto } from 'src/tags/dto/get-tag.dto';

@Injectable()
export class TagsService {
  findAll(reqQuery: GetTagsDto) {
    return reqQuery;
  }

  findOne(slug: string) {
    return `This action returns a ${slug} tag`;
  }
}
