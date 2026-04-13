import { Controller, Get, Param, Query } from '@nestjs/common';
import { StudiosService } from './providers/studios.service';
import { GetStudiosDto } from 'src/studios/dto/get-studio.dto';

@Controller('studios')
export class StudiosController {
  constructor(private readonly studiosService: StudiosService) {}

  @Get()
  findAll(@Query() reqQuery: GetStudiosDto) {
    return this.studiosService.findAll(reqQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studiosService.findOne(+id);
  }
}
