import { ObjectLiteral, Repository } from 'typeorm';

export interface CreatePaginationMetadataInputs<T extends ObjectLiteral> {
  repository: Repository<T>;
  limit: number;
  page: number;
  data: T[];
}
