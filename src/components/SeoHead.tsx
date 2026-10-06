import { useEffect } from 'react';
import { siteConfig, BlogPostItem, PseoPageItem, Locale } from '../config';

interface SeoHeadProps {
  locale: Locale;
  activeView:
    | { type: 'home' }
    | { type: 'blog'; post: BlogPostItem }
    | { type: 'pseo'; page: PseoPageItem };
}

export function SeoHead({ locale, activeView }: SeoHeadProps) {
  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://atelier-atlas.ma';

    // Default Home SEO
    let title =
      locale === 'ar'
        ? `${siteConfig.businessName} – ${siteConfig.taglineAr}`
        : `${siteConfig.businessName} – ${siteConfig.taglineFr}`;
    let description =
      locale === 'ar'
        ? siteConfig.ui.ar.welcome.description
        : siteConfig.ui.fr.welcome.description;
    let canonicalPath = '/';

    if (activeView.type === 'blog') {
      title =
        locale === 'ar'
          ? `${activeView.post.titleAr} | ${siteConfig.businessName}`
          : `${activeView.post.titleFr} | ${siteConfig.businessName}`;
      description =
        locale === 'ar' ? activeView.post.excerptAr : activeView.post.excerptFr;
      canonicalPath = `/blog/${activeView.post.slug}`;
    } else if (activeView.type === 'pseo') {
      title = locale === 'ar' ? activeView.page.titleAr : activeView.page.titleFr;
      description = activeView.page.metaDescriptionFr;
      canonicalPath = `/p/${activeView.page.slug}`;
    }

    document.title = title;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.includes('property=')) {
          const propMatch = selector.match(/property="([^"]+)"/);
          if (propMatch) el.setAttribute('property', propMatch[1]);
        } else if (selector.includes('name=')) {
          const nameMatch = selector.match(/name="([^"]+)"/);
          if (nameMatch) el.setAttribute('name', nameMatch[1]);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', `${origin}${canonicalPath}`);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);

    // Build JSON-LD Graph
    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'HairSalon',
      '@id': `${origin}/#barbershop`,
      name: siteConfig.businessName,
      description: siteConfig.ui.fr.welcome.description,
      url: origin,
      telephone: `+${siteConfig.whatsappNumber}`,
      priceRange: '70 MAD - 320 MAD',
      CurrenciesAccepted: 'MAD',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '48 Boulevard Massira Al Khadra, Maarif',
        addressLocality: siteConfig.city,
        postalCode: '20100',
        addressCountry: 'MA',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: siteConfig.geo.latitude,
        longitude: siteConfig.geo.longitude,
      },
      openingHoursSpecification: siteConfig.openingHours
        .filter((h) => !h.isClosed)
        .map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek:
            h.dayKey === 1
              ? 'Monday'
              : h.dayKey === 2
              ? 'Tuesday'
              : h.dayKey === 3
              ? 'Wednesday'
              : h.dayKey === 4
              ? 'Thursday'
              : h.dayKey === 5
              ? 'Friday'
              : 'Saturday',
          opens: h.openTime,
          closes: h.closeTime,
        })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Prestations Barbier & Coiffure Homme',
        itemListElement: siteConfig.services.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.fullNameFr,
            description: s.shortDescFr,
          },
          price: s.priceMad.toString(),
          priceCurrency: 'MAD',
        })),
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '184',
      },
    };

    const schemas: Record<string, unknown>[] = [localBusinessSchema];

    if (activeView.type === 'blog') {
      const post = activeView.post;
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.titleFr,
        description: post.excerptFr,
        datePublished: post.isoDate,
        dateModified: post.isoDate,
        author: {
          '@type': 'Person',
          name: post.author,
        },
        publisher: {
          '@type': 'Organization',
          name: siteConfig.businessName,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${origin}/blog/${post.slug}`,
        },
        keywords: post.keywords.join(', '),
      });

      if (post.faqFr.length > 0) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqFr.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer,
            },
          })),
        });
      }
    } else if (activeView.type === 'pseo') {
      const page = activeView.page;
      const service = siteConfig.services.find((s) => s.id === page.serviceId) || siteConfig.services[0];
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `${service.fullNameFr} – ${page.neighborhood}, ${siteConfig.city}`,
        description: page.metaDescriptionFr,
        provider: {
          '@id': `${origin}/#barbershop`,
        },
        areaServed: {
          '@type': 'Place',
          name: `${page.neighborhood}, ${siteConfig.city}`,
        },
        offers: {
          '@type': 'Offer',
          price: service.priceMad.toString(),
          priceCurrency: 'MAD',
        },
      });

      if (page.faqFr.length > 0) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: page.faqFr.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer,
            },
          })),
        });
      }
    }

    let scriptEl = document.getElementById('json-ld-seo') as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'json-ld-seo';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(schemas);
  }, [locale, activeView]);

  return null;
}
