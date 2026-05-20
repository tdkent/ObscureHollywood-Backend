import { Test, TestingModule } from '@nestjs/testing';
import { TagsController } from './tags.controller';
import { TagsService } from 'src/tags/providers/tags.service';
import { GetFilmsByTagDto } from 'src/tags/dto/get-tag.dto';

describe('TagsController', () => {
  let controller: TagsController;
  let service: TagsService;

  const mockTagsService = {
    findAll: jest.fn(),
    findFilmsByTag: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    mockTagsService.findAll.mockResolvedValue([]);
    mockTagsService.findFilmsByTag.mockResolvedValue([]);
    mockTagsService.findOne.mockResolvedValue(null);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [
        {
          provide: TagsService,
          useValue: mockTagsService,
        },
      ],
    }).compile();

    controller = module.get<TagsController>(TagsController);
    service = module.get<TagsService>(TagsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call findAll service once', async () => {
      await service.findAll();
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return an array of tags', async () => {
      const tags = [{ id: 1 }, { id: 2 }, { id: 3 }];
      mockTagsService.findAll.mockResolvedValue(tags);

      const data = await service.findAll();

      expect(data).toBe(tags);
    });

    it('should return an empty array if no data can be found', async () => {
      mockTagsService.findAll.mockResolvedValue([]);

      const data = await service.findAll();

      expect(data).toEqual([]);
    });
  });

  describe('findOne', () => {
    const slug = 'decade-1930s';

    it('should call findOne service once', async () => {
      await service.findOne(slug);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should pass the slug to the findOne service', async () => {
      await service.findOne(slug);
      expect(service.findOne).toHaveBeenCalledWith(slug);
    });

    it('should return the tag', async () => {
      const tag = { id: 1 };
      mockTagsService.findOne.mockResolvedValue(tag);
      const result = await service.findOne(slug);
      expect(result).toBe(tag);
    });
  });

  describe('findFilmsByTag', () => {
    const slug = 'decade-1930s';
    const query: GetFilmsByTagDto = {
      limit: '25',
      page: '1',
      orderBy: 'nameAsc',
    };

    it('should call findFilmsByTag service once', async () => {
      await service.findFilmsByTag(slug, query);
      expect(service.findFilmsByTag).toHaveBeenCalledTimes(1);
    });

    it('should pass the slug to the findFilmsByTag service', async () => {
      await service.findFilmsByTag(slug, query);
      expect(service.findFilmsByTag).toHaveBeenCalledWith(slug, query);
    });

    it('should return an array of films', async () => {
      mockTagsService.findFilmsByTag.mockResolvedValue([{ id: 1 }, { id: 2 }]);
      const result = await service.findFilmsByTag(slug, query);
      expect(result).toEqual([{ id: 1 }, { id: 2 }]);
    });
  });
});
