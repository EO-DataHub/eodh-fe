export class DateRangeNotFetchedError extends Error {
  public code = 'DateRangeNotFetchedError';
  public collectionIds: string[];

  public constructor(collectionIds: string[], message?: string) {
    super(message || `Failed to fetch date range for collections: ${collectionIds.join(', ')}`);
    this.collectionIds = collectionIds;
    this.name = 'DateRangeNotFetchedError';
  }
}
