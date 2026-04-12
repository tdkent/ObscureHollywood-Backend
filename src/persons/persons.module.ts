import { Module } from '@nestjs/common';
import { PersonsService } from 'src/persons/providers/persons.service';
import { PersonsController } from 'src/persons/persons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/persons/entities/person.entity';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

@Module({
  controllers: [PersonsController],
  providers: [PersonsService, PaginationProvider],
  imports: [TypeOrmModule.forFeature([Person])],
})
export class PersonsModule {}
