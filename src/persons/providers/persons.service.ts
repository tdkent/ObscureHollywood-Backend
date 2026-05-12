import { Injectable, NotFoundException } from '@nestjs/common';
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

    const totalItems = await this.personsRepository.count({
      where: {
        article: Not(IsNull()),
      },
    });

    const finalResponse = this.paginationProvider.createPaginationMetadata({
      data: persons,
      limit,
      orderBy,
      page,
      totalItems,
    });

    return finalResponse;
  }

  public async findRecent() {
    return this.personsRepository.find({
      where: {
        article: Not(IsNull()),
      },
      order: {
        createdAt: 'DESC',
      },
      take: 3,
    });
  }

  public async findOne(slug: string) {
    const person = await this.personsRepository.findOne({
      where: { slug },
      relations: {
        article: {
          incomingRelations: {
            article: true,
          },
        },
        personFilms: {
          film: true,
        },
      },
    });

    if (!person) throw new NotFoundException();

    return person;
  }
}
