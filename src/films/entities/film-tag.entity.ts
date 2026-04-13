import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Film, type Film as FilmType } from 'src/films/entities/film.entity';
import { Tag, type Tag as TagType } from 'src/tags/entities/tag-v1.entity';

@Entity()
@Unique(['film', 'tag'])
export class FilmTag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Film, (film) => film.filmTags, { onDelete: 'CASCADE' })
  film: FilmType;

  @ManyToOne(() => Tag, (tag) => tag.filmTags, { onDelete: 'CASCADE' })
  tag: TagType;
}
