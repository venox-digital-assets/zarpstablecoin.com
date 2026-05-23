import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The "News" section. Markdown articles live in src/content/news/.
// Each file's name (without the .md extension) becomes its URL slug,
// e.g. src/content/news/my-post.md -> /news/my-post/
const news = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		author: z.string().default('ZARP Stablecoin'),
		// Hero image is a path under /public, e.g. /img/news/my-post.jpeg
		heroImage: z.string().optional(),
		heroImageAlt: z.string().optional(),
		heroImageCredit: z.string().optional(),
		tags: z.array(z.string()).default([]),
		// Set to hide a post from the index and RSS feed without deleting it.
		draft: z.boolean().default(false),
	}),
});

export const collections = { news };
