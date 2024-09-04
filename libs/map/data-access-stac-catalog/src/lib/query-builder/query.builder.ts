import { getFields } from './fields/get-fields';
import { createFilterParams } from './filter-params/create.filter-params';
import { TCatalogSearchParams, TFields, TFilterParam } from './query.model';

export type TSortBy = {
  field: string;
  direction: 'desc' | 'asc';
};

type TQueryBuilderParams = {
  queryParams?: TCatalogSearchParams;
  limit: number;
  sortBy: TSortBy;
};

type TQueryBuilderOptions = {
  debug?: boolean;
};

export type TQueryParams = {
  limit: number;
  sortby: TSortBy[];
  'filter-lang': 'cql-json';
  filter: TFilterParam | object;
  fields: TFields;
};

export type TQuery = {
  enabled: boolean;
  params: TQueryParams;
};

export class QueryBuilder {
  public constructor(protected params: TQueryBuilderParams, protected options?: TQueryBuilderOptions) {}

  public build(): TQuery {
    if (!this.params.queryParams) {
      return this.createDefaultQuery();
    }

    const params: TQueryParams = {
      limit: this.params.limit,
      sortby: [this.params.sortBy],
      'filter-lang': 'cql-json',
      filter: createFilterParams(this.params.queryParams),
      fields: getFields(this.params.queryParams),
    };
    const query: TQuery = {
      enabled: !!Object.keys(params.filter).length,
      params,
    };

    if (this.options?.debug) {
      // eslint-disable-next-line no-console
      console.log('query', query);
    }

    return query;
  }
}
