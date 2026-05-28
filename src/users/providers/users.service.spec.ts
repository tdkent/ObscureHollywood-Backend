import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { QuizResult } from 'src/quiz/entities/quiz-result.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;

  let repository: jest.Mocked<
    Pick<Repository<Partial<QuizResult>>, 'createQueryBuilder'>
  >;

  // Mock createQueryBuilder object and all methods used in service
  const mockQueryBuilder = {
    innerJoin: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    addSelect: jest.fn().mockReturnThis(),
    getRawOne: jest.fn().mockReturnThis(),
  } as unknown as SelectQueryBuilder<Partial<QuizResult>>;

  const mockQuizResultRepository: jest.Mocked<
    Pick<Repository<Partial<QuizResult>>, 'createQueryBuilder'>
  > = {
    createQueryBuilder: jest.fn(() => mockQueryBuilder),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(QuizResult),
          useValue: mockQuizResultRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(QuizResult));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findQuizResultsByUserId', () => {
    const userId = 'fake-uuid';

    it('should call repository.createQueryBuilder', async () => {
      await service.findQuizResultsByUserId(userId);
      expect(repository.createQueryBuilder).toHaveBeenCalledTimes(1);
    });
  });

  describe('findSingleQuizResultByUserId', () => {
    const userId = 'fake-uuid';
    const slug = 'at-the-movies';

    it('should call repository.createQueryBuilder', async () => {
      await service.findSingleQuizResultByUserId(userId, slug);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('quizResult');
      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        'quizResult.userId = :userId',
        { userId },
      );
      expect(mockQueryBuilder.where).toHaveBeenCalled();
      expect(mockQueryBuilder.innerJoin).toHaveBeenCalled();
      expect(mockQueryBuilder.getRawOne).toHaveBeenCalled();
    });
  });
});
