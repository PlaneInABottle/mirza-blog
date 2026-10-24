import rss from '@astrojs/rss';
import { SITE } from '../config';
import type { Lang } from '../i18n';
import { getPosts, postUrl } from './posts';

export async function buildFeed(lang: Lang) {
  // Feed her zaman yayındaki yazıları listeler; dev'de taslaklar görünmez.
  const posts = await getPosts({ lang, includeDrafts: false });

  return rss({
    title: lang === 'en' ? `${SITE.title} — English` : SITE.title,
    description: lang === 'en' ? SITE.descriptionEn : SITE.description,
    // Kanal linki dilin ana sayfası; item linkleri zaten mutlak yol.
    site: lang === 'en' ? new URL('/en/', SITE.url).href : SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postUrl(post),
    })),
    customData: `<language>${lang}</language>`,
  });
}
