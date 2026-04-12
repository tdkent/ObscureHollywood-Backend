import { Test, TestingModule } from '@nestjs/testing';
import { PersonsController } from './persons.controller';
import { PersonsService } from 'src/persons/providers/persons.service';
import { GetPersonsDto } from 'src/persons/dto/get-persons.dto';
import { PaginatedResponse } from 'src/common/pagination/interfaces/paginated-response.interface';
import { Person } from 'src/persons/entities/person.entity';

describe('PersonsController', () => {
  let controller: PersonsController;
  let service: PersonsService;

  const mockPersonsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    mockPersonsService.findAll.mockResolvedValue([]);
    mockPersonsService.findOne.mockResolvedValue(null);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonsController],
      providers: [
        {
          provide: PersonsService,
          useValue: mockPersonsService,
        },
      ],
    }).compile();

    controller = module.get<PersonsController>(PersonsController);
    service = module.get<PersonsService>(PersonsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    const query: GetPersonsDto = { limit: 10, page: 1, orderBy: 'lastNameAsc' };

    it('should call findAll service once', async () => {
      await service.findAll(query);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should pass query params to findAll service', async () => {
      await service.findAll(query);
      expect(service.findAll).toHaveBeenCalledWith(query);
    });

    it('should return an array of persons', async () => {
      const persons = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const response: Partial<PaginatedResponse<Partial<Person>>> = {
        data: persons,
      };
      mockPersonsService.findAll.mockResolvedValue(response);
      const result = await service.findAll(query);
      expect(result.data).toBe(persons);
    });

    it('should return an empty array if no data can be found', async () => {
      const response: Partial<PaginatedResponse<Partial<Person>>> = {
        data: [],
      };
      mockPersonsService.findAll.mockResolvedValue(response);
      const result = await service.findAll(query);
      expect(result.data).toEqual([]);
    });
  });

  describe('findOne', () => {
    const slug = 'alma-rubens';

    it('should call findOne service once', async () => {
      await service.findOne(slug);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should pass the slug to the findOne service', async () => {
      await service.findOne(slug);
      expect(service.findOne).toHaveBeenCalledWith(slug);
    });

    it('should return the person', async () => {
      const person = { id: 1 };
      mockPersonsService.findOne.mockResolvedValue(person);
      const result = await service.findOne(slug);
      expect(result).toBe(person);
    });
  });
});
