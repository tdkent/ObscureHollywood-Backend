import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from 'src/films/providers/films.service';
import { Repository } from 'typeorm';
import { Film } from 'src/films/entities/film.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

describe('FilmsService', () => {
  let service: FilmsService;
  let repository: jest.Mocked<
    Pick<Repository<Partial<Film>>, 'find' | 'count'>
  >;

  const mockFilmRepository: jest.Mocked<
    Pick<Repository<Film>, 'find' | 'count'>
  > = {
    find: jest.fn(),
    count: jest.fn(),
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
    repository = module.get(getRepositoryToken(Film));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll() database function', () => {
    it('should call repository.count() and repository.find()', async () => {
      repository.find.mockResolvedValue([]);
      await service.findAll({ limit: 25, page: 100, orderBy: 'nameAsc' });
      expect(repository.count).toHaveBeenCalledTimes(1);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });

    it('should return an array of Film items', async () => {
      const films: Partial<Film>[] = [{ id: 1 }, { id: 2 }, { id: 3 }];
      repository.find.mockResolvedValue(films);
      const result = await service.findAll({
        limit: 10,
        page: 1,
        orderBy: 'nameAsc',
      });
      expect(result.data).toEqual(films);
    });

    it('should return an empty array if no data can be found', async () => {
      repository.find.mockResolvedValue([]);
      const result = await service.findAll({
        limit: 25,
        page: 100,
        orderBy: 'nameAsc',
      });
      expect(result.data).toEqual([]);
    });
  });
});
