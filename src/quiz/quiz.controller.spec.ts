import { Test, TestingModule } from '@nestjs/testing';
import { QuizController } from 'src/quiz/quiz.controller';
import { QuizService } from 'src/quiz/providers/quiz.service';
import { GetQuizzesDto } from 'src/quiz/dto/get-quizzes.dto';
import { PaginatedResponse } from 'src/common/pagination/interfaces/paginated-response.interface';
import { Quiz } from 'src/quiz/entities/quiz.entity';

describe('QuizController', () => {
  let controller: QuizController;
  let service: QuizService;

  const mockQuizService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    mockQuizService.findAll.mockResolvedValue([]);
    mockQuizService.findOne.mockResolvedValue(null);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizController],
      providers: [
        {
          provide: QuizService,
          useValue: mockQuizService,
        },
      ],
    }).compile();

    controller = module.get<QuizController>(QuizController);
    service = module.get<QuizService>(QuizService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    const query: GetQuizzesDto = {
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

    it('should return an array of quizzes', async () => {
      const quizzes = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const response: Partial<PaginatedResponse<Partial<Quiz>>> = {
        data: quizzes,
      };
      mockQuizService.findAll.mockResolvedValue(response);
      const result = await service.findAll(query);
      expect(result.data).toBe(quizzes);
    });

    it('should return an empty array if no data can be found', async () => {
      const response: Partial<PaginatedResponse<Partial<Quiz>>> = {
        data: [],
      };
      mockQuizService.findAll.mockResolvedValue(response);
      const result = await service.findAll(query);
      expect(result.data).toEqual([]);
    });
  });

  describe('findOne', () => {
    const slug = 'at-the-movies';
    it('should call findOne service once', async () => {
      await service.findOne(slug);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should pass the slug to the findOne service', async () => {
      await service.findOne(slug);
      expect(service.findOne).toHaveBeenCalledWith(slug);
    });

    it('should return the quiz', async () => {
      const quiz = { id: 1 };
      mockQuizService.findOne.mockResolvedValue(quiz);
      const result = await service.findOne(slug);
      expect(result).toBe(quiz);
    });
  });
});
