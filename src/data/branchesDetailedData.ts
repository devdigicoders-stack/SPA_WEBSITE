export interface BranchAmenity {
  icon: string;
  label: string;
}

export interface BranchReview {
  stars: string;
  text: string;
  author: string;
}

export interface DetailedBranchItem {
  slug: string;
  name: string;
  h1: string;
  district: string;
  rating: string;
  hours: string;
  address: string;
  heroImg: string;
  phone: string;
  whatsappNumber: string;
  instagram: string;
  amenities: BranchAmenity[];
  photos: string[];
  reviews: BranchReview[];
  areaCopy: string[];
  landmarks: string[];
  mapIframe: string;
}

export const BRANCHES_DETAILED_DATA: DetailedBranchItem[] = [
  {
    slug: "jouri-hotel",
    name: "Jouri, a Murwab Hotel",
    h1: "Men's Luxury Spa & Moroccan Bath at Jouri Murwab Hotel Doha",
    district: "Al Muthaf St, Old Salata / Corniche, Doha",
    rating: "★ 4.96 on Google (2.2K+ Hotel Reviews)",
    hours: "Daily 10:00 AM – 3:00 AM",
    address: "Al Muthaf Street, Street 137, Building 31, Zone 18, Old Salata, Doha, Qatar",
    heroImg: "/assets/just-relax/branches/jouri-hotel/jouri-hotel-hero.jpg",
    phone: "+974 4004 1000",
    whatsappNumber: "97455883421",
    instagram: "@justrelaxspa.qa",
    amenities: [
      {
        icon: "fa-solid fa-hotel",
        label: "Located in 4-Star Jouri Murwab Hotel",
      },
      {
        icon: "fa-solid fa-door-closed",
        label: "Private Soundproof VIP Suites",
      },
      {
        icon: "fa-solid fa-spa",
        label: "Authentic Moroccan Beldi Bath",
      },
      {
        icon: "fa-solid fa-hot-tub-person",
        label: "Botanical Steam & Heated Sauna",
      },
      {
        icon: "fa-solid fa-water",
        label: "Indoor Heated Pool & Jacuzzi",
      },
      {
        icon: "fa-solid fa-square-parking",
        label: "Complimentary Hotel Valet Parking",
      },
      {
        icon: "fa-solid fa-moon",
        label: "Open Late Night Till 3:00 AM",
      },
    ],
    photos: [
      "/assets/just-relax/branches/jouri-hotel/jouri-hotel-hero.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-moroccan-bath.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-relaxation.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-massage-suite.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-amenities.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-jacuzzi.jpg",
    ],
    reviews: [
      {
        stars: "★★★★★",
        text: "Staying at Jouri Murwab Hotel and visiting Just Relax Spa was the highlight of my trip to Doha. The Moroccan bath and full body massage are world class.",
        author: "Ahmed Al-Mohannadi",
      },
      {
        stars: "★★★★★",
        text: "The best massage in Old Salata / Corniche area. Professional therapists, immaculate hygiene, and valet parking directly at the hotel entrance.",
        author: "Khalid Al-Thani",
      },
      {
        stars: "★★★★★",
        text: "400 QAR for a 60-minute full body massage and 500 QAR for royal Moroccan bath — totally worth every riyal. Super relaxing atmosphere.",
        author: "Rashid Mansoor",
      },
    ],
    areaCopy: [
      "Situated inside the prominent Jouri, a Murwab Hotel on Al Muthaf Street, Just Relax Spa delivers elite wellness in the historic heart of Doha.",
      "Just moments away from the National Museum of Qatar, Souq Waqif, and the Corniche Promenade, our hotel sanctuary offers unparalleled discretion and easy access for both hotel guests and local gentlemen."
    ],
    landmarks: [
      "Inside Jouri, a Murwab Hotel (7GPW+V2F Doha)",
      "2 minutes from National Museum of Qatar & Metro Station",
      "5 minutes from Souq Waqif and Doha Corniche",
      "10 minutes from Hamad International Airport (HIA)"
    ],
    mapIframe: "https://maps.google.com/maps?q=Jouri+a+Murwab+Hotel+Doha&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  {
    slug: "retaj-salwa",
    name: "Retaj Salwa Resort & Spa",
    h1: "Men's Luxury Spa & Moroccan Hammam at Retaj Salwa Resort Doha",
    district: "Salwa Road, Abu Nakhlah, Doha",
    rating: "★ 4.95 on Google",
    hours: "Daily 10:00 AM – 3:00 AM",
    address: "Salwa Road, Exit 29 / 31, Abu Nakhlah, Doha, Qatar",
    heroImg: "/assets/just-relax/branches/west-bay/west-bay-hero.jpg",
    phone: "+974 4429 8888",
    whatsappNumber: "97455883421",
    instagram: "@justrelaxspa.qa",
    amenities: [
      {
        icon: "fa-solid fa-hotel",
        label: "Located in 5-Star Retaj Salwa Resort",
      },
      {
        icon: "fa-solid fa-door-closed",
        label: "Private Soundproof VIP Suites",
      },
      {
        icon: "fa-solid fa-spa",
        label: "Authentic Moroccan Beldi Hammam",
      },
      {
        icon: "fa-solid fa-hot-tub-person",
        label: "Botanical Steam & Cedar Sauna",
      },
      {
        icon: "fa-solid fa-water",
        label: "Mineral Jacuzzi & Hydrotherapy",
      },
      {
        icon: "fa-solid fa-square-parking",
        label: "Complimentary Resort Valet Parking",
      },
      {
        icon: "fa-solid fa-moon",
        label: "Open Late Night Till 3:00 AM",
      },
    ],
    photos: [
      "/assets/just-relax/branches/west-bay/west-bay-hero.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-massage-suite.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-moroccan-bath.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-jacuzzi.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-relaxation.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-amenities.jpg",
    ],
    reviews: [
      {
        stars: "★★★★★",
        text: "The most distinguished men's spa in Doha. The Moroccan bath with master Karim inside Retaj Salwa Resort is truly royal and unmatched for recovery.",
        author: "Sheikh Nasser Al-Thani",
      },
      {
        stars: "★★★★★",
        text: "Exceptional privacy, spotless suites, and certified master therapists. Best deep tissue massage at Retaj Salwa.",
        author: "Mansoor Al-Kuwari",
      },
      {
        stars: "★★★★★",
        text: "Very professional reception, valet service at the resort door, and authentic Moroccan mint tea. 10/10 gentlemen experience.",
        author: "Fahad Al-Sulaiti",
      },
      {
        stars: "★★★★★",
        text: "The peaceful resort setting and soundproofing in the VIP suites is remarkable. Perfect escape from city rush.",
        author: "Dr. Hamad Al-Marri",
      },
    ],
    areaCopy: [
      "Nestled within the peaceful luxury of Retaj Salwa Resort & Spa on Salwa Road, our branch provides dignitaries, executives, and gentlemen an elite, confidential wellness sanctuary.",
      "Every suite is completely private with en-suite showers, acoustic soundproofing, and dedicated Hammam chambers. Open daily until 3:00 AM for late-evening post-business recovery.",
    ],
    landmarks: [
      "Salwa Road Abu Nakhlah (Exit 29 / 31)",
      "Direct resort valet at Retaj Salwa entrance",
      "15 minutes from Villaggio Mall & Aspire Zone",
      "25 minutes from Hamad International Airport",
    ],
    mapIframe:
      "https://maps.google.com/maps?q=Retaj+Salwa+Resort+%26+Spa+Doha&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  // Legacy alias west-bay preserved
  {
    slug: "west-bay",
    name: "Retaj Salwa Resort & Spa",
    h1: "Men's Luxury Spa & Moroccan Hammam at Retaj Salwa Resort Doha",
    district: "Salwa Road, Abu Nakhlah, Doha",
    rating: "★ 4.95 on Google",
    hours: "Daily 10:00 AM – 3:00 AM",
    address: "Salwa Road, Exit 29 / 31, Abu Nakhlah, Doha, Qatar",
    heroImg: "/assets/just-relax/branches/west-bay/west-bay-hero.jpg",
    phone: "+974 4429 8888",
    whatsappNumber: "97455883421",
    instagram: "@justrelaxspa.qa",
    amenities: [],
    photos: [
      "/assets/just-relax/branches/west-bay/west-bay-hero.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-massage-suite.jpg",
    ],
    reviews: [],
    areaCopy: ["Located at 5-star Retaj Salwa Resort & Spa on Salwa Road."],
    landmarks: ["Salwa Road Exit 29 / 31"],
    mapIframe:
      "https://maps.google.com/maps?q=Retaj+Salwa+Resort+%26+Spa+Doha&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },

  // Legacy aliases mapped gracefully
  {
    slug: "sh-zayed",
    name: "West Bay Diplomatic Suite",
    h1: "Men's Luxury Spa & Moroccan Hammam in West Bay, Doha",
    district: "Diplomatic District, West Bay, Doha",
    rating: "★ 4.95 on Google",
    hours: "Daily 10:00 AM – 3:00 AM",
    address: "Tower 1, Diplomatic District, West Bay, Doha, Qatar",
    heroImg: "/assets/just-relax/branches/west-bay/west-bay-hero.jpg",
    phone: "+974 4492 8888",
    whatsappNumber: "97455883421",
    instagram: "@justrelaxspa.qa",
    amenities: [
      { icon: "fa-solid fa-door-closed", label: "Private Soundproof VIP Suites" },
      { icon: "fa-solid fa-spa", label: "Authentic Moroccan Beldi Hammam" },
      { icon: "fa-solid fa-moon", label: "Open Till 3:00 AM" },
    ],
    photos: [
      "/assets/just-relax/branches/west-bay/west-bay-hero.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-massage-suite.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-moroccan-bath.jpg",
    ],
    reviews: [
      {
        stars: "★★★★★",
        text: "The most distinguished men's spa in Doha. Royal Moroccan bath is unmatched.",
        author: "Sheikh Nasser Al-Thani",
      },
    ],
    areaCopy: [
      "Positioned in Doha's prestigious diplomatic and financial quarter.",
    ],
    landmarks: ["Doha Corniche · 3 min", "DECC Metro · 4 min"],
    mapIframe: "",
  },
  {
    slug: "business-bay",
    name: "Jouri, a Murwab Hotel",
    h1: "Men's Luxury Spa & Moroccan Bath at Jouri Murwab Hotel Doha",
    district: "Al Muthaf St, Old Salata / Corniche, Doha",
    rating: "★ 4.96 on Google (2.2K+ Hotel Reviews)",
    hours: "Daily 10:00 AM – 3:00 AM",
    address: "Al Muthaf Street, Street 137, Building 31, Zone 18, Old Salata, Doha, Qatar",
    heroImg: "/assets/just-relax/branches/jouri-hotel/jouri-hotel-hero.jpg",
    phone: "+974 4004 1000",
    whatsappNumber: "97455883421",
    instagram: "@justrelaxspa.qa",
    amenities: [
      { icon: "fa-solid fa-spa", label: "Heated Marble Turkish Hammam" },
      { icon: "fa-solid fa-water", label: "Underwater Hydrotherapy Jacuzzi" },
      { icon: "fa-solid fa-moon", label: "Open Till 3:00 AM" },
    ],
    photos: [
      "/assets/just-relax/branches/jouri-hotel/jouri-hotel-hero.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-moroccan-bath.jpg",
    ],
    reviews: [
      {
        stars: "★★★★★",
        text: "The Turkish bath on the heated marble slab is pure art.",
        author: "Khalid Al-Nuaimi",
      },
    ],
    areaCopy: [
      "Located inside 4-star Jouri Murwab Hotel near Doha Corniche and Old Salata.",
    ],
    landmarks: ["Medina Centrale · 2 min", "Lusail Marina · 5 min"],
    mapIframe: "",
  },
  {
    slug: "al-barsha",
    name: "West Bay Diplomatic Suite",
    h1: "Men's Luxury Spa & Moroccan Hammam in West Bay, Doha",
    district: "Diplomatic District, West Bay, Doha",
    rating: "★ 4.95 on Google",
    hours: "Daily 10:00 AM – 3:00 AM",
    address: "Tower 1, Diplomatic District, West Bay, Doha, Qatar",
    heroImg: "/assets/just-relax/branches/west-bay/west-bay-hero.jpg",
    phone: "+974 4492 8888",
    whatsappNumber: "97455883421",
    instagram: "@justrelaxspa.qa",
    amenities: [],
    photos: [],
    reviews: [],
    areaCopy: [],
    landmarks: [],
    mapIframe: "",
  },
  {
    slug: "garhoud",
    name: "Jouri, a Murwab Hotel",
    h1: "Men's Luxury Spa & Moroccan Bath at Jouri Murwab Hotel Doha",
    district: "Al Muthaf St, Old Salata / Corniche, Doha",
    rating: "★ 4.96 on Google (2.2K+ Hotel Reviews)",
    hours: "Daily 10:00 AM – 3:00 AM",
    address: "Al Muthaf Street, Street 137, Building 31, Zone 18, Old Salata, Doha, Qatar",
    heroImg: "/assets/just-relax/branches/jouri-hotel/jouri-hotel-hero.jpg",
    phone: "+974 4004 1000",
    whatsappNumber: "97455883421",
    instagram: "@justrelaxspa.qa",
    amenities: [],
    photos: [],
    reviews: [],
    areaCopy: [],
    landmarks: [],
    mapIframe: "",
  },
];
