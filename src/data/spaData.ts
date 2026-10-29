export interface Branch {
  id: string;
  name: string;
  shortName: string;
  district: string;
  address: string;
  landmark: string;
  city: string;
  country: string;
  phone: string;
  whatsapp: string;
  whatsappMessage: string;
  rating: number;
  reviewCount: number;
  hours: string;
  opens: string;
  closes: string;
  image: string;
  gallery: string[];
  features: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
  badge?: string;
  description: string;
}

export interface Treatment {
  id: string;
  title: string;
  titleAr?: string;
  category: "massage" | "bath" | "hydrotherapy" | "grooming" | "specialty";
  categoryLabel: string;
  duration: string;
  durationsAvailable: string[];
  priceQAR: number;
  priceNote?: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  includes: string[];
  recommendedFor: string;
  popular?: boolean;
}

export interface Therapist {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  origin: string;
  languages: string[];
  rating: number;
  specialties: string[];
  bio: string;
  avatar: string;
  branches: string[];
}

export interface Review {
  id: string;
  author: string;
  location: string;
  branch: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  type: "image" | "video";
  title: string;
  category: "all" | "suites" | "hammam" | "treatments" | "ambiance";
  thumbnail: string;
  src: string;
  videoUrl?: string;
  description: string;
}

export const SPA_INFO = {
  name: "Just Relax Spa",
  arabicName: "جيست ريلاكس سبا",
  tagline: "Ultra-Luxury Men's Spa & Wellness Sanctuary",
  locationOverview: "Jouri Murwab Hotel, West Bay & The Pearl — Doha, Qatar",
  phone: "+974 4004 1000",
  whatsapp: "+974 5588 3421",
  email: "concierge@justrelaxspa.qa",
  openingHours: "Daily 10:00 AM – 3:00 AM",
  currency: "QAR",
  commercialLicense: "CR No. 184920 / MOCI Qatar",
  googleRating: "4.95",
  totalReviews: "1,200+",
  activeOffer: {
    title: "Golden Hours Privilege: 25% Off",
    description: "Enjoy 25% privilege discount across all ritual treatments. Daily 11:00 AM to 5:00 PM.",
    opens: "11:00",
    closes: "17:00",
    discountPercent: 25,
  },
};

export interface PriceListItem {
  id: string;
  nameEn: string;
  nameAr: string;
  duration?: string;
  priceQAR: number;
  popular?: boolean;
}

export const OFFICIAL_PRICE_LIST: PriceListItem[] = [
  {
    id: "body-scrub",
    nameEn: "Body Scrub",
    nameAr: "مقشر الجسم",
    duration: "45-60 Min",
    priceQAR: 500,
    popular: true,
  },
  {
    id: "moroccan-bath",
    nameEn: "Moroccan Bath",
    nameAr: "حمام مغربي",
    duration: "60 Min",
    priceQAR: 500,
    popular: true,
  },
  {
    id: "foot-massage",
    nameEn: "Foot Massage",
    nameAr: "تدليك القدم",
    duration: "30-45 Min",
    priceQAR: 200,
    popular: false,
  },
  {
    id: "massage-60",
    nameEn: "Full Body Massage (60 Min)",
    nameAr: "مساج 60 دقيقة",
    duration: "60 Min",
    priceQAR: 400,
    popular: true,
  },
  {
    id: "massage-45",
    nameEn: "Full Body Massage (45 Min)",
    nameAr: "مساج 45 دقيقة",
    duration: "45 Min",
    priceQAR: 350,
    popular: false,
  },
];

export const BRANCHES: Branch[] = [
  {
    id: "jouri-hotel",
    name: "Just Relax Spa – Jouri, a Murwab Hotel",
    shortName: "Jouri Murwab Hotel",
    district: "Al Muthaf St, Old Salata / Corniche",
    address: "Al Muthaf Street, Street 137, Building 31, Zone 18, Doha, Qatar",
    landmark: "Jouri, a Murwab Hotel (7GPW+V2F), near National Museum of Qatar & Corniche",
    city: "Doha",
    country: "Qatar",
    phone: "+974 4004 1000",
    whatsapp: "+974 5588 3421",
    whatsappMessage: "Hello Just Relax Spa Jouri Hotel! I would like to book a treatment.",
    rating: 4.96,
    reviewCount: 740,
    hours: "10:00 AM – 3:00 AM Daily",
    opens: "10:00",
    closes: "03:00",
    image: "/assets/just-relax/branches/jouri-hotel/jouri-hotel-hero.jpg",
    gallery: [
      "/assets/just-relax/branches/jouri-hotel/jouri-hotel-hero.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-moroccan-bath.jpg",
      "/assets/just-relax/branches/the-pearl/the-pearl-turkish-hammam.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-massage-suite.jpg",
      "/assets/just-relax/branches/the-pearl/the-pearl-lounge.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-jacuzzi.jpg",
    ],
    features: [
      "Inside 4-Star Jouri, a Murwab Hotel",
      "Traditional Moroccan Bath & Steam",
      "Heated Hammam & Jacuzzi",
      "Private Soundproof Suites",
      "Hotel Valet & Dedicated Parking",
      "Minutes from National Museum & Souq Waqif",
    ],
    coordinates: {
      lat: 25.2892,
      lng: 51.5434,
    },
    googleMapsUrl: "https://maps.google.com/?q=Jouri+a+Murwab+Hotel+Doha+Qatar",
    badge: "Flagship Hotel Sanctuary",
    description: "Located within the four-star Jouri, a Murwab Hotel along Al Muthaf Street in Old Salata, this premier sanctuary combines five-star hotel luxury, Moroccan bath rituals, and certified therapeutic massage.",
  },
  {
    id: "west-bay",
    name: "Just Relax Spa – West Bay Diplomatic Suite",
    shortName: "West Bay Branch",
    district: "Diplomatic District, West Bay",
    address: "Tower 1, Diplomatic Area, West Bay, Doha, Qatar",
    landmark: "Adjacent to Four Seasons & Corniche Promenade",
    city: "Doha",
    country: "Qatar",
    phone: "+974 4492 8888",
    whatsapp: "+974 5588 3421",
    whatsappMessage: "Hello Just Relax Spa, I would like to book a ritual at the West Bay Branch.",
    rating: 4.95,
    reviewCount: 520,
    hours: "10:00 AM – 3:00 AM Daily",
    opens: "10:00",
    closes: "03:00",
    image: "/assets/just-relax/branches/west-bay/west-bay-hero.jpg",
    gallery: [
      "/assets/just-relax/branches/west-bay/west-bay-hero.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-massage-suite.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-moroccan-bath.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-jacuzzi.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-relaxation.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-amenities.jpg",
    ],
    features: [
      "Private Soundproof Suites",
      "Panoramic Skyline Views",
      "Hydrotherapy Jacuzzi",
      "VIP Private Shower & Dressing",
      "Complimentary Valet Parking",
      "Moroccan Mint Tea & Dates",
    ],
    coordinates: {
      lat: 25.3216,
      lng: 51.5312,
    },
    googleMapsUrl: "https://maps.google.com/?q=West+Bay+Doha+Qatar",
    badge: "Executive Favorite",
    description: "Nestled in the prestigious diplomatic quarter of Doha, our West Bay branch offers executives, diplomats, and gentlemen an elite, private haven designed for total muscular recovery, stress detox, and peaceful quietude.",
  },
  {
    id: "the-pearl",
    name: "Just Relax Spa – The Pearl-Qatar & Lusail Marina",
    shortName: "The Pearl Branch",
    district: "Porto Arabia, The Pearl",
    address: "Porto Arabia Marina Boardwalk, Tower 12, The Pearl-Qatar, Doha",
    landmark: "Direct Marina Walkway access, minutes from Lusail",
    city: "Doha",
    country: "Qatar",
    phone: "+974 4495 7777",
    whatsapp: "+974 5588 7799",
    whatsappMessage: "Hello Just Relax Spa, I would like to reserve a Moroccan bath / treatment at The Pearl Branch.",
    rating: 4.93,
    reviewCount: 630,
    hours: "10:00 AM – 3:00 AM Daily",
    opens: "10:00",
    closes: "03:00",
    image: "/assets/just-relax/branches/the-pearl/the-pearl-hero.jpg",
    gallery: [
      "/assets/just-relax/branches/the-pearl/the-pearl-hero.jpg",
      "/assets/just-relax/branches/the-pearl/the-pearl-turkish-hammam.jpg",
      "/assets/just-relax/branches/the-pearl/the-pearl-hydrotherapy.jpg",
      "/assets/just-relax/branches/the-pearl/the-pearl-couples-suite.jpg",
      "/assets/just-relax/branches/the-pearl/the-pearl-steam-room.jpg",
      "/assets/just-relax/branches/the-pearl/the-pearl-lounge.jpg",
    ],
    features: [
      "Authentic Heated Marble Hammam",
      "Moroccan Steam Chambers",
      "Volcanic Hot Stone Suite",
      "Dead Sea Salt Jacuzzi",
      "VIP Private Lounges",
      "Private Yacht Concierge Booking",
    ],
    coordinates: {
      lat: 25.3678,
      lng: 51.5517,
    },
    googleMapsUrl: "https://maps.google.com/?q=The+Pearl+Qatar+Doha",
    badge: "Royal Hammam Sanctuary",
    description: "Located right on the tranquil Porto Arabia marina promenade, this signature facility houses our authentic heated marble Turkish Hammam and Royal Moroccan Bath suites, pairing centuries-old bathing artistry with five-star luxury.",
  },
];

export const TREATMENTS: Treatment[] = [
  {
    id: "moroccan-bath",
    title: "Royal Moroccan Bath Experience",
    titleAr: "حمام مغربي ملكي فاخر",
    category: "bath",
    categoryLabel: "Moroccan Rituals",
    duration: "60 min",
    durationsAvailable: ["60 min", "75 min", "90 min"],
    priceQAR: 500,
    image: "/assets/just-relax/treatments/royal-moroccan.jpg",
    shortDescription: "Centuries-old cleansing ritual inside our warm steam chambers using organic eucalyptus black soap and authentic Kessa glove exfoliation.",
    fullDescription: "Our signature Royal Moroccan Bath is performed in a private, heated aromatic steam chamber by master Moroccan bath artisans. It begins with application of traditional Beldi olive black soap infused with eucalyptus, softening the epidermis. Gentle and rigorous Kessa exfoliation removes all dead skin cells, followed by a purifying Atlas ghassoul clay wrap, finished with organic rose water mist and soothing argan oil nourishment.",
    benefits: ["Deeply purifies and exfoliates pores", "Stimulates blood and lymph circulation", "Relieves deep muscular fatigue", "Leaves skin exceptionally soft and refreshed"],
    includes: ["Aromatic Eucalyptus Steam", "Authentic Beldi Black Soap", "Kessa Glove Exfoliation", "Atlas Ghassoul Mineral Mask", "Argan Oil Moisture Finish"],
    recommendedFor: "Gentlemen seeking total body renewal, skin detoxification, and deep thermal unwinding.",
    popular: true,
  },
  {
    id: "body-scrub",
    title: "Full Body Luxury Scrub",
    titleAr: "مقشر الجسم الفاخر",
    category: "bath",
    categoryLabel: "Exfoliation & Baths",
    duration: "45-60 min",
    durationsAvailable: ["45 min", "60 min"],
    priceQAR: 500,
    image: "/assets/just-relax/treatments/moroccan-herbs.jpg",
    shortDescription: "Invigorating full-body scrub using natural sea salts, organic oils, and herbal botanical exfoliants for silky smooth skin.",
    fullDescription: "Our specialized full body scrub eliminates dull, rough skin cells while deeply infusing revitalizing minerals and essential vitamins. Warm showers and gentle full-body exfoliation stimulate circulation and leave skin glowing.",
    benefits: ["Exfoliates dry dead skin thoroughly", "Stimulates cellular regeneration", "Enhances absorption of hydration oils", "Promotes smooth touch and natural glow"],
    includes: ["Warm Steam Prep", "Natural Salt & Herbal Scrub", "Gentle Rinse", "Botanical Moisture Seal"],
    recommendedFor: "Gentlemen wanting radiant, deeply cleansed skin and post-travel refresh.",
    popular: true,
  },
  {
    id: "foot-massage",
    title: "Revitalizing Foot Reflexology & Massage",
    titleAr: "تدليك القدم وريفلكسولوجي",
    category: "massage",
    categoryLabel: "Targeted Therapies",
    duration: "30-45 min",
    durationsAvailable: ["30 min", "45 min"],
    priceQAR: 200,
    image: "/assets/just-relax/treatments/lomi-lomi-massage.jpg",
    shortDescription: "Specialized pressure-point massage on the feet and calves to restore tired legs, ease plantar tension, and induce total body calm.",
    fullDescription: "Targeted reflexology treatment concentrating on plantar arches, heel pressure points, and calf muscles. Using warm herbal oils and wooden reflexology tools, it stimulates meridian pathways connected to overall vital energy.",
    benefits: ["Relieves aching feet and swollen ankles", "Improves lower limb circulation", "Stimulates reflex zones for full-body balance", "Instant relief for heavy walkers and executives"],
    includes: ["Warm Foot Soak & Cleanse", "Reflexology Pressure Work", "Calf Stretch & Deep Knead", "Cooling Herbal Cream"],
    recommendedFor: "Gentlemen on their feet all day, travelers after flights, or quick midday rejuvenation.",
    popular: true,
  },
  {
    id: "massage-60",
    title: "Signature Full Body Massage (60 Min)",
    titleAr: "مساج كامل للجسم 60 دقيقة",
    category: "massage",
    categoryLabel: "Therapeutic Massages",
    duration: "60 min",
    durationsAvailable: ["60 min"],
    priceQAR: 400,
    image: "/assets/just-relax/treatments/deep-tissue.jpg",
    shortDescription: "Comprehensive 60-minute therapeutic massage tailored with firm pressure, warm natural oils, and deep muscle release.",
    fullDescription: "60 minutes of uninterrupted restorative massage designed for total tension relief. Your therapist focuses on back, neck, shoulders, and legs with customized pressure to untie knots, improve blood flow, and relieve stress.",
    benefits: ["Relieves chronic muscle knots and stiffness", "Reduces physical and mental fatigue", "Improves overall posture and circulation", "Deep soothing state of full-body ease"],
    includes: ["Personal Consultation", "Custom Pressure Selection", "Warm Natural Botanical Oils", "Warm Towel Therapy"],
    recommendedFor: "Gentlemen looking for the standard 1-hour optimal relaxation and muscle unwinding.",
    popular: true,
  },
  {
    id: "massage-45",
    title: "Express Recovery Massage (45 Min)",
    titleAr: "مساج استشفائي سريع 45 دقيقة",
    category: "massage",
    categoryLabel: "Express Massages",
    duration: "45 min",
    durationsAvailable: ["45 min"],
    priceQAR: 350,
    image: "/assets/just-relax/treatments/swedish-massage.jpg",
    shortDescription: "Focused 45-minute therapeutic session prioritizing high-tension zones (back, neck, and shoulders) for fast revitalizing relief.",
    fullDescription: "An efficient 45-minute treatment tailored for gentlemen with tight schedules. Provides targeted deep or medium pressure directly to areas of discomfort, leaving you recharged and refreshed.",
    benefits: ["Quick recovery for busy schedules", "Concentrated relief on neck and back", "Relieves executive desk fatigue", "Boosts alertness and energy"],
    includes: ["Targeted Tension Focus", "Warm Essential Oils", "Spinal Acupressure", "Neck Release"],
    recommendedFor: "Busy professionals needing fast, impactful decompression between meetings.",
    popular: true,
  },
  {
    id: "turkish-hammam-foam",
    title: "Turkish Marble Hammam & Cloud Foam",
    titleAr: "الحمام التركي بالرغوة الصابونية",
    category: "bath",
    categoryLabel: "Traditional Baths",
    duration: "60 min",
    durationsAvailable: ["60 min", "90 min"],
    priceQAR: 420,
    image: "/assets/just-relax/treatments/turkish-bath.jpg",
    shortDescription: "Lying on an authentic heated marble slab beneath warm water cascades and a cloud of fragrant olive-oil soap foam massage.",
    fullDescription: "Transport yourself to Istanbul's grand palace hammams. You will recline upon our radiant warm marble belly stone ('Gobektasi') while the therapist uses traditional linen foam sacks to envelope your body in thousands of warm, weightless bubbles of olive oil soap. A soothing foam massage and gentle peeling awaken every nerve while relaxing muscles completely.",
    benefits: ["Thermal marble relaxation melts stiffness", "Exfoliates gently without abrasion", "Intensely hydrating soap lather", "Calms the central nervous system"],
    includes: ["Heated Marble Stone Recline", "Olive Soap Cloud Foam Massage", "Silk Mitt Peeling", "Warm Water Cascade Rinse", "Herbal Refreshment"],
    recommendedFor: "Those looking for a serene, weightless bathing sensation and deep thermal relaxation.",
    popular: true,
  },
  {
    id: "deep-tissue-recovery",
    title: "Deep Tissue & Sports Recovery Massage",
    titleAr: "مساج الأنسجة العميقة واستشفاء العضلات",
    category: "massage",
    categoryLabel: "Therapeutic Massages",
    duration: "60 min",
    durationsAvailable: ["60 min", "90 min", "120 min"],
    priceQAR: 380,
    image: "/assets/just-relax/treatments/deep-tissue.jpg",
    shortDescription: "Targeted firm-to-strong pressure focused on deeper muscle layers, relieving persistent knotting and athletic soreness.",
    fullDescription: "Specifically engineered for active gentlemen, gym enthusiasts, and business travelers carrying severe neck, shoulder, and back tension. Our licensed sports physiotherapists employ slow strokes, direct elbow and thumb friction, myofascial trigger point release, and cooling arnica compresses to unbind chronic knots and restore full range of motion.",
    benefits: ["Breaks down deep chronic knots & scar tissue", "Speeds athletic muscle recovery & lactic acid flush", "Improves posture and spinal mobility", "Releases long-held stress in lower back and neck"],
    includes: ["Postural Assessment", "Deep Muscle Trigger Point Work", "Arnica & Menthol Therapeutic Balm", "Warm Towel Spinal Compress"],
    recommendedFor: "Athletes, executives with prolonged desk posture, and those who prefer firm, targeted pressure.",
    popular: true,
  },
  {
    id: "swedish-aromatherapy",
    title: "Swedish Organic Aromatherapy Massage",
    titleAr: "المساج السويدي بالأعشاب والزيوت العطرية",
    category: "massage",
    categoryLabel: "Relaxation Massages",
    duration: "60 min",
    durationsAvailable: ["60 min", "90 min", "120 min"],
    priceQAR: 350,
    image: "/assets/just-relax/treatments/swedish-massage.jpg",
    shortDescription: "Long fluid strokes, gentle kneading, and customized warm organic botanical oils designed to quiet the mind and melt daily tension.",
    fullDescription: "A timeless classic elevated to 5-star perfection. Using light-to-medium pressure, your therapist glides across muscle groups with organic botanical oils customized to your mood (calming lavender, uplifting citrus sandalwood, or grounding cedarwood). Promotes effortless tranquility, eases mental burnout, and optimizes nighttime sleep.",
    benefits: ["Induces deep meditative calm", "Lowers cortisol and anxiety levels", "Enhances lymphatic drainage", "Dramatically improves sleep depth"],
    includes: ["Bespoke Essential Oil Selection", "Continuous Rhythmic Effleurage", "Scalp & Temples Acupressure", "Warm Foot Infusion"],
    recommendedFor: "First-time spa guests, gentlemen experiencing high cognitive stress, or those needing profound rest.",
    popular: false,
  },
  {
    id: "volcanic-hot-stone",
    title: "Volcanic Hot Stone Thermal Therapy",
    titleAr: "جلسة الأحجار البركانية الساخنة",
    category: "specialty",
    categoryLabel: "Specialized Therapies",
    duration: "90 min",
    durationsAvailable: ["75 min", "90 min", "120 min"],
    priceQAR: 480,
    image: "/assets/just-relax/treatments/hot-stone.jpg",
    shortDescription: "Smooth heated basalt volcanic stones placed on strategic energy chakras and glided along muscles for profound warmth.",
    fullDescription: "Hand-harvested black basalt stones retain therapeutic heat deep into muscle tissues. The soothing heat expands blood vessels, warming stiff ligaments and allowing therapists to reach tight muscles without intense mechanical discomfort. Paired with aromatic juniper oil, this ritual provides unmatched soothing warmth.",
    benefits: ["Penetrates 3x deeper than manual massage alone", "Dissolves severe chronic stiffness effortlessly", "Enhances cardiovascular circulation", "Calms winter chills and bodily aches"],
    includes: ["Heated Basalt Stone Placement", "Thermal Oil Gliding Massage", "Chakra Energy Balancing", "Warm Towel Foot Wrap"],
    recommendedFor: "Gentlemen suffering from chronic stiffness, joint aches, or looking for deeply comforting warmth.",
    popular: true,
  },
  {
    id: "four-hands-royal",
    title: "Four-Hands Synchronized Royal Symphony",
    titleAr: "مساج الأيدي الأربعة الملكي المتزامن",
    category: "specialty",
    categoryLabel: "VIP Signature",
    duration: "60 min",
    durationsAvailable: ["60 min", "90 min"],
    priceQAR: 690,
    image: "/assets/just-relax/treatments/therapist-massage.jpg",
    shortDescription: "Two master therapists work in seamless, choreographic unison to create an overwhelming sensory wave of absolute tranquility.",
    fullDescription: "The pinnacle of luxury spa indulgence. Two master practitioners synchronize their movements across your body with mirrored tempo and pressure. Because your brain cannot track two separate touch patterns simultaneously, conscious thinking quickly ceases, plunging you into an extraordinary state of deep theta meditation and sensory surrender.",
    benefits: ["Deconstructs all cognitive tension instantly", "Dual therapist power achieves 2x relaxation in 1 hour", "Deep sensory reset unlike any single-therapist treatment", "Ultimate VIP executive privilege"],
    includes: ["Two Certified Master Therapists", "Synchronized Choreographic Flow", "Warm Golden Jojoba Oil", "Private Executive VIP Suite"],
    recommendedFor: "Discerning gentlemen and VIP guests who demand the absolute peak of bespoke luxury relaxation.",
    popular: true,
  },
  {
    id: "organic-salt-jacuzzi",
    title: "Dead Sea Mineral Hydrotherapy Jacuzzi",
    titleAr: "جاكوزي الأملاح المعدنية العضوية",
    category: "hydrotherapy",
    categoryLabel: "Hydrotherapy",
    duration: "45 min",
    durationsAvailable: ["30 min", "45 min", "60 min"],
    priceQAR: 260,
    image: "/assets/just-relax/treatments/jacuzzi-salts.jpg",
    shortDescription: "Private hydro-massage hot tub enriched with therapeutic magnesium-rich organic salts to detoxify and revive fatigued limbs.",
    fullDescription: "Submerge into our private hydro-jet tub heated to an optimal 38°C and saturated with natural Dead Sea magnesium, potassium, and therapeutic salts. Multiple hydro-pulsing jets target lumbar, calf, and shoulder zones, relieving gravity's pressure on joints and accelerating metabolic recovery.",
    benefits: ["Transdermal magnesium absorption calms muscles", "Hydro-jets reduce joint inflammation", "Eliminates water retention and fatigue", "Ideal pairing before any massage ritual"],
    includes: ["Private Jacuzzi Suite", "Dead Sea Mineral & Himalayan Salt Infusion", "Chilled Fresh Juice or Moroccan Tea", "Plush Bathrobe & Slippers"],
    recommendedFor: "Post-flight recovery, joint aches, or as a warming prelude to a deep tissue massage.",
    popular: false,
  },
  {
    id: "executive-facial-grooming",
    title: "Executive Gentlemen's Revitalizing Facial",
    titleAr: "فيشل الرجال التنفيذي ونضارة البشرة",
    category: "grooming",
    categoryLabel: "Men's Grooming",
    duration: "50 min",
    durationsAvailable: ["50 min", "75 min"],
    priceQAR: 340,
    image: "/assets/just-relax/treatments/massage-organic-cream.jpg",
    shortDescription: "Customized skincare treatment engineered for men's thicker skin to clear pollution, soothe razor burn, and brighten skin tone.",
    fullDescription: "Specially formulated for gentlemen's facial needs. Incorporates steam pore cleansing, ultrasound blackhead clearing, gentle enzymatic peeling, soothing beard oil conditioning, and a collagen alginate cooling mask that leaves your face sharp, refreshed, and camera-ready.",
    benefits: ["Clears congested pores & ingrown beard hairs", "Reverses dullness caused by Doha sun and AC dry air", "Soothes razor irritation and redness", "Firms under-eye puffiness and fine lines"],
    includes: ["Ozone Steam Cleanse", "Enzymatic Gentle Peel", "High-Performance Eye Serum", "Beard Hydration Treatment", "Cooling Marine Algae Mask"],
    recommendedFor: "Gentlemen preparing for high-stakes business meetings, weddings, or seeking pristine facial grooming.",
    popular: false,
  },
];

export const THERAPISTS: Therapist[] = [
  {
    id: "hassan-amrani",
    name: "Master Hassan Al-Amrani",
    role: "Senior Hammam & Bath Master",
    experienceYears: 12,
    origin: "Morocco (Fez)",
    languages: ["Arabic", "French", "English"],
    rating: 4.98,
    specialties: ["Royal Moroccan Bath", "Traditional Kessa Exfoliation", "Atlas Ghassoul Rituals"],
    bio: "Trained under royal hammam masters in Fez, Hassan brings over 12 years of authentic Moroccan bathing mastery, known for his respectful precision, calming demeanor, and thorough technique.",
    avatar: "/assets/just-relax/therapists/karim.jpg",
    branches: ["the-pearl", "west-bay"],
  },
  {
    id: "somchai-prasert",
    name: "Somchai Prasert",
    role: "Lead Sports Physiotherapy Specialist",
    experienceYears: 10,
    origin: "Thailand (Chiang Mai)",
    languages: ["English", "Thai"],
    rating: 4.96,
    specialties: ["Deep Tissue Recovery", "Sports Conditioning", "Myofascial Trigger Point"],
    bio: "Certified by the prestigious Wat Pho Medical Institute in Bangkok, Somchai specializes in deep muscular relief for athletes, executives, and high-intensity fitness professionals.",
    avatar: "/assets/just-relax/therapists/youssef.jpg",
    branches: ["west-bay"],
  },
  {
    id: "mehmet-ozdemir",
    name: "Mehmet Özdemir",
    role: "Turkish Hammam & Foam Artisan",
    experienceYears: 9,
    origin: "Turkey (Istanbul)",
    languages: ["Turkish", "English", "Basic Arabic"],
    rating: 4.94,
    specialties: ["Marble Hammam Soap Cloud", "Ottoman Body Peeling", "Warm Towel Therapy"],
    bio: "Hailing from Istanbul's historic bath traditions, Mehmet is a master of warm marble foam massage, creating weightless foam clouds that deeply ease tension and rebalance physical harmony.",
    avatar: "/assets/just-relax/therapists/rashid.jpg",
    branches: ["the-pearl"],
  },
  {
    id: "alexandre-dubois",
    name: "Alexandre Dubois",
    role: "Senior Aromatherapist & Holistic Healer",
    experienceYears: 11,
    origin: "France",
    languages: ["French", "English"],
    rating: 4.97,
    specialties: ["Swedish Massage", "Volcanic Hot Stone", "Four-Hands Choreography"],
    bio: "A certified practitioner with luxury hotel spa experience in Paris and Dubai, Alexandre customizes pure essential oil therapies to soothe insomnia, high anxiety, and sensory fatigue.",
    avatar: "/assets/just-relax/therapists/tarek.jpg",
    branches: ["west-bay", "the-pearl"],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    type: "video",
    title: "Cinematic Tour of Just Relax Spa Doha",
    category: "all",
    thumbnail: "/assets/just-relax/branches/west-bay/west-bay-hero.jpg",
    src: "/assets/video/hero-video.mp4",
    videoUrl: "/assets/video/hero-video.mp4",
    description: "Experience the calming silence, warm ambient lighting, and bespoke gentlemen suites designed for effortless luxury.",
  },
  {
    id: "g1b",
    type: "video",
    title: "Deep Muscular Therapy & Warm Oil Ritual",
    category: "treatments",
    thumbnail: "/assets/just-relax/treatments/deep-tissue.jpg",
    src: "/assets/video/spa-hero-oil.mp4",
    videoUrl: "/assets/video/spa-hero-oil.mp4",
    description: "Therapeutic massage targeting deep knots and tension with warm botanical oils and rhythmic strokes.",
  },
  {
    id: "g1c",
    type: "video",
    title: "Moroccan Hammam Heated Steam & Mist",
    category: "hammam",
    thumbnail: "/assets/just-relax/branches/the-pearl/the-pearl-vip.jpg",
    src: "/assets/video/spa-hero-steam.mp4",
    videoUrl: "/assets/video/spa-hero-steam.mp4",
    description: "Centuries-old steam purification ritual on heated marble slabs for full body rejuvenation.",
  },
  {
    id: "g2",
    type: "image",
    title: "The Art of the Royal Moroccan Bath",
    category: "hammam",
    thumbnail: "/assets/just-relax/treatments/royal-moroccan.jpg",
    src: "/assets/just-relax/treatments/royal-moroccan.jpg",
    description: "Watch our master therapists prepare eucalyptus black soap and warm mist steam inside The Pearl Hammam.",
  },
  {
    id: "g3",
    type: "image",
    title: "West Bay Executive VIP Suite",
    category: "suites",
    thumbnail: "/assets/just-relax/branches/west-bay/west-bay-massage-suite.jpg",
    src: "/assets/just-relax/branches/west-bay/west-bay-massage-suite.jpg",
    description: "Ultra-private therapy suite featuring custom orthopedic massage table, ambient acoustics, and private rain shower.",
  },
  {
    id: "g4",
    type: "image",
    title: "Traditional Heated Marble Turkish Hammam",
    category: "hammam",
    thumbnail: "/assets/just-relax/branches/the-pearl/the-pearl-turkish-hammam.jpg",
    src: "/assets/just-relax/branches/the-pearl/the-pearl-turkish-hammam.jpg",
    description: "Carved from premium Calacatta marble with integrated underfloor heating for authentic Ottoman foam ceremonies.",
  },
  {
    id: "g5",
    type: "image",
    title: "Volcanic Basalt Stone Therapy Suite",
    category: "treatments",
    thumbnail: "/assets/just-relax/treatments/hot-stone.jpg",
    src: "/assets/just-relax/treatments/hot-stone.jpg",
    description: "Warm mineral-rich volcanic basalt stones positioned along spinal alignment paths for profound muscle softening.",
  },
  {
    id: "g6",
    type: "image",
    title: "Hydrotherapy Magnesium Jacuzzi",
    category: "suites",
    thumbnail: "/assets/just-relax/branches/west-bay/west-bay-jacuzzi.jpg",
    src: "/assets/just-relax/branches/west-bay/west-bay-jacuzzi.jpg",
    description: "Deep soaking therapeutic tub loaded with Dead Sea minerals and high-volume ergonomic hydrojets.",
  },
  {
    id: "g7",
    type: "image",
    title: "VIP Relaxation Lounge & Herbal Refreshments",
    category: "ambiance",
    thumbnail: "/assets/just-relax/branches/west-bay/west-bay-relaxation.jpg",
    src: "/assets/just-relax/branches/west-bay/west-bay-relaxation.jpg",
    description: "Gentlemen unwind post-session with Moroccan mint tea, premium Medjool dates, and infused waters in absolute discretion.",
  },
  {
    id: "g8",
    type: "image",
    title: "The Pearl-Qatar VIP Lounge",
    category: "ambiance",
    thumbnail: "/assets/just-relax/branches/the-pearl/the-pearl-lounge.jpg",
    src: "/assets/just-relax/branches/the-pearl/the-pearl-lounge.jpg",
    description: "Waterfront tranquility along Porto Arabia marina promenade for gentlemen seeking peace after late work hours.",
  },
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Sheikh Nasser Al-Thani",
    location: "Doha, Qatar",
    branch: "West Bay Diplomatic Suite",
    rating: 5,
    date: "October 2026",
    text: "Unequivocally the most professional gentlemen's spa in Doha. The privacy of the VIP suite is world class, and Somchai's deep tissue pressure completely resolved my chronic shoulder pain. Highly recommended for busy executives.",
    verified: true,
  },
  {
    id: "r2",
    author: "Tariq Mansoori",
    location: "Lusail, Qatar",
    branch: "The Pearl-Qatar Branch",
    rating: 5,
    date: "September 2026",
    text: "The Royal Moroccan bath with Hassan was extraordinary. Authentic black soap, immaculate hygiene, and heated marble that feels heavenly. Booking directly on WhatsApp took less than 30 seconds. A true 5-star standard.",
    verified: true,
  },
  {
    id: "r3",
    author: "David Sterling",
    location: "West Bay, Doha",
    branch: "West Bay Diplomatic Suite",
    rating: 5,
    date: "October 2026",
    text: "Working in finance means intense screen hours. The hot stone massage paired with the Dead Sea Jacuzzi was just what I needed. Being open until 3:00 AM makes it effortless to visit even after late business dinners.",
    verified: true,
  },
  {
    id: "r4",
    author: "Fahad Al-Kuwari",
    location: "The Pearl, Doha",
    branch: "The Pearl-Qatar Branch",
    rating: 5,
    date: "October 2026",
    text: "Tried the Four-Hands Royal ritual for my birthday. Two therapists in perfect synchronization - it was an unreal relaxation experience. Just Relax Spa is now my go-to weekly sanctuary.",
    verified: true,
  },
];

export const FAQS = [
  {
    question: "Do I need to book in advance or do you accept walk-ins?",
    answer: "While we accommodate walk-ins when suites are open, advance reservation via our website, WhatsApp, or phone is strongly encouraged to ensure your preferred time slot, therapist, and dedicated private suite are ready.",
  },
  {
    question: "Are the treatment rooms completely private?",
    answer: "Yes, 100%. Every treatment at Just Relax Spa takes place inside a soundproof, private VIP room with en-suite shower, plush bathrobes, and individual climate and acoustic control. Your privacy and discretion are guaranteed.",
  },
  {
    question: "What are your operating hours in Doha?",
    answer: "Both our West Bay and The Pearl branches are open daily from 10:00 AM until 3:00 AM after midnight, providing the perfect slot for daytime rejuvenation or late-night unwinding after a flight or business engagement.",
  },
  {
    question: "How do I choose between the Moroccan Bath and Turkish Hammam?",
    answer: "The Moroccan Bath focuses on deep steam detoxification, black soap application, and vigorous Kessa mitt exfoliation for complete skin renewal. The Turkish Hammam focuses on reclining on a heated marble stone bed beneath a massive cloud of gentle olive soap foam for a weightless, soothing massage.",
  },
  {
    question: "Is valet parking available at your branches?",
    answer: "Yes, complimentary private valet parking is provided for all spa guests at both our West Bay Tower suite and The Pearl-Qatar Porto Arabia marina locations.",
  },
];

