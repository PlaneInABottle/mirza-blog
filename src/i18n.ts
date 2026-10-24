export type Lang = 'tr' | 'en';

export const ui = {
  tr: {
    posts: 'Yazılar',
    about: 'Hakkında',
    rss: 'RSS',
    minRead: 'dk okuma',
    allPosts: '← Tüm yazılar',
    draft: 'taslak',
    navLabel: 'Ana menü',
    language: 'Dil',
    homeLabel: 'Ana sayfa',
    skip: 'İçeriğe geç',
    empty: 'Henüz yazı yok.',
  },
  en: {
    posts: 'Posts',
    about: 'About',
    rss: 'RSS',
    minRead: 'min read',
    allPosts: '← All posts',
    draft: 'draft',
    navLabel: 'Main menu',
    language: 'Language',
    homeLabel: 'Home',
    skip: 'Skip to content',
    empty: 'Nothing here yet.',
  },
} as const;

export const locale = {
  tr: 'tr-TR',
  en: 'en-US',
} as const;

/**
 * Yazı tarihleri UTC gece yarısı olarak ayrıştırılır; biçimlendirme de UTC'de
 * sabitlenir, yoksa farklı saat dilimindeki bir build bir gün öncesini yazar.
 */
const dateFormatters = {
  tr: new Intl.DateTimeFormat(locale.tr, { dateStyle: 'long', timeZone: 'UTC' }),
  en: new Intl.DateTimeFormat(locale.en, { dateStyle: 'long', timeZone: 'UTC' }),
};

export const formatDate = (lang: Lang, date: Date) => dateFormatters[lang].format(date);
