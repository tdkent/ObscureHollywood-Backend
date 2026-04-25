import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesController } from 'src/articles/articles.controller';
import { ArticleRelation } from 'src/articles/entities/article-relation.entity';
import { Article } from 'src/articles/entities/article.entity';
import { ArticlesService } from 'src/articles/providers/articles.service';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { DataSource } from 'typeorm';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService, PaginationProvider],
  imports: [TypeOrmModule.forFeature([Article, ArticleRelation, DataSource])],
})
export class ArticlesModule {}
