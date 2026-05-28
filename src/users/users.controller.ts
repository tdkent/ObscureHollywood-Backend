import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { GetUserDto } from 'src/users/dto/get-user.dto';
import { GetUserQuizResultsDto } from 'src/users/dto/get-user-quiz-results.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get(':userId')
  public findById(@Param() params: GetUserDto) {
    return this.usersService.findUserQuizResults(params.userId);
  }

  @Get(':userId/quiz-results/:slug')
  public findQuizResultsById(@Param() params: GetUserQuizResultsDto) {
    return this.usersService.findUserSingleQuizResults(
      params.userId,
      params.slug,
    );
  }
}
