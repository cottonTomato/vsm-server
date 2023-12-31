import { z } from 'zod';

export const addGameStateDtoSchema = z.object({
  news: z
    .object({
      news: z.string(),
      forInsider: z.coerce.boolean(),
    })
    .array(),
  stocks: z
    .object({
      name: z.string(),
      bpc: z.coerce.number(),
    })
    .array(),
  roundNumber: z.coerce.number(),
});

export type IGameDataDto = z.infer<typeof addGameStateDtoSchema>;

export const addGameDataBatchDtoSchema = z.object({
  data: addGameStateDtoSchema.array(),
});

export type IGameDataBatchDto = z.infer<typeof addGameDataBatchDtoSchema>;
