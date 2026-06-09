import { Module } from '@nestjs/common';
import { StudiosService } from './providers/studios.service';
import { StudiosController } from './studios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Studio } from 'src/studios/entities/studio.entity';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { FilmsService } from 'src/films/providers/films.service';
import { Film } from 'src/films/entities/film.entity';

@Module({
  controllers: [StudiosController],
  providers: [StudiosService, PaginationProvider, FilmsService],
  imports: [TypeOrmModule.forFeature([Studio, Film])],
})
export class StudiosModule {}
