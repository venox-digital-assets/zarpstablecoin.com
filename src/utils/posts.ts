import { getCollection, type CollectionEntry } from 'astro:content';

export type NewsPost = CollectionEntry<'news'>;

/** All published news posts, newest first. Drafts are hidden in production. */
export async function getPublishedNews(): Promise<NewsPost[]> {
	const posts = await getCollection('news', ({ data }) =>
		import.meta.env.PROD ? data.draft !== true : true,
	);
	return posts.sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
}

/** Format a date as e.g. "27 April 2026" (en-ZA). */
export function formatDate(date: Date): string {
	return date.toLocaleDateString('en-ZA', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC',
	});
}

/** Rough reading time in minutes from raw markdown body (~200 wpm). */
export function readingTime(body: string | undefined): number {
	const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}
