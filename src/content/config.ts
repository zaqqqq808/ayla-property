import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // Overrides the <title> tag and schema headline when the H1 is written for readers, not search.
    seoTitle: z.string().optional(),
    description: z.string().optional(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    hideHeroImage: z.boolean().default(false),
    author: z.string().default('Ayla Property'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
