import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface ImageSize {
	width: number;
	height: number;
}

/**
 * Pixel dimensions of an image in public/, e.g. "/img/news/my-post.jpeg".
 *
 * Social platforms lay a card out before the image has finished downloading,
 * so declaring og:image:width/height avoids a reflow and stops a large image
 * being misjudged as too small for a summary_large_image card.
 *
 * Only JPEG and PNG are read — the formats hero images actually use. Anything
 * else (or an unreadable file) returns undefined, and the caller simply omits
 * the dimension tags.
 */
export function publicImageSize(src: string): ImageSize | undefined {
	if (!src.startsWith('/')) return undefined;

	let buf: Buffer;
	try {
		buf = readFileSync(join(process.cwd(), 'public', src));
	} catch {
		console.warn(`[og] could not read ${src} for og:image dimensions`);
		return undefined;
	}

	// PNG: IHDR is always the first chunk, so the size sits at a fixed offset.
	if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
		return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
	}

	// JPEG: walk the marker segments looking for the first start-of-frame.
	if (buf.length < 4 || buf.readUInt16BE(0) !== 0xffd8) return undefined;
	let i = 2;
	while (i + 9 < buf.length) {
		if (buf[i] !== 0xff) {
			i++;
			continue;
		}
		const marker = buf[i + 1];
		// Standalone markers carry no length field.
		if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd8)) {
			i += 2;
			continue;
		}
		if (marker === 0xd9) break;
		// SOF0-SOF15, excluding the huffman/arithmetic/restart tables that
		// share the 0xC0-0xCF range.
		if (
			marker >= 0xc0 &&
			marker <= 0xcf &&
			marker !== 0xc4 &&
			marker !== 0xc8 &&
			marker !== 0xcc
		) {
			return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
		}
		i += 2 + buf.readUInt16BE(i + 2);
	}
	return undefined;
}
