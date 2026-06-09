import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Film } from 'src/films/entities/film.entity';
import { FilmsService } from 'src/films/providers/films.service';
import { Tag } from 'src/tags/entities/tag.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { TagsController } from 'src/tags/tags.controller';

@Module({
  controllers: [TagsController],
  providers: [TagsService, FilmsService, PaginationProvider],
  imports: [TypeOrmModule.forFeature([Tag, Film])],
})
export class TagsModule {}
