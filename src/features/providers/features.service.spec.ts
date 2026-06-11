import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Feature } from 'src/features/entities/feature.entity';
import { FeaturesService } from 'src/features/providers/features.service';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Repository } from 'typeorm';
import { GetFeaturesDto } from 'src/features/dto/get-features.dto';
import { PAGINATION_TAKE_COUNT } from 'src/common/constants/constants';

describe('FeaturesService', () => {
  let service: FeaturesService;
  let repository: jest.Mocked<
    Pick<Repository<Partial<Feature>>, 'findAndCount' | 'findOne'>
  >;

  const mockFeatureRepository: jest.Mocked<
    Pick<Repository<Partial<Feature>>, 'findAndCount' | 'findOne'>
  > = {
    findAndCount: jest.fn(),
    findOne: jest.fn(),
  };

  const mockPaginationProvider = {
    createPaginationMetadata: jest.fn(),
  };

  beforeEach(async () => {
    mockFeatureRepository.findAndCount.mockResolvedValue([[], 0]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeaturesService,
        {
          provide: getRepositoryToken(Feature),
          useValue: mockFeatureRepository,
        },
        {
          provide: PaginationProvider,
          useValue: mockPaginationProvider,
        },
      ],
    }).compile();

    service = module.get<FeaturesService>(FeaturesService);
    repository = module.get(getRepositoryToken(Feature));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    const query: GetFeaturesDto = {
      orderBy: 'nameAsc',
      page: '1',
    };

    it('should call repository.findAndCount()', async () => {
      await service.findAll(query);

      expect(repository.findAndCount).toHaveBeenCalledTimes(1);
      expect(repository.findAndCount).toHaveBeenCalledWith({
        skip: (Number(query.page) - 1) * 10,
        order: { name: 'ASC' },
        take: PAGINATION_TAKE_COUNT,
      });
    });

    it('should return features and pagination metadata', async () => {
      const features: Partial<Feature>[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

      repository.findAndCount.mockResolvedValue([features, 20]);

      mockPaginationProvider.createPaginationMetadata.mockReturnValueOnce({
        data: features,
        links: {
          current: '',
          first: '',
        },
        meta: {
          currentPage: 1,
          totalItems: 20,
        },
      });

      const result = await service.findAll(query);

      expect(result.data).toEqual(features);
      expect(result.links.current).toBeDefined();
      expect(result.links.first).toBeDefined();
      expect(result.meta.currentPage).toBe(1);
      expect(result.meta.totalItems).toEqual(20);
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
    const params = { slug: 'corriganville' };
    const mockFeature = { id: 1 };

    it('should call repository.findOne()', async () => {
      repository.findOne.mockResolvedValue(mockFeature);

      await service.findOne(params.slug);

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { slug: params.slug },
        }),
      );
    });

    it('should return the feature', async () => {
      repository.findOne.mockResolvedValue(mockFeature);

      const result = await service.findOne(params.slug);

      expect(result).toEqual(mockFeature);
    });
  });
});
