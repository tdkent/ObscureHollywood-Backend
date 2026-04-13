import { Controller, Get, Param } from '@nestjs/common';
import { StudiosService } from './providers/studios.service';

@Controller('studios')
export class StudiosController {
  constructor(private readonly studiosService: StudiosService) {}

  @Get()
  findAll() {
    return this.studiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studiosService.findOne(+id);
  }
}
