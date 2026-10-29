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
      "/assets/just-relax/branches/the-pearl/the-pearl-turkish-hammam.jpg",
      "/assets/just-relax/branches/west-bay/west-bay-massage-suite.jpg",
      "/assets/just-relax/branches/the-pearl/the-pearl-lounge.jpg",
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
    slug: "west-bay",
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
        label: "Complimentary VIP Valet Parking",
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
        text: "The most distinguished men's spa in Doha. The Moroccan bath with master Karim is truly royal and unmatched for recovery.",
        author: "Sheikh Nasser Al-Thani",
      },
      {
        stars: "★★★★★",
        text: "Exceptional privacy, spotless suites, and certified master therapists. Best deep tissue massage in West Bay.",
        author: "Mansoor Al-Kuwari",
      },
      {
        stars: "★★★★★",
        text: "Very professional reception, valet service at the door, and authentic Moroccan mint tea. 10/10 gentlemen experience.",
        author: "Fahad Al-Sulaiti",
      },
      {
        stars: "★★★★★",
        text: "The soundproofing in the VIP suites is remarkable. You forget you are in the center of the financial district.",
        author: "Dr. Hamad Al-Marri",
      },
    ],
    areaCopy: [
      "Positioned in Doha's prestigious diplomatic and financial quarter, our West Bay branch provides dignitaries, executives, and gentlemen an elite, confidential wellness sanctuary.",
      "Every suite is completely private with en-suite showers, acoustic soundproofing, and dedicated Hammam chambers. Open daily until 3:00 AM for late-evening post-business recovery.",
    ],
    landmarks: [
      "Doha Corniche Promenade · 3 min",
      "DECC Metro Station · 4 min",
      "City Center Doha · 5 min",
      "Souq Waqif · 10 min",
    ],
    mapIframe:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14424.484218318285!2d51.523098544555664!3d25.322830800000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c531d0411a75%3A0x6b093f48651c6b12!2sWest%20Bay%2C%20Doha%2C%20Qatar!5e0!3m2!1sen!2sqa!4v1700000000000!5m2!1sen!2sqa",
  },
  {
    slug: "the-pearl",
    name: "The Pearl-Qatar & Lusail Marina Suite",
    h1: "Authentic Turkish Hammam & Luxury Spa at The Pearl-Qatar",
    district: "Porto Arabia, The Pearl-Qatar & Lusail",
    rating: "★ 4.94 on Google",
    hours: "Daily 10:00 AM – 3:00 AM",
    address: "Porto Arabia Boardwalk, Tower 12, The Pearl-Qatar, Doha",
    heroImg: "/assets/just-relax/branches/the-pearl/the-pearl-hero.jpg",
    phone: "+974 4495 7777",
    whatsappNumber: "97455887799",
    instagram: "@justrelaxspa.qa",
    amenities: [
      {
        icon: "fa-solid fa-spa",
        label: "Heated Marble Turkish Gobek Tasi",
      },
      {
        icon: "fa-solid fa-water",
        label: "Underwater Hydrotherapy Jacuzzi",
      },
      {
        icon: "fa-solid fa-door-closed",
        label: "Luxury Executive Single & VIP Suites",
      },
      {
        icon: "fa-solid fa-leaf",
        label: "Moroccan Atlas Herb Infusions",
      },
      {
        icon: "fa-solid fa-umbrella-beach",
        label: "Waterfront Boardwalk Access",
      },
      {
        icon: "fa-solid fa-moon",
        label: "Open Late Night Till 3:00 AM",
      },
    ],
    photos: [
      "/assets/just-relax/branches/the-pearl/the-pearl-hero.jpg",
      "/assets/just-relax/branches/the-pearl/the-pearl-turkish-hammam.jpg",
      "/assets/just-relax/branches/the-pearl/the-pearl-hydrotherapy.jpg",
      "/assets/just-relax/branches/the-pearl/the-pearl-couples-suite.jpg",
      "/assets/just-relax/branches/the-pearl/the-pearl-steam-room.jpg",
      "/assets/just-relax/branches/the-pearl/the-pearl-lounge.jpg",
    ],
    reviews: [
      {
        stars: "★★★★★",
        text: "The Turkish bath on the heated marble slab is pure art. Incredible foam massage and soothing ambiance.",
        author: "Khalid Al-Nuaimi",
      },
      {
        stars: "★★★★★",
        text: "Stunning location at Porto Arabia. Ideal for a rejuvenating weekend ritual after yachting or golf.",
        author: "Abdullah Al-Kuwari",
      },
      {
        stars: "★★★★★",
        text: "Unrivaled luxury and hygiene standards in Qatar. Master therapists who understand deep muscle release.",
        author: "Mohammed Al-Khater",
      },
      {
        stars: "★★★★★",
        text: "Very discreet, high-class atmosphere. The organic salt jacuzzi followed by Argan massage is heaven.",
        author: "Sultan Al-Hajri",
      },
    ],
    areaCopy: [
      "Located on the Mediterranean-inspired marina boardwalk of Porto Arabia at The Pearl-Qatar, this branch features our flagship heated marble Turkish Hammam and aquatic hydrotherapy suites.",
      "Conveniently connected to both The Pearl and Lusail Marina, welcoming gentlemen daily until 3:00 AM.",
    ],
    landmarks: [
      "Medina Centrale · 2 min",
      "Lusail Marina Promenade · 5 min",
      "Katara Cultural Village · 7 min",
      "Lusail Iconic Stadium · 10 min",
    ],
    mapIframe:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14417.896472851458!2d51.53859664457814!3d25.3670923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c4867160759f%3A0xc3c94806a6442f4c!2sThe%20Pearl-Qatar%2C%20Doha!5e0!3m2!1sen!2sqa!4v1700000000000!5m2!1sen!2sqa",
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
    name: "The Pearl-Qatar & Lusail Marina Suite",
    h1: "Authentic Turkish Hammam & Luxury Spa at The Pearl-Qatar",
    district: "Porto Arabia, The Pearl-Qatar & Lusail",
    rating: "★ 4.94 on Google",
    hours: "Daily 10:00 AM – 3:00 AM",
    address: "Porto Arabia Boardwalk, Tower 12, The Pearl-Qatar, Doha",
    heroImg: "/assets/just-relax/branches/the-pearl/the-pearl-hero.jpg",
    phone: "+974 4495 7777",
    whatsappNumber: "97455887799",
    instagram: "@justrelaxspa.qa",
    amenities: [
      { icon: "fa-solid fa-spa", label: "Heated Marble Turkish Hammam" },
      { icon: "fa-solid fa-water", label: "Underwater Hydrotherapy Jacuzzi" },
      { icon: "fa-solid fa-moon", label: "Open Till 3:00 AM" },
    ],
    photos: [
      "/assets/just-relax/branches/the-pearl/the-pearl-hero.jpg",
      "/assets/just-relax/branches/the-pearl/the-pearl-turkish-hammam.jpg",
    ],
    reviews: [
      {
        stars: "★★★★★",
        text: "The Turkish bath on the heated marble slab is pure art.",
        author: "Khalid Al-Nuaimi",
      },
    ],
    areaCopy: [
      "Located on the Mediterranean-inspired marina boardwalk of Porto Arabia at The Pearl-Qatar.",
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
    name: "The Pearl-Qatar & Lusail Marina Suite",
    h1: "Authentic Turkish Hammam & Luxury Spa at The Pearl-Qatar",
    district: "Porto Arabia, The Pearl-Qatar & Lusail",
    rating: "★ 4.94 on Google",
    hours: "Daily 10:00 AM – 3:00 AM",
    address: "Porto Arabia Boardwalk, Tower 12, The Pearl-Qatar, Doha",
    heroImg: "/assets/just-relax/branches/the-pearl/the-pearl-hero.jpg",
    phone: "+974 4495 7777",
    whatsappNumber: "97455887799",
    instagram: "@justrelaxspa.qa",
    amenities: [],
    photos: [],
    reviews: [],
    areaCopy: [],
    landmarks: [],
    mapIframe: "",
  },
];
