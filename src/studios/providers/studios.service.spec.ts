import { Test, TestingModule } from '@nestjs/testing';
import { StudiosService } from './studios.service';
import { Repository } from 'typeorm';
import { Studio } from 'src/studios/entities/studio.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

describe('StudiosService', () => {
  let service: StudiosService;
  let repository: jest.Mocked<
    Pick<Repository<Partial<Studio>>, 'find' | 'findOne'>
  >;

  const mockStudioRepository: jest.Mocked<
    Pick<Repository<Partial<Studio>>, 'find' | 'findOne'>
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
        StudiosService,
        {
          provide: getRepositoryToken(Studio),
          useValue: mockStudioRepository,
        },
        {
          provide: PaginationProvider,
          useValue: mockPaginationProvider,
        },
      ],
    }).compile();

    service = module.get<StudiosService>(StudiosService);
    repository = module.get(getRepositoryToken(Studio));
  });

  it('should be defined', () => {
    console.log(repository);
    expect(service).toBeDefined();
  });
});
