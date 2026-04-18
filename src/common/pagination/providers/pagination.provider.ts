import { Injectable } from '@nestjs/common';
import { PaginatedResponse } from 'src/common/pagination/interfaces/paginated-response.interface';
import { ObjectLiteral } from 'typeorm';
import { CreatePaginationMetadataInputs } from 'src/common/pagination/interfaces/create-metadata-inputs.interface';

@Injectable()
export class PaginationProvider {
  constructor() {}
  public async createPaginationMetadata<T extends ObjectLiteral>({
    repository,
    limit,
    orderBy,
    page,
    data,
    count,
  }: CreatePaginationMetadataInputs<T>) {
    /**
     * Calculate items metadata
     */
    const totalItems = count ?? (await repository.count());
    const firstItemOnPage = (page - 1) * limit + 1;
    const lastItemOnPage =
      page * limit < totalItems ? page * limit : totalItems;

    /**
     * Calculate pages metadata
     */
    const totalPages = Math.ceil(totalItems / limit);
    const nextPage = page >= totalPages ? totalPages : page + 1;
    const prevPage =
      page >= totalPages ? totalPages - 1 : page <= 1 ? 1 : page - 1;

    /**
     * Query string w/o page params
     */
    const nonPageParams = `&limit=${limit}&orderBy=${orderBy}`;

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
        firstItemOnPage,
        lastItemOnPage,
      },
      links: {
        first: `page=1${nonPageParams}`,
        last: `page=${totalPages}${nonPageParams}`,
        current: `page=${page}${nonPageParams}`,
        next: `page=${nextPage}${nonPageParams}`,
        previous: `page=${prevPage}${nonPageParams}`,
      },
    };

    return responseWithMetadata;
  }
}
