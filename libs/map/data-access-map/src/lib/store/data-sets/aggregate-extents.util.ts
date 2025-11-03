export type TExtentData = {
  min: Date | null;
  max: Date | null;
};

export const aggregateExtents = (
  extents: Record<string, TExtentData>,
  enabledCollectionIds: string[]
): { min: Date | undefined; max: Date | undefined } | undefined => {
  const relevantExtents = enabledCollectionIds.map((id) => extents[id]).filter(Boolean);

  if (!relevantExtents.length) {
    return undefined;
  }

  const anyMinIsNull = relevantExtents.some((extent) => extent.min === null);
  const anyMaxIsNull = relevantExtents.some((extent) => extent.max === null);

  const min = anyMinIsNull
    ? undefined
    : new Date(
        Math.min(
          ...relevantExtents
            .filter((extent): extent is { min: Date; max: Date | null } => extent.min !== null)
            .map((extent) => extent.min.getTime())
        )
      );

  const max = anyMaxIsNull
    ? undefined
    : new Date(
        Math.max(
          ...relevantExtents
            .filter((extent): extent is { min: Date | null; max: Date } => extent.max !== null)
            .map((extent) => extent.max.getTime())
        )
      );

  return { min, max };
};
