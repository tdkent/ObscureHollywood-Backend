import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from 'src/films/providers/films.service';
import { Repository } from 'typeorm';
import { Film } from 'src/films/entities/film.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { GetFilmsDto } from 'src/films/dto/get-films.dto';

describe('FilmsService', () => {
  let service: FilmsService;
  let repository: jest.Mocked<
    Pick<Repository<Partial<Film>>, 'find' | 'findOne' | 'count'>
  >;

  const mockFilmRepository: jest.Mocked<
    Pick<Repository<Partial<Film>>, 'find' | 'findOne' | 'count'>
  > = {
    find: jest.fn(),
    findOne: jest.fn(),
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

  describe('findAll', () => {
    const query: GetFilmsDto = { limit: 3, orderBy: 'nameAsc', page: 1 };

    it('should call repository.count() and repository.find()', async () => {
      repository.count.mockResolvedValue(0);
      repository.find.mockResolvedValue([]);

      await service.findAll(query);

      expect(repository.count).toHaveBeenCalledTimes(1);
      expect(repository.find).toHaveBeenCalledTimes(1);
      expect(repository.find).toHaveBeenCalledWith(
        expect.objectContaining({
          take: query.limit,
          skip: (query.page - 1) * 10,
          order: { sortName: 'ASC', releaseYear: 'ASC' },
        }),
      );
    });

    it('should return a count and an array of films', async () => {
      const films: Partial<Film>[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

      repository.find.mockResolvedValue(films);
      repository.count.mockResolvedValue(100);

      const result = await service.findAll(query);

      expect(result.data).toEqual(films);
      expect(result.links.current).toBeDefined();
      expect(result.links.first).toBeDefined();
      expect(result.meta.currentPage).toBe(1);
      expect(result.meta.totalItems).toEqual(100);
    });

    it('should return an empty array if no data can be found', async () => {
      repository.find.mockResolvedValue([]);
      repository.count.mockResolvedValue(0);
      const result = await service.findAll(query);
      expect(result.data).toEqual([]);
    });
  });

  describe('findOne', () => {
    const params = { slug: 'the-americano-1916' };
    const mockFilm = { id: 1 };

    it('should call repository.findOne()', async () => {
      repository.findOne.mockResolvedValue(mockFilm);

      await service.findOne(params.slug);

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { slug: params.slug },
        }),
      );
    });

    it('should return an array with a single film', async () => {
      repository.findOne.mockResolvedValue(mockFilm);

      const result = await service.findOne(params.slug);

      expect(result).toEqual(mockFilm);
    });
  });
});
