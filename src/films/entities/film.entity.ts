import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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
  FilmTag,
  type FilmTag as FilmTagType,
} from 'src/films/entities/film-tag.entity';
import {
  PersonFilm,
  type PersonFilm as PersonFilmType,
} from 'src/persons/entities/person-film.entity';
import {
  Studio,
  type Studio as StudioType,
} from 'src/studios/entities/studio.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Film {
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
    length: 64,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 64,
  })
  @Exclude()
  sortName: string;

  @Column({
    type: 'smallint',
  })
  releaseYear: number;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @OneToOne(() => Article, (article) => article.film, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  article: ArticleType; // use type to avoid ReferenceError

  @ManyToOne(() => Studio, (studio) => studio.films)
  studio: StudioType;

  @OneToMany(() => PersonFilm, (pf) => pf.film)
  personFilms: PersonFilmType[];

  @OneToMany(() => FilmTag, (filmTag) => filmTag.film)
  filmTags: FilmTagType[];
}
