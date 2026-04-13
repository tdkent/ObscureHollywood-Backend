import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from 'src/tags/providers/tags.service';
import { Repository } from 'typeorm';
import { Tag } from 'src/tags/entities/tag.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { GetTagsDto } from 'src/tags/dto/get-tag.dto';

describe('TagsService', () => {
  let service: TagsService;
  let repository: jest.Mocked<
    Pick<Repository<Partial<Tag>>, 'find' | 'findOne'>
  >;

  const mockTagRepository: jest.Mocked<
    Pick<Repository<Partial<Tag>>, 'find' | 'findOne'>
  > = {
    find: jest.fn(),
    findOne: jest.fn(),
  };

  const mockPaginationProvider = {
    createPaginationMetadata: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsService,
        {
          provide: getRepositoryToken(Tag),
          useValue: mockTagRepository,
        },
        {
          provide: PaginationProvider,
          useValue: mockPaginationProvider,
        },
      ],
    }).compile();

    service = module.get<TagsService>(TagsService);
    repository = module.get(getRepositoryToken(Tag));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    const query: GetTagsDto = { limit: 3, orderBy: 'nameAsc', page: 1 };

    it('should call repository.find()', async () => {
      repository.find.mockResolvedValue([]);

      await service.findAll(query);

      expect(repository.find).toHaveBeenCalledTimes(1);

      expect(repository.find).toHaveBeenCalledWith(
        expect.objectContaining({
          take: query.limit,
          skip: (query.page - 1) * 10,
          order: { name: 'ASC', type: 'ASC' },
        }),
      );
    });

    it('should return studios and pagination metadata', async () => {
      const studios: Partial<Tag>[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

      repository.find.mockResolvedValue(studios);

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
      repository.find.mockResolvedValue([]);
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
    const params = { slug: 'decade-1930s' };
    const mockTag = { id: 1 };

    it('should call repository.findOne()', async () => {
      repository.findOne.mockResolvedValue(mockTag);

      await service.findOne(params.slug);

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { slug: params.slug },
        }),
      );
    });

    it('should return the tag', async () => {
      repository.findOne.mockResolvedValue(mockTag);

      const result = await service.findOne(params.slug);

      expect(result).toEqual(mockTag);
    });
  });
});
