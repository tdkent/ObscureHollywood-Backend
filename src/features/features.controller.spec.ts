import { Test, TestingModule } from '@nestjs/testing';
import { FeaturesController } from 'src/features/features.controller';
import { FeaturesService } from 'src/features/providers/features.service';

describe('FeaturesController', () => {
  let controller: FeaturesController;
  let service: FeaturesService;

  const mockFeaturesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
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

  it('should be defined', () => {
    console.log(service);
    expect(controller).toBeDefined();
  });
});
