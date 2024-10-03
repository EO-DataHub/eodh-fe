import { z } from 'zod';

import { aoiSchema } from './aoi.schema';
import { dateSchama } from './date.schema';
import { dataSetsSchema } from './date-sets.schema';

export const searchSchema = z.object({
  dataSets: dataSetsSchema,
  date: dateSchama,
  aoi: aoiSchema,
});

export type TSearchData = z.infer<typeof searchSchema>;
