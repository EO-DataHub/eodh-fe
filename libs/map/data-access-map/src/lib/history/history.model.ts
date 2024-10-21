import { z } from 'zod';

const statusEnum = z.enum(['submitted', 'running', 'cancel-request', 'successful', 'failed', 'cancelled']);

const submissionSchema = z
  .object({
    submission_id: z.string().uuid(),
    status: statusEnum.transform((status) => {
      if (['failed', 'cancel-request', 'cancelled'].includes(status)) {
        return 'FAILED';
      } else if (['submitted', 'running'].includes(status)) {
        return 'PROCESSING';
      } else if (status === 'successful') {
        return 'READY';
      }
    }),
    function_identifier: z.string(),
    submitted_at: z
      .string()
      .datetime()
      .transform((dateString) => {
        const date = new Date(dateString);
        return {
          date: date.toISOString().split('T')[0],
          hour: `${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`,
        };
      }),
    finished_at: z.union([z.string().datetime(), z.null(), z.undefined()]),
    successful: z.union([z.boolean(), z.null(), z.undefined()]),
  })
  .transform((data) => ({
    submissionId: data.submission_id,
    status: data.status,
    functionIdentifier: data.function_identifier,
    submittedAt: data.submitted_at,
    finishedAt: data.finished_at,
    successful: data.successful,
  }));

export const historySchema = z
  .object({
    results: z.array(submissionSchema),
    total_items: z.number().int(),
    current_page: z.number().int(),
    total_pages: z.number().int(),
    results_on_current_page: z.number().int(),
    results_per_page: z.number().int(),
    ordered_by: z.string(),
    order_direction: z.enum(['asc', 'desc']),
  })
  .transform((data) => ({
    results: data.results,
    totalItems: data.total_items,
    currentPage: data.current_page,
    totalPages: data.total_pages,
    resultsOnCurrentPage: data.results_on_current_page,
    resultsPerPage: data.results_per_page,
    orderedBy: data.ordered_by,
    orderDirection: data.order_direction,
  }));

export type THistoryItem = z.infer<typeof submissionSchema>;
export type THistory = z.infer<typeof historySchema>;

export const TransformedStatusEnum = z.enum(['FAILED', 'PROCESSING', 'READY']);
