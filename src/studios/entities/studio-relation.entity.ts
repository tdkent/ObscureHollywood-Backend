import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import {
  Studio,
  type Studio as StudioType,
} from 'src/studios/entities/studio.entity';

@Entity()
@Unique(['studio', 'relatedStudio'])
export class StudioRelation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Studio, (studio) => studio.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  studio: StudioType;

  @ManyToOne(() => Studio, (studio) => studio.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  relatedStudio: StudioType;
}
