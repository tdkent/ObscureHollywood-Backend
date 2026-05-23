import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizService {
  findAll() {
    return `This action returns all quiz`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }
}
