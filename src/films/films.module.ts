import { Module } from '@nestjs/common';
import { FilmsService } from 'src/films/providers/films.service';
import { FilmsController } from 'src/films/films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from 'src/films/entities/film.entity';

@Module({
  controllers: [FilmsController],
  imports: [TypeOrmModule.forFeature([Film])],
  providers: [FilmsService],
})
export class FilmsModule {}
