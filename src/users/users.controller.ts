import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { GetUserDto } from 'src/users/dto/get-user.dto';
import { GetUserQuizResultsDto } from 'src/users/dto/get-user-quiz-results.dto';
import {
  ApiOperation,
  ApiOkResponse,
  ApiParam,
  ApiBadRequestResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserQuizResponseDto } from 'src/users/dto/user-all-quiz-response.dto';
import { UserSingleQuizResponseDto } from 'src/users/dto/user-quiz-response.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get(':userId')
  @ApiOperation({
    summary: 'Get user results for all quizzes.',
  })
  @ApiParam({
    name: 'userId',
    description: 'Unique uuid to identify the user.',
  })
  @ApiOkResponse({
    type: UserQuizResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'The uuid parameter is invalid.',
  })
  public findQuizResultsByUserId(@Param() params: GetUserDto) {
    return this.usersService.findQuizResultsByUserId(params.userId);
  }

  @Get(':userId/quiz-results/:slug')
  @ApiOperation({
    summary: 'Get users results for a single quiz.',
  })
  @ApiParam({
    name: 'userId',
    description: 'Unique uuid to identify the user.',
  })
  @ApiParam({
    name: 'slug',
    description: 'Unique slug to identify the quiz.',
    example: 'at-the-movies',
  })
  @ApiOkResponse({
    type: UserSingleQuizResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'One or more parameters is invalid.',
  })
  public findSingleQuizResultByUserId(@Param() params: GetUserQuizResultsDto) {
    return this.usersService.findSingleQuizResultByUserId(
      params.userId,
      params.slug,
    );
  }
}
