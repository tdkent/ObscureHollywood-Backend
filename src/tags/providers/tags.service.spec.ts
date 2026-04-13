import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from 'src/tags/providers/tags.service';
import { Repository } from 'typeorm';
import { Tag } from 'src/tags/entities/tag.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

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

  const mockPaginationProvider = {
    createPaginationMetadata: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsService,
        {
          provide: getRepositoryToken(Tag),
          useValue: mockTagRepository,
        },
        {
          provide: PaginationProvider,
          useValue: mockPaginationProvider,
        },
      ],
    }).compile();

    service = module.get<TagsService>(TagsService);
    repository = module.get(getRepositoryToken(Tag));
  });

  afterEach(() => {
    console.log(repository);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
