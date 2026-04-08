import { Module } from '@nestjs/common';
import { FilmsService } from './providers/films.service';
import { FilmsController } from './films.controller';

@Module({
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
