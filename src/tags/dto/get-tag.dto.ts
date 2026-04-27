import { OmitType } from '@nestjs/swagger';
import { GetFilmsDto } from 'src/films/dto/get-films.dto';

export class GetFilmsByTagDto extends OmitType(GetFilmsDto, ['tag']) {}
