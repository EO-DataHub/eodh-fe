export type TExtentData = {
  min: Date | null;
  max: Date | null;
};

export const aggregateExtents = (
  extents: Record<string, TExtentData>,
  enabledCollectionIds: string[]
): { min: Date | undefined; max: Date | undefined } | undefined => {
  const relevantExtents = enabledCollectionIds.map((id) => extents[id]).filter(Boolean);
  const minExtents = relevantExtents.filter((extent): extent is { min: Date; max: Date } => !!extent.min);
  const maxExtents = relevantExtents.filter((extent): extent is { min: Date; max: Date } => !!extent.max);

  if (!relevantExtents.length) {
    return undefined;
  }

  const min = minExtents.length ? new Date(Math.min(...minExtents.map((extent) => extent.min.getTime()))) : undefined;
  const max = maxExtents.length ? new Date(Math.max(...maxExtents.map((extent) => extent.max.getTime()))) : undefined;

  return { min, max };
};
