import { ObjectLiteral } from 'typeorm';

export interface CreatePaginationMetadataInputs<T extends ObjectLiteral> {
  data: T[];
  orderBy: string;
  page: number;
  q?: string;
  tags?: string[];
  totalItems: number;
}
