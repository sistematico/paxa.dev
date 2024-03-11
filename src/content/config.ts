import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		tags: z.array(z.string()).optional()
	}),
});

// const projectsCollection = defineCollection({
// 	type: 'data',
// 	schema: z.object({
// 		title: z.string(),
// 		url: z.string()
// 	}),
// });

// export const collections = {
//   'blog': blogCollection,
//   'projects': projectsCollection
// };

export const collections = { blog };
