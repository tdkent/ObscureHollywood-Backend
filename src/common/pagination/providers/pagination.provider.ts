import { Injectable } from '@nestjs/common';
import { PaginatedResponse } from 'src/common/pagination/interfaces/paginated-response.interface';
import { ObjectLiteral } from 'typeorm';
import { CreatePaginationMetadataInputs } from 'src/common/pagination/interfaces/create-metadata-inputs.interface';
import { PAGINATION_TAKE_COUNT } from 'src/common/constants/constants';

@Injectable()
export class PaginationProvider {
  constructor() {}
  public createPaginationMetadata<T extends ObjectLiteral>({
    data,
    orderBy,
    page,
    q: searchString,
    totalItems,
    tags,
  }: CreatePaginationMetadataInputs<T>) {
    /**
     * Calculate items metadata
     */
    const firstItemOnPage = (page - 1) * PAGINATION_TAKE_COUNT + 1;
    const lastItemOnPage =
      page * PAGINATION_TAKE_COUNT < totalItems
        ? page * PAGINATION_TAKE_COUNT
        : totalItems;

    /**
     * Calculate pages metadata
     */
    const totalPages = Math.ceil(totalItems / PAGINATION_TAKE_COUNT);
    const nextPage = page >= totalPages ? totalPages : page + 1;
    const prevPage =
      page >= totalPages ? totalPages - 1 : page <= 1 ? 1 : page - 1;

    /**
     * Query string w/o page params
     */
    const sortParam = `&orderBy=${orderBy}`;
    const searchParam = searchString ? `&q=${searchString}` : '';
    const tagParams = tags && tags.length ? `&tag=${tags.join('&tag=')}` : '';

    /**
     * Response object with pagination metadata.
     */
    const responseWithMetadata: PaginatedResponse<T> = {
      data,
      meta: {
        itemsPerPage: PAGINATION_TAKE_COUNT,
        totalItems,
        currentPage: page,
        totalPages,
        firstItemOnPage,
        lastItemOnPage,
      },
      links: {
        first: `page=1${sortParam}${searchParam}${tagParams}`,
        last: `page=${totalPages}${sortParam}${searchParam}${tagParams}`,
        current: `page=${page}${sortParam}${searchParam}${tagParams}`,
        next: `page=${nextPage}${sortParam}${searchParam}${tagParams}`,
        previous: `page=${prevPage}${sortParam}${searchParam}${tagParams}`,
      },
    };

    return responseWithMetadata;
  }
}
