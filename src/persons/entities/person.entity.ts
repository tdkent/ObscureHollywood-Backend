import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  Article,
  type Article as ArticleType,
} from 'src/articles/entities/article.entity';
import {
  PersonFilm,
  type PersonFilm as PersonFilmType,
} from 'src/persons/entities/person-film.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 64,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'varchar',
    length: 32,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 32,
  })
  lastName: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthDate: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  deathDate: Date;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  birthPlace: string;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  deathPlace: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @OneToOne(() => Article, (article) => article.person, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  article: ArticleType;

  @OneToMany(() => PersonFilm, (pf) => pf.person)
  personFilms: PersonFilmType[];
}
