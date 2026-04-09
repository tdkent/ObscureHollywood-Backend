import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from 'src/films/films.controller';
import { FilmsService } from 'src/films/providers/films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const mockFilmsService = {
    findAll: jest.fn(() => {
      return [{ id: 1 }, { id: 2 }];
    }),
  };

  beforeEach(async () => {
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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /films route', () => {
    it('should call findAll service method once', () => {
      controller.findAll({ limit: 2, orderBy: 'nameAsc', page: 1 });
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return an array of Film entity objects', () => {
      const response = controller.findAll({
        limit: 2,
        orderBy: 'nameAsc',
        page: 1,
      });
      expect(response).toEqual([{ id: 1 }, { id: 2 }]);
    });
  });
});
