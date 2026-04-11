import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  Article,
  type Article as ArticleType,
} from 'src/articles/entities/article.entity';

@Entity()
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 64,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 64,
    unique: true,
  })
  slug: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Article, (article) => article.film, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  article: ArticleType;
}
