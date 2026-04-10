import { Module } from '@nestjs/common';
import { FilmsService } from 'src/films/providers/films.service';
import { FilmsController } from 'src/films/films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from 'src/films/entities/film.entity';
import { Article } from 'src/articles/entities/article.entity';
import { Studio } from 'src/studios/entities/studio.entity';
import { FilmTag } from 'src/common/entities/film-tag.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@Module({
  controllers: [FilmsController],
  imports: [TypeOrmModule.forFeature([Article, Film, FilmTag, Studio, Tag])],
  providers: [FilmsService],
})
export class FilmsModule {}
