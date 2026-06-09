import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from 'src/films/films.controller';
import { FilmsService } from 'src/films/providers/films.service';
import { GetFilmsDto } from 'src/films/dto/get-films.dto';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const mockFilmsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    // Default return values that can be overridden directly in tests.
    mockFilmsService.findAll.mockResolvedValue([]);
    mockFilmsService.findOne.mockResolvedValue(null);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    const query: GetFilmsDto = { limit: '25', orderBy: 'nameAsc', page: '1' };

    it('should call findAll service method once', async () => {
      await controller.findAll(query);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should pass query params to the service', async () => {
      await controller.findAll(query);
      expect(service.findAll).toHaveBeenCalledWith(query);
    });

    it('should return an array of films', async () => {
      mockFilmsService.findAll.mockResolvedValue([{ id: 1 }, { id: 2 }]);
      const response = await controller.findAll(query);
      expect(response).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it('should return an empty array when no films exist', async () => {
      mockFilmsService.findAll.mockResolvedValue([]);
      const response = await controller.findAll(query);
      expect(response).toEqual([]);
    });
  });

  describe('findOne', () => {
    const params = { slug: 'the-americano-1916' };

    it('should call findOne service method once', async () => {
      await controller.findOne(params);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should pass slug to the service', async () => {
      await controller.findOne(params);
      expect(service.findOne).toHaveBeenCalledWith(params.slug);
    });

    it('should return the film', async () => {
      const mockFilm = { id: 1 };
      mockFilmsService.findOne.mockResolvedValue(mockFilm);
      const response = await controller.findOne(params);
      expect(response).toEqual(mockFilm);
    });
  });
});
