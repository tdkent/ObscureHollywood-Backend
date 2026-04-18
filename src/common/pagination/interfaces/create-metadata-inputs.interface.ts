import { ObjectLiteral, Repository } from 'typeorm';

export interface CreatePaginationMetadataInputs<T extends ObjectLiteral> {
  repository: Repository<T>;
  limit: number;
  orderBy: string;
  page: number;
  data: T[];
  count?: number;
}
