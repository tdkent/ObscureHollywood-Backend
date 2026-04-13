import { Module } from '@nestjs/common';
import { StudiosService } from './providers/studios.service';
import { StudiosController } from './studios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Studio } from 'src/studios/entities/studio.entity';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

@Module({
  controllers: [StudiosController],
  providers: [StudiosService, PaginationProvider],
  imports: [TypeOrmModule.forFeature([Studio])],
})
export class StudiosModule {}
