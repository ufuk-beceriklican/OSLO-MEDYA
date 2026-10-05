import { getCollection, type CollectionEntry } from 'astro:content';
import { categories } from '../content.config';

export type Post = CollectionEntry<'blog'>;
export type Category = (typeof categories)[number];

export const categorySlugs: Record<Category, string> = {
  SEO: 'seo',
  'Sosyal Medya': 'sosyal-medya',
  'E-Ticaret': 'e-ticaret',
  'Dijital Pazarlama': 'dijital-pazarlama',
  Teknoloji: 'teknoloji',
};

/** Yazıları yeniden eskiye sıralar (anasayfadaki "son yazılar" gerçekten en yeni olanlardır). */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export const postPath = (post: Post) => `/blog/${post.id}`;
