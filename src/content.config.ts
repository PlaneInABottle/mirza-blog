import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
        translationKey: z.string().optional(),
        cover: image().optional(),
        coverAlt: z.string().optional(),
      })
      .refine((data) => !data.cover || data.coverAlt, {
        message: 'cover varsa coverAlt zorunlu.',
        path: ['coverAlt'],
      }),
});

export const collections = { blog };
