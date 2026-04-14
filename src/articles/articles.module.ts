import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRelation } from 'src/articles/entities/article-relation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleRelation])],
})
export class ArticlesModule {}
