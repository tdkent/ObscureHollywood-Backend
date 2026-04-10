import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Film, type Film as FilmType } from 'src/films/entities/film.entity';
import {
  Person,
  type Person as PersonType,
} from 'src/persons/entities/person.entity';

export enum Role {
  ACTOR = 'actor',
  DIRECTOR = 'director',
  WRITER = 'writer',
}

@Entity()
@Unique(['person', 'film', 'role'])
export class PersonFilm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;

  @Column({
    type: 'smallint',
    nullable: true,
  })
  castPosition: number;

  @ManyToOne(() => Person, (person) => person.personFilms, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  person: PersonType;

  @ManyToOne(() => Film, (film) => film.personFilms, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  film: FilmType;
}
