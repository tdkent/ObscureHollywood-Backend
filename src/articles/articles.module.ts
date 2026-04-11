import { Module } from '@nestjs/common';
import { ArticlesService } from './providers/articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRelation } from 'src/articles/entities/article-relation.entity';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [TypeOrmModule.forFeature([ArticleRelation])],
})
export class ArticlesModule {}
