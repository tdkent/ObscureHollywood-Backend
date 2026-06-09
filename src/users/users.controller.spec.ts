import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from 'src/users/providers/users.service';
import { UserQuizResponseDto } from 'src/users/dto/user-all-quiz-response.dto';
import { UserSingleQuizResponseDto } from 'src/users/dto/user-quiz-response.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    findQuizResultsByUserId: jest.fn(),
    findSingleQuizResultByUserId: jest.fn(),
  };

  beforeEach(async () => {
    mockUsersService.findQuizResultsByUserId.mockResolvedValue({});
    mockUsersService.findSingleQuizResultByUserId.mockResolvedValue({});

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findQuizResultsByUserId', () => {
    const mockUserId = 'fake-uuid';

    it('should call findQuizResultsByUserId service once', async () => {
      await service.findQuizResultsByUserId(mockUserId);
      expect(service.findQuizResultsByUserId).toHaveBeenCalledTimes(1);
    });

    it('should pass params to findQuizResultsByUserId service', async () => {
      await service.findQuizResultsByUserId(mockUserId);
      expect(service.findQuizResultsByUserId).toHaveBeenCalledWith(mockUserId);
    });

    it('should return an object of data values', async () => {
      const response: UserQuizResponseDto = {
        totalCount: 20,
        distinctCount: 5,
        avgScore: 8,
        quizCount: 50,
        percentComplete: 10,
      };

      mockUsersService.findQuizResultsByUserId.mockResolvedValue(response);
      const result = await service.findQuizResultsByUserId(mockUserId);
      expect(result).toBe(response);
    });
  });

  describe('findSingleQuizResultByUserId', () => {
    const mockUserId = 'fake-uuid';
    const slug = 'at-the-movies';

    it('should call findSingleQuizResultByUserId service once', async () => {
      await service.findSingleQuizResultByUserId(mockUserId, slug);
      expect(service.findSingleQuizResultByUserId).toHaveBeenCalledTimes(1);
    });

    it('should pass the params to the findSingleQuizResultByUserId service', async () => {
      await service.findSingleQuizResultByUserId(mockUserId, slug);
      expect(service.findSingleQuizResultByUserId).toHaveBeenCalledWith(
        mockUserId,
        slug,
      );
    });

    it('should return an object of data values', async () => {
      const response: UserSingleQuizResponseDto = {
        count: 5,
        highScore: 10,
        prevScore: 10,
      };
      mockUsersService.findSingleQuizResultByUserId.mockResolvedValue(response);
      const result = (await service.findSingleQuizResultByUserId(
        mockUserId,
        slug,
      )) as UserSingleQuizResponseDto;
      expect(result).toBe(response);
    });
  });
});
