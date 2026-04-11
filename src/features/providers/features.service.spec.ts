import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Feature } from 'src/features/entities/feature.entity';
import { FeaturesService } from 'src/features/providers/features.service';
import { Repository } from 'typeorm';

describe('FeaturesService', () => {
  let service: FeaturesService;
  let repository: jest.Mocked<
    Pick<Repository<Partial<Feature>>, 'find' | 'findOne' | 'count'>
  >;

  const mockFeatureRepository: jest.Mocked<
    Pick<Repository<Partial<Feature>>, 'find' | 'findOne' | 'count'>
  > = {
    find: jest.fn(),
    findOne: jest.fn(),
    count: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeaturesService,
        {
          provide: getRepositoryToken(Feature),
          useValue: mockFeatureRepository,
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
    console.log(repository);
    expect(service).toBeDefined();
  });
});
