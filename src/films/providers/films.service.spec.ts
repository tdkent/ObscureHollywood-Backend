import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from 'src/films/providers/films.service';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Film } from 'src/films/entities/film.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { GetFilmsDto } from 'src/films/dto/get-films.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

describe('FilmsService', () => {
  let service: FilmsService;
  let repository: jest.Mocked<
    Pick<Repository<Partial<Film>>, 'createQueryBuilder' | 'findOne'>
  >;

  // Mock createQueryBuilder object and all methods used in service
  const mockQueryBuilder = {
    innerJoin: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
    addGroupBy: jest.fn().mockReturnThis(),
    having: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
  } as unknown as SelectQueryBuilder<Partial<Film>>;

  const mockFilmRepository: jest.Mocked<
    Pick<Repository<Partial<Film>>, 'createQueryBuilder' | 'findOne'>
  > = {
    findOne: jest.fn(),
    createQueryBuilder: jest.fn(() => mockQueryBuilder),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  const mockPaginationProvider = {
    createPaginationMetadata: jest.fn(),
  };

  beforeEach(async () => {
    (mockQueryBuilder.getMany as jest.Mock).mockResolvedValue([
      { id: 1 },
      { id: 2 },
    ]);
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
        {
          provide: PaginationProvider,
          useValue: mockPaginationProvider,
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

    it('should call repository.createQueryBuilder', async () => {
      await service.findAll(query);
      expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1);
    });

    it('should return films and pagination metadata if no tags present in query', async () => {
      const films: Partial<Film>[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

      mockPaginationProvider.createPaginationMetadata.mockReturnValueOnce({
        data: films,
        links: {
          current: '',
          first: '',
        },
        meta: {
          currentPage: 1,
          totalItems: 100,
        },
      });

      const result = await service.findAll(query);

      expect(result.data).toEqual(films);
      expect(result.links.current).toBeDefined();
      expect(result.links.first).toBeDefined();
      expect(result.meta.currentPage).toBe(1);
      expect(result.meta.totalItems).toEqual(100);
    });

    it('should return films and pagination metadata if tags present in query', async () => {
      const films: Partial<Film>[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

      mockPaginationProvider.createPaginationMetadata.mockReturnValueOnce({
        data: films,
        links: {
          current: '',
          first: '',
        },
        meta: {
          currentPage: 1,
          totalItems: 100,
        },
      });

      const result = await service.findAll({
        ...query,
        tag: ['decade-1930s', 'genre-drama'],
      });

      expect(result.data).toEqual(films);
      expect(result.links.current).toBeDefined();
      expect(result.links.first).toBeDefined();
      expect(result.meta.currentPage).toBe(1);
      expect(result.meta.totalItems).toEqual(100);
    });

    it('should return an empty array if no data can be found', async () => {
      (mockQueryBuilder.getMany as jest.Mock).mockResolvedValue([]);
      mockPaginationProvider.createPaginationMetadata.mockReturnValueOnce({
        data: [],
        links: {},
        meta: {},
      });
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

    it('should return the film', async () => {
      repository.findOne.mockResolvedValue(mockFilm);

      const result = await service.findOne(params.slug);

      expect(result).toEqual(mockFilm);
    });
  });
});
