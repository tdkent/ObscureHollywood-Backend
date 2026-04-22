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
    tags,
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
    const tagParams = tags && tags.length ? `&tag=${tags.join('&tag=')}` : '';

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
        first: `page=1${nonPageParams}${tagParams}`,
        last: `page=${totalPages}${nonPageParams}${tagParams}`,
        current: `page=${page}${nonPageParams}${tagParams}`,
        next: `page=${nextPage}${nonPageParams}${tagParams}`,
        previous: `page=${prevPage}${nonPageParams}${tagParams}`,
      },
    };

    return responseWithMetadata;
  }
}
