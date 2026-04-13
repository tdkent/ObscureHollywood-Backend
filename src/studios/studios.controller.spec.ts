import { Test, TestingModule } from '@nestjs/testing';
import { StudiosController } from './studios.controller';
import { StudiosService } from './providers/studios.service';

describe('StudiosController', () => {
  let controller: StudiosController;
  let service: StudiosService;

  const mockStudiosService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    mockStudiosService.findAll.mockResolvedValue([]);
    mockStudiosService.findOne.mockResolvedValue(null);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudiosController],
      providers: [
        {
          provide: StudiosService,
          useValue: mockStudiosService,
        },
      ],
    }).compile();

    controller = module.get<StudiosController>(StudiosController);
    service = module.get<StudiosService>(StudiosService);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    console.log(service);
    expect(controller).toBeDefined();
  });
});
