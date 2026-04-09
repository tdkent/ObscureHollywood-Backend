import {
  Column,
  CreateDateColumn,
  Entity,
  // JoinColumn,
  // ManyToOne,
  // OneToMany,
  // OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// import {
// 	Article,
// 	type Article as ArticleType,
// } from "../Article/Article.entity.js";
// import {
// 	FilmTag,
// 	type FilmTag as FilmTagType,
// } from "../FilmTag/FilmTag.entity.js";
// import {
// 	PersonFilm,
// 	type PersonFilm as PersonFilmType,
// } from "../PersonFilm/PersonFilm.entity.js";
// import { Studio, type Studio as StudioType } from "../Studio/Studio.entity.js";

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
  sortName: string;

  @Column({
    type: 'smallint',
  })
  releaseYear: number;

  @Column({
    type: 'boolean',
  })
  isSilent: boolean;

  @Column({
    type: 'boolean',
  })
  isPreCode: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @OneToOne(
  // 	() => Article,
  // 	(article) => article.film,
  // 	{
  // 		onDelete: "CASCADE",
  // 	},
  // )
  // @JoinColumn()
  // article: ArticleType; // use type to avoid ReferenceError

  // @ManyToOne(
  // 	() => Studio,
  // 	(studio) => studio.films,
  // )
  // studio: StudioType;

  // @OneToMany(
  // 	() => PersonFilm,
  // 	(pf) => pf.film,
  // )
  // personFilms: PersonFilmType[];

  // @OneToMany(
  // 	() => FilmTag,
  // 	(filmTag) => filmTag.film,
  // )
  // filmTags: FilmTagType[];
}
