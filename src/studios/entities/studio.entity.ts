import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Film, type Film as FilmType } from 'src/films/entities/film.entity';
import { Exclude } from 'class-transformer';
import { StudioRelation } from 'src/studios/entities/studio-relation.entity';

enum Country {
  ENGLAND = 'England',
  FRANCE = 'France',
  GERMANY = 'Germany',
  USA = 'United States',
}

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

  @Column({
    type: 'smallint',
    nullable: true,
  })
  yearFounded: number;

  @Column({
    type: 'smallint',
    nullable: true,
  })
  yearClosed: number;

  @Column({
    type: 'enum',
    enum: Country,
    nullable: true,
  })
  country: Country;

  @Column({
    type: 'text',
    array: true,
    nullable: true,
  })
  otherNames: string[];

  @Column({
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  description: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @OneToMany(() => Film, (film) => film.studio, {
    onDelete: 'CASCADE',
  })
  films: FilmType[];

  @OneToMany(() => StudioRelation, (st) => st.studio)
  outgoingRelations: StudioRelation[];

  @OneToMany(() => StudioRelation, (st) => st.relatedStudio)
  incomingRelations: StudioRelation[];
}
