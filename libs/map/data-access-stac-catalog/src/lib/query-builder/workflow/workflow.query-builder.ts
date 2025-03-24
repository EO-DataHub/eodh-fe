import { createDate, createDateString, createIsoStringDate } from '@ukri/shared/utils/date';

import { TGeometry } from '../../stac-model/geometry.schema';
import { TFields, TFilterParam, TSearchParams } from '../query.model';

export type TSortBy = {
  field: 'properties.datetime';
  direction: 'desc' | 'asc';
};

export type TQueryBuilderParams = {
  queryParams?: TSearchParams;
  limit: number;
  sortBy: TSortBy;
};

export type TQueryBuilderOptions = {
  debug?: boolean;
};

export type TQueryParams = {
  limit: number;
  sortby: TSortBy[];
  datetime?: string;
  'filter-lang': 'cql-json';
  filter?: TFilterParam | object;
  fields?: TFields;
  intersects?: TGeometry;
  collections: string[];
};

export type TQuery = {
  enabled: boolean;
  params: TQueryParams;
};

export class WorkflowQueryBuilder {
  public constructor(
    protected readonly params: TQueryBuilderParams,
    protected readonly options: TQueryBuilderOptions = {}
  ) {}

  public build(): TQuery {
    if (!this.params.queryParams || !this.isWorkflow()) {
      return this.createDefaultQuery();
    }

    const params: TQueryParams = {
      limit: this.params.limit,
      sortby: [this.params.sortBy],
      'filter-lang': 'cql-json',
      datetime: this.getDatetime(),
      collections: this.getCollections(),
      fields: this.getFields(),
    };
    const query: TQuery = {
      enabled: this.isEnabled(),
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
      collections: [],
      limit: this.params.limit,
      sortby: [this.params.sortBy],
      'filter-lang': 'cql-json',
      filter: {},
      fields: {},
    },
  });

  private isEnabled = () => {
    if (!this.params.queryParams) {
      return false;
    }

    return !!this.getCollections().length && this.isWorkflow();
  };

  private getCollections = () => {
    if (!this.params.queryParams?.userWorkspace?.length || !this.params.queryParams?.jobId?.length) {
      return [];
    }

    return [`col_${this.params.queryParams.jobId}`];
  };

  private getDatetime = () => {
    if (!this.params.queryParams?.date?.from || !this.params.queryParams?.date.to) {
      return undefined;
    }

    const dateFrom = createDate(this.params.queryParams.date.from);
    const dateTo = createDate(this.params.queryParams.date.to);

    if (!dateFrom || !dateTo) {
      return undefined;
    }

    dateFrom.setUTCHours(0, 0, 0, 0);
    dateTo.setUTCHours(23, 59, 59, 999);

    return `${createIsoStringDate(createDateString(dateFrom))}/${createIsoStringDate(createDateString(dateTo))}`;
  };

  private getFields = (): TFields => {
    return {
      include: ['properties.lulc_classes_percentage', 'properties.lulc_classes_m2'],
    };
  };

  private isWorkflow = () => {
    return !!this.params.queryParams?.userWorkspace?.length && !!this.params.queryParams?.jobId?.length;
  };
}
