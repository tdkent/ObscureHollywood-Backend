import { Test, TestingModule } from '@nestjs/testing';
import { PaginatedResponse } from 'src/common/pagination/interfaces/paginated-response.interface';
import { ArticlesController } from 'src/articles/articles.controller';
import { ArticlesService } from 'src/articles/providers/articles.service';
import { GetArticlesDto } from 'src/articles/dto/get-articles.dto';
import { ArticleResponse } from 'src/articles/dto/article-response.dto';

describe('ArticlesController', () => {
  let controller: ArticlesController;
  let service: ArticlesService;

  const mockArticlesService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    mockArticlesService.findAll.mockResolvedValue([]);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        {
          provide: ArticlesService,
          useValue: mockArticlesService,
        },
      ],
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
    service = module.get<ArticlesService>(ArticlesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    const query: GetArticlesDto = {
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

    it('should return an array of articles', async () => {
      const articles = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const response: Partial<PaginatedResponse<Partial<ArticleResponse>>> = {
        data: articles,
      };
      mockArticlesService.findAll.mockResolvedValue(response);
      const result = await service.findAll(query);
      expect(result.data).toBe(articles);
    });

    it('should return an empty array if no data can be found', async () => {
      const response: Partial<PaginatedResponse<Partial<ArticleResponse>>> = {
        data: [],
      };
      mockArticlesService.findAll.mockResolvedValue(response);
      const result = await service.findAll(query);
      expect(result.data).toEqual([]);
    });
  });
});
