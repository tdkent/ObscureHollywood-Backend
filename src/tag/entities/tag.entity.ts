import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {
  FilmTag,
  type FilmTag as FilmTagType,
} from 'src/films/entities/film-tag.entity';

enum Type {
  DECADE = 'decade',
  GENRE = 'genre',
  PRODUCTION = 'production',
  THEME = 'theme',
}

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 32,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'varchar',
    length: 32,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: Type,
  })
  type: Type;

  @OneToMany(() => FilmTag, (filmTag) => filmTag.tag)
  filmTags: FilmTagType[];
}
