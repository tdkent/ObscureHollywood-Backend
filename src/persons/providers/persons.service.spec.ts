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
    Pick<Repository<Partial<Person>>, 'findAndCount' | 'findOne'>
  >;

  const mockPersonRepository: jest.Mocked<
    Pick<Repository<Partial<Person>>, 'findAndCount' | 'findOne'>
  > = {
    findAndCount: jest.fn(),
    findOne: jest.fn(),
  };

  const mockPaginationProvider = {
    createPaginationMetadata: jest.fn(),
  };

  beforeEach(async () => {
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
      orderBy: 'lastNameAsc',
      page: '1',
    };

    it('should call repository.findAndCount()', async () => {
      repository.findAndCount.mockResolvedValue([[], 35]);

      await service.findAll(query);

      expect(repository.findAndCount).toHaveBeenCalledTimes(1);

      expect(repository.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: (Number(query.page) - 1) * 10,
          order: { lastName: 'ASC', firstName: 'ASC' },
        }),
      );
    });

    it('should return persons and pagination metadata', async () => {
      const persons: Partial<Person>[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

      repository.findAndCount.mockResolvedValue([persons, 3]);

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
      repository.findAndCount.mockResolvedValue([[], 0]);
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
