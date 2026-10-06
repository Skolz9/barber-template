import React from 'react';
import { ArrowLeft, Calendar, Clock, User, MessageCircle, ArrowUpRight } from 'lucide-react';
import { BlogPostItem, Locale, PseoPageItem, siteConfig } from '../config';
import { ResilientImage, SectionHeader } from './VintageOrnaments';

interface BlogArticleViewProps {
  post: BlogPostItem;
  locale: Locale;
  onBackHome: () => void;
  onSelectBlogPost: (slug: string) => void;
  onSelectPseoPage: (slug: string) => void;
  onBookNowWithService: (serviceId?: string) => void;
}

export function BlogArticleView({
  post,
  locale,
  onBackHome,
  onSelectBlogPost,
  onSelectPseoPage,
  onBookNowWithService,
}: BlogArticleViewProps) {
  const t = siteConfig.ui[locale];
  const isAr = locale === 'ar';

  const title = isAr ? post.titleAr : post.titleFr;
  const date = isAr ? post.dateAr : post.dateFr;
  const category = isAr ? post.categoryAr : post.categoryFr;
  const readTime = isAr ? post.readTimeAr : post.readTimeFr;
  const sections = isAr ? post.sectionsAr : post.sectionsFr;

  const relatedPseoPages: PseoPageItem[] = post.relatedPseoSlugs
    .map((slug) => siteConfig.pSEOPages.find((p) => p.slug === slug))
    .filter((p): p is PseoPageItem => Boolean(p));

  const otherPosts = siteConfig.blogPosts.filter((b) => b.slug !== post.slug).slice(0, 3);

  return (
    <article className="min-h-screen bg-[#F7F6F4] dark:bg-[#161616] text-[#1F1F1F] dark:text-[#F7F6F4] pt-24 pb-20">
      {/* Top Hero Banner for Blog Article */}
      <div className="relative h-[380px] sm:h-[440px] w-full overflow-hidden bg-[#1F1F1F]">
        <ResilientImage
          src={post.image}
          alt={title}
          className="w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F] via-[#1F1F1F]/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end max-w-4xl mx-auto px-6 pb-12">
          <button
            onClick={onBackHome}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-300 hover:text-white mb-6 w-fit transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.blog.backToHome}</span>
          </button>

          {/* Unboxed metadata with typographic separators */}
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#A65B3A] mb-3 font-medium">
            <span>{category}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 text-neutral-300">
              <Calendar className="w-3.5 h-3.5" />
              {date}
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 text-neutral-300">
              <Clock className="w-3.5 h-3.5" />
              {readTime}
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 text-neutral-300">
              <User className="w-3.5 h-3.5" />
              {post.author}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-[0.06em] leading-tight [text-wrap:balance]">
            {title}
          </h1>
        </div>
      </div>

      {/* Article Body */}
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <p className="text-lg sm:text-xl leading-relaxed text-neutral-700 dark:text-neutral-300 font-medium border-l-2 border-[#A65B3A] pl-5 mb-10">
          {isAr ? post.excerptAr : post.excerptFr}
        </p>

        <div className="space-y-10">
          {sections.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-[0.08em] text-[#1F1F1F] dark:text-white">
                {sec.heading}
              </h2>
              <div className="h-[2px] w-8 bg-[#A65B3A]" />
              {sec.paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className="text-base leading-[1.8] text-neutral-700 dark:text-neutral-300"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        {/* Direct WhatsApp Conversion CTA inside Article */}
        <div className="my-12 p-8 bg-[#1F1F1F] text-white border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#A65B3A] mb-1">
              {siteConfig.businessName} · {siteConfig.city}
            </p>
            <h3 className="font-display text-2xl uppercase tracking-[0.08em] font-bold">
              {isAr
                ? 'هل ترغب في تجربة هذه الخدمة؟'
                : 'Prêt à réserver votre créneau chez Atelier Atlas ?'}
            </h3>
            <p className="text-sm text-neutral-400 mt-1">
              {siteConfig.addressFr}
            </p>
          </div>
          <button
            onClick={() => onBookNowWithService('forfait-coupe-barbe')}
            className="px-6 py-3.5 bg-[#A65B3A] hover:bg-[#8E4B2E] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t.nav.bookBtn}</span>
          </button>
        </div>

        {/* FAQ Section with Schema.org FAQPage backing */}
        {post.faqFr.length > 0 && (
          <div className="my-14 border-t border-neutral-200 dark:border-neutral-800 pt-10">
            <SectionHeader
              eyebrow="FAQ"
              title={t.blog.faqHeading}
              align="left"
            />
            <div className="space-y-6">
              {post.faqFr.map((faq, i) => (
                <div
                  key={i}
                  className="p-6 bg-white dark:bg-[#1F1F1F] border border-neutral-200/80 dark:border-neutral-800"
                >
                  <h3 className="font-display text-lg font-bold uppercase tracking-[0.06em] mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Internal Links to Programmatic SEO Pages */}
        {relatedPseoPages.length > 0 && (
          <div className="my-14 border-t border-neutral-200 dark:border-neutral-800 pt-10">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#A65B3A] mb-2">
              SEO LOCAL · CASABLANCA
            </p>
            <h3 className="font-display text-2xl font-bold uppercase tracking-[0.08em] mb-6">
              {t.blog.relatedSearches}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedPseoPages.map((page) => (
                <button
                  key={page.slug}
                  onClick={() => onSelectPseoPage(page.slug)}
                  className="text-left p-5 bg-white dark:bg-[#1F1F1F] border border-neutral-200 dark:border-neutral-800 hover:border-[#A65B3A] transition-colors group cursor-pointer"
                >
                  <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-1">
                    {page.neighborhood} · {siteConfig.city}
                  </p>
                  <h4 className="font-display text-base font-bold uppercase tracking-[0.06em] group-hover:text-[#A65B3A] transition-colors flex items-center justify-between gap-2">
                    <span>{isAr ? page.heroTitleAr : page.heroTitleFr}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0 text-[#A65B3A]" />
                  </h4>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Other Recent Blog Posts */}
        <div className="mt-14 border-t border-neutral-200 dark:border-neutral-800 pt-10">
          <h3 className="font-display text-xl font-bold uppercase tracking-[0.1em] mb-6">
            {t.footer.recentPostsColTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherPosts.map((other) => (
              <button
                key={other.slug}
                onClick={() => onSelectBlogPost(other.slug)}
                className="text-left group bg-[#1F1F1F] text-white overflow-hidden border border-neutral-800 cursor-pointer"
              >
                <div className="h-36 overflow-hidden">
                  <ResilientImage
                    src={other.image}
                    alt={isAr ? other.titleAr : other.titleFr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[11px] text-neutral-400 uppercase tracking-widest mb-1">
                    {isAr ? other.dateAr : other.dateFr}
                  </p>
                  <h4 className="font-display text-base font-bold uppercase tracking-wider group-hover:text-[#A65B3A] transition-colors line-clamp-2">
                    {isAr ? other.titleAr : other.titleFr}
                  </h4>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
