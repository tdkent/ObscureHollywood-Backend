import { Exclude } from 'class-transformer';
import { Quiz, type Quiz as QuizType } from 'src/quiz/entities/quiz.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class QuizResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 64,
  })
  userId: string;

  @Column({
    type: 'smallint',
  })
  score: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @ManyToOne(() => Quiz, (quiz) => quiz.quizResults)
  quiz: QuizType;
}
