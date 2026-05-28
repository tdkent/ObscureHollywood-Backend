import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  public findById(userId: string) {
    return userId;
  }

  public findQuizResultsById(userId: string, quizSlug: string) {
    return { userId, quizSlug };
  }
}
