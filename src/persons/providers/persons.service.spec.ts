import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { GetPersonsDto } from 'src/persons/dto/get-persons.dto';
import { Person } from 'src/persons/entities/person.entity';
import { PersonsService } from 'src/persons/providers/persons.service';
import { Repository } from 'typeorm';

describe('PersonsService', () => {
  let service: PersonsService;
  let repository: jest.Mocked<
    Pick<Repository<Partial<Person>>, 'count' | 'find' | 'findOne'>
  >;

  const mockPersonRepository: jest.Mocked<
    Pick<Repository<Partial<Person>>, 'count' | 'find' | 'findOne'>
  > = {
    count: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  const mockPaginationProvider = {
    createPaginationMetadata: jest.fn(),
  };

  beforeEach(async () => {
    mockPersonRepository.find.mockResolvedValue([]);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonsService,
        {
          provide: getRepositoryToken(Person),
          useValue: mockPersonRepository,
        },
        {
          provide: PaginationProvider,
          useValue: mockPaginationProvider,
        },
      ],
    }).compile();

    service = module.get<PersonsService>(PersonsService);
    repository = module.get(getRepositoryToken(Person));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    const query: GetPersonsDto = {
      limit: '10',
      orderBy: 'lastNameAsc',
      page: '1',
    };

    it('should call repository.find() and repository.count()', async () => {
      repository.find.mockResolvedValue([]);
      repository.count.mockResolvedValue(35);

      await service.findAll(query);

      expect(repository.find).toHaveBeenCalledTimes(1);
      expect(repository.count).toHaveBeenCalledTimes(1);

      expect(repository.find).toHaveBeenCalledWith(
        expect.objectContaining({
          take: Number(query.limit),
          skip: (Number(query.page) - 1) * 10,
          order: { lastName: 'ASC', firstName: 'ASC' },
        }),
      );
    });

    it('should return persons and pagination metadata', async () => {
      const persons: Partial<Person>[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

      repository.find.mockResolvedValue(persons);

      mockPaginationProvider.createPaginationMetadata.mockReturnValueOnce({
        data: persons,
        links: {
          current: '',
          first: '',
        },
        meta: {
          currentPage: 1,
          totalItems: 35,
        },
      });

      const result = await service.findAll(query);

      expect(result.data).toEqual(persons);
      expect(result.links.current).toBeDefined();
      expect(result.links.first).toBeDefined();
      expect(result.meta.currentPage).toBe(1);
      expect(result.meta.totalItems).toEqual(35);
    });

    it('should return an empty array if no data can be found', async () => {
      repository.find.mockResolvedValue([]);
      mockPaginationProvider.createPaginationMetadata.mockReturnValueOnce({
        data: [],
        links: {},
        meta: {},
      });
      const result = await service.findAll(query);
      expect(result.data).toEqual([]);
    });
  });

  describe('findOne', () => {
    const params = { slug: 'alma-rubens' };
    const mockPerson = { id: 1 };

    it('should call repository.findOne()', async () => {
      repository.findOne.mockResolvedValue(mockPerson);

      await service.findOne(params.slug);

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { slug: params.slug },
        }),
      );
    });

    it('should return the feature', async () => {
      repository.findOne.mockResolvedValue(mockPerson);

      const result = await service.findOne(params.slug);

      expect(result).toEqual(mockPerson);
    });
  });
});
