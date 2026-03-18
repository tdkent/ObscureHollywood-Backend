import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './providers/articles.service';

describe('ArticlesController', () => {
  let controller: ArticlesController;
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        {
          provide: ArticlesService,
          useValue: {
            findAll: jest.fn(() => {
              return [{ id: 1 }, { id: 2 }];
            }),
            findOne: jest.fn(() => {
              return { id: 1 };
            }),
          },
        },
      ],
    }).compile();
    controller = module.get<ArticlesController>(ArticlesController);
    service = module.get<ArticlesService>(ArticlesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /articles route', () => {
    it('should call findAll service method once', () => {
      controller.findAll();
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return an array of article objects', () => {
      const response = controller.findAll();
      expect(response).toEqual([{ id: 1 }, { id: 2 }]);
    });
  });

  describe('GET /articles/:id route', () => {
    it('should call findOne service method once', () => {
      controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return an article object with the correct id', () => {
      const response = controller.findOne('1');
      expect(response).toEqual({ id: 1 });
    });
  });
});
