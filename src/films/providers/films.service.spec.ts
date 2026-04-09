import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from 'src/films/providers/films.service';
// import { Repository } from 'typeorm';
import { Film } from 'src/films/entities/film.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

describe('FilmsService', () => {
  let service: FilmsService;
  // let repository: jest.Mocked<Repository<Film>>

  const mockFilmRepository = {
    findAll: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: getRepositoryToken(Film),
          useValue: mockFilmRepository,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
    // repository = module.get(getRepositoryToken(Film));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
