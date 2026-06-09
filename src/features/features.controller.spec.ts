import { Test, TestingModule } from '@nestjs/testing';
import { FeaturesController } from 'src/features/features.controller';
import { FeaturesService } from 'src/features/providers/features.service';
import { GetFeaturesDto } from 'src/features/dto/get-features.dto';
import { PaginatedResponse } from 'src/common/pagination/interfaces/paginated-response.interface';
import { Feature } from 'src/features/entities/feature.entity';

describe('FeaturesController', () => {
  let controller: FeaturesController;
  let service: FeaturesService;

  const mockFeaturesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    mockFeaturesService.findAll.mockResolvedValue([]);
    mockFeaturesService.findOne.mockResolvedValue(null);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeaturesController],
      providers: [
        {
          provide: FeaturesService,
          useValue: mockFeaturesService,
        },
      ],
    }).compile();

    controller = module.get<FeaturesController>(FeaturesController);
    service = module.get<FeaturesService>(FeaturesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    const query: GetFeaturesDto = {
      limit: '25',
      page: '1',
      orderBy: 'nameAsc',
    };

    it('should call findAll service once', async () => {
      await service.findAll(query);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should pass query params to findAll service', async () => {
      await service.findAll(query);
      expect(service.findAll).toHaveBeenCalledWith(query);
    });

    it('should return an array of features', async () => {
      const features = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const response: Partial<PaginatedResponse<Partial<Feature>>> = {
        data: features,
      };
      mockFeaturesService.findAll.mockResolvedValue(response);
      const result = await service.findAll(query);
      expect(result.data).toBe(features);
    });

    it('should return an empty array if no data can be found', async () => {
      const response: Partial<PaginatedResponse<Partial<Feature>>> = {
        data: [],
      };
      mockFeaturesService.findAll.mockResolvedValue(response);
      const result = await service.findAll(query);
      expect(result.data).toEqual([]);
    });
  });

  describe('findOne', () => {
    const slug = 'corriganville';
    it('should call findOne service once', async () => {
      await service.findOne(slug);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should pass the slug to the findOne service', async () => {
      await service.findOne(slug);
      expect(service.findOne).toHaveBeenCalledWith(slug);
    });

    it('should return the feature', async () => {
      const feature = { id: 1 };
      mockFeaturesService.findOne.mockResolvedValue(feature);
      const result = await service.findOne(slug);
      expect(result).toBe(feature);
    });
  });
});
