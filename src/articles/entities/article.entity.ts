import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArticleRelation } from 'src/articles/entities/article-relation.entity';
import { Film, Film as FilmType } from 'src/films/entities/film.entity';
import {
  Person,
  type Person as PersonType,
} from 'src/persons/entities/person.entity';
import { Exclude } from 'class-transformer';

export enum Category {
  FEATURE = 'feature',
  FILM = 'film',
  PERSON = 'person',
}

@Entity()
export class Article {
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

  @Column({
    type: 'enum',
    enum: Category,
  })
  category: Category;

  @Column({
    type: 'text',
  })
  htmlContent: string;

  @Column({
    type: 'text',
  })
  @Exclude()
  textContent: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @OneToOne(() => Film, (film) => film.article)
  film: FilmType;

  @OneToOne(() => Person, (person) => person.article)
  person: PersonType;

  @OneToMany(() => ArticleRelation, (ar) => ar.article)
  outgoingRelations: ArticleRelation[];

  @OneToMany(() => ArticleRelation, (ar) => ar.relatedArticle)
  incomingRelations: ArticleRelation[];
}
