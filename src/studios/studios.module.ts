import { Module } from '@nestjs/common';
import { StudiosService } from './providers/studios.service';
import { StudiosController } from './studios.controller';

@Module({
  controllers: [StudiosController],
  providers: [StudiosService],
})
export class StudiosModule {}
