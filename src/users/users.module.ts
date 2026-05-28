import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizResult } from 'src/quiz/entities/quiz-result.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([QuizResult])],
})
export class UsersModule {}
