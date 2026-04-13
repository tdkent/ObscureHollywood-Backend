import { Injectable } from '@nestjs/common';
import { GetStudiosDto } from 'src/studios/dto/get-studio.dto';

@Injectable()
export class StudiosService {
  findAll(reqQuery: GetStudiosDto) {
    return reqQuery;
  }

  findOne(id: number) {
    return `This action returns a #${id} studio`;
  }
}
