import React from 'react';
import { ArrowLeft, Check, MapPin, Phone, Clock, CalendarCheck } from 'lucide-react';
import { Locale, PseoPageItem, siteConfig } from '../config';
import { ResilientImage, SectionHeader } from './VintageOrnaments';

interface PseoPageViewProps {
  page: PseoPageItem;
  locale: Locale;
  onBackHome: () => void;
  onSelectPseoPage: (slug: string) => void;
  onSelectBlogPost: (slug: string) => void;
  onBookService: (serviceId: string) => void;
}

export function PseoPageView({
  page,
  locale,
  onBackHome,
  onSelectPseoPage,
  onSelectBlogPost,
  onBookService,
}: PseoPageViewProps) {
  const t = siteConfig.ui[locale];
  const isAr = locale === 'ar';

  const service =
    siteConfig.services.find((s) => s.id === page.serviceId) || siteConfig.services[0];
  const heroTitle = isAr ? page.heroTitleAr : page.heroTitleFr;
  const intro = isAr ? page.introAr : page.introFr;
  const highlights = isAr ? page.highlightsAr : page.highlightsFr;

  return (
    <div className="min-h-screen bg-[#F7F6F4] dark:bg-[#161616] text-[#1F1F1F] dark:text-[#F7F6F4] pt-24 pb-20">
      {/* Hero Banner */}
      <div className="relative h-[360px] sm:h-[420px] w-full overflow-hidden bg-[#1F1F1F]">
        <ResilientImage
          src={service.image}
          alt={heroTitle}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F] via-[#1F1F1F]/65 to-transparent" />
        <div className="absolute inset-0 max-w-5xl mx-auto px-6 flex flex-col justify-end pb-12">
          <button
            onClick={onBackHome}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-300 hover:text-white mb-6 w-fit transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.blog.backToHome}</span>
          </button>

          <p className="text-xs uppercase tracking-[0.28em] text-[#A65B3A] font-medium mb-2">
            {page.heroEyebrowFr}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-[0.08em] [text-wrap:balance]">
            {heroTitle}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-neutral-300">
            <span>{isAr ? service.fullNameAr : service.fullNameFr}</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-white tabular-nums">
              {service.priceMad} {t.pricing.currency}
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{service.durationMin} min</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left 2 Columns: Local SEO Copy & Service Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="p-8 bg-white dark:bg-[#1F1F1F] border border-neutral-200 dark:border-neutral-800">
              <p className="text-xs uppercase tracking-[0.24em] text-[#A65B3A] mb-2">
                {isAr ? page.neighborhoodAr : page.neighborhood} · {siteConfig.city}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-[0.08em] mb-4">
                {isAr ? service.fullNameAr : service.fullNameFr}
              </h2>
              <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300 mb-6">
                {intro}
              </p>

              <div className="space-y-3 border-t border-neutral-200 dark:border-neutral-800 pt-6">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-[#A65B3A] shrink-0 mt-0.5" />
                    <span className="text-neutral-700 dark:text-neutral-200">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-neutral-500 block">
                    Tarif Officiel Salon
                  </span>
                  <span className="font-display text-3xl font-bold text-[#A65B3A] tabular-nums">
                    {service.priceMad} MAD
                  </span>
                </div>
                <button
                  onClick={() => onBookService(service.id)}
                  className="px-6 py-3.5 bg-[#A65B3A] hover:bg-[#8E4B2E] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>{t.nav.bookBtn}</span>
                </button>
              </div>
            </div>

            {/* Complete Price Table in MAD for Local Searchers */}
            <div className="p-8 bg-white dark:bg-[#1F1F1F] border border-neutral-200 dark:border-neutral-800">
              <SectionHeader
                eyebrow={t.pricing.eyebrow}
                title={`Carte des tarifs – ${page.neighborhood}`}
                align="left"
              />
              <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {siteConfig.services.map((s) => (
                  <div
                    key={s.id}
                    className="py-4 flex items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="font-display text-lg font-bold uppercase tracking-wider">
                        {isAr ? s.fullNameAr : s.fullNameFr}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {s.durationMin} min · {isAr ? s.shortDescAr : s.shortDescFr}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-display text-xl font-bold text-[#A65B3A] tabular-nums block">
                        {s.priceMad} MAD
                      </span>
                      <button
                        onClick={() => onBookService(s.id)}
                        className="text-[11px] uppercase tracking-[0.2em] underline hover:text-[#A65B3A] transition-colors cursor-pointer"
                      >
                        {t.services.bookLink}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Local FAQ */}
            {page.faqFr.length > 0 && (
              <div className="p-8 bg-white dark:bg-[#1F1F1F] border border-neutral-200 dark:border-neutral-800">
                <SectionHeader
                  eyebrow="QUESTIONS FRÉQUENTES"
                  title={`Barbier ${page.neighborhood} Casablanca`}
                  align="left"
                />
                <div className="space-y-5">
                  {page.faqFr.map((f, idx) => (
                    <div key={idx} className="border-b border-neutral-200 dark:border-neutral-800 pb-4 last:border-none">
                      <h4 className="font-display text-lg font-bold uppercase tracking-wider mb-1">
                        {f.question}
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {f.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Local Info, Hours & Other Neighborhoods */}
          <div className="space-y-6">
            <div className="p-6 bg-[#1F1F1F] text-white border border-neutral-800">
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#A65B3A] mb-2">
                ACCÈS RAPIDE DEPUIS {page.neighborhood.toUpperCase()}
              </p>
              <h3 className="font-display text-xl font-bold uppercase tracking-widest mb-4">
                {siteConfig.businessName}
              </h3>

              <div className="space-y-3 text-xs text-neutral-300 mb-6">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#A65B3A] shrink-0 mt-0.5" />
                  <span>{siteConfig.addressFr}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#A65B3A] shrink-0" />
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#A65B3A] transition-colors tabular-nums"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#A65B3A] shrink-0 mt-0.5" />
                  <span>Repères proches : {page.landmarksFr}</span>
                </div>
              </div>

              <div className="border-t border-neutral-800 pt-4 space-y-2 text-xs">
                {siteConfig.openingHours.map((h) => (
                  <div
                    key={h.dayKey}
                    className={`flex justify-between ${
                      h.isClosed ? 'text-neutral-500' : 'text-neutral-300'
                    }`}
                  >
                    <span className="font-semibold">{isAr ? h.dayAr : h.dayFr}</span>
                    <span className="tabular-nums">{isAr ? h.hoursAr : h.hoursFr}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Programmatic SEO Neighborhood Links */}
            <div className="p-6 bg-white dark:bg-[#1F1F1F] border border-neutral-200 dark:border-neutral-800">
              <h3 className="font-display text-lg font-bold uppercase tracking-wider mb-4">
                Autres Secteurs à Casablanca
              </h3>
              <div className="space-y-2.5">
                {siteConfig.pSEOPages.map((other) => (
                  <button
                    key={other.slug}
                    onClick={() => onSelectPseoPage(other.slug)}
                    className={`w-full text-left text-xs py-2 px-3 border transition-colors cursor-pointer ${
                      other.slug === page.slug
                        ? 'border-[#A65B3A] bg-[#A65B3A]/10 font-semibold'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-[#A65B3A]'
                    }`}
                  >
                    {isAr ? other.heroTitleAr : other.heroTitleFr}
                  </button>
                ))}
              </div>
            </div>

            {/* Related Blog Guides */}
            <div className="p-6 bg-white dark:bg-[#1F1F1F] border border-neutral-200 dark:border-neutral-800">
              <h3 className="font-display text-lg font-bold uppercase tracking-wider mb-4">
                Guides & Conseils Barbe
              </h3>
              <div className="space-y-3">
                {siteConfig.blogPosts.slice(0, 3).map((b) => (
                  <button
                    key={b.slug}
                    onClick={() => onSelectBlogPost(b.slug)}
                    className="w-full text-left text-xs hover:text-[#A65B3A] transition-colors block border-b border-neutral-100 dark:border-neutral-800 pb-2 last:border-none cursor-pointer"
                  >
                    {isAr ? b.titleAr : b.titleFr}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
