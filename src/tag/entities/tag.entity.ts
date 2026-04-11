import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  FilmTag,
  type FilmTag as FilmTagType,
} from 'src/films/entities/film-tag.entity';
import { Exclude } from 'class-transformer';

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

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @OneToMany(() => FilmTag, (filmTag) => filmTag.tag)
  filmTags: FilmTagType[];
}
