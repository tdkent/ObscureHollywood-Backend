import { IntersectionType } from '@nestjs/swagger';
import { SlugDto } from 'src/common/dtos/slug.dto';
import { GetUserDto } from 'src/users/dto/get-user.dto';

export class GetUserQuizResultsDto extends IntersectionType(
  GetUserDto,
  SlugDto,
) {}
