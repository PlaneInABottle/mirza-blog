import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

export type Post = CollectionEntry<'blog'>;

/** Dil, dosya yolundan gelir: `en/...` İngilizce, gerisi Türkçe. */
export const postLang = (post: Post): Lang => (post.id.startsWith('en/') ? 'en' : 'tr');

/** URL parçası: `en/getting-started` -> `getting-started`. */
export const postSlug = (post: Post): string => post.id.replace(/^en\//, '');

export const postUrl = (post: Post): string =>
  postLang(post) === 'en' ? `/en/${postSlug(post)}/` : `/yazilar/${postSlug(post)}/`;

/**
 * Yazıları yeniden eskiye sıralı döndürür.
 *
 * Taslak kuralı tek yerde: dev'de taslaklar görünür, build'de görünmez.
 */
export async function getPosts({
  lang = 'tr',
  includeDrafts = import.meta.env.DEV,
}: { lang?: Lang; includeDrafts?: boolean } = {}) {
  const posts = await getCollection('blog', ({ data }) => includeDrafts || !data.draft);
  return posts
    .filter((post) => postLang(post) === lang)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Aynı `translationKey`'e sahip diğer dildeki yazı. */
export async function getTranslation(post: Post): Promise<Post | undefined> {
  const key = post.data.translationKey;
  if (!key) return undefined;

  const other: Lang = postLang(post) === 'tr' ? 'en' : 'tr';
  const posts = await getPosts({ lang: other });
  return posts.find((candidate) => candidate.data.translationKey === key);
}
