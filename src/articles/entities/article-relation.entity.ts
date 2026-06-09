import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import {
  Article,
  type Article as ArticleType,
} from 'src/articles/entities/article.entity';

@Entity()
@Unique(['article', 'relatedArticle'])
export class ArticleRelation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Article, (article) => article.id, { onDelete: 'CASCADE' })
  article: ArticleType;

  @ManyToOne(() => Article, (article) => article.id, { onDelete: 'CASCADE' })
  relatedArticle: ArticleType;
}
