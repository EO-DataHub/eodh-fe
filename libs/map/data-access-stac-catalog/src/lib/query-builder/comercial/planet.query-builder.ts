import { createDate, createDateString, createIsoStringDate } from '@ukri/shared/utils/date';

import { TGeometry } from '../../stac-model/geometry.schema';
import { getIntersects } from '../get-intersects';
import { TFields, TFilterParam, TSearchParams } from '../query.model';
import { createPlanetFilterParams } from './planet.filter-params';

export type TSortBy = {
  field: string;
  direction: 'desc' | 'asc';
};

export type TQueryBuilderParams = {
  queryParams?: TSearchParams;
  limit: number;
  sortBy: {
    field: 'properties.datetime';
    direction: 'desc' | 'asc';
  };
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
  collections?: string[];
};

export type TQuery = {
  enabled: boolean;
  params: TQueryParams;
};

// todo create BaseQueryBuilder abstract class
export class PlanetQueryBuilder {
  public constructor(
    protected readonly params: TQueryBuilderParams,
    protected readonly options: TQueryBuilderOptions = {}
  ) {}

  public build(): TQuery {
    if (!this.params.queryParams) {
      return this.createDefaultQuery();
    }

    const intersects = getIntersects(this.params.queryParams.aoi);

    const params: TQueryParams = {
      limit: this.params.limit,
      sortby: this.getSortBy(),
      'filter-lang': 'cql-json',
      datetime: this.getDatetime(),
      filter: this.getFilterParams(),
      collections: this.getCollections(),
      intersects,
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
      sortby: this.getSortBy(),
      'filter-lang': 'cql-json',
      filter: {},
      fields: {},
    },
  });

  private isEnabled = () => {
    if (!this.params.queryParams) {
      return false;
    }

    return !!this.getCollections().length;
  };

  private getCollections = () => {
    const collections: string[] = [];
    const planet = this.params.queryParams?.dataSets?.private.planet;

    if (!planet) {
      return collections;
    }

    if (planet.planetScope?.enabled) {
      collections.push('PSScene');
    }

    if (planet.skySat?.enabled) {
      collections.push('SkySatScene');
    }

    return collections;
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

  private getSortBy = (): TSortBy[] => {
    return [
      {
        field: 'acquired',
        direction: this.params.sortBy.direction,
      },
    ];
  };

  private getFilterParams = (): TFilterParam | object => {
    const planet = this.params.queryParams?.dataSets?.private.planet;
    if (!planet) {
      return {};
    }

    return createPlanetFilterParams(planet) || {};
  };
}
