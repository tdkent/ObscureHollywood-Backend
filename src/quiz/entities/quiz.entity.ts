import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QuizQuestion } from 'src/quiz/entities/quiz-question.entity';
import { Exclude } from 'class-transformer';
import { QuizResult } from 'src/quiz/entities/quiz-result.entity';

export enum Theme {
  FILMS = 'films',
  GENRES = 'genres',
  PEOPLE = 'people',
}

@Entity()
export class Quiz {
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
    type: 'enum',
    enum: Theme,
  })
  theme: Theme;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @OneToMany(() => QuizQuestion, (qq) => qq.quiz, {
    onDelete: 'CASCADE',
  })
  quizQuestions: QuizQuestion[];

  @OneToMany(() => QuizResult, (qr) => qr.quiz, {
    onDelete: 'CASCADE',
  })
  quizResults: QuizResult[];
}
