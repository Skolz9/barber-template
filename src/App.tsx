import React, { useState, useEffect, useMemo } from 'react';
import {
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  Phone,
  Star,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  MessageCircle,
  ExternalLink,
  Clock,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  siteConfig,
  Locale,
  HaircutModelItem,
} from './config';
import {
  SectionHeader,
  ChalkboardTopOrnament,
  ChalkboardBottomOrnament,
  BarberFeatureIcon,
  ResilientImage,
} from './components/VintageOrnaments';
import { SeoHead } from './components/SeoHead';
import { BlogArticleView } from './components/BlogArticleView';
import { PseoPageView } from './components/PseoPageView';

type ActiveRoute =
  | { type: 'home' }
  | { type: 'blog'; slug: string }
  | { type: 'pseo'; slug: string };

export default function App() {
  // 1. Language & RTL state initialized from config
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('barber_locale') as Locale | null;
      if (saved === 'fr' || saved === 'ar') return saved;
    }
    return siteConfig.defaultLocale;
  });

  // 2. Dark Mode state: syncs with system preference and persists in localStorage
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('barber_theme');
      if (saved === 'dark') return true;
      if (saved === 'light') return false;
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('barber_theme')) {
        setDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('barber_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = locale === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('barber_locale', locale);
  }, [locale]);

  // Apply config theme colors to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-accent', siteConfig.colors.accent);
    root.style.setProperty('--color-off-white', siteConfig.colors.offWhite);
    root.style.setProperty('--color-charcoal', siteConfig.colors.charcoal);
  }, []);

  // 3. Routing State (supports Home, /blog/[slug], and /p/[slug] programmatic SEO pages)
  const [route, setRoute] = useState<ActiveRoute>({ type: 'home' });

  // Sync URL hash/history for static-like navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/blog/')) {
        setRoute({ type: 'blog', slug: path.replace('/blog/', '') });
      } else if (path.startsWith('/p/')) {
        setRoute({ type: 'pseo', slug: path.replace('/p/', '') });
      } else {
        setRoute({ type: 'home' });
      }
    };
    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToHome = (scrollToId?: string) => {
    window.history.pushState({}, '', '/');
    setRoute({ type: 'home' });
    if (scrollToId) {
      setTimeout(() => {
        const el = document.getElementById(scrollToId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToBlog = (slug: string) => {
    window.history.pushState({}, '', `/blog/${slug}`);
    setRoute({ type: 'blog', slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPseo = (slug: string) => {
    window.history.pushState({}, '', `/p/${slug}`);
    setRoute({ type: 'pseo', slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 4. Sticky Navbar & Mobile Menu
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 5. Hero Slider auto-rotation (01 / 02 / 03)
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    if (route.type !== 'home') return;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % siteConfig.heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [route.type]);

  // 6. Live Open / Closed Status calculation from config openingHours
  const isShopCurrentlyOpen = useMemo(() => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sun, 1 = Mon...
    const todaySchedule = siteConfig.openingHours.find((h) => h.dayKey === day);
    if (!todaySchedule || todaySchedule.isClosed || !todaySchedule.openTime || !todaySchedule.closeTime) {
      return false;
    }
    const [openH, openM] = todaySchedule.openTime.split(':').map(Number);
    const [closeH, closeM] = todaySchedule.closeTime.split(':').map(Number);
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;
    return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  }, []);

  // 7. Appointment Form State & Preselection Helpers
  const todayIso = useMemo(() => new Date().toISOString().split('T')[0], []);
  const [bookingDate, setBookingDate] = useState(todayIso);
  const [bookingTime, setBookingTime] = useState(siteConfig.availableTimeSlots[1] || '10:15');
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingBarberId, setBookingBarberId] = useState('any');
  const [bookingServiceId, setBookingServiceId] = useState(siteConfig.services[1]?.id || 'coupe-homme');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccessUrl, setBookingSuccessUrl] = useState<string | null>(null);

  const preselectAndScrollToBooking = (options?: { serviceId?: string; barberId?: string }) => {
    if (options?.serviceId) setBookingServiceId(options.serviceId);
    if (options?.barberId) setBookingBarberId(options.barberId);
    setBookingError('');
    setBookingSuccessUrl(null);

    if (route.type !== 'home') {
      navigateToHome('rendez-vous');
    } else {
      const el = document.getElementById('rendez-vous');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = siteConfig.ui[locale];

    if (!bookingName.trim() || !bookingPhone.trim() || !bookingDate || !bookingTime || !bookingServiceId) {
      setBookingError(t.appointment.validationError);
      return;
    }

    setBookingError('');
    const selectedService = siteConfig.services.find((s) => s.id === bookingServiceId);
    const selectedBarber = siteConfig.barbers.find((b) => b.id === bookingBarberId);

    const serviceName = selectedService
      ? `${selectedService.fullNameFr} (${selectedService.priceMad} MAD)`
      : bookingServiceId;
    const barberName = selectedBarber ? selectedBarber.name : t.appointment.anyBarberOption;

    const messageLines = [
      `Bonjour *${siteConfig.businessName}*, je souhaite prendre rendez-vous :`,
      ``,
      `• *Prestation :* ${serviceName}`,
      `• *Barbier :* ${barberName}`,
      `• *Date :* ${bookingDate}`,
      `• *Heure :* ${bookingTime}`,
      `• *Client :* ${bookingName.trim()}`,
      `• *Téléphone :* ${bookingPhone.trim()}`,
      bookingNotes.trim() ? `• *Notes :* ${bookingNotes.trim()}` : '',
    ].filter(Boolean);

    const waUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
      messageLines.join('\n')
    )}`;
    setBookingSuccessUrl(waUrl);

    // Trigger anchor click safely without window.open popup blocker issues
    const link = document.createElement('a');
    link.href = waUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 8. Haircut Models Lightbox State
  const [lightboxModelIndex, setLightboxModelIndex] = useState<number | null>(null);

  // 9. Testimonials Slider State
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  useEffect(() => {
    if (route.type !== 'home') return;
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % siteConfig.testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [route.type]);

  // 10. Blog Show All Toggle (4 by default in 2x2 grid, or all 6)
  const [showAllBlogPosts, setShowAllBlogPosts] = useState(false);

  // 11. Footer Legal / Sitemap Modal State
  const [activeInfoModal, setActiveInfoModal] = useState<string | null>(null);

  const t = siteConfig.ui[locale];
  const isAr = locale === 'ar';

  // Determine active SEO view
  const seoActiveView = useMemo(() => {
    if (route.type === 'blog') {
      const post =
        siteConfig.blogPosts.find((b) => b.slug === route.slug) || siteConfig.blogPosts[0];
      return { type: 'blog' as const, post };
    }
    if (route.type === 'pseo') {
      const page =
        siteConfig.pSEOPages.find((p) => p.slug === route.slug) || siteConfig.pSEOPages[0];
      return { type: 'pseo' as const, page };
    }
    return { type: 'home' as const };
  }, [route]);

  const featuredCircularServices = useMemo(
    () => siteConfig.services.filter((s) => s.featuredInCircles).slice(0, 4),
    []
  );

  const visibleBlogPosts = showAllBlogPosts
    ? siteConfig.blogPosts
    : siteConfig.blogPosts.slice(0, 4);

  const currentSlide = siteConfig.heroSlides[heroIndex] || siteConfig.heroSlides[0];
  const currentTestimonial =
    siteConfig.testimonials[testimonialIndex] || siteConfig.testimonials[0];

  const activeLightboxModel: HaircutModelItem | null =
    lightboxModelIndex !== null ? siteConfig.haircutModels[lightboxModelIndex] || null : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F4] dark:bg-[#161616] text-[#1F1F1F] dark:text-[#F7F6F4] transition-colors duration-200">
      <SeoHead locale={locale} activeView={seoActiveView} />

      {/* =====================================================================
          1. NAVBAR (Top Bar Contract: Brand | Nav Links | Primary Action)
         ===================================================================== */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
          isScrolled || route.type !== 'home'
            ? 'bg-[#1F1F1F]/95 backdrop-blur-md shadow-md py-3.5 border-b border-white/10'
            : 'bg-gradient-to-b from-black/70 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Zone 1: Single clean Brand Wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigateToHome();
            }}
            className="font-display text-xl sm:text-2xl font-bold uppercase tracking-[0.18em] text-white whitespace-nowrap shrink-0"
          >
            {siteConfig.businessName}
          </a>

          {/* Zone 2: Navigation Links (Home, Services, About, Gallery, Reviews, Blog, Contact) */}
          <nav
            aria-label="Navigation principale"
            className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs uppercase tracking-[0.16em] font-medium text-neutral-200"
          >
            <a
              href="#accueil"
              onClick={(e) => {
                e.preventDefault();
                navigateToHome('accueil');
              }}
              className="hover:text-[#A65B3A] transition-colors whitespace-nowrap py-1"
            >
              {t.nav.home}
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                navigateToHome('services');
              }}
              className="hover:text-[#A65B3A] transition-colors whitespace-nowrap py-1"
            >
              {t.nav.services}
            </a>
            <a
              href="#a-propos"
              onClick={(e) => {
                e.preventDefault();
                navigateToHome('a-propos');
              }}
              className="hover:text-[#A65B3A] transition-colors whitespace-nowrap py-1"
            >
              {t.nav.about}
            </a>
            <a
              href="#coupes"
              onClick={(e) => {
                e.preventDefault();
                navigateToHome('coupes');
              }}
              className="hover:text-[#A65B3A] transition-colors whitespace-nowrap py-1"
            >
              {t.nav.gallery}
            </a>
            <a
              href="#avis"
              onClick={(e) => {
                e.preventDefault();
                navigateToHome('avis');
              }}
              className="hover:text-[#A65B3A] transition-colors whitespace-nowrap py-1"
            >
              {t.nav.reviews}
            </a>
            <a
              href="#blog"
              onClick={(e) => {
                e.preventDefault();
                navigateToHome('blog');
              }}
              className="hover:text-[#A65B3A] transition-colors whitespace-nowrap py-1"
            >
              {t.nav.blog}
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                navigateToHome('contact');
              }}
              className="hover:text-[#A65B3A] transition-colors whitespace-nowrap py-1"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Zone 3: Primary Action + Theme / Language Toggles */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setLocale((prev) => (prev === 'fr' ? 'ar' : 'fr'))}
              aria-label="Changer la langue Français / العربية"
              className="h-10 px-2.5 text-xs font-medium uppercase tracking-wider text-neutral-200 hover:text-white border border-white/20 hover:border-[#A65B3A] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#A65B3A]" />
              <span>{locale === 'fr' ? 'AR' : 'FR'}</span>
            </button>

            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
              className="w-10 h-10 flex items-center justify-center text-neutral-200 hover:text-white border border-white/20 hover:border-[#A65B3A] transition-colors cursor-pointer"
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#A65B3A]" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => preselectAndScrollToBooking()}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-[#A65B3A] hover:bg-[#8E4B2E] text-white text-xs font-semibold uppercase tracking-[0.14em] transition-colors whitespace-nowrap cursor-pointer"
            >
              {t.nav.bookBtn}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Menu"
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white border border-white/20 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="lg:hidden bg-[#1F1F1F] border-b border-neutral-800 px-6 py-6 space-y-4"
            >
              <div className="flex flex-col space-y-3 text-xs uppercase tracking-[0.2em] text-neutral-200">
                {[
                  { label: t.nav.home, id: 'accueil' },
                  { label: t.nav.services, id: 'services' },
                  { label: t.nav.about, id: 'a-propos' },
                  { label: t.nav.gallery, id: 'coupes' },
                  { label: t.nav.reviews, id: 'avis' },
                  { label: t.nav.blog, id: 'blog' },
                  { label: t.nav.contact, id: 'contact' },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      navigateToHome(item.id);
                    }}
                    className="py-2 border-b border-neutral-800 hover:text-[#A65B3A] transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  preselectAndScrollToBooking();
                }}
                className="w-full py-3.5 bg-[#A65B3A] text-white text-xs font-semibold uppercase tracking-[0.2em] text-center cursor-pointer"
              >
                {t.nav.bookBtn}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =====================================================================
          CONDITIONAL ROUTING: Static Blog Article View or pSEO View vs Home
         ===================================================================== */}
      {route.type === 'blog' && seoActiveView.type === 'blog' ? (
        <BlogArticleView
          post={seoActiveView.post}
          locale={locale}
          onBackHome={() => navigateToHome('blog')}
          onSelectBlogPost={navigateToBlog}
          onSelectPseoPage={navigateToPseo}
          onBookNowWithService={(serviceId) =>
            preselectAndScrollToBooking({ serviceId })
          }
        />
      ) : route.type === 'pseo' && seoActiveView.type === 'pseo' ? (
        <PseoPageView
          page={seoActiveView.page}
          locale={locale}
          onBackHome={() => navigateToHome()}
          onSelectPseoPage={navigateToPseo}
          onSelectBlogPost={navigateToBlog}
          onBookService={(serviceId) =>
            preselectAndScrollToBooking({ serviceId })
          }
        />
      ) : (
        <main className="flex-1">
          {/* ===================================================================
              2. HERO SECTION (Full-viewport slider, 01/02/03 counter on left)
             =================================================================== */}
          <section
            id="accueil"
            className="relative h-screen min-h-[620px] max-h-[960px] w-full overflow-hidden bg-[#1F1F1F] flex items-center justify-center"
          >
            {/* Background Slider with soft fade + Ken Burns zoom */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9 }}
                className="absolute inset-0"
              >
                <div className="w-full h-full animate-kenburns">
                  <ResilientImage
                    src={currentSlide.image}
                    alt={isAr ? currentSlide.titleAr : currentSlide.titleFr}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Warm vintage dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-[#1F1F1F]/55 to-black/75" />
              </motion.div>
            </AnimatePresence>

            {/* Left Vertical Slide Counter: 01 / 02 / 03 */}
            <div className="hidden sm:flex flex-col items-center gap-3 absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 select-none">
              {siteConfig.heroSlides.map((slide, idx) => {
                const active = idx === heroIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setHeroIndex(idx)}
                    aria-label={`Diapositive ${slide.id}`}
                    className={`font-display text-lg md:text-xl tracking-widest transition-all cursor-pointer tabular-nums ${
                      active
                        ? 'text-white font-bold scale-110 border-b-2 border-[#A65B3A] pb-0.5'
                        : 'text-white/40 hover:text-white/75'
                    }`}
                  >
                    {slide.id}
                  </button>
                );
              })}
            </div>

            {/* Centered Hero Typography & CTA */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
              <motion.p
                key={`eyebrow-${currentSlide.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="text-xs sm:text-sm uppercase tracking-[0.34em] text-neutral-200 font-medium mb-4"
              >
                {isAr ? currentSlide.eyebrowAr : currentSlide.eyebrowFr}
              </motion.p>

              <motion.h1
                key={`title-${currentSlide.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.06em] leading-[1.1] mb-6 [text-wrap:balance]"
              >
                {isAr ? currentSlide.titleAr : currentSlide.titleFr}
              </motion.h1>

              <motion.p
                key={`sub-${currentSlide.id}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.14 }}
                className="max-w-xl mx-auto text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-10"
              >
                {isAr ? currentSlide.subtitleAr : currentSlide.subtitleFr}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 }}
              >
                <button
                  type="button"
                  onClick={() => preselectAndScrollToBooking()}
                  className="px-8 py-4 bg-[#A65B3A] hover:bg-transparent border border-[#A65B3A] hover:border-white text-white text-xs uppercase tracking-[0.24em] font-semibold transition-all duration-200 cursor-pointer"
                >
                  {t.hero.ctaBtn}
                </button>
              </motion.div>
            </div>
          </section>

          {/* ===================================================================
              3. WELCOME / INTRO (Off-white background, 3 columns)
             =================================================================== */}
          <section
            id="a-propos"
            className="py-20 md:py-28 bg-[#F7F6F4] dark:bg-[#191919] border-b border-neutral-200/80 dark:border-neutral-800"
          >
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Column 1 (Left): Eyebrow, Title, Short Paragraph & Rust Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5 }}
                  className="lg:col-span-4"
                >
                  <SectionHeader
                    eyebrow={t.welcome.eyebrow}
                    title={t.welcome.title}
                    align="left"
                  />
                  <p className="text-sm leading-[1.85] text-neutral-600 dark:text-neutral-300 mb-8">
                    {t.welcome.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => preselectAndScrollToBooking()}
                    className="px-6 py-3.5 bg-[#A65B3A] hover:bg-[#8E4B2E] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer"
                  >
                    {t.welcome.button}
                  </button>
                </motion.div>

                {/* Column 2 (Middle): Two portrait photos side by side with vertical offset */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="lg:col-span-4 grid grid-cols-2 gap-4 items-start"
                >
                  <div className="aspect-[3/4] overflow-hidden shadow-sm border border-neutral-200 dark:border-neutral-800">
                    <ResilientImage
                      src={siteConfig.welcomePortraits.leftImage}
                      alt="Barbier traditionnel serviette chaude"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="aspect-[3/4] overflow-hidden shadow-sm border border-neutral-200 dark:border-neutral-800 mt-6 sm:mt-8">
                    <ResilientImage
                      src={siteConfig.welcomePortraits.rightImage}
                      alt="Maître barbier coupe homme"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </motion.div>

                {/* Column 3 (Right): Clickable WhatsApp Phone Number + Horaires d'ouverture + Live Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="lg:col-span-4 lg:pl-4"
                >
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400 hover:text-[#A65B3A] transition-colors mb-1.5 tabular-nums"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#A65B3A]" />
                    <span>{siteConfig.phoneDisplay}</span>
                  </a>

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-[0.1em]">
                      {t.welcome.workingHoursTitle}
                    </h3>

                    {/* Live Open / Closed Status Indicator */}
                    <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] font-semibold">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isShopCurrentlyOpen ? 'bg-emerald-600' : 'bg-[#A65B3A]'
                        }`}
                      />
                      <span
                        className={
                          isShopCurrentlyOpen
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : 'text-[#A65B3A]'
                        }
                      >
                        {isShopCurrentlyOpen ? t.welcome.openBadge : t.welcome.closedBadge}
                      </span>
                    </span>
                  </div>

                  <div className="h-[2px] w-10 bg-[#A65B3A] mb-6" />

                  <div className="space-y-2.5 text-xs sm:text-sm">
                    {siteConfig.openingHours.map((row) => (
                      <div
                        key={row.dayKey}
                        className="flex items-center justify-between py-1 border-b border-neutral-200/70 dark:border-neutral-800 last:border-none"
                      >
                        <span
                          className={`font-bold uppercase tracking-[0.14em] ${
                            row.isClosed
                              ? 'text-neutral-400 dark:text-neutral-500'
                              : 'text-[#1F1F1F] dark:text-neutral-200'
                          }`}
                        >
                          {isAr ? row.dayAr : row.dayFr}
                        </span>
                        <span
                          className={`tabular-nums tracking-wider ${
                            row.isClosed
                              ? 'text-[#A65B3A] font-medium italic'
                              : 'text-neutral-600 dark:text-neutral-400'
                          }`}
                        >
                          {isAr ? row.hoursAr : row.hoursFr}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ===================================================================
              4. SERVICES SECTION (4 Circular Photos + Overlaid Title + Réserver)
             =================================================================== */}
          <section
            id="services"
            className="py-20 md:py-28 bg-white dark:bg-[#161616]"
          >
            <div className="max-w-6xl mx-auto px-6">
              <SectionHeader
                eyebrow={t.services.eyebrow}
                title={t.services.title}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-14">
                {featuredCircularServices.map((service, idx) => {
                  const circleTitle = isAr ? service.circleTitleAr : service.circleTitleFr;
                  const desc = isAr ? service.shortDescAr : service.shortDescFr;
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.45, delay: idx * 0.08 }}
                      className="flex flex-col items-center text-center group"
                    >
                      {/* Circular Photo with overlaid service name & rust hover overlay */}
                      <button
                        type="button"
                        onClick={() => preselectAndScrollToBooking({ serviceId: service.id })}
                        className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-full overflow-hidden mb-6 shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A65B3A]"
                      >
                        <ResilientImage
                          src={service.image}
                          alt={circleTitle}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Default warm dark scrim + Hover rust overlay */}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-[#A65B3A]/75 transition-colors duration-300" />

                        {/* Overlaid Service Title with top/bottom thin lines like reference */}
                        <div className="absolute inset-0 flex items-center justify-center px-4">
                          <span className="font-display text-lg sm:text-xl font-bold uppercase tracking-[0.18em] text-white border-y border-white/70 py-1.5 px-3">
                            {circleTitle}
                          </span>
                        </div>
                      </button>

                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 max-w-[250px]">
                        {desc}
                      </p>

                      <button
                        type="button"
                        onClick={() => preselectAndScrollToBooking({ serviceId: service.id })}
                        className="text-xs font-bold uppercase tracking-[0.2em] text-[#1F1F1F] dark:text-white border-b border-[#1F1F1F] dark:border-white hover:text-[#A65B3A] hover:border-[#A65B3A] pb-0.5 transition-colors cursor-pointer"
                      >
                        {t.services.bookLink}
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              {/*===================================================================
                  5. FEATURE BANNER (Wide photo + bottom-left dark card + bottom-right offset frame photo)
                 ===================================================================*/}
              <div className="mt-24 md:mt-32 relative">
                <div className="relative w-full lg:w-[88%] h-[380px] sm:h-[480px] md:h-[520px] overflow-hidden shadow-lg">
                  <ResilientImage
                    src={siteConfig.featureBannerImages.mainWide}
                    alt={t.featureBanner.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-transparent" />
                </div>

                {/* Overlapping Bottom-Left Dark Translucent Card */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative lg:absolute lg:bottom-8 lg:left-8 z-10 bg-[#1F1F1F]/92 backdrop-blur-sm text-white p-8 sm:p-10 max-w-md shadow-xl -mt-16 sm:-mt-24 lg:mt-0 mx-4 sm:mx-8 lg:mx-0"
                >
                  <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-[0.06em] mb-2">
                    {t.featureBanner.title}
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#A65B3A] font-semibold mb-4">
                    {t.featureBanner.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {t.featureBanner.description}
                  </p>
                </motion.div>

                {/* Overlapping Bottom-Right Smaller Portrait Photo with Offset Frame */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="hidden md:block absolute -bottom-10 right-0 z-20 w-64 lg:w-72"
                >
                  {/* Offset decorative frame */}
                  <div className="relative p-3 bg-white dark:bg-[#1F1F1F] border border-neutral-300 dark:border-neutral-700 shadow-xl">
                    <div className="aspect-[3/4] overflow-hidden">
                      <ResilientImage
                        src={siteConfig.featureBannerImages.bottomRightInset}
                        alt="Portrait coupe et barbe"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ===================================================================
              6. APPOINTMENT FORM SECTION (Split layout: Left tall tools photo | Right underline form)
             =================================================================== */}
          <section
            id="rendez-vous"
            className="py-20 md:py-28 bg-[#F7F6F4] dark:bg-[#1B1B1B] border-y border-neutral-200/80 dark:border-neutral-800"
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Left Column: Tall Vintage Barber Tools / Brush Photo */}
                <div className="lg:col-span-5 min-h-[380px] sm:min-h-[520px] relative overflow-hidden">
                  <ResilientImage
                    src={siteConfig.appointmentImage}
                    alt="Outils de barbier vintage blaireau et coupe-chou"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-[#A65B3A] font-semibold mb-1">
                      {siteConfig.businessName} · {siteConfig.city}
                    </p>
                    <p className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-[0.08em]">
                      {t.appointment.title}
                    </p>
                    <p className="text-xs text-neutral-300 mt-1">
                      {t.appointment.whatsappConfirmNote}
                    </p>
                  </div>
                </div>

                {/* Right Column: Minimal Form with Underline-Style Inputs (NO Email field) */}
                <div className="lg:col-span-7 px-6 sm:px-12 lg:px-16 py-12 lg:py-16 flex flex-col justify-center">
                  {/* Subtle Step Guidance Bar */}
                  <div className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400 mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                    <span className="text-[#A65B3A] font-semibold">{t.appointment.step1Label}</span>
                    <span aria-hidden="true">·</span>
                    <span>{t.appointment.step2Label}</span>
                    <span aria-hidden="true">·</span>
                    <span>{t.appointment.step3Label}</span>
                  </div>

                  <form onSubmit={handleAppointmentSubmit} className="space-y-8" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {/* Date Input (Underline style) */}
                      <div>
                        <label
                          htmlFor="booking-date"
                          className="block text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-1"
                        >
                          {t.appointment.datePlaceholder}
                        </label>
                        <input
                          id="booking-date"
                          type="date"
                          min={todayIso}
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          required
                          className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-700 focus:border-[#A65B3A] py-3 text-sm text-[#1F1F1F] dark:text-white focus:outline-none transition-colors tabular-nums"
                        />
                      </div>

                      {/* Full Name Input (Underline style) */}
                      <div>
                        <label
                          htmlFor="booking-name"
                          className="block text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-1"
                        >
                          {t.appointment.namePlaceholder}
                        </label>
                        <input
                          id="booking-name"
                          type="text"
                          placeholder={t.appointment.namePlaceholder}
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          required
                          className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-700 focus:border-[#A65B3A] py-3 text-sm text-[#1F1F1F] dark:text-white placeholder:text-neutral-400 focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Phone Number Input (Underline style) */}
                      <div>
                        <label
                          htmlFor="booking-phone"
                          className="block text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-1"
                        >
                          {t.appointment.phonePlaceholder}
                        </label>
                        <input
                          id="booking-phone"
                          type="tel"
                          placeholder={t.appointment.phonePlaceholder}
                          value={bookingPhone}
                          onChange={(e) => setBookingPhone(e.target.value)}
                          required
                          className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-700 focus:border-[#A65B3A] py-3 text-sm text-[#1F1F1F] dark:text-white placeholder:text-neutral-400 focus:outline-none transition-colors tabular-nums"
                        />
                      </div>

                      {/* Time Select (Underline style) */}
                      <div>
                        <label
                          htmlFor="booking-time"
                          className="block text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-1"
                        >
                          {t.appointment.timePlaceholder}
                        </label>
                        <select
                          id="booking-time"
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                          className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-700 focus:border-[#A65B3A] py-3 text-sm text-[#1F1F1F] dark:text-white focus:outline-none transition-colors cursor-pointer tabular-nums"
                        >
                          {siteConfig.availableTimeSlots.map((slot) => (
                            <option
                              key={slot}
                              value={slot}
                              className="bg-white dark:bg-[#1F1F1F] text-[#1F1F1F] dark:text-white"
                            >
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Select Barber (Underline style) */}
                      <div>
                        <label
                          htmlFor="booking-barber"
                          className="block text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-1"
                        >
                          {t.appointment.barberPlaceholder}
                        </label>
                        <select
                          id="booking-barber"
                          value={bookingBarberId}
                          onChange={(e) => setBookingBarberId(e.target.value)}
                          className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-700 focus:border-[#A65B3A] py-3 text-sm text-[#1F1F1F] dark:text-white focus:outline-none transition-colors cursor-pointer"
                        >
                          <option
                            value="any"
                            className="bg-white dark:bg-[#1F1F1F] text-[#1F1F1F] dark:text-white"
                          >
                            {t.appointment.anyBarberOption}
                          </option>
                          {siteConfig.barbers.map((barber) => (
                            <option
                              key={barber.id}
                              value={barber.id}
                              className="bg-white dark:bg-[#1F1F1F] text-[#1F1F1F] dark:text-white"
                            >
                              {isAr ? barber.nameAr : barber.name} —{' '}
                              {isAr ? barber.specialtyAr : barber.specialtyFr}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Select Service (Underline style) */}
                      <div>
                        <label
                          htmlFor="booking-service"
                          className="block text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-1"
                        >
                          {t.appointment.servicePlaceholder}
                        </label>
                        <select
                          id="booking-service"
                          value={bookingServiceId}
                          onChange={(e) => setBookingServiceId(e.target.value)}
                          className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-700 focus:border-[#A65B3A] py-3 text-sm text-[#1F1F1F] dark:text-white focus:outline-none transition-colors cursor-pointer"
                        >
                          {siteConfig.services.map((s) => (
                            <option
                              key={s.id}
                              value={s.id}
                              className="bg-white dark:bg-[#1F1F1F] text-[#1F1F1F] dark:text-white"
                            >
                              {isAr ? s.fullNameAr : s.fullNameFr} ({s.priceMad} MAD)
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Quick Available Time Slot Selector Buttons */}
                    <div>
                      <span className="block text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-2.5">
                        {t.appointment.availableSlotsLabel}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {siteConfig.availableTimeSlots.map((slot) => {
                          const isSelected = bookingTime === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setBookingTime(slot)}
                              className={`px-3 py-1.5 text-xs tabular-nums transition-colors cursor-pointer border ${
                                isSelected
                                  ? 'bg-[#A65B3A] text-white border-[#A65B3A] font-semibold'
                                  : 'bg-transparent text-neutral-600 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-[#A65B3A]'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Notes Textarea (Underline style) */}
                    <div>
                      <label
                        htmlFor="booking-notes"
                        className="sr-only"
                      >
                        {t.appointment.notesPlaceholder}
                      </label>
                      <textarea
                        id="booking-notes"
                        rows={2}
                        placeholder={t.appointment.notesPlaceholder}
                        value={bookingNotes}
                        onChange={(e) => setBookingNotes(e.target.value)}
                        className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-700 focus:border-[#A65B3A] py-3 text-sm text-[#1F1F1F] dark:text-white placeholder:text-neutral-400 focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {bookingError && (
                      <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                        {bookingError}
                      </p>
                    )}

                    {bookingSuccessUrl && (
                      <div className="p-4 bg-emerald-950/10 dark:bg-emerald-950/30 border border-emerald-600/40 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>
                            Votre demande de rendez-vous est prête sur WhatsApp.
                          </span>
                        </div>
                        <a
                          href={bookingSuccessUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold uppercase tracking-wider text-[#A65B3A] underline flex items-center gap-1"
                        >
                          <span>Ouvrir WhatsApp</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}

                    {/* Full-width Rust Button */}
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#A65B3A] hover:bg-[#8E4B2E] text-white text-xs uppercase tracking-[0.24em] font-semibold transition-colors cursor-pointer"
                    >
                      {t.appointment.submitBtn}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* ===================================================================
              7. HAIR CUT MODELS (6 Portrait Photos + Lightbox + 3 Icon Features)
             =================================================================== */}
          <section
            id="coupes"
            className="py-20 md:py-28 bg-white dark:bg-[#161616]"
          >
            <div className="max-w-6xl mx-auto px-6">
              <SectionHeader
                eyebrow={t.haircutModels.eyebrow}
                title={t.haircutModels.title}
              />

              {/* Row of 6 Portrait Photos (horizontal scroll on mobile, 6 cols on desktop) */}
              <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-4 pb-4 sm:pb-0 snap-x snap-mandatory">
                {siteConfig.haircutModels.map((model, idx) => {
                  const title = isAr ? model.nameAr : model.nameFr;
                  return (
                    <motion.button
                      key={model.id}
                      type="button"
                      onClick={() => setLightboxModelIndex(idx)}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.06 }}
                      className="relative min-w-[200px] sm:min-w-0 aspect-[4/5] overflow-hidden group snap-start cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A65B3A]"
                    >
                      <ResilientImage
                        src={model.image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#A65B3A] block">
                          {isAr ? model.styleTagAr : model.styleTagFr}
                        </span>
                        <span className="font-display text-sm font-bold uppercase tracking-wider block truncate">
                          {title}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Below: 3 Icon Features (10 ans d'expérience, Hygiène irréprochable, Soin de la peau) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 pt-8 border-t border-neutral-200/70 dark:border-neutral-800">
                {siteConfig.featureHighlights.map((feat, idx) => (
                  <motion.div
                    key={feat.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <BarberFeatureIcon type={feat.icon} />
                    <div>
                      <h3 className="font-display text-base sm:text-lg font-bold uppercase tracking-[0.12em] mb-1.5">
                        {isAr ? feat.titleAr : feat.titleFr}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {isAr ? feat.descAr : feat.descFr}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ===================================================================
              8. PRICING SECTION (3 Dark Chalkboard Cards with Ornamental Flourishes)
             =================================================================== */}
          <section
            id="tarifs"
            className="py-20 md:py-28 bg-[#F7F6F4] dark:bg-[#191919] border-t border-neutral-200/80 dark:border-neutral-800"
          >
            <div className="max-w-6xl mx-auto px-6">
              <SectionHeader
                eyebrow={t.pricing.eyebrow}
                title={t.pricing.title}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {siteConfig.pricingCards.map((card, idx) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative bg-[#1F1F1F] text-white px-8 py-12 shadow-xl border border-neutral-800 flex flex-col justify-between overflow-hidden"
                  >
                    {/* Popular Ribbon Badge on Middle Card */}
                    {card.isPopular && (
                      <div className="absolute top-5 right-0 bg-[#A65B3A] text-white text-[11px] font-display italic tracking-wider px-4 py-1 shadow-md">
                        {isAr ? card.badgeAr : card.badgeFr}
                      </div>
                    )}

                    {/* Ornamental Flourish Top */}
                    <ChalkboardTopOrnament />

                    {/* Two Services Inside Each Chalkboard Card */}
                    <div className="space-y-10 my-2 text-center">
                      {card.services.map((srv, sIdx) => (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() =>
                            preselectAndScrollToBooking({ serviceId: srv.serviceId })
                          }
                          title={t.pricing.clickToBook}
                          className="w-full group text-center block cursor-pointer focus:outline-none"
                        >
                          <p className="font-display text-lg text-neutral-300 tracking-wider mb-1">
                            {isAr ? srv.categoryAr : srv.categoryFr}
                          </p>
                          <div className="h-[1px] w-16 bg-neutral-700 mx-auto mb-3 group-hover:bg-[#A65B3A] transition-colors" />

                          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-white group-hover:text-[#A65B3A] transition-colors mb-1">
                            {isAr ? srv.nameAr : srv.nameFr}
                          </h3>
                          <p className="text-xs italic text-neutral-400 mb-3">
                            {isAr ? srv.detailAr : srv.detailFr}
                          </p>

                          <p className="font-display text-3xl sm:text-4xl italic text-white group-hover:text-[#A65B3A] transition-colors tabular-nums">
                            {srv.priceMad} {t.pricing.currency}
                          </p>
                        </button>
                      ))}
                    </div>

                    {/* Ornamental Flourish Bottom */}
                    <ChalkboardBottomOrnament />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ===================================================================
              9. PARALLAX BANNER (Script-font quote + Voir nos barbiers CTA)
             =================================================================== */}
          <section className="relative py-28 md:py-36 w-full overflow-hidden bg-[#1F1F1F]">
            <div
              className="absolute inset-0 bg-cover bg-center bg-fixed opacity-40"
              style={{ backgroundImage: `url(${siteConfig.parallaxBannerImage})` }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/75" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
              <p className="font-script text-4xl sm:text-6xl md:text-7xl text-white mb-4 leading-tight">
                {t.parallaxBanner.quote}
              </p>
              <p className="text-xs uppercase tracking-[0.34em] text-neutral-300 mb-8">
                {t.parallaxBanner.subtitle}
              </p>
              <a
                href="#barbiers"
                className="inline-block px-7 py-3.5 bg-[#A65B3A] hover:bg-transparent border border-[#A65B3A] hover:border-white text-white text-xs uppercase tracking-[0.22em] font-semibold transition-colors"
              >
                {t.parallaxBanner.ctaBtn}
              </a>
            </div>
          </section>

          {/* ===================================================================
              10. OUR BARBERS (3 Portrait Cards with "Réserver avec {name}")
             =================================================================== */}
          <section
            id="barbiers"
            className="py-20 md:py-28 bg-white dark:bg-[#161616]"
          >
            <div className="max-w-6xl mx-auto px-6">
              <SectionHeader
                eyebrow={t.barbers.eyebrow}
                title={t.barbers.title}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {siteConfig.barbers.map((barber, idx) => {
                  const displayName = isAr ? barber.nameAr : barber.name;
                  return (
                    <motion.div
                      key={barber.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: idx * 0.1 }}
                      className="bg-[#F7F6F4] dark:bg-[#1F1F1F] border border-neutral-200/80 dark:border-neutral-800 flex flex-col group"
                    >
                      <div className="aspect-[3/4] overflow-hidden bg-neutral-900">
                        <ResilientImage
                          src={barber.image}
                          alt={displayName}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-8 text-center flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.28em] text-neutral-400 mb-1">
                            {isAr ? barber.roleAr : barber.roleFr}
                          </p>
                          <h3 className="font-display text-xl font-bold uppercase tracking-[0.1em] mb-4">
                            {displayName}
                          </h3>
                          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                            {isAr ? barber.bioAr : barber.bioFr}
                          </p>
                        </div>

                        <div>
                          <button
                            type="button"
                            onClick={() =>
                              preselectAndScrollToBooking({ barberId: barber.id })
                            }
                            className="text-xs font-bold uppercase tracking-[0.18em] text-[#1F1F1F] dark:text-white border-b border-[#1F1F1F] dark:border-white hover:text-[#A65B3A] hover:border-[#A65B3A] pb-0.5 transition-colors cursor-pointer"
                          >
                            {t.barbers.bookWithPrefix} {displayName.split(' ')[0]}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ===================================================================
              11. TESTIMONIALS (Dark background image, quote mark, stars, dots)
             =================================================================== */}
          <section
            id="avis"
            className="relative py-24 md:py-32 bg-[#1F1F1F] text-white overflow-hidden"
          >
            <ResilientImage
              src={siteConfig.testimonialsBgImage}
              alt="Témoignages clients Atelier Atlas"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1F1F1F]/90 via-black/75 to-[#1F1F1F]/90" />

            <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
              {/* Large Vintage Quote Mark */}
              <div
                className="font-display text-7xl sm:text-8xl leading-none text-white/90 select-none mb-2"
                aria-hidden="true"
              >
                “
              </div>

              {/* 5 Star Rating */}
              <div className="flex items-center justify-center gap-1 text-[#A65B3A] mb-6">
                {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <blockquote className="font-display italic text-xl sm:text-2xl md:text-3xl text-neutral-100 leading-relaxed mb-8">
                    {isAr ? currentTestimonial.quoteAr : currentTestimonial.quoteFr}
                  </blockquote>

                  <p className="text-sm text-neutral-300">
                    <span className="font-script text-3xl text-white mr-2">
                      - {currentTestimonial.author},
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                      {t.testimonials.fromPrefix}{' '}
                      {isAr ? currentTestimonial.sourceAr : currentTestimonial.sourceFr}
                    </span>
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Clickable Pagination Dots */}
              <div className="flex items-center justify-center gap-2.5 mt-10">
                {siteConfig.testimonials.map((item, idx) => {
                  const active = idx === testimonialIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTestimonialIndex(idx)}
                      aria-label={`Témoignage ${idx + 1}`}
                      className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                        active
                          ? 'bg-[#A65B3A] scale-125'
                          : 'bg-white/30 hover:bg-white/60'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </section>

          {/* ===================================================================
              12. BLOG / TIPS (2x2 Dark Cards + Link to Static Articles & pSEO)
             =================================================================== */}
          <section
            id="blog"
            className="py-20 md:py-28 bg-[#F7F6F4] dark:bg-[#191919]"
          >
            <div className="max-w-6xl mx-auto px-6">
              <SectionHeader
                eyebrow={t.blog.eyebrow}
                title={t.blog.title}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                {visibleBlogPosts.map((post, idx) => {
                  const title = isAr ? post.titleAr : post.titleFr;
                  const date = isAr ? post.dateAr : post.dateFr;
                  const excerpt = isAr ? post.excerptAr : post.excerptFr;

                  return (
                    <motion.article
                      key={post.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: idx * 0.08 }}
                      className="bg-[#1F1F1F] text-white grid grid-cols-1 sm:grid-cols-12 overflow-hidden shadow-md group border border-neutral-800"
                    >
                      {/* Thumbnail Left */}
                      <div className="sm:col-span-5 h-56 sm:h-full overflow-hidden">
                        <ResilientImage
                          src={post.image}
                          alt={title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Content Right */}
                      <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                        <div>
                          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-wide text-white group-hover:text-[#A65B3A] transition-colors mb-2">
                            <button
                              type="button"
                              onClick={() => navigateToBlog(post.slug)}
                              className="text-left cursor-pointer"
                            >
                              {title}
                            </button>
                          </h3>

                          {/* Clean unboxed metadata */}
                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-400 mb-4">
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-[#A65B3A]" />
                              {date}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="inline-flex items-center gap-1">
                              <User className="w-3 h-3 text-[#A65B3A]" />
                              {post.author}
                            </span>
                          </div>

                          <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3 mb-6">
                            {excerpt}
                          </p>
                        </div>

                        <div>
                          <button
                            type="button"
                            onClick={() => navigateToBlog(post.slug)}
                            className="text-xs font-bold uppercase tracking-[0.2em] text-white border-b border-white hover:text-[#A65B3A] hover:border-[#A65B3A] pb-0.5 transition-colors cursor-pointer"
                          >
                            {t.blog.readMore}
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>

              {/* Toggle Button to show all 6 static SEO articles */}
              {siteConfig.blogPosts.length > 4 && (
                <div className="mt-10 text-center">
                  <button
                    type="button"
                    onClick={() => setShowAllBlogPosts((prev) => !prev)}
                    className="px-7 py-3 border border-[#1F1F1F] dark:border-neutral-600 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#A65B3A] hover:border-[#A65B3A] hover:text-white transition-colors cursor-pointer"
                  >
                    {showAllBlogPosts
                      ? `${t.blog.showLessArticles} (4)`
                      : `${t.blog.viewAllArticles} (${siteConfig.blogPosts.length})`}
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>
      )}

      {/* =====================================================================
          13. FOOTER (Dark background, 5 columns, pSEO links, Floating WhatsApp)
         ===================================================================== */}
      <footer
        id="contact"
        className="bg-[#181818] text-neutral-300 pt-20 pb-12 border-t border-neutral-800"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-neutral-800/80">
            {/* Col 1: Logo + Short Text + Button */}
            <div className="lg:col-span-3 space-y-5">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToHome();
                }}
                className="inline-block font-display text-2xl font-bold uppercase tracking-[0.18em] text-white"
              >
                {siteConfig.businessName}
              </a>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {t.footer.aboutText}
              </p>
              <p className="text-xs text-neutral-400">
                {isAr ? siteConfig.addressAr : siteConfig.addressFr}
              </p>
              <button
                type="button"
                onClick={() => preselectAndScrollToBooking()}
                className="px-5 py-2.5 bg-[#A65B3A] hover:bg-[#8E4B2E] text-white text-xs uppercase tracking-[0.18em] font-semibold transition-colors cursor-pointer"
              >
                {t.footer.aboutBtn}
              </button>
            </div>

            {/* Col 2: Horaires */}
            <div className="lg:col-span-3">
              <h3 className="font-display text-lg font-bold uppercase tracking-[0.12em] text-white mb-5">
                {t.footer.hoursColTitle}
              </h3>
              <div className="space-y-2 text-xs">
                {siteConfig.openingHours.map((h) => (
                  <div
                    key={h.dayKey}
                    className="flex items-center justify-between py-1 border-b border-neutral-800/70 last:border-none"
                  >
                    <span className="uppercase tracking-wider text-neutral-400">
                      {isAr ? h.dayAr : h.dayFr}
                    </span>
                    <span
                      className={`tabular-nums ${
                        h.isClosed ? 'text-[#A65B3A] italic' : 'text-neutral-300'
                      }`}
                    >
                      {isAr ? h.hoursAr : h.hoursFr}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Col 3: Informations légales */}
            <div className="lg:col-span-2">
              <h3 className="font-display text-lg font-bold uppercase tracking-[0.12em] text-white mb-5">
                {t.footer.legalColTitle}
              </h3>
              <ul className="space-y-2.5 text-xs text-neutral-400">
                {t.footer.legalLinks.map((item) => (
                  <li key={item.action}>
                    <button
                      type="button"
                      onClick={() => setActiveInfoModal(item.action)}
                      className="hover:text-[#A65B3A] transition-colors text-left cursor-pointer"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Liens utiles (Links to Programmatic SEO Pages) */}
            <div className="lg:col-span-2">
              <h3 className="font-display text-lg font-bold uppercase tracking-[0.12em] text-white mb-5">
                {t.footer.usefulLinksColTitle}
              </h3>
              <ul className="space-y-2.5 text-xs text-neutral-400">
                {siteConfig.pSEOPages.map((page) => (
                  <li key={page.slug}>
                    <a
                      href={`/p/${page.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToPseo(page.slug);
                      }}
                      className="hover:text-[#A65B3A] transition-colors block"
                    >
                      Barbier {page.neighborhood}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 5: Articles récents */}
            <div className="lg:col-span-2">
              <h3 className="font-display text-lg font-bold uppercase tracking-[0.12em] text-white mb-5">
                {t.footer.recentPostsColTitle}
              </h3>
              <div className="space-y-4">
                {siteConfig.blogPosts.slice(0, 3).map((post) => (
                  <div key={post.slug} className="group">
                    <a
                      href={`/blog/${post.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToBlog(post.slug);
                      }}
                      className="text-xs text-neutral-300 group-hover:text-[#A65B3A] transition-colors font-medium block leading-snug mb-1"
                    >
                      {isAr ? post.titleAr : post.titleFr}
                    </a>
                    <span className="text-[11px] text-neutral-500 block">
                      {isAr ? post.dateAr : post.dateFr}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar: Script Signature, Copyright, Socials & Made by WebAtlass */}
          <div className="pt-10 text-center space-y-4">
            <p className="font-script text-2xl sm:text-3xl text-neutral-300">
              {siteConfig.businessName} · {siteConfig.city}
            </p>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-4 text-xs uppercase tracking-widest text-neutral-400">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#A65B3A] transition-colors"
              >
                Instagram
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#A65B3A] transition-colors"
              >
                WhatsApp
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#A65B3A] transition-colors"
              >
                Facebook
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={siteConfig.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#A65B3A] transition-colors"
              >
                TikTok
              </a>
            </div>

            <p className="text-xs text-neutral-500">
              © {new Date().getFullYear()} {siteConfig.businessName}. {t.footer.rights} —{' '}
              <span className="text-neutral-300 font-medium">{t.footer.madeBy}</span>
            </p>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          FLOATING WHATSAPP BUTTON
         ===================================================================== */}
      <a
        href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
          `Bonjour ${siteConfig.businessName}, je souhaite réserver un créneau.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Réserver sur WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 bg-[#A65B3A] hover:bg-[#8E4B2E] text-white px-4 py-3 shadow-xl border border-white/15 transition-transform duration-200 hover:scale-105"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline text-xs font-semibold uppercase tracking-[0.15em]">
          WhatsApp
        </span>
      </a>

      {/* =====================================================================
          HAIRCUT MODELS LIGHTBOX MODAL
         ===================================================================== */}
      <AnimatePresence>
        {activeLightboxModel && lightboxModelIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxModelIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1F1F1F] text-white max-w-2xl w-full border border-neutral-800 overflow-hidden shadow-2xl"
            >
              <div className="relative aspect-[4/3] bg-black">
                <ResilientImage
                  src={activeLightboxModel.image}
                  alt={isAr ? activeLightboxModel.nameAr : activeLightboxModel.nameFr}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setLightboxModelIndex(null)}
                  aria-label={t.haircutModels.closeLightbox}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/70 hover:bg-[#A65B3A] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setLightboxModelIndex(
                      (lightboxModelIndex - 1 + siteConfig.haircutModels.length) %
                        siteConfig.haircutModels.length
                    )
                  }
                  aria-label="Modèle précédent"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 hover:bg-[#A65B3A] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setLightboxModelIndex(
                      (lightboxModelIndex + 1) % siteConfig.haircutModels.length
                    )
                  }
                  aria-label="Modèle suivant"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 hover:bg-[#A65B3A] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.24em] text-[#A65B3A] block mb-1">
                    {isAr ? activeLightboxModel.styleTagAr : activeLightboxModel.styleTagFr}
                  </span>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-wider mb-2">
                    {isAr ? activeLightboxModel.nameAr : activeLightboxModel.nameFr}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {isAr ? activeLightboxModel.descAr : activeLightboxModel.descFr}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const serviceId = activeLightboxModel.recommendedServiceId;
                    setLightboxModelIndex(null);
                    preselectAndScrollToBooking({ serviceId });
                  }}
                  className="px-6 py-3.5 bg-[#A65B3A] hover:bg-[#8E4B2E] text-white text-xs uppercase tracking-[0.2em] font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {t.haircutModels.bookThisStyle}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          LEGAL & SITEMAP INFO MODAL
         ===================================================================== */}
      <AnimatePresence>
        {activeInfoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveInfoModal(null)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#1F1F1F] text-[#1F1F1F] dark:text-white max-w-xl w-full p-8 border border-neutral-200 dark:border-neutral-800 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-6">
                <h3 className="font-display text-2xl font-bold uppercase tracking-wider">
                  {siteConfig.businessName} — Informations
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveInfoModal(null)}
                  className="p-2 hover:text-[#A65B3A] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {activeInfoModal === 'sitemap' ? (
                <div className="space-y-4 text-xs">
                  <p className="font-semibold uppercase tracking-widest text-[#A65B3A]">
                    Pages Locales Programmatic SEO (Casablanca)
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {siteConfig.pSEOPages.map((p) => (
                      <button
                        key={p.slug}
                        type="button"
                        onClick={() => {
                          setActiveInfoModal(null);
                          navigateToPseo(p.slug);
                        }}
                        className="text-left py-2 px-3 border border-neutral-200 dark:border-neutral-800 hover:border-[#A65B3A] cursor-pointer"
                      >
                        {p.heroTitleFr}
                      </button>
                    ))}
                  </div>
                  <p className="font-semibold uppercase tracking-widest text-[#A65B3A] pt-3">
                    Articles du Blog (Longue Traîne)
                  </p>
                  <div className="space-y-1.5">
                    {siteConfig.blogPosts.map((b) => (
                      <button
                        key={b.slug}
                        type="button"
                        onClick={() => {
                          setActiveInfoModal(null);
                          navigateToBlog(b.slug);
                        }}
                        className="block w-full text-left py-1.5 hover:text-[#A65B3A] cursor-pointer"
                      >
                        • {b.titleFr}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  <div className="flex items-center gap-2 text-[#A65B3A] font-semibold">
                    <Sparkles className="w-4 h-4" />
                    <span>Engagement Qualité & Stérilisation Atelier Atlas</span>
                  </div>
                  <p>
                    Toutes nos prestations à Casablanca ({siteConfig.addressFr}) sont réalisées avec des lames à usage unique et des instruments stérilisés en autoclave médical entre chaque client.
                  </p>
                  <p>
                    Les réservations effectuées via notre formulaire WhatsApp sont gratuites et sans prépaiement. En cas d’empêchement, merci de nous prévenir au moins 2 heures à l’avance sur WhatsApp au {siteConfig.phoneDisplay}.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
