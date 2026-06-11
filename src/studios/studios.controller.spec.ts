import { Test, TestingModule } from '@nestjs/testing';
import { StudiosController } from './studios.controller';
import { StudiosService } from './providers/studios.service';
import {
  GetFilmsByStudioDto,
  GetStudiosDto,
} from 'src/studios/dto/get-studio.dto';
import { PaginatedResponse } from 'src/common/pagination/interfaces/paginated-response.interface';
import { Studio } from 'src/studios/entities/studio.entity';

describe('StudiosController', () => {
  let controller: StudiosController;
  let service: StudiosService;

  const mockStudiosService = {
    findAll: jest.fn(),
    findFilmsByStudio: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    mockStudiosService.findAll.mockResolvedValue([]);
    mockStudiosService.findFilmsByStudio.mockResolvedValue([]);
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
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    const query: GetStudiosDto = { page: '1', orderBy: 'nameAsc' };

    it('should call findAll service once', async () => {
      await service.findAll(query);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should pass query params to findAll service', async () => {
      await service.findAll(query);
      expect(service.findAll).toHaveBeenCalledWith(query);
    });

    it('should return an array of studios', async () => {
      const studios = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const response: Partial<PaginatedResponse<Partial<Studio>>> = {
        data: studios,
      };
      mockStudiosService.findAll.mockResolvedValue(response);
      const result = await service.findAll(query);
      expect(result.data).toBe(studios);
    });

    it('should return an empty array if no data can be found', async () => {
      const response: Partial<PaginatedResponse<Partial<Studio>>> = {
        data: [],
      };
      mockStudiosService.findAll.mockResolvedValue(response);
      const result = await service.findAll(query);
      expect(result.data).toEqual([]);
    });
  });

  describe('findOne', () => {
    const slug = 'paramount-pictures';

    it('should call findOne service once', async () => {
      await service.findOne(slug);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should pass the slug to the findOne service', async () => {
      await service.findOne(slug);
      expect(service.findOne).toHaveBeenCalledWith(slug);
    });

    it('should return the studio', async () => {
      const studio = { id: 1 };
      mockStudiosService.findOne.mockResolvedValue(studio);
      const result = await service.findOne(slug);
      expect(result).toBe(studio);
    });
  });

  describe('findFilmsByStudio', () => {
    const slug = 'paramount-pictures';
    const query: GetFilmsByStudioDto = {
      page: '1',
      orderBy: 'nameAsc',
    };

    it('should call findFilmsByStudio service once', async () => {
      await service.findFilmsByStudio(slug, query);
      expect(service.findFilmsByStudio).toHaveBeenCalledTimes(1);
    });

    it('should pass the slug to the findFilmsByStudio service', async () => {
      await service.findFilmsByStudio(slug, query);
      expect(service.findFilmsByStudio).toHaveBeenCalledWith(slug, query);
    });

    it('should return an array of films', async () => {
      mockStudiosService.findFilmsByStudio.mockResolvedValue([
        { id: 1 },
        { id: 2 },
      ]);
      const result = await service.findFilmsByStudio(slug, query);
      expect(result).toEqual([{ id: 1 }, { id: 2 }]);
    });
  });
});
