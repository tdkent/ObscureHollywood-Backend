import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from 'src/tags/providers/tags.service';
import { Repository } from 'typeorm';
import { Tag } from 'src/tags/entities/tag.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TagsService', () => {
  let service: TagsService;
  let repository: jest.Mocked<
    Pick<Repository<Partial<Tag>>, 'find' | 'findOne'>
  >;

  const mockTagRepository: jest.Mocked<
    Pick<Repository<Partial<Tag>>, 'find' | 'findOne'>
  > = {
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsService,
        {
          provide: getRepositoryToken(Tag),
          useValue: mockTagRepository,
        },
      ],
    }).compile();

    service = module.get<TagsService>(TagsService);
    repository = module.get(getRepositoryToken(Tag));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should call repository.find()', async () => {
      repository.find.mockResolvedValue([]);

      await service.findAll();

      expect(repository.find).toHaveBeenCalledTimes(1);
    });

    it('should return tags and pagination metadata', async () => {
      const tags: Partial<Tag>[] = [{ id: 1 }, { id: 2 }, { id: 3 }];
      repository.find.mockResolvedValue(tags);

      const data = await service.findAll();

      expect(data).toEqual(tags);
    });

    it('should return an empty array if no data can be found', async () => {
      repository.find.mockResolvedValue([]);
      const data = await service.findAll();
      expect(data).toEqual([]);
    });
  });

  describe('findOne', () => {
    const params = { slug: 'decade-1930s' };
    const mockTag = { id: 1 };

    it('should call repository.findOne()', async () => {
      repository.findOne.mockResolvedValue(mockTag);

      await service.findOne(params.slug);

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { slug: params.slug },
        }),
      );
    });

    it('should return the tag', async () => {
      repository.findOne.mockResolvedValue(mockTag);

      const result = await service.findOne(params.slug);

      expect(result).toEqual(mockTag);
    });
  });
});
