import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/persons/entities/person.entity';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

@Module({
  controllers: [PersonsController],
  providers: [PersonsService, PaginationProvider],
  imports: [TypeOrmModule.forFeature([Person])],
})
export class PersonsModule {}
