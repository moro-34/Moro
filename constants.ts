import { Car, CarType, FuelType, Transmission, Language } from './types';

export const CARS: Car[] = [
  {
    id: '1',
    make: 'BMW',
    model: 'X5 xDrive40i',
    year: 2023,
    price: 78500,
    mileage: 12000,
    fuelType: FuelType.PETROL,
    transmission: Transmission.AUTOMATIC,
    type: CarType.SUV,
    power: 335,
    description: 'Luxury SUV with premium leather interior, panoramic sunroof, and advanced driver assistance systems. Perfect for families who value comfort and performance.',
    imageUrl: 'https://picsum.photos/seed/bmwx5/800/600',
    imageUrls: [
      'https://picsum.photos/seed/bmwx5/800/600',
      'https://picsum.photos/seed/bmwx5interior/800/600',
      'https://picsum.photos/seed/bmwx5rear/800/600'
    ],
    location: 'Munich, Germany'
  },
  {
    id: '2',
    make: 'Mercedes-Benz',
    model: 'C-Class C300',
    year: 2022,
    price: 45000,
    mileage: 25000,
    fuelType: FuelType.HYBRID,
    transmission: Transmission.AUTOMATIC,
    type: CarType.SEDAN,
    power: 255,
    description: 'Elegant sedan featuring the latest MBUX infotainment system, ambient lighting, and efficient hybrid technology.',
    imageUrl: 'https://picsum.photos/seed/merc300/800/600',
    location: 'Berlin, Germany'
  },
  {
    id: '3',
    make: 'Audi',
    model: 'RS e-tron GT',
    year: 2024,
    price: 145000,
    mileage: 1500,
    fuelType: FuelType.ELECTRIC,
    transmission: Transmission.AUTOMATIC,
    type: CarType.ELECTRIC,
    power: 637,
    description: 'High-performance electric grand tourer. Stunning design, incredible acceleration, and sustainable luxury materials.',
    imageUrl: 'https://picsum.photos/seed/audietron/800/600',
    imageUrls: [
      'https://picsum.photos/seed/audietron/800/600',
      'https://picsum.photos/seed/audietron2/800/600',
      'https://picsum.photos/seed/audietron3/800/600'
    ],
    location: 'Hamburg, Germany'
  },
  {
    id: '4',
    make: 'Volkswagen',
    model: 'Golf GTI',
    year: 2021,
    price: 29900,
    mileage: 45000,
    fuelType: FuelType.PETROL,
    transmission: Transmission.MANUAL,
    type: CarType.HATCHBACK,
    power: 241,
    description: 'The iconic hot hatch. Fun to drive, practical for daily use, and equipped with the classic tartan seats.',
    imageUrl: 'https://picsum.photos/seed/golfgti/800/600',
    location: 'Frankfurt, Germany'
  },
  {
    id: '5',
    make: 'Porsche',
    model: '911 Carrera S',
    year: 2020,
    price: 115000,
    mileage: 18000,
    fuelType: FuelType.PETROL,
    transmission: Transmission.AUTOMATIC,
    type: CarType.COUPE,
    power: 443,
    description: 'The quintessential sports car. Timeless design, razor-sharp handling, and a flat-six engine that sings.',
    imageUrl: 'https://picsum.photos/seed/porsche911/800/600',
    imageUrls: [
      'https://picsum.photos/seed/porsche911/800/600',
      'https://picsum.photos/seed/porsche911side/800/600',
      'https://picsum.photos/seed/porsche911interior/800/600',
      'https://picsum.photos/seed/porsche911rear/800/600'
    ],
    location: 'Stuttgart, Germany'
  },
  {
    id: '6',
    make: 'Tesla',
    model: 'Model Y Long Range',
    year: 2023,
    price: 52000,
    mileage: 8000,
    fuelType: FuelType.ELECTRIC,
    transmission: Transmission.AUTOMATIC,
    type: CarType.SUV,
    power: 384,
    description: 'Versatile electric SUV with autopilot capabilities, massive cargo space, and minimal maintenance requirements.',
    imageUrl: 'https://picsum.photos/seed/modely/800/600',
    location: 'Amsterdam, Netherlands'
  },
   {
    id: '7',
    make: 'Land Rover',
    model: 'Defender 110',
    year: 2022,
    price: 82000,
    mileage: 32000,
    fuelType: FuelType.DIESEL,
    transmission: Transmission.AUTOMATIC,
    type: CarType.SUV,
    power: 296,
    description: 'Unstoppable off-road capability meets modern luxury. Rugged design and spacious interior for adventures.',
    imageUrl: 'https://picsum.photos/seed/defender/800/600',
    imageUrls: [
      'https://picsum.photos/seed/defender/800/600',
      'https://picsum.photos/seed/defendermud/800/600'
    ],
    location: 'Paris, France'
  },
  {
    id: '8',
    make: 'Mazda',
    model: 'MX-5 Miata',
    year: 2019,
    price: 22000,
    mileage: 55000,
    fuelType: FuelType.PETROL,
    transmission: Transmission.MANUAL,
    type: CarType.CONVERTIBLE,
    power: 181,
    description: 'Pure driving joy. Lightweight, open-top, and responsive. The perfect weekend cruiser.',
    imageUrl: 'https://picsum.photos/seed/mx5/800/600',
    location: 'Rome, Italy'
  }
];

export const TRANSLATIONS: Record<Language, any> = {
  en: {
    nav: { buy: 'Buy', sell: 'Sell', services: 'Services', magazine: 'Magazine', login: 'Log In' },
    hero: { 
      title1: 'Find the car that', 
      title2: 'matches your life.', 
      subtitle: "Europe's smartest online car market. Verified dealers, AI-powered insights, and transparent pricing.",
      searchPlaceholder: "e.g., BMW X5, Electric...",
      searchBtn: "Search",
      featured: "Featured Vehicles",
      justAdded: "Hand-picked selections just added today.",
      viewAll: "View all"
    },
    filters: { 
      title: "Filters", 
      reset: "Reset all", 
      body: "Body Type", 
      fuel: "Fuel Type", 
      trans: "Transmission", 
      show: "Show Results", 
      allTypes: "All Types", 
      any: "Any" 
    },
    results: { available: "Cars Available", noResults: "No cars found", tryAdjust: "Try adjusting your filters or search terms.", clear: "Clear all filters" },
    card: { price: "Cash Price", km: "km", hp: "hp" },
    details: { 
      back: "Back to Inventory", 
      aiBadge: "AI Insight", 
      aiLoading: "Analyzing vehicle data...", 
      desc: "Description", 
      year: "Year", 
      mileage: "Mileage", 
      gearbox: "Gearbox", 
      fuel: "Fuel", 
      location: "Location", 
      phone: "Show Phone Number", 
      email: "Send Email", 
      save: "Save", 
      share: "Share", 
      seller: "Premium Motors GmbH" 
    },
    chat: { 
      placeholder: "Ask about cars...", 
      greeting: "Hi! I'm AutoBot. How can I help you find your perfect car today?", 
      error: "Sorry, I lost connection. Please try again.",
      botName: "AutoBot Assistant",
      online: "Online"
    },
    footer: {
      desc: "The modern way to buy and sell cars. Transparent, fast, and AI-assisted.",
      buy: "Buy",
      company: "Company",
      legal: "Legal"
    }
  },
  fr: {
    nav: { buy: 'Acheter', sell: 'Vendre', services: 'Services', magazine: 'Magazine', login: 'Connexion' },
    hero: { 
      title1: 'Trouvez la voiture qui', 
      title2: 'correspond à votre vie.', 
      subtitle: "Le marché automobile en ligne le plus intelligent d'Europe. Concessionnaires vérifiés, intelligence artificielle et prix transparents.",
      searchPlaceholder: "ex: BMW X5, Électrique...",
      searchBtn: "Rechercher",
      featured: "Véhicules en vedette",
      justAdded: "Sélections triées sur le volet ajoutées aujourd'hui.",
      viewAll: "Tout voir"
    },
    filters: { 
      title: "Filtres", 
      reset: "Réinitialiser", 
      body: "Carrosserie", 
      fuel: "Carburant", 
      trans: "Transmission", 
      show: "Afficher", 
      allTypes: "Tous types", 
      any: "Peu importe" 
    },
    results: { available: "Voitures disponibles", noResults: "Aucune voiture trouvée", tryAdjust: "Essayez d'ajuster vos filtres.", clear: "Effacer les filtres" },
    card: { price: "Prix comptant", km: "km", hp: "ch" },
    details: { 
      back: "Retour à l'inventaire", 
      aiBadge: "Aperçu IA", 
      aiLoading: "Analyse des données...", 
      desc: "Description", 
      year: "Année", 
      mileage: "Kilométrage", 
      gearbox: "Boîte", 
      fuel: "Carburant", 
      location: "Emplacement", 
      phone: "Afficher le numéro", 
      email: "Envoyer un email", 
      save: "Enregistrer", 
      share: "Partager", 
      seller: "Premium Motors GmbH" 
    },
    chat: { 
      placeholder: "Posez une question...", 
      greeting: "Bonjour ! Je suis AutoBot. Comment puis-je vous aider à trouver votre voiture ?", 
      error: "Désolé, j'ai perdu la connexion.",
      botName: "Assistant AutoBot",
      online: "En ligne"
    },
    footer: {
      desc: "La façon moderne d'acheter et de vendre des voitures. Transparent, rapide et assisté par IA.",
      buy: "Acheter",
      company: "Entreprise",
      legal: "Légal"
    }
  },
  ar: {
    nav: { buy: 'شراء', sell: 'بيع', services: 'خدمات', magazine: 'المجلة', login: 'دخول' },
    hero: { 
      title1: 'اعثر على السيارة التي', 
      title2: 'تناسب حياتك.', 
      subtitle: "أذكى سوق للسيارات عبر الإنترنت في أوروبا. وكلاء موثوقون، ورؤى مدعومة بالذكاء الاصطناعي، وأسعار شفافة.",
      searchPlaceholder: "مثال: BMW X5، كهربائية...",
      searchBtn: "بحث",
      featured: "سيارات مميزة",
      justAdded: "مختارات مميزة أضيفت اليوم.",
      viewAll: "عرض الكل"
    },
    filters: { 
      title: "تصفية", 
      reset: "إعادة تعيين", 
      body: "نوع الهيكل", 
      fuel: "نوع الوقود", 
      trans: "ناقل الحركة", 
      show: "عرض النتائج", 
      allTypes: "كل الأنواع", 
      any: "أي" 
    },
    results: { available: "سيارة متاحة", noResults: "لم يتم العثور على سيارات", tryAdjust: "جرب تعديل خيارات البحث.", clear: "مسح المرشحات" },
    card: { price: "السعر النقدي", km: "كم", hp: "حصان" },
    details: { 
      back: "العودة للمخزون", 
      aiBadge: "تحليل الذكاء الاصطناعي", 
      aiLoading: "جاري تحليل البيانات...", 
      desc: "الوصف", 
      year: "السنة", 
      mileage: "المسافة المقطوعة", 
      gearbox: "ناقل الحركة", 
      fuel: "الوقود", 
      location: "الموقع", 
      phone: "إظهار رقم الهاتف", 
      email: "إرسال بريد إلكتروني", 
      save: "حفظ", 
      share: "مشاركة", 
      seller: "بريميوم موتورز" 
    },
    chat: { 
      placeholder: "اسأل عن السيارات...", 
      greeting: "مرحباً! أنا AutoBot. كيف يمكنني مساعدتك في العثور على سيارتك المثالية اليوم؟", 
      error: "عذراً، فقدت الاتصال. يرجى المحاولة مرة أخرى.",
      botName: "مساعد AutoBot",
      online: "متصل"
    },
    footer: {
      desc: "الطريقة الحديثة لبيع وشراء السيارات. شفافية، سرعة، ومساعدة ذكية.",
      buy: "شراء",
      company: "الشركة",
      legal: "قانوني"
    }
  }
};
