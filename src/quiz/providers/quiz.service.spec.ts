import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { QuizService } from 'src/quiz/providers/quiz.service';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Repository } from 'typeorm';
import { GetQuizzesDto } from 'src/quiz/dto/get-quizzes.dto';

describe('QuizService', () => {
  let service: QuizService;
  let repository: jest.Mocked<
    Pick<Repository<Partial<Quiz>>, 'findAndCount' | 'findOne'>
  >;

  const mockQuizRepository: jest.Mocked<
    Pick<Repository<Partial<Quiz>>, 'findAndCount' | 'findOne'>
  > = {
    findAndCount: jest.fn(),
    findOne: jest.fn(),
  };

  const mockPaginationProvider = {
    createPaginationMetadata: jest.fn(),
  };

  beforeEach(async () => {
    mockQuizRepository.findAndCount.mockResolvedValue([[], 0]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizService,
        {
          provide: getRepositoryToken(Quiz),
          useValue: mockQuizRepository,
        },
        {
          provide: PaginationProvider,
          useValue: mockPaginationProvider,
        },
      ],
    }).compile();

    service = module.get<QuizService>(QuizService);
    repository = module.get(getRepositoryToken(Quiz));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    const query: GetQuizzesDto = {
      limit: '25',
      orderBy: 'nameAsc',
      page: '1',
    };

    it('should call repository.findAndCount()', async () => {
      await service.findAll(query);

      expect(repository.findAndCount).toHaveBeenCalledTimes(1);
      expect(repository.findAndCount).toHaveBeenCalledWith({
        take: Number(query.limit),
        skip: (Number(query.page) - 1) * 10,
        order: { name: 'ASC' },
      });
    });

    it('should return quizzes and pagination metadata', async () => {
      const quizzes: Partial<Quiz>[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

      repository.findAndCount.mockResolvedValue([quizzes, 20]);

      mockPaginationProvider.createPaginationMetadata.mockReturnValueOnce({
        data: quizzes,
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

      expect(result.data).toEqual(quizzes);
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

  // describe('findOne', () => {
  //   const params = { slug: 'at-the-movies' };
  //   const mockQuiz = { id: 1 };

  //   it('should call repository.findOne()', async () => {
  //     repository.findOne.mockResolvedValue(mockQuiz);

  //     await service.findOne(params.slug);

  //     expect(repository.findOne).toHaveBeenCalledTimes(1);
  //     expect(repository.findOne).toHaveBeenCalledWith(
  //       expect.objectContaining({
  //         where: { slug: params.slug },
  //       }),
  //     );
  //   });

  //   it('should return the quiz', async () => {
  //     repository.findOne.mockResolvedValue(mockQuiz);

  //     const result = await service.findOne(params.slug);

  //     expect(result).toEqual(mockQuiz);
  //   });
  // });
});
