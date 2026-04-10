import {
  Column,
  CreateDateColumn,
  Entity,
  // OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { ArticleRelation } from "../ArticleRelation/ArticleRelation.entity.js";
import { Film, Film as FilmType } from 'src/films/entities/film.entity';
import {
  Person,
  type Person as PersonType,
} from 'src/persons/entities/person.entity';

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
  textContent: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Film, (film) => film.article)
  film: FilmType;

  @OneToOne(() => Person, (person) => person.article)
  person: PersonType;

  // @OneToMany(
  // 	() => ArticleRelation,
  // 	(ar) => ar.article,
  // )
  // outgoingRelations: ArticleRelation[];

  // @OneToMany(
  // 	() => ArticleRelation,
  // 	(ar) => ar.relatedArticle,
  // )
  // incomingRelations: ArticleRelation[];
}
