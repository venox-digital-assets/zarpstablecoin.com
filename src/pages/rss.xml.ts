import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedNews } from '../utils/posts';

export async function GET(context: APIContext) {
	const posts = await getPublishedNews();

	return rss({
		title: 'ZARP Stablecoin News',
		description:
			'Announcements, product updates, and insights from the ZARP Stablecoin team — South Africa’s most established Rand stablecoin.',
		// context.site comes from `site` in astro.config.mjs
		site: context.site ?? 'https://www.zarpstablecoin.com',
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			link: `/news/${post.id}/`,
			author: post.data.author,
			categories: post.data.tags,
		})),
		customData: '<language>en-za</language>',
	});
}
