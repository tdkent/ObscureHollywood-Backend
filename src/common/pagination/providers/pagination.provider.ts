import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaginatedResponse } from 'src/common/pagination/interfaces/paginated-response.interface';
import { ObjectLiteral } from 'typeorm';
import { CreatePaginationMetadataInputs } from 'src/common/pagination/interfaces/create-metadata-inputs.interface';

@Injectable()
export class PaginationProvider {
  constructor(
    /**
     * Config service
     */
    private readonly configService: ConfigService,
  ) {}
  public async createPaginationMetadata<T extends ObjectLiteral>({
    repository,
    limit,
    page,
    data,
  }: CreatePaginationMetadataInputs<T>) {
    const totalItems = await repository.count();

    const totalPages = Math.ceil(totalItems / limit);
    const nextPage = page >= totalPages ? totalPages : page + 1;
    const prevPage =
      page >= totalPages ? totalPages - 1 : page <= 1 ? 1 : page - 1;

    const baseUrl = `${this.configService.get('BASE_URL')}`;

    /**
     * Response object with pagination metadata.
     */
    const responseWithMetadata: PaginatedResponse<T> = {
      data,
      meta: {
        itemsPerPage: limit,
        totalItems,
        currentPage: page,
        totalPages,
      },
      links: {
        first: `${baseUrl}/films?limit=${limit}&page=1`,
        last: `${baseUrl}/films?limit=${limit}&page=${totalPages}`,
        current: `${baseUrl}/films?limit=${limit}&page=${page}`,
        next: `${baseUrl}/films?limit=${limit}&page=${nextPage}`,
        previous: `${baseUrl}/films?limit=${limit}&page=${prevPage}`,
      },
    };

    return responseWithMetadata;
  }
}
