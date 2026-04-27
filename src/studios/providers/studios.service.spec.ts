import { Test, TestingModule } from '@nestjs/testing';
import { StudiosService } from './studios.service';
import { Repository } from 'typeorm';
import { Studio } from 'src/studios/entities/studio.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import {
  GetFilmsByStudioDto,
  GetStudiosDto,
} from 'src/studios/dto/get-studio.dto';
import { Film } from 'src/films/entities/film.entity';

describe('StudiosService', () => {
  let service: StudiosService;
  let repository: jest.Mocked<
    Pick<Repository<Partial<Studio>>, 'count' | 'find' | 'findOne'>
  >;
  let filmRepository: jest.Mocked<
    Pick<Repository<Partial<Film>>, 'findAndCount'>
  >;

  const mockStudioRepository: jest.Mocked<
    Pick<Repository<Partial<Studio>>, 'count' | 'find' | 'findOne'>
  > = {
    count: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  const mockFilmRepository: jest.Mocked<
    Pick<Repository<Partial<Film>>, 'findAndCount'>
  > = {
    findAndCount: jest.fn(),
  };

  const mockPaginationProvider = {
    createPaginationMetadata: jest.fn(),
  };

  beforeEach(async () => {
    mockStudioRepository.count.mockResolvedValue(0);
    mockStudioRepository.find.mockResolvedValue([]);

    mockFilmRepository.findAndCount.mockResolvedValue([[], 0]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudiosService,
        {
          provide: getRepositoryToken(Studio),
          useValue: mockStudioRepository,
        },
        {
          provide: getRepositoryToken(Film),
          useValue: mockFilmRepository,
        },
        {
          provide: PaginationProvider,
          useValue: mockPaginationProvider,
        },
      ],
    }).compile();

    service = module.get<StudiosService>(StudiosService);
    repository = module.get(getRepositoryToken(Studio));
    filmRepository = module.get(getRepositoryToken(Film));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    const query: GetStudiosDto = { limit: 3, orderBy: 'nameAsc', page: 1 };

    it('should call repository.find()', async () => {
      await service.findAll(query);

      expect(repository.count).toHaveBeenCalledTimes(1);
      expect(repository.find).toHaveBeenCalledTimes(1);

      expect(repository.find).toHaveBeenCalledWith(
        expect.objectContaining({
          take: query.limit,
          skip: (query.page - 1) * 10,
          order: { name: 'ASC' },
        }),
      );
    });

    it('should return studios and pagination metadata', async () => {
      const studios: Partial<Studio>[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

      mockStudioRepository.count.mockResolvedValue(35);
      mockStudioRepository.find.mockResolvedValue(studios);

      mockPaginationProvider.createPaginationMetadata.mockReturnValueOnce({
        data: studios,
        links: {
          current: '',
          first: '',
        },
        meta: {
          currentPage: 1,
          totalItems: 35,
        },
      });

      const result = await service.findAll(query);

      expect(result.data).toEqual(studios);
      expect(result.links.current).toBeDefined();
      expect(result.links.first).toBeDefined();
      expect(result.meta.currentPage).toBe(1);
      expect(result.meta.totalItems).toEqual(35);
    });

    it('should return an empty array if no data can be found', async () => {
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
    const params = { slug: 'paramount-pictures' };
    const mockStudio = { id: 1 };

    it('should call repository.findOne()', async () => {
      repository.findOne.mockResolvedValue(mockStudio);

      await service.findOne(params.slug);

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { slug: params.slug },
        }),
      );
    });

    it('should return the studio', async () => {
      repository.findOne.mockResolvedValue(mockStudio);

      const result = await service.findOne(params.slug);

      expect(result).toEqual(mockStudio);
    });
  });

  describe('findFilmsByStudio', () => {
    const params = { slug: 'paramount-pictures' };
    const query: GetFilmsByStudioDto = {
      limit: 3,
      orderBy: 'nameAsc',
      page: 1,
    };

    it('should call Film repository.find()', async () => {
      await service.findFilmsByStudio(params.slug, query);

      expect(filmRepository.findAndCount).toHaveBeenCalledTimes(1);

      expect(filmRepository.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({
          take: query.limit,
          skip: (query.page - 1) * 10,
          order: { name: 'ASC', releaseYear: 'ASC' },
        }),
      );
    });

    it('should return films and pagination metadata', async () => {
      const films: Partial<Film>[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

      mockFilmRepository.findAndCount.mockResolvedValue([films, 3]);

      mockPaginationProvider.createPaginationMetadata.mockReturnValueOnce({
        data: films,
        links: {
          current: '',
          first: '',
        },
        meta: {
          currentPage: 1,
          totalItems: 3,
        },
      });

      const result = await service.findFilmsByStudio(params.slug, query);

      expect(result.data).toEqual(films);
      expect(result.links.current).toBeDefined();
      expect(result.links.first).toBeDefined();
      expect(result.meta.currentPage).toBe(1);
      expect(result.meta.totalItems).toEqual(3);
    });

    it('should return an empty array if no data can be found', async () => {
      mockPaginationProvider.createPaginationMetadata.mockReturnValueOnce({
        data: [],
        links: {},
        meta: {},
      });

      const result = await service.findFilmsByStudio(params.slug, query);

      expect(result.data).toEqual([]);
    });
  });
});
