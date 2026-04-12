import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { GetPersonsDto } from 'src/persons/dto/get-persons.dto';
import { Person } from 'src/persons/entities/person.entity';
import { IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class PersonsService {
  constructor(
    /**
     * Persons repository
     */
    @InjectRepository(Person)
    private personsRepository: Repository<Person>,
    /**
     * Pagination provider
     */
    private paginationProvider: PaginationProvider,
  ) {}
  /**
   * Send a list of persons with pagination and sorting.
   */
  public async findAll(reqQuery: GetPersonsDto) {
    const { limit, orderBy, page } = reqQuery;

    const persons = await this.personsRepository.find({
      where: {
        article: Not(IsNull()),
      },
      order:
        orderBy === 'lastNameDesc'
          ? { lastName: 'DESC', firstName: 'DESC' }
          : orderBy === 'firstNameAsc'
            ? { firstName: 'ASC', lastName: 'ASC' }
            : orderBy === 'firstNameDesc'
              ? { firstName: 'DESC', lastName: 'DESC' }
              : { lastName: 'ASC', firstName: 'ASC' },
      take: limit,
      skip: (page - 1) * limit,
    });

    const finalResponse =
      await this.paginationProvider.createPaginationMetadata({
        repository: this.personsRepository,
        limit,
        page,
        data: persons,
      });

    return finalResponse;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }
}
