import { Module } from '@nestjs/common';
import { FilmsService } from './providers/films.service';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from 'src/films/entities/film.entity';

@Module({
  controllers: [FilmsController],
  imports: [TypeOrmModule.forFeature([Film])],
  providers: [FilmsService],
})
export class FilmsModule {}
