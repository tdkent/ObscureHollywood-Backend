import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Quiz, type Quiz as QuizType } from 'src/quiz/entities/quiz.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class QuizQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 250,
  })
  questionText: string;

  @Column({
    type: 'smallint',
  })
  questionNumber: number;

  @Column({
    type: 'text',
    array: true,
  })
  answerOptions: string[];

  @Column({
    type: 'smallint',
  })
  correctAnswer: number;

  @Column({
    type: 'varchar',
    length: 64,
  })
  @Exclude()
  quizSlug: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @ManyToOne(() => Quiz, (quiz) => quiz.quizQuestions)
  quiz: QuizType;
}
