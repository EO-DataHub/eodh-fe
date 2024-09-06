import { getFields } from './fields/get-fields';
import { createFilterParams } from './filter-params/create.filter-params';
import { TCatalogSearchParams, TFields, TFilterParam } from './query.model';

export type TSortBy = {
  field: string;
  direction: 'desc' | 'asc';
};

export type TQueryBuilderParams = {
  queryParams?: TCatalogSearchParams;
  limit: number;
  sortBy: TSortBy;
};

export type TQueryBuilderOptions = {
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
  public constructor(
    protected readonly params: TQueryBuilderParams,
    protected readonly options: TQueryBuilderOptions = {}
  ) {}

  public build(): TQuery {
    if (!this.params.queryParams) {
      return this.createDefaultQuery();
    }

    const filter = createFilterParams(this.params.queryParams);
    const fields = getFields(this.params.queryParams);

    const params: TQueryParams = {
      limit: this.params.limit,
      sortby: [this.params.sortBy],
      'filter-lang': 'cql-json',
      filter,
      fields,
    };
    const query: TQuery = {
      enabled: !!Object.keys(params.filter).length,
      params,
    };

    if (this.options.debug) {
      // eslint-disable-next-line no-console
      console.log('query', query);
    }

    return query;
  }

  private createDefaultQuery = (): TQuery => ({
    enabled: false,
    params: {
      limit: this.params.limit,
      sortby: [this.params.sortBy],
      'filter-lang': 'cql-json',
      filter: {},
      fields: {},
    },
  });
}
