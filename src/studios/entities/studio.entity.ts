import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Film, type Film as FilmType } from 'src/films/entities/film.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Studio {
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
    unique: true,
  })
  name: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @OneToMany(() => Film, (film) => film.studio, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  films: FilmType[];
}
