import { TCatalogueCollection } from './collection';
import { QueryBuilder, TQuery } from './query.builder';
import { TCatalogSearchParams, TSearchParams, TWorkflowSearchParams } from './query.model';

export type TSortBy = {
  field: string;
  direction: 'desc' | 'asc';
};

export type TCollectionQueryBuilderParams = {
  queryParams?: Omit<TSearchParams, 'collection'>;
  limit: number;
  sortBy: TSortBy;
};

export type TCollectionQueryBuilderOptions = {
  debug?: boolean;
};

export type TWorkflowQuery = {
  enabled: boolean;
  userWorkspace: string;
  jobId: string;
  type: 'workflow';
  params: TQuery['params'];
};

export type TSearchQuery = {
  enabled: boolean;
  type: 'search';
  params: (TQuery & { collection?: TCatalogueCollection })[];
};

export type TCollectionQuery = TWorkflowQuery | TSearchQuery;

const isWorkflow = (params: Omit<TSearchParams, 'collection'>): params is TWorkflowSearchParams =>
  !!params.userWorkspace && !!params.jobId;

const isCatalogue = (params: Omit<TSearchParams, 'collection'>): params is TCatalogSearchParams => !!params.dataSets;

export class CollectionBuilder {
  public constructor(
    protected readonly params: TCollectionQueryBuilderParams,
    protected readonly options: TCollectionQueryBuilderOptions = {}
  ) {}

  public build(collections: TCatalogueCollection[]): TCollectionQuery {
    if (!this.params.queryParams) {
      return this.getDefaultQuery();
    }

    if (isWorkflow(this.params.queryParams)) {
      const { collection, ...queryParams } = this.params.queryParams;
      return {
        type: 'workflow',
        userWorkspace: queryParams.userWorkspace,
        jobId: queryParams.jobId,
        ...new QueryBuilder(
          { ...this.params, queryParams },
          { ...this.options, enabledOnParams: 'dataOrDateTime' }
        ).build(),
      };
    } else if (isCatalogue(this.params.queryParams)) {
      const queryParams = this.params.queryParams;
      const queries = collections.map((collection) => ({
        ...new QueryBuilder(
          { ...this.params, queryParams: { ...queryParams, collection } },
          { ...this.options, enabledOnParams: 'data' }
        ).build(),
        collection,
      }));

      return {
        type: 'search',
        enabled: queries.some((query) => query.params),
        params: queries,
      };
    }

    return this.getDefaultQuery();
  }

  private getDefaultQuery = (): TCollectionQuery => {
    const { queryParams, ...params } = this.params;
    const query = new QueryBuilder(params, { ...this.options, enabledOnParams: 'dataOrDateTime' }).build();

    return {
      type: 'search',
      enabled: query.enabled,
      params: [query],
    };
  };
}
