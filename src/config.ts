import heroBarberTrimImg from './assets/images/hero_barber_trim_1791323599326.jpg';
import heroHotTowelImg from './assets/images/hero_hot_towel_shave_1791323610300.jpg';
import barberTeamWorkImg from './assets/images/barber_team_work_1791323619988.jpg';
import vintageBarberToolsImg from './assets/images/vintage_barber_tools_1791323629949.jpg';
import barberPortraitMasterImg from './assets/images/barber_portrait_master_1791323639096.jpg';
import haircutModelFadeImg from './assets/images/haircut_model_fade_1791323649194.jpg';

export type Locale = 'fr' | 'ar';

export interface OpeningHourRow {
  dayKey: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  dayFr: string;
  dayAr: string;
  hoursFr: string;
  hoursAr: string;
  isClosed: boolean;
  openTime?: string; // "09:00"
  closeTime?: string; // "20:00"
}

export interface ServiceItem {
  id: string;
  slug: string;
  circleTitleFr: string;
  circleTitleAr: string;
  fullNameFr: string;
  fullNameAr: string;
  shortDescFr: string;
  shortDescAr: string;
  priceMad: number;
  durationMin: number;
  image: string;
  featuredInCircles: boolean;
}

export interface PricingCardItem {
  id: string;
  isPopular?: boolean;
  badgeFr?: string;
  badgeAr?: string;
  services: {
    categoryFr: string;
    categoryAr: string;
    nameFr: string;
    nameAr: string;
    detailFr: string;
    detailAr: string;
    priceMad: number;
    serviceId: string;
  }[];
}

export interface BarberItem {
  id: string;
  name: string;
  nameAr: string;
  roleFr: string;
  roleAr: string;
  bioFr: string;
  bioAr: string;
  specialtyFr: string;
  specialtyAr: string;
  experienceYears: number;
  image: string;
}

export interface HaircutModelItem {
  id: string;
  nameFr: string;
  nameAr: string;
  styleTagFr: string;
  styleTagAr: string;
  descFr: string;
  descAr: string;
  image: string;
  recommendedServiceId: string;
}

export interface FeatureHighlightItem {
  id: string;
  icon: 'razor' | 'hygiene' | 'skin';
  titleFr: string;
  titleAr: string;
  descFr: string;
  descAr: string;
}

export interface TestimonialItem {
  id: string;
  quoteFr: string;
  quoteAr: string;
  author: string;
  sourceFr: string;
  sourceAr: string;
  rating: number;
}

export interface BlogPostItem {
  slug: string;
  titleFr: string;
  titleAr: string;
  dateFr: string;
  dateAr: string;
  isoDate: string;
  author: string;
  categoryFr: string;
  categoryAr: string;
  readTimeFr: string;
  readTimeAr: string;
  excerptFr: string;
  excerptAr: string;
  image: string;
  keywords: string[];
  relatedPseoSlugs: string[];
  sectionsFr: { heading: string; paragraphs: string[] }[];
  sectionsAr: { heading: string; paragraphs: string[] }[];
  faqFr: { question: string; answer: string }[];
}

export interface PseoPageItem {
  slug: string;
  titleFr: string;
  titleAr: string;
  metaDescriptionFr: string;
  neighborhood: string;
  neighborhoodAr: string;
  serviceId: string;
  heroEyebrowFr: string;
  heroTitleFr: string;
  heroTitleAr: string;
  introFr: string;
  introAr: string;
  highlightsFr: string[];
  highlightsAr: string[];
  landmarksFr: string;
  faqFr: { question: string; answer: string }[];
}

export const siteConfig = {
  businessName: 'Atelier Atlas',
  businessSubLabel: 'Barber Shop',
  taglineFr: "L'Art du Barbier Traditionnel & Coiffure Homme à Casablanca",
  taglineAr: 'فن الحلاقة التقليدية والعناية بالرجل في الدار البيضاء',
  defaultLocale: 'fr' as Locale,

  // Single WhatsApp number used across the entire site
  whatsappNumber: '212661489210',
  phoneDisplay: '+212 6 61 48 92 10',

  city: 'Casablanca',
  cityAr: 'الدار البيضاء',
  addressFr: '48 Boulevard Massira Al Khadra, Quartier Maarif, Casablanca 20100, Maroc',
  addressAr: '48 شارع المسيرة الخضراء، حي المعاريف، الدار البيضاء 20100، المغرب',
  googleMapsUrl: 'https://maps.google.com/?q=Maarif,Casablanca',
  geo: {
    latitude: 33.5883,
    longitude: -7.6325,
  },

  // Editable Theme Colors
  colors: {
    offWhite: '#F7F6F4',
    charcoal: '#1F1F1F',
    accent: '#A65B3A',
    accentHover: '#8E4B2E',
  },

  socials: {
    instagram: 'https://instagram.com',
    whatsapp: 'https://wa.me/212661489210',
    facebook: 'https://facebook.com',
    tiktok: 'https://tiktok.com',
  },

  // UI Translations
  ui: {
    fr: {
      nav: {
        home: 'Accueil',
        services: 'Services',
        about: 'À propos',
        gallery: 'Galerie',
        reviews: 'Avis',
        blog: 'Blog',
        contact: 'Contact',
        bookBtn: 'Prendre rendez-vous',
      },
      hero: {
        eyebrow: 'Cheveux & Barbe',
        titlePrefix: 'Bienvenue chez',
        ctaBtn: 'Prendre rendez-vous',
      },
      welcome: {
        eyebrow: 'Bienvenue',
        title: 'Qui sommes-nous',
        description:
          "Bien plus qu'un simple salon de coiffure pour hommes à Casablanca, Atelier Atlas est un lieu de caractère où l'artisanat du barbier traditionnel rencontre les coupes contemporaines. Dans un cadre chaleureux mêlant bois noble, fauteuils vintage et serviettes chaudes parfumées à l'eucalyptus, nos maîtres barbiers prennent soin de votre style avec précision.",
        button: 'Prendre rendez-vous',
        workingHoursTitle: "Horaires d'ouverture",
        openBadge: 'Ouvert actuellement',
        closedBadge: 'Fermé actuellement',
        whatsappCallLabel: 'Réservation directe WhatsApp',
      },
      services: {
        eyebrow: 'Découvrez',
        title: 'Nos services',
        bookLink: 'Réserver',
      },
      featureBanner: {
        title: "Rencontrez l'équipe",
        subtitle: 'EXPERTS EN COUPE HOMME & TAILLE DE BARBE',
        description:
          "Chaque prestation commence par un diagnostic personnalisé de la morphologie de votre visage et de la texture de vos cheveux. Nos artisans utilisent exclusivement des lames stérilisées et des huiles naturelles d'argan et de cèdre de l'Atlas.",
      },
      appointment: {
        eyebrow: 'Réservation rapide',
        title: 'Prendre rendez-vous',
        step1Label: '1. Choisissez votre prestation & barbier',
        step2Label: '2. Sélectionnez la date & le créneau',
        step3Label: '3. Vos coordonnées pour confirmation WhatsApp',
        datePlaceholder: 'Date du rendez-vous *',
        timePlaceholder: 'Créneau horaire *',
        namePlaceholder: 'Votre nom complet *',
        phonePlaceholder: 'Numéro de téléphone *',
        barberPlaceholder: 'Choisir un barbier',
        anyBarberOption: 'Peu importe (Premier disponible)',
        servicePlaceholder: 'Choisir une prestation *',
        notesPlaceholder: 'Notes ou précisions supplémentaires (ex: dégradé bas, barbe sculptée...)',
        submitBtn: 'Prendre rendez-vous',
        availableSlotsLabel: 'Créneaux disponibles :',
        validationError: 'Veuillez renseigner votre nom, votre téléphone, la date, le créneau et la prestation souhaitée.',
        whatsappConfirmNote: 'Confirmation immédiate via WhatsApp sans paiement en ligne requis.',
      },
      haircutModels: {
        eyebrow: 'Trouvez votre style',
        title: 'Nos coupes',
        bookThisStyle: 'Réserver ce style sur WhatsApp',
        closeLightbox: 'Fermer',
      },
      pricing: {
        eyebrow: 'Nos tarifs',
        title: 'Prix',
        currency: 'MAD',
        clickToBook: 'Cliquer pour réserver ce tarif',
      },
      parallaxBanner: {
        quote: 'un endroit paisible pour votre barbier',
        subtitle: 'LE SALON AUTHENTIQUE AU CŒUR DE CASABLANCA',
        ctaBtn: 'Voir nos barbiers',
      },
      barbers: {
        eyebrow: 'Une équipe de passionnés',
        title: 'Nos barbiers',
        roleLabel: 'BARBIER',
        bookWithPrefix: 'Réserver avec',
      },
      testimonials: {
        fromPrefix: 'depuis',
      },
      blog: {
        eyebrow: 'Conseils et actualités',
        title: 'Le blog',
        readMore: 'Lire la suite',
        viewAllArticles: 'Voir tous les articles SEO',
        showLessArticles: 'Réduire les articles',
        backToHome: "Retour à l'accueil",
        relatedSearches: 'Pages locales & Services associés à Casablanca',
        faqHeading: 'Questions fréquentes',
      },
      footer: {
        aboutText:
          'Salon de coiffure homme et barbier traditionnel à Casablanca Maarif. Spécialiste du dégradé sur-mesure, de la taille de barbe sculptée et du rasage à la serviette chaude.',
        aboutBtn: 'Prendre rendez-vous',
        hoursColTitle: 'Horaires',
        legalColTitle: 'Informations légales',
        usefulLinksColTitle: 'Liens utiles',
        recentPostsColTitle: 'Articles récents',
        legalLinks: [
          { label: "Conditions d'utilisation", action: 'terms' },
          { label: 'Politique de confidentialité', action: 'privacy' },
          { label: "Charte d'hygiène & stérilisation", action: 'hygiene' },
          { label: 'Plan du site SEO', action: 'sitemap' },
          { label: 'Accès & Stationnement Maarif', action: 'parking' },
        ],
        madeBy: 'Made by WebAtlass',
        rights: 'Tous droits réservés.',
      },
    },
    ar: {
      nav: {
        home: 'الرئيسية',
        services: 'خدماتنا',
        about: 'من نحن',
        gallery: 'القصات',
        reviews: 'آراء الزبناء',
        blog: 'المدونة',
        contact: 'اتصل بنا',
        bookBtn: 'احجز موعدك',
      },
      hero: {
        eyebrow: 'شعر و لحية',
        titlePrefix: 'مرحباً بكم في',
        ctaBtn: 'احجز موعدك الآن',
      },
      welcome: {
        eyebrow: 'مرحباً بكم',
        title: 'من نحن',
        description:
          'أكثر من مجرد صالون حلاقة رجالي في الدار البيضاء، أتيلييه أطلس هو فضاء يجمع بين أصالة الحلاقة التقليدية المغربية وأحدث قصات الشعر العصرية. في أجواء دافئة ومريحة، يعتني أمهر الحلاقين بمظهرك بدقة عالية.',
        button: 'احجز موعدك',
        workingHoursTitle: 'أوقات العمل',
        openBadge: 'مفتوح الآن',
        closedBadge: 'مغلق الآن',
        whatsappCallLabel: 'حجز مباشر عبر واتساب',
      },
      services: {
        eyebrow: 'اكتشف',
        title: 'خدماتنا',
        bookLink: 'احجز الآن',
      },
      featureBanner: {
        title: 'تعرف على فريقنا',
        subtitle: 'خبراء الحلاقة الرجالية وتحديد اللحية',
        description:
          'تبدأ كل خدمة بتشخيص دقيق لشكل الوجه وطبيعة الشعر. نعتمد حصرياً أدوات معقمة وزيوت طبيعية من الأركان وخشب الأرز الأطلسي.',
      },
      appointment: {
        eyebrow: 'حجز سريع',
        title: 'احجز موعدك',
        step1Label: '1. اختر الخدمة والحلاق',
        step2Label: '2. حدد التاريخ والوقت المناسب',
        step3Label: '3. معلوماتك لتأكيد الموعد عبر واتساب',
        datePlaceholder: 'تاريخ الموعد *',
        timePlaceholder: 'وقت الموعد *',
        namePlaceholder: 'الاسم الكامل *',
        phonePlaceholder: 'رقم الهاتف *',
        barberPlaceholder: 'اختر الحلاق',
        anyBarberOption: 'أي حلاق متاح',
        servicePlaceholder: 'اختر الخدمة *',
        notesPlaceholder: 'ملاحظات إضافية (مثال: تدريج منخفض، تحديد اللحية بالموس...)',
        submitBtn: 'احجز موعدك',
        availableSlotsLabel: 'الأوقات المتاحة :',
        validationError: 'يرجى ملء الاسم الكامل، رقم الهاتف، التاريخ، الوقت والخدمة المطلوبة.',
        whatsappConfirmNote: 'تأكيد فوري عبر واتساب بدون دفع مسبق.',
      },
      haircutModels: {
        eyebrow: 'اختر ستايلك',
        title: 'موديلات القصات',
        bookThisStyle: 'احجز هذه القصة عبر واتساب',
        closeLightbox: 'إغلاق',
      },
      pricing: {
        eyebrow: 'تعريفتنا',
        title: 'الأسعار',
        currency: 'درهم',
        clickToBook: 'اضغط لحجز هذه الخدمة',
      },
      parallaxBanner: {
        quote: 'مكان هادئ ومميز لحلاقتك',
        subtitle: 'صالون الحلاقة الأصيل في قلب الدار البيضاء',
        ctaBtn: 'تعرف على الحلاقين',
      },
      barbers: {
        eyebrow: 'فريق من المحترفين',
        title: 'حلاقونا',
        roleLabel: 'حلاق محترف',
        bookWithPrefix: 'احجز مع',
      },
      testimonials: {
        fromPrefix: 'من',
      },
      blog: {
        eyebrow: 'نصائح وأخبار',
        title: 'المدونة',
        readMore: 'اقرأ المزيد',
        viewAllArticles: 'عرض جميع المقالات',
        showLessArticles: 'عرض أقل',
        backToHome: 'العودة للرئيسية',
        relatedSearches: 'صفحات محلية وخدمات في الدار البيضاء',
        faqHeading: 'أسئلة شائعة',
      },
      footer: {
        aboutText:
          'صالون حلاقة رجالي تقليدي وعصري في المعاريف الدار البيضاء. متخصصون في التدريج الاحترافي، تحديد اللحية والحلاقة بالفوطة الساخنة.',
        aboutBtn: 'احجز موعدك',
        hoursColTitle: 'أوقات العمل',
        legalColTitle: 'معلومات قانونية',
        usefulLinksColTitle: 'روابط مفيدة',
        recentPostsColTitle: 'أحدث المقالات',
        legalLinks: [
          { label: 'شروط الاستخدام', action: 'terms' },
          { label: 'سياسة الخصوصية', action: 'privacy' },
          { label: 'ميثاق النظافة والتعقيم', action: 'hygiene' },
          { label: 'خريطة الموقع SEO', action: 'sitemap' },
          { label: 'الموقع وركن السيارات بالمعاريف', action: 'parking' },
        ],
        madeBy: 'Made by WebAtlass',
        rights: 'جميع الحقوق محفوظة.',
      },
    },
  },

  // Hero Slider (01 / 02 / 03)
  heroSlides: [
    {
      id: '01',
      image: heroBarberTrimImg,
      eyebrowFr: 'Cheveux & Barbe',
      eyebrowAr: 'شعر و لحية',
      titleFr: 'Bienvenue chez Atelier Atlas',
      titleAr: 'مرحباً بكم في أتيلييه أطلس',
      subtitleFr: 'Maîtres barbiers à Casablanca · Coupe aux ciseaux, dégradé de précision & rasage traditionnel',
      subtitleAr: 'حلاقة رجالية فاخرة في الدار البيضاء · تدريج احترافي وعناية متكاملة باللحية',
    },
    {
      id: '02',
      image: heroHotTowelImg,
      eyebrowFr: 'Rituel Traditionnel',
      eyebrowAr: 'طقوس الحلاقة الأصيلة',
      titleFr: 'Bienvenue chez Atelier Atlas',
      titleAr: 'مرحباً بكم في أتيلييه أطلس',
      subtitleFr: "Rasage à l'ancienne au coupe-chou, vapeur chaude à l'eucalyptus & soin apaisant",
      subtitleAr: 'حلاقة تقليدية بالفوطة الساخنة وزيوت الأركان الطبيعية لراحة مطلقة',
    },
    {
      id: '03',
      image: barberTeamWorkImg,
      eyebrowFr: 'Élégance & Caractère',
      eyebrowAr: 'أناقة و تميز',
      titleFr: 'Bienvenue chez Atelier Atlas',
      titleAr: 'مرحباً بكم في أتيلييه أطلس',
      subtitleFr: 'Votre salon gentleman au quartier Maarif · Réservation instantanée sur WhatsApp',
      subtitleAr: 'وجهتك المفضلة للأناقة الرجالية في حي المعاريف · حجز فوري عبر واتساب',
    },
  ],

  // Welcome Section Portraits & Hours
  welcomePortraits: {
    leftImage: heroHotTowelImg,
    rightImage: barberPortraitMasterImg,
  },

  openingHours: [
    {
      dayKey: 1,
      dayFr: 'LUN',
      dayAr: 'الإثنين',
      hoursFr: '09:00 - 20:00',
      hoursAr: '09:00 - 20:00',
      isClosed: false,
      openTime: '09:00',
      closeTime: '20:00',
    },
    {
      dayKey: 2,
      dayFr: 'MAR',
      dayAr: 'الثلاثاء',
      hoursFr: '09:00 - 20:00',
      hoursAr: '09:00 - 20:00',
      isClosed: false,
      openTime: '09:00',
      closeTime: '20:00',
    },
    {
      dayKey: 3,
      dayFr: 'MER',
      dayAr: 'الأربعاء',
      hoursFr: '09:00 - 20:00',
      hoursAr: '09:00 - 20:00',
      isClosed: false,
      openTime: '09:00',
      closeTime: '20:00',
    },
    {
      dayKey: 4,
      dayFr: 'JEU',
      dayAr: 'الخميس',
      hoursFr: '09:00 - 20:00',
      hoursAr: '09:00 - 20:00',
      isClosed: false,
      openTime: '09:00',
      closeTime: '20:00',
    },
    {
      dayKey: 5,
      dayFr: 'VEN',
      dayAr: 'الجمعة',
      hoursFr: '09:00 - 20:30',
      hoursAr: '09:00 - 20:30',
      isClosed: false,
      openTime: '09:00',
      closeTime: '20:30',
    },
    {
      dayKey: 6,
      dayFr: 'SAM',
      dayAr: 'السبت',
      hoursFr: '10:00 - 21:00',
      hoursAr: '10:00 - 21:00',
      isClosed: false,
      openTime: '10:00',
      closeTime: '21:00',
    },
    {
      dayKey: 0,
      dayFr: 'DIM',
      dayAr: 'الأحد',
      hoursFr: 'Fermé',
      hoursAr: 'مغلق',
      isClosed: true,
    },
  ] as OpeningHourRow[],

  // Services (4 Featured Circular Items + Additional Services for Booking & Pricing)
  services: [
    {
      id: 'rasage-ancienne',
      slug: 'rasage-serviette-chaude-casablanca',
      circleTitleFr: 'RASAGE',
      circleTitleAr: 'حلاقة الذقن',
      fullNameFr: "Rasage à l'ancienne & Serviette Chaude",
      fullNameAr: 'حلاقة تقليدية بالفوطة الساخنة',
      shortDescFr:
        "Rituel complet avec mousse chaude au blaireau, double passage au coupe-chou, serviette infusée et baume apaisant.",
      shortDescAr: 'طقس متكامل بالرغوة الدافئة، الفوطة الساخنة وبلسم مهدئ للبشرة.',
      priceMad: 90,
      durationMin: 30,
      image: heroHotTowelImg,
      featuredInCircles: true,
    },
    {
      id: 'coupe-homme',
      slug: 'coupe-degrade-homme-casablanca',
      circleTitleFr: 'COUPE',
      circleTitleAr: 'قص الشعر',
      fullNameFr: 'Coupe Homme & Dégradé Sur-Mesure',
      fullNameAr: 'قص الشعر وتدريج احترافي',
      shortDescFr:
        'Diagnostic morphologique, coupe aux ciseaux et tondeuse de précision, finitions au rasoir et coiffage.',
      shortDescAr: 'قص احترافي بالمقص والماكينة مع تحديد دقيق يناسب شكل وجهك.',
      priceMad: 120,
      durationMin: 40,
      image: barberTeamWorkImg,
      featuredInCircles: true,
    },
    {
      id: 'shampoing-soin',
      slug: 'shampoing-massage-crane-casablanca',
      circleTitleFr: 'SHAMPOING',
      circleTitleAr: 'غسيل وتدليك',
      fullNameFr: 'Shampoing Purifiant & Massage Crânien',
      fullNameAr: 'غسيل الشعر وتدليك فروة الرأس',
      shortDescFr:
        "Lavage détoxifiant à l'argile du Maroc et huiles essentielles suivi d'un massage crânien relaxant de 15 minutes.",
      shortDescAr: 'غسيل منقي لفروة الرأس مع تدليك مريح ينشط الدورة الدموية.',
      priceMad: 70,
      durationMin: 20,
      image: heroBarberTrimImg,
      featuredInCircles: true,
    },
    {
      id: 'soin-visage',
      slug: 'soin-visage-homme-casablanca',
      circleTitleFr: 'SOIN VISAGE',
      circleTitleAr: 'عناية بالبشرة',
      fullNameFr: 'Soin Visage Complet & Masque Noir',
      fullNameAr: 'عناية شاملة بالبشرة وقناع الفحم',
      shortDescFr:
        'Exfoliation douce, vapeur d’ozone, extraction des points noirs, masque purifiant au charbon et hydratation.',
      shortDescAr: 'تنظيف عميق للبشرة بالبخار، إزالة الرؤوس السوداء وقناع الفحم المنقي.',
      priceMad: 150,
      durationMin: 45,
      image: haircutModelFadeImg,
      featuredInCircles: true,
    },
    {
      id: 'forfait-coupe-barbe',
      slug: 'forfait-coupe-et-barbe-casablanca',
      circleTitleFr: 'COUPE & BARBE',
      circleTitleAr: 'شعر و لحية',
      fullNameFr: 'Forfait Signature : Coupe + Barbe + Serviette Chaude',
      fullNameAr: 'باقة التميز: قص الشعر + اللحية + الفوطة الساخنة',
      shortDescFr:
        'Notre formule la plus demandée combinant coupe sur-mesure, taille de barbe sculptée et soin vapeur.',
      shortDescAr: 'باقتنا الأكثر طلباً تجمع بين قص الشعر وتحديد اللحية بالفوطة الساخنة.',
      priceMad: 190,
      durationMin: 60,
      image: heroBarberTrimImg,
      featuredInCircles: false,
    },
    {
      id: 'coloration-barbe-cheveux',
      slug: 'camouflage-cheveux-blancs-barbe-casablanca',
      circleTitleFr: 'COLORATION',
      circleTitleAr: 'صبغة طبيعية',
      fullNameFr: 'Camouflage Naturel Cheveux Blancs / Barbe',
      fullNameAr: 'تمويه الشيب الطبيعي للشعر واللحية',
      shortDescFr:
        'Teinture discrète sans ammoniaque pour densifier la barbe ou estomper les cheveux gris avec un rendu naturel.',
      shortDescAr: 'صبغة خالية من الأمونيا لتكثيف اللحية وإخفاء الشيب بمظهر طبيعي.',
      priceMad: 160,
      durationMin: 35,
      image: barberPortraitMasterImg,
      featuredInCircles: false,
    },
    {
      id: 'forfait-royal-atlas',
      slug: 'forfait-mariage-vip-barbier-casablanca',
      circleTitleFr: 'RITUEL ROYAL',
      circleTitleAr: 'الباقة الملكية',
      fullNameFr: 'Rituel Royal Atlas (Coupe + Barbe + Soin Visage + Massage)',
      fullNameAr: 'الطقس الملكي الشامل (شعر + لحية + بشرة + تدليك)',
      shortDescFr:
        "L'expérience ultime de 90 minutes pour une remise en beauté complète ou préparer un événement / mariage.",
      shortDescAr: 'التجربة الملكية الكاملة لمدة 90 دقيقة للعرسان والمناسبات الخاصة.',
      priceMad: 320,
      durationMin: 90,
      image: vintageBarberToolsImg,
      featuredInCircles: false,
    },
  ] as ServiceItem[],

  // Section 5: Feature Banner Images
  featureBannerImages: {
    mainWide: barberTeamWorkImg,
    bottomRightInset: haircutModelFadeImg,
  },

  // Section 6: Appointment Section Image & Available Slots
  appointmentImage: vintageBarberToolsImg,
  availableTimeSlots: [
    '09:30',
    '10:15',
    '11:00',
    '11:45',
    '13:30',
    '14:15',
    '15:00',
    '15:45',
    '16:30',
    '17:15',
    '18:00',
    '19:00',
  ],

  // Section 7: Haircut Models (6 Portrait Photos) + 3 Icon Features
  haircutModels: [
    {
      id: 'model-1',
      nameFr: 'Skin Fade & Barbe Sculptée',
      nameAr: 'تدريج صفري ولحية محددة',
      styleTagFr: 'Dégradé Américain',
      styleTagAr: 'تدريج أمريكي',
      descFr: 'Fondu à blanc progressif sur les côtés avec longueur texturée sur le dessus et contours de barbe au coupe-chou.',
      descAr: 'تدريج ناعم على الجوانب مع كثافة علوية وتحديد اللحية بالموس التقليدي.',
      image: haircutModelFadeImg,
      recommendedServiceId: 'forfait-coupe-barbe',
    },
    {
      id: 'model-2',
      nameFr: 'Coupe Classique aux Ciseaux',
      nameAr: 'قصة كلاسيكية بالمقص',
      styleTagFr: 'Gentleman Executive',
      styleTagAr: 'ستايل كلاسيكي',
      descFr: 'Coupe structurée entièrement travaillée aux ciseaux pour un tombé naturel et élégant au quotidien.',
      descAr: 'قصة متقنة بالمقص تمنحك مظهراً أنيقاً وطبيعياً يناسب العمل والمناسبات.',
      image: barberTeamWorkImg,
      recommendedServiceId: 'coupe-homme',
    },
    {
      id: 'model-3',
      nameFr: 'Taper Fade & Crop Texturé',
      nameAr: 'تايبر فيد وكروب عصري',
      styleTagFr: 'French Crop',
      styleTagAr: 'فرنش كروب',
      descFr: 'Nuque et pattes fondues avec précision, mouvement naturel sur le sommet du crâne et finition mate.',
      descAr: 'تحديد نظيف حول الأذن والرقبة مع ملمس طبيعي غير لامع من الأعلى.',
      image: barberPortraitMasterImg,
      recommendedServiceId: 'coupe-homme',
    },
    {
      id: 'model-4',
      nameFr: 'Barbe Royale & Contours Vapeur',
      nameAr: 'لحية ملكية بالفوطة الساخنة',
      styleTagFr: 'Rituel Barbe',
      styleTagAr: 'عناية باللحية',
      descFr: "Restructuration géométrique de la barbe longue, soin nourrissant à l'huile d'argan et rasage des joues.",
      descAr: 'هيكلة متوازنة للحية الطويلة مع ترطيب بزيت الأركان وتحديد الخدود.',
      image: heroBarberTrimImg,
      recommendedServiceId: 'rasage-ancienne',
    },
    {
      id: 'model-5',
      nameFr: 'Pompadour Moderne & Mid Fade',
      nameAr: 'بومبادور عصري وتدريج متوسط',
      styleTagFr: 'Volume & Précision',
      styleTagAr: 'كثافة ودقة',
      descFr: 'Volume travaillé au sèche-cheveux et brosse ronde, associé à un dégradé moyen très net.',
      descAr: 'تصفيف كلاسيكي مرتفع من الأمام مع تدريج متوسط يمنح الوجه توازناً رائعاً.',
      image: heroHotTowelImg,
      recommendedServiceId: 'forfait-coupe-barbe',
    },
    {
      id: 'model-6',
      nameFr: 'Buzz Cut & Traçage Rasoir',
      nameAr: 'باز كات وتحديد بالموس',
      styleTagFr: 'Minimaliste Net',
      styleTagAr: 'ستايل بسيط وحاد',
      descFr: 'Coupe courte millimétrée mettant en valeur les traits du visage, accompagnée d’un soin exfoliant.',
      descAr: 'قصة قصيرة متناسقة تبرز ملامح الوجه مع تنظيف منعش للبشرة.',
      image: vintageBarberToolsImg,
      recommendedServiceId: 'forfait-royal-atlas',
    },
  ] as HaircutModelItem[],

  featureHighlights: [
    {
      id: 'exp',
      icon: 'razor',
      titleFr: "10 ANS D'EXPÉRIENCE",
      titleAr: '10 سنوات من الخبرة',
      descFr:
        "Une approche artisanale fondée sur l'écoute, le conseil morphologique et la maîtrise des techniques classiques et modernes.",
      descAr: 'خبرة طويلة في فن الحلاقة الرجالية تضمن لك نتائج دقيقة تناسب ملامحك.',
    },
    {
      id: 'hygiene',
      icon: 'hygiene',
      titleFr: 'HYGIÈNE IRRÉPROCHABLE',
      titleAr: 'نظافة وتعقيم صارم',
      descFr:
        'Stérilisation systématique en autoclave médical après chaque client et lames de rasoir à usage unique.',
      descAr: 'تعقيم طبي شامل لجميع الأدوات بعد كل زبون مع شفرات حلاقة ذات استخدام فردي.',
    },
    {
      id: 'skin',
      icon: 'skin',
      titleFr: 'SOIN DE LA PEAU',
      titleAr: 'عناية فائقة بالبشرة',
      descFr:
        'Sélection rigoureuse de soins dermatologiques masculins, serviettes chaudes apaisantes et huiles bio du Maroc.',
      descAr: 'منتجات طبيعية مختارة بعناية لحماية البشرة من التهيج ومنحها نضارة فورية.',
    },
  ] as FeatureHighlightItem[],

  // Section 8: Pricing (3 Dark Chalkboard Cards with 2 services each, middle card Popular)
  pricingCards: [
    {
      id: 'card-tradition',
      isPopular: false,
      services: [
        {
          categoryFr: 'Rasage',
          categoryAr: 'حلاقة الذقن',
          nameFr: "Rasage à l'Ancienne",
          nameAr: 'حلاقة بالفوطة الساخنة',
          detailFr: 'Vapeur chaude, blaireau & baume apaisant',
          detailAr: 'بخار دافئ، رغوة تقليدية وبلسم مهدئ',
          priceMad: 90,
          serviceId: 'rasage-ancienne',
        },
        {
          categoryFr: 'Soin Visage',
          categoryAr: 'عناية بالبشرة',
          nameFr: 'Masque Noir & Vapeur',
          nameAr: 'قناع الفحم والبخار',
          detailFr: 'Exfoliation, extraction & hydratation intense',
          detailAr: 'تقشير لطيف وتنظيف عميق للمسام',
          priceMad: 150,
          serviceId: 'soin-visage',
        },
      ],
    },
    {
      id: 'card-signature',
      isPopular: true,
      badgeFr: 'Populaire',
      badgeAr: 'الأكثر طلباً',
      services: [
        {
          categoryFr: 'Coupe Homme',
          categoryAr: 'قص الشعر',
          nameFr: 'Coupe & Dégradé Précision',
          nameAr: 'قص الشعر وتدريج احترافي',
          detailFr: 'Ciseaux, tondeuse, shampoing & coiffage',
          detailAr: 'قص بالمقص والماكينة مع غسيل وتصفيف',
          priceMad: 120,
          serviceId: 'coupe-homme',
        },
        {
          categoryFr: 'Forfait Signature',
          categoryAr: 'باقة التميز',
          nameFr: 'Coupe + Taille de Barbe',
          nameAr: 'قص الشعر + تحديد اللحية',
          detailFr: 'Rituel complet cheveux, barbe & serviette chaude',
          detailAr: 'عناية متكاملة بالشعر واللحية بالفوطة الساخنة',
          priceMad: 190,
          serviceId: 'forfait-coupe-barbe',
        },
      ],
    },
    {
      id: 'card-prestige',
      isPopular: false,
      services: [
        {
          categoryFr: 'Coloration & Soin',
          categoryAr: 'صبغة وعناية',
          nameFr: 'Camouflage Barbe / Cheveux',
          nameAr: 'تمويه الشيب الطبيعي',
          detailFr: 'Rendu naturel sans ammoniaque & soin kératine',
          detailAr: 'مظهر طبيعي خالٍ من الأمونيا مع ترطيب',
          priceMad: 160,
          serviceId: 'coloration-barbe-cheveux',
        },
        {
          categoryFr: 'Prestation sur-mesure',
          categoryAr: 'الباقة الملكية',
          nameFr: 'Rituel Royal Atlas (90 min)',
          nameAr: 'الطقس الملكي الشامل',
          detailFr: 'Coupe, barbe, soin visage complet & massage crânien',
          detailAr: 'شعر، لحية، تنظيف بشرة وتدليك مريح',
          priceMad: 320,
          serviceId: 'forfait-royal-atlas',
        },
      ],
    },
  ] as PricingCardItem[],

  // Section 9: Parallax Banner
  parallaxBannerImage: heroHotTowelImg,

  // Section 10: Our Barbers (3 Master Barbers)
  barbers: [
    {
      id: 'youssef',
      name: 'Youssef EL AMRANI',
      nameAr: 'يوسف العمراني',
      roleFr: 'BARBIER',
      roleAr: 'معلم حلاق',
      bioFr:
        "Fondateur et maître barbier avec 12 ans d'expérience entre Casablanca et Paris. Spécialiste des coupes aux ciseaux et du rasage au coupe-chou.",
      bioAr: 'مؤسس الصالون ومعلم حلاق بخبرة 12 سنة. متخصص في القص بالمقص والحلاقة التقليدية بالموس.',
      specialtyFr: 'Coupe Ciseaux & Rasage Traditionnel',
      specialtyAr: 'قص بالمقص وحلاقة تقليدية',
      experienceYears: 12,
      image: barberPortraitMasterImg,
    },
    {
      id: 'karim',
      name: 'Karim BENNANI',
      nameAr: 'كريم بناني',
      roleFr: 'BARBIER',
      roleAr: 'حلاق محترف',
      bioFr:
        'Expert reconnu du Skin Fade, Taper Fade et de la restructuration géométrique de barbe. Précision millimétrée et conseils visagistes.',
      bioAr: 'خبير في جميع أنواع التدريج العصري وهيكلة اللحية بدقة عالية تناسب ملامح الوجه.',
      specialtyFr: 'Skin Fade & Barbe Sculptée',
      specialtyAr: 'تدريج عصري وتحديد اللحية',
      experienceYears: 9,
      image: barberTeamWorkImg,
    },
    {
      id: 'mehdi',
      name: 'Mehdi TAZI',
      nameAr: 'مهدي التازي',
      roleFr: 'BARBIER',
      roleAr: 'أخصائي عناية وحلاقة',
      bioFr:
        'Spécialiste des soins du visage masculins, des traitements capillaires à la kératine et des forfaits mariés VIP à Casablanca.',
      bioAr: 'متخصص في العناية بالبشرة الرجالية، علاجات الشعر وتجهيز العرسان في الدار البيضاء.',
      specialtyFr: 'Soins Visage & Rituel Marié',
      specialtyAr: 'عناية بالبشرة وباقات العرسان',
      experienceYears: 8,
      image: haircutModelFadeImg,
    },
  ] as BarberItem[],

  // Section 11: Testimonials
  testimonialsBgImage: heroBarberTrimImg,
  testimonials: [
    {
      id: 'rev-1',
      quoteFr:
        "Ils ont immédiatement compris le style que je recherchais et le résultat est impeccable ! Le dégradé est fondu à la perfection et le rituel serviette chaude est un vrai moment de détente. De loin le meilleur barbier à Casablanca.",
      quoteAr:
        'فهموا الستايل الذي أبحث عنه منذ اللحظة الأولى والنتيجة كانت رائعة! التدريج متقن جداً وطقس الفوطة الساخنة يمنحك استرخاءً حقيقياً. أفضل صالون حلاقة في الدار البيضاء.',
      author: 'Amine Berrada',
      sourceFr: 'Instagram',
      sourceAr: 'إنستغرام',
      rating: 5,
    },
    {
      id: 'rev-2',
      quoteFr:
        "Une hygiène irréprochable, un accueil ponctuel sur rendez-vous WhatsApp et une maîtrise rare de la taille de barbe au coupe-chou. Youssef et Karim prennent vraiment le temps de soigner chaque détail.",
      quoteAr:
        'نظافة لا يعلى عليها، التزام تام بالمواعيد المحجوزة عبر واتساب وإتقان نادر لتحديد اللحية بالموس. يوسف وكريم يهتمان بأدق التفاصيل.',
      author: 'Omar Kabbaj',
      sourceFr: 'Google Avis',
      sourceAr: 'تقييمات جوجل',
      rating: 5,
    },
    {
      id: 'rev-3',
      quoteFr:
        "J'ai réservé le Rituel Royal Atlas avant mon mariage : coupe, barbe et soin du visage complet. Le cadre vintage est superbe et on en ressort totalement reposé et confiant. Je recommande à 100%.",
      quoteAr:
        'حجزت الباقة الملكية قبل حفل زفافي: قص شعر، لحية وتنظيف بشرة متكامل. الأجواء الكلاسيكية رائعة وتخرج من الصالون بإطلالة متكاملة.',
      author: 'Sami Chraïbi',
      sourceFr: 'Google Avis',
      sourceAr: 'تقييمات جوجل',
      rating: 5,
    },
  ] as TestimonialItem[],

  // Section 12: Blog Articles (6 Static Articles with Long-Tail SEO & Article JSON-LD)
  blogPosts: [
    {
      slug: 'combien-coute-une-coupe-degrade-a-casablanca',
      titleFr: 'Combien coûte une coupe dégradé à Casablanca en 2026 ?',
      titleAr: 'كم يبلغ سعر قصة التدريج في الدار البيضاء؟',
      dateFr: '12 Mai 2026',
      dateAr: '12 ماي 2026',
      isoDate: '2026-05-12',
      author: 'Youssef El Amrani',
      categoryFr: 'Tarifs & Conseils',
      categoryAr: 'الأسعار والنصائح',
      readTimeFr: '4 min de lecture',
      readTimeAr: '4 دقائق للقراءة',
      excerptFr:
        'Découvrez les tarifs moyens d’une coupe homme et d’un dégradé américain à Casablanca selon le quartier (Maarif, Gauthier, Anfa) et les critères d’un salon premium.',
      excerptAr:
        'تعرف على أسعار قص الشعر والتدريج الاحترافي في الدار البيضاء حسب الأحياء ومعايير اختيار الصالون المناسب.',
      image: heroBarberTrimImg,
      keywords: [
        'prix coupe dégradé casablanca',
        'tarif barbier casablanca maarif',
        'salon de coiffure homme casablanca prix',
      ],
      relatedPseoSlugs: [
        'barbier-maarif-casablanca',
        'coupe-degrade-gauthier-casablanca',
        'taille-de-barbe-anfa-casablanca',
      ],
      sectionsFr: [
        {
          heading: 'Les tarifs moyens d’un barbier à Casablanca en 2026',
          paragraphs: [
            "À Casablanca, le prix d'une coupe homme varie considérablement selon le niveau d'expertise, l'hygiène et les soins inclus. Dans un salon de quartier classique, une coupe rapide se situe entre 50 et 70 MAD, tandis qu'un barber shop spécialisé à Maarif, Gauthier ou Racine propose des prestations sur-mesure entre 100 MAD et 150 MAD.",
            "Chez Atelier Atlas, notre Coupe & Dégradé de Précision est affichée à 120 MAD. Ce tarif comprend le diagnostic visagiste, le travail aux ciseaux et à la tondeuse de précision, les finitions au rasoir à lame neuve, le shampoing purifiant ainsi que le coiffage avec des cires professionnelles.",
          ],
        },
        {
          heading: 'Pourquoi choisir un forfait Coupe + Barbe ?',
          paragraphs: [
            "Pour les hommes portant la barbe, la jonction entre les pattes du dégradé (Taper ou Skin Fade) et le dégradé de la barbe est l'élément clé d'un profil harmonieux. Opter pour un forfait Coupe + Barbe à 190 MAD permet d'économiser tout en bénéficiant du rituel de la serviette chaude.",
          ],
        },
      ],
      sectionsAr: [
        {
          heading: 'متوسط أسعار الحلاقة الرجالية في الدار البيضاء',
          paragraphs: [
            'تختلف أسعار قص الشعر الرجالي في الدار البيضاء حسب جودة الخدمات، مستوى التعقيم وخبرة الحلاق. في أتيلييه أطلس بالمعاريف، نقدم خدمة القص والتدريج الاحترافي بسعر 120 درهم شاملة التشخيص، الغسيل والتصفيف.',
          ],
        },
      ],
      faqFr: [
        {
          question: 'Quel est le prix d’une coupe + barbe chez Atelier Atlas ?',
          answer:
            'Le forfait Signature comprenant la coupe sur-mesure, la taille de barbe sculptée et le rituel serviette chaude est à 190 MAD.',
        },
        {
          question: 'Faut-il réserver à l’avance pour un vendredi ou samedi ?',
          answer:
            'Oui, nous recommandons de réserver votre créneau via notre formulaire WhatsApp au moins 24h à l’avance pour le week-end.',
        },
      ],
    },
    {
      slug: 'secrets-rasage-ancienne-serviette-chaude',
      titleFr: 'Pourquoi le rasage à la serviette chaude transforme votre peau ?',
      titleAr: 'لماذا يعتبر الحلاقة بالفوطة الساخنة الأفضل لبشرتك؟',
      dateFr: '24 Mai 2026',
      dateAr: '24 ماي 2026',
      isoDate: '2026-05-24',
      author: 'Karim Bennani',
      categoryFr: 'Rituel Barbe',
      categoryAr: 'طقوس اللحية',
      readTimeFr: '5 min de lecture',
      readTimeAr: '5 دقائق للقراءة',
      excerptFr:
        'Fini les irritations et les poils incarnés : découvrez les 5 étapes du rasage traditionnel au coupe-chou pratiqué par nos maîtres barbiers.',
      excerptAr:
        'وداعاً لتهيج البشرة: اكتشف مراحل الحلاقة التقليدية بالفوطة الساخنة والموس الاحترافي.',
      image: heroHotTowelImg,
      keywords: [
        'rasage serviette chaude casablanca',
        'rasage à l ancienne maroc',
        'soin barbe sans irritation',
      ],
      relatedPseoSlugs: [
        'rasage-ancienne-racine-casablanca',
        'taille-de-barbe-anfa-casablanca',
        'barbier-maarif-casablanca',
      ],
      sectionsFr: [
        {
          heading: 'L’action thermique de la vapeur chaude sur le poil',
          paragraphs: [
            "Le secret d'un rasage sans rougeur réside dans la préparation thermique. Une serviette chaude infusée aux huiles essentielles d'eucalyptus dilate les pores de l'épiderme et assouplit la kératine du poil de barbe jusqu'à 40%.",
            "Montée au blaireau traditionnel, la mousse riche enveloppe chaque follicule. Le passage du coupe-chou équipé d'une lame chirurgicale neuve glisse alors sans aucune traction sur la peau.",
          ],
        },
        {
          heading: 'La serviette froide et la pierre d’alun en finition',
          paragraphs: [
            "Après le rasage, l'application d'une compresse fraîche et d'une pierre d'alun naturelle du Maroc referme instantanément les pores et tonifie le visage avant le massage au baume hydratant.",
          ],
        },
      ],
      sectionsAr: [
        {
          heading: 'فوائد البخار الساخن قبل الحلاقة',
          paragraphs: [
            'تساعد الفوطة الساخنة الغنية بزيت الأوكاليبتوس على فتح المسام وتليين شعيرات اللحية، مما يضمن حلاقة ناعمة بالموس دون أي احمرار أو تهيج.',
          ],
        },
      ],
      faqFr: [
        {
          question: 'Combien de temps dure une séance de rasage à l’ancienne ?',
          answer: 'Comptez 30 minutes de détente absolue pour le rituel complet à 90 MAD.',
        },
      ],
    },
    {
      slug: 'quel-degrade-choisir-selon-forme-visage',
      titleFr: 'Quel dégradé choisir selon la forme de son visage ?',
      titleAr: 'كيف تختار قصة التدريج المناسبة لشكل وجهك؟',
      dateFr: '02 Juin 2026',
      dateAr: '02 يونيو 2026',
      isoDate: '2026-06-02',
      author: 'Youssef El Amrani',
      categoryFr: 'Style & Visagisme',
      categoryAr: 'ستايل وموضة',
      readTimeFr: '4 min de lecture',
      readTimeAr: '4 دقائق للقراءة',
      excerptFr:
        'Low Fade, Mid Fade, Taper ou coupe classique aux ciseaux : notre guide visagiste pour équilibrer les traits de votre visage.',
      excerptAr:
        'دليلك الشامل لاختيار التدريج المنخفض أو المتوسط أو القصة الكلاسيكية حسب ملامح وجهك.',
      image: barberTeamWorkImg,
      keywords: [
        'quel dégradé homme choisir',
        'taper fade vs skin fade casablanca',
        'coiffure homme visage rond ovale',
      ],
      relatedPseoSlugs: [
        'coupe-degrade-gauthier-casablanca',
        'barbier-maarif-casablanca',
        'forfait-mariage-barbier-casablanca',
      ],
      sectionsFr: [
        {
          heading: 'Visage rond ou carré : privilégier la hauteur et le Mid/High Fade',
          paragraphs: [
            "Si vous avez un visage rond, l'objectif est d'allonger visuellement la silhouette verticale. Un dégradé moyen à haut (Mid/High Skin Fade) associé à un volume structuré sur le dessus (Pompadour ou Crop texturé) affine immédiatement les joues.",
            "Pour un visage carré aux mâchoires prononcées, un Taper Fade net sur les tempes et la nuque conserve la masculinité des lignes tout en apportant une finition soignée pour le bureau.",
          ],
        },
        {
          heading: 'Visage allongé ou ovale : l’équilibre du Low Fade et des ciseaux',
          paragraphs: [
            "Les visages allongés gagnent à conserver une légère densité sur les côtés grâce à une coupe aux ciseaux ou un Low Drop Fade, évitant d'accentuer la longueur verticale.",
          ],
        },
      ],
      sectionsAr: [
        {
          heading: 'تناسق القصة مع ملامح الوجه',
          paragraphs: [
            'يتميز الوجه الدائري بحاجته لتدريج جانبي واضح مع كثافة علوية، بينما يناسب الوجه الطويل القص بالمقص أو التدريج المنخفض للحفاظ على التوازن.',
          ],
        },
      ],
      faqFr: [
        {
          question: 'Quelle est la fréquence idéale pour rafraîchir un Skin Fade ?',
          answer:
            'Pour conserver la netteté d’un dégradé à blanc, nous conseillons une visite toutes les 2 à 3 semaines.',
        },
      ],
    },
    {
      slug: 'comment-entretenir-sa-barbe-huile-argan-maroc',
      titleFr: 'Comment entretenir sa barbe au quotidien avec l’huile d’argan ?',
      titleAr: 'كيف تعتني بلحيتك يومياً باستخدام زيت الأركان المغربي؟',
      dateFr: '18 Juin 2026',
      dateAr: '18 يونيو 2026',
      isoDate: '2026-06-18',
      author: 'Mehdi Tazi',
      categoryFr: 'Entretien Barbe',
      categoryAr: 'العناية باللحية',
      readTimeFr: '5 min de lecture',
      readTimeAr: '5 دقائق للقراءة',
      excerptFr:
        'Brossage au poil de sanglier, hydratation à l’huile d’argan pure et maintien des contours : les conseils de nos barbiers.',
      excerptAr:
        'نصائح ذهبية لترطيب اللحية وتكثيفها والحفاظ على تحديدها بين مواعيد الحلاقة.',
      image: vintageBarberToolsImg,
      keywords: [
        'entretien barbe maroc',
        'huile à barbe argan casablanca',
        'tailler sa barbe barbier',
      ],
      relatedPseoSlugs: [
        'taille-de-barbe-anfa-casablanca',
        'rasage-ancienne-racine-casablanca',
        'soin-visage-homme-bourgogne-casablanca',
      ],
      sectionsFr: [
        {
          heading: 'Pourquoi la barbe devient-elle sèche et piquante ?',
          paragraphs: [
            "L'eau calcaire et les savons classiques éliminent le sébum naturel qui protège la peau sous la barbe, provoquant démangeaisons et pellicules de barbe. Utiliser un shampoing doux spécifique 2 à 3 fois par semaine est indispensable.",
            "Après la douche, sur poil légèrement humide, chauffez 3 à 4 gouttes d'huile d'argan cosmétique pressée à froid et de cèdre de l'Atlas entre vos paumes, puis massez jusqu'à la racine.",
          ],
        },
      ],
      sectionsAr: [
        {
          heading: 'الروتين اليومي للحية صحية وناعمة',
          paragraphs: [
            'استخدام شامبو مخصص للحية مع بضع قطرات من زيت الأركان الطبيعي بعد الاستحمام يمنح لحيتك لمعاناً صحياً ويمنع جفاف البشرة.',
          ],
        },
      ],
      faqFr: [
        {
          question: 'Quelle différence entre huile à barbe et baume à barbe ?',
          answer:
            'L’huile nourrit la peau et assouplit les barbes courtes à moyennes, tandis que le baume (enrichi en beurre de karité et cire) discipline et structure les barbes plus longues.',
        },
      ],
    },
    {
      slug: 'soin-visage-homme-casablanca-routine-complete',
      titleFr: 'Soin visage homme à Casablanca : pourquoi l’intégrer à votre coupe ?',
      titleAr: 'تنظيف البشرة للرجال في الدار البيضاء: فوائده ومراحله',
      dateFr: '29 Juin 2026',
      dateAr: '29 يونيو 2026',
      isoDate: '2026-06-29',
      author: 'Mehdi Tazi',
      categoryFr: 'Soin de la Peau',
      categoryAr: 'العناية بالبشرة',
      readTimeFr: '4 min de lecture',
      readTimeAr: '4 دقائق للقراءة',
      excerptFr:
        'Pollution urbaine, rasage fréquent et excès de sébum : découvrez comment un soin visage de 45 minutes redonne éclat et netteté.',
      excerptAr:
        'تخلص من إجهاد البشرة والرؤوس السوداء عبر جلسة تنظيف عميق مخصصة لبشرة الرجل.',
      image: haircutModelFadeImg,
      keywords: [
        'soin visage homme casablanca',
        'nettoyage de peau homme barbier',
        'masque charbon homme casablanca',
      ],
      relatedPseoSlugs: [
        'soin-visage-homme-bourgogne-casablanca',
        'forfait-mariage-barbier-casablanca',
        'barbier-maarif-casablanca',
      ],
      sectionsFr: [
        {
          heading: 'Les spécificités de la peau masculine en milieu urbain',
          paragraphs: [
            "Plus épaisse et plus riche en glandes sébacées, la peau masculine exposée au climat côtier et à la circulation de Casablanca accumule rapidement des impuretés sur la zone T (front, nez, menton).",
            "Notre soin visage à 150 MAD associe vapeur d'ozone, gommage doux, masque purifiant au charbon actif et hydratation anti-fatigue pour un teint immédiatement reposé.",
          ],
        },
      ],
      sectionsAr: [
        {
          heading: 'أهمية التنظيف العميق لبشرة الرجل',
          paragraphs: [
            'تتعرض بشرة الرجل يومياً للتلوث والحلاقة المتكررة، لذا فإن جلسة تنظيف بالبخار وقناع الفحم تعيد للبشرة نضارتها وتغلق المسام.',
          ],
        },
      ],
      faqFr: [
        {
          question: 'Peut-on faire un soin visage le même jour qu’un rasage ?',
          answer:
            'Absolument, nos barbiers adaptent l’ordre du protocole pour apaiser la peau après la lame.',
        },
      ],
    },
    {
      slug: 'forfait-mariage-homme-barbier-casablanca',
      titleFr: 'Futur marié à Casablanca : le planning grooming idéal avant le jour J',
      titleAr: 'تجهيز العريس في الدار البيضاء: البرنامج الكامل قبل يوم الزفاف',
      dateFr: '10 Juillet 2026',
      dateAr: '10 يوليوز 2026',
      isoDate: '2026-07-10',
      author: 'Youssef El Amrani',
      categoryFr: 'Événements & Mariage',
      categoryAr: 'مناسبات وأعراس',
      readTimeFr: '5 min de lecture',
      readTimeAr: '5 دقائق للقراءة',
      excerptFr:
        'Quand faire sa coupe, son soin visage et sa taille de barbe avant un mariage marocain ? Les conseils de notre salon pour des photos parfaites.',
      excerptAr:
        'متى يجب قص الشعر وتنظيف البشرة قبل حفل الزفاف؟ نصائح خبرائنا لإطلالة مثالية.',
      image: barberPortraitMasterImg,
      keywords: [
        'forfait marié barbier casablanca',
        'coiffeur homme mariage casablanca',
        'rituel royal barbier maroc',
      ],
      relatedPseoSlugs: [
        'forfait-mariage-barbier-casablanca',
        'soin-visage-homme-bourgogne-casablanca',
        'taille-de-barbe-anfa-casablanca',
      ],
      sectionsFr: [
        {
          heading: 'J-2 ou J-1 : le timing parfait pour une coupe naturelle sur les photos',
          paragraphs: [
            "Pour être impeccable lors de votre cérémonie à Casablanca, nous recommandons de programmer votre Rituel Royal Atlas (320 MAD, 90 minutes) à J-2 ou la veille au matin. Cela permet au dégradé et aux contours de barbe de se fondre naturellement tout en garantissant zéro rougeur cutanée.",
          ],
        },
      ],
      sectionsAr: [
        {
          heading: 'التوقيت المثالي لحلاقة العريس',
          paragraphs: [
            'ننصح بحجز الباقة الملكية قبل يوم أو يومين من حفل الزفاف لضمان هدوء البشرة وثبات القصة بشكل طبيعي في الصور.',
          ],
        },
      ],
      faqFr: [
        {
          question: 'Proposez-vous des réservations de groupe pour le marié et ses témoins ?',
          answer:
            'Oui, contactez-nous via WhatsApp pour privatiser nos 3 fauteuils pour le marié et ses proches.',
        },
      ],
    },
  ] as BlogPostItem[],

  // Programmatic SEO Pages (pSEO) - Services x Neighborhoods in Casablanca
  pSEOPages: [
    {
      slug: 'barbier-maarif-casablanca',
      titleFr: 'Barbier à Maarif Casablanca – Salon Coiffure Homme & Barbe | Atelier Atlas',
      titleAr: 'حلاق في المعاريف الدار البيضاء – صالون حلاقة رجالي | أتيلييه أطلس',
      metaDescriptionFr:
        'Vous cherchez le meilleur barbier à Maarif Casablanca ? Coupe dégradé (120 MAD), taille de barbe et serviette chaude au Bd Massira Al Khadra. Réservation WhatsApp.',
      neighborhood: 'Maarif',
      neighborhoodAr: 'المعاريف',
      serviceId: 'forfait-coupe-barbe',
      heroEyebrowFr: 'QUARTIER MAARIF · CASABLANCA',
      heroTitleFr: 'Votre Barbier Traditionnel au Cœur du Maarif',
      heroTitleAr: 'صالون الحلاقة الرجالي الأول في حي المعاريف',
      introFr:
        "Situé au 48 Boulevard Massira Al Khadra, à deux pas du Twin Center, Atelier Atlas accueille les gentlemen du quartier Maarif du lundi au samedi. Profitez d'un stationnement facile et d'une prise en charge ponctuelle sur rendez-vous WhatsApp.",
      introAr:
        'يقع أتيلييه أطلس في شارع المسيرة الخضراء على مقربة من توين سنتر بالمعاريف، ويستقبلكم من الإثنين إلى السبت بحجز مسبق عبر واتساب.',
      highlightsFr: [
        'À 3 minutes à pied du Twin Center et de la rue Normandie',
        'Forfait Coupe + Barbe + Serviette chaude à 190 MAD',
        'Stérilisation médicale autoclave et produits bio marocains',
      ],
      highlightsAr: [
        'على بعد 3 دقائق من توين سنتر بالمعاريف',
        'باقة قص الشعر + اللحية + الفوطة الساخنة بـ 190 درهم',
        'تعقيم طبي شامل للأدوات بعد كل زبون',
      ],
      landmarksFr: 'Twin Center, Boulevard Massira Al Khadra, Rue Jura, Quartier Maarif',
      faqFr: [
        {
          question: 'Où se garer près du salon au Maarif ?',
          answer:
            'Un parking gardienné est disponible juste en face du 48 Bd Massira Al Khadra ainsi que dans les rues adjacentes.',
        },
        {
          question: 'Puis-je réserver un créneau entre midi et deux au Maarif ?',
          answer:
            'Oui, nous sommes ouverts en continu de 09h00 à 20h00 et respectons scrupuleusement votre horaire de rendez-vous.',
        },
      ],
    },
    {
      slug: 'coupe-degrade-gauthier-casablanca',
      titleFr: 'Coupe Dégradé Homme près de Gauthier Casablanca | Atelier Atlas',
      titleAr: 'قص الشعر والتدريج قرب حي غوتييه الدار البيضاء | أتيلييه أطلس',
      metaDescriptionFr:
        'Spécialiste du Skin Fade, Taper Fade et coupe aux ciseaux à 5 minutes du quartier Gauthier Casablanca. Tarif 120 MAD, réservation immédiate sur WhatsApp.',
      neighborhood: 'Gauthier',
      neighborhoodAr: 'غوتييه',
      serviceId: 'coupe-homme',
      heroEyebrowFr: 'GAUTHIER & CENTRE-VILLE · CASABLANCA',
      heroTitleFr: 'Coupe Homme & Dégradé Sur-Mesure près de Gauthier',
      heroTitleAr: 'قص الشعر وتدريج احترافي بالقرب من حي غوتييه',
      introFr:
        "Les cadres et résidents du quartier Gauthier choisissent Atelier Atlas pour la précision de ses coupes aux ciseaux et ses dégradés fondus (Low Fade, Taper, Executive Contour). Réservez votre créneau en 30 secondes via WhatsApp.",
      introAr:
        'يختار سكان حي غوتييه صالون أتيلييه أطلس لدقة القص بالمقص والتدريج الاحترافي بدون انتظار بفضل الحجز المسبق.',
      highlightsFr: [
        'Diagnostic morphologique personnalisé avant chaque coupe',
        'Shampoing purifiant et massage crânien inclus dans la coupe à 120 MAD',
        'À seulement 5 minutes de Gauthier et du Parc de la Ligue Arabe',
      ],
      highlightsAr: [
        'تشخيص لشكل الوجه قبل كل قصة',
        'غسيل الشعر وتدليك الرأس مشمول في سعر القصة 120 درهم',
        'على بعد 5 دقائق فقط من حي غوتييه وحديقة الجامعة العربية',
      ],
      landmarksFr: 'Quartier Gauthier, Boulevard Moulay Youssef, Parc de la Ligue Arabe',
      faqFr: [
        {
          question: 'Combien de temps dure la prestation Coupe Homme ?',
          answer:
            'Chaque séance dure 40 minutes pour garantir des finitions irréprochables aux ciseaux et au rasoir.',
        },
      ],
    },
    {
      slug: 'taille-de-barbe-anfa-casablanca',
      titleFr: 'Taille de Barbe & Soin Barbe Anfa Casablanca | Atelier Atlas',
      titleAr: 'تحديد اللحية والعناية بها في أنفا الدار البيضاء | أتيلييه أطلس',
      metaDescriptionFr:
        'Restructuration de barbe, contours au coupe-chou et soin à l’huile d’argan pour les résidents d’Anfa et Ain Diab à Casablanca. Réservez sur WhatsApp.',
      neighborhood: 'Anfa',
      neighborhoodAr: 'أنفا',
      serviceId: 'rasage-ancienne',
      heroEyebrowFr: 'ANFA & CORNICHES · CASABLANCA',
      heroTitleFr: 'Taille de Barbe Sculptée & Soin Argan – Secteur Anfa',
      heroTitleAr: 'تحديد اللحية وعناية بزيت الأركان – أنفا الدار البيضاء',
      introFr:
        "Que vous portiez une barbe de 3 jours ou une barbe longue structurée, nos maîtres barbiers dessinent vos lignes de joues et d'encolure avec une symétrie parfaite, suivie d'un rituel vapeur apaisant.",
      introAr:
        'سواء كنت تفضل لحية خفيفة أو طويلة، يقوم خبراؤنا برسم وتحديد اللحية بتناسق مثالي مع جلسة بخار مريحة.',
      highlightsFr: [
        'Traçage précis au coupe-chou à lame chirurgicale unique',
        'Hydratation profonde à l’huile d’argan bio et baume au cèdre',
        'Tarif Rasage & Rituel Barbe : 90 MAD (30 minutes)',
      ],
      highlightsAr: [
        'تحديد دقيق بالموس ذي الشفرة المعقمة',
        'ترطيب عميق بزيت الأركان الطبيعي وبلسم خشب الأرز',
        'سعر جلسة اللحية والفوطة الساخنة: 90 درهم',
      ],
      landmarksFr: 'Anfa Supérieur, Boulevard d’Anfa, Ain Diab, Racine',
      faqFr: [
        {
          question: 'Utilisez-vous des produits naturels pour la barbe ?',
          answer:
            'Oui, toutes nos huiles et baumes sont formulés à base d’huile d’argan certifiée et d’extraits naturels du Maroc.',
        },
      ],
    },
    {
      slug: 'rasage-ancienne-racine-casablanca',
      titleFr: 'Rasage à l’Ancienne Serviette Chaude Racine Casablanca | Atelier Atlas',
      titleAr: 'حلاقة تقليدية بالفوطة الساخنة في راسين الدار البيضاء | أتيلييه أطلس',
      metaDescriptionFr:
        'Redécouvrez le vrai rasage traditionnel au blaireau et serviette chaude près du quartier Racine à Casablanca. 90 MAD, sans irritation.',
      neighborhood: 'Racine',
      neighborhoodAr: 'راسين',
      serviceId: 'rasage-ancienne',
      heroEyebrowFr: 'QUARTIER RACINE · CASABLANCA',
      heroTitleFr: 'Le Rituel du Rasage à l’Ancienne près de Racine',
      heroTitleAr: 'طقس الحلاقة التقليدية بالفوطة الساخنة قرب حي راسين',
      introFr:
        "À quelques centaines de mètres du quartier Racine, offrez-vous une parenthèse de calme. Vapeur chaude, mousse montée au blaireau, double passage au coupe-chou et compresse fraîche.",
      introAr:
        'على مقربة من حي راسين، استمتع بلحظة استرخاء فريدة مع الحلاقة التقليدية بالفوطة الساخنة والرغوة الدافئة.',
      highlightsFr: [
        'Protocole en 5 étapes garantissant zéro feu du rasoir',
        'Serviettes chaudes infusées à l’eucalyptus naturel',
        'Idéal avant une réunion importante ou un événement',
      ],
      highlightsAr: [
        'بروتوكول من 5 مراحل يضمن عدم تهيج البشرة',
        'فوط ساخنة معطرة بالأوكاليبتوس الطبيعي',
        'مثالي قبل الاجتماعات والمناسبات الهامة',
      ],
      landmarksFr: 'Quartier Racine, Boulevard Al Massira, Triangle d’Or Casablanca',
      faqFr: [
        {
          question: 'Ce soin convient-il aux peaux sensibles ?',
          answer:
            'Oui, la préparation à la vapeur chaude et le baume apaisant sans alcool sont spécialement pensés pour les peaux réactives.',
        },
      ],
    },
    {
      slug: 'soin-visage-homme-bourgogne-casablanca',
      titleFr: 'Soin Visage Homme & Nettoyage de Peau Bourgogne Casablanca | Atelier Atlas',
      titleAr: 'تنظيف البشرة للرجال قرب بورغون الدار البيضاء | أتيلييه أطلس',
      metaDescriptionFr:
        'Soin visage complet pour homme (vapeur, gommage, masque noir charbon, hydratation) à 150 MAD près de Bourgogne Casablanca. Réservez sur WhatsApp.',
      neighborhood: 'Bourgogne',
      neighborhoodAr: 'بورغون',
      serviceId: 'soin-visage',
      heroEyebrowFr: 'BOURGOGNE & CORNICHE · CASABLANCA',
      heroTitleFr: 'Soin Visage Purifiant pour Homme – Secteur Bourgogne',
      heroTitleAr: 'تنظيف عميق للبشرة الرجالية – قطاع بورغون',
      introFr:
        "Purifiez votre peau en profondeur grâce à notre protocole dermatologique masculin de 45 minutes. Élimination des points noirs, masque au charbon actif et massage relaxant du visage.",
      introAr:
        'نظف بشرتك بعمق عبر جلسة متكاملة لمدة 45 دقيقة تشمل البخار، إزالة الرؤوس السوداء، قناع الفحم وتدليك الوجه.',
      highlightsFr: [
        'Nettoyage profond à la vapeur d’ozone et extraction douce',
        'Masque peel-off au charbon actif et argile du Maroc',
        'Tarif Soin Visage Complet : 150 MAD (45 minutes)',
      ],
      highlightsAr: [
        'تنظيف عميق ببخار الأوزون وتقشير لطيف',
        'قناع الفحم النشط والطين المغربي الطبيعي',
        'سعر جلسة تنظيف البشرة الشاملة: 150 درهم',
      ],
      landmarksFr: 'Quartier Bourgogne, Boulevard Mehdi Benbarka, El Hank',
      faqFr: [
        {
          question: 'À quelle fréquence réaliser un soin visage homme ?',
          answer:
            'Une séance par mois suffit pour maintenir une peau nette, matifiée et sans pores obstrués.',
        },
      ],
    },
    {
      slug: 'forfait-mariage-barbier-casablanca',
      titleFr: 'Forfait Marié Barbier Casablanca – Rituel Royal Homme | Atelier Atlas',
      titleAr: 'باقة العريس للحلاقة في الدار البيضاء – الطقس الملكي | أتيلييه أطلس',
      metaDescriptionFr:
        'Préparez votre mariage à Casablanca avec le Rituel Royal Atlas (320 MAD) : coupe sur-mesure, barbe sculptée, soin visage éclat et massage crânien.',
      neighborhood: 'Casablanca (Tous quartiers)',
      neighborhoodAr: 'الدار البيضاء',
      serviceId: 'forfait-royal-atlas',
      heroEyebrowFr: 'SPÉCIAL FUTUR MARIÉ & VIP · CASABLANCA',
      heroTitleFr: 'Le Rituel Royal Atlas pour Votre Mariage à Casablanca',
      heroTitleAr: 'الطقس الملكي الشامل لتجهيز العريس في الدار البيضاء',
      introFr:
        "Pour le plus beau jour de votre vie, ne laissez rien au hasard. Notre forfait de 90 minutes combine coupe visagiste, restructuration de barbe à la serviette chaude, soin visage coup d'éclat et massage relaxant.",
      introAr:
        'في ليلة العمر، نقدم لك برنامج عناية متكامل لمدة 90 دقيقة يجمع بين القصة الاحترافية، تحديد اللحية، تنظيف البشرة والتدليك.',
      highlightsFr: [
        'Séance complète de 90 minutes avec nos maîtres barbiers seniors',
        'Possibilité de venir accompagné de vos témoins sur réservation',
        'Tarif tout compris : 320 MAD sans aucun supplément',
      ],
      highlightsAr: [
        'جلسة شاملة لمدة 90 دقيقة مع أمهر الحلاقين',
        'إمكانية الحجز للعريس ومرافقيه في نفس الوقت',
        'سعر الباقة الشاملة: 320 درهم فقط',
      ],
      landmarksFr: 'Maarif, Anfa, Californie, CIL, Ain Diab, Casablanca',
      faqFr: [
        {
          question: 'Comment réserver le forfait marié sur WhatsApp ?',
          answer:
            'Sélectionnez "Rituel Royal Atlas" dans notre formulaire de rendez-vous et indiquez la date de votre cérémonie en note.',
        },
      ],
    },
  ] as PseoPageItem[],
};
