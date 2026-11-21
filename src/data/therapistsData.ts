export interface TherapistItem {
  id: string;
  name: string;
  nationality: string;
  languages: string;
  image: string;
  thankYouUrl: string;
}

export interface BranchTeam {
  branchSlug: string;
  branchName: string;
  therapists: TherapistItem[];
}

// Therapists team configuration
export const THERAPISTS_DATA: BranchTeam[] = [
  {
    branchSlug: "jouri-hotel",
    branchName: "Jouri Hotel",
    therapists: [
      {
        id: "jh-1",
        name: "Salma",
        nationality: "Moroccan",
        languages: "Arabic - English - French",
        image: "/assets/just-relax/therapists/salma.png",
        thankYouUrl: "/contact?branch=jouri-hotel&therapist=Salma",
      },
      {
        id: "jh-2",
        name: "Manar",
        nationality: "Tunisian",
        languages: "Arabic - English - French",
        image: "/assets/just-relax/therapists/manar.png",
        thankYouUrl: "/contact?branch=jouri-hotel&therapist=Manar",
      },
      {
        id: "jh-3",
        name: "Silia",
        nationality: "Algerian",
        languages: "Arabic - English - French",
        image: "/assets/just-relax/therapists/silia.png",
        thankYouUrl: "/contact?branch=jouri-hotel&therapist=Silia",
      },
      {
        id: "jh-4",
        name: "Helen",
        nationality: "Ethiopian",
        languages: "Arabic - English - French",
        image: "/assets/just-relax/therapists/helen.png",
        thankYouUrl: "/contact?branch=jouri-hotel&therapist=Helen",
      },
      {
        id: "jh-5",
        name: "Manita",
        nationality: "Nepali",
        languages: "English - Hindi - Nepali",
        image: "/assets/just-relax/therapists/manita.png",
        thankYouUrl: "/contact?branch=jouri-hotel&therapist=Manita",
      },
      {
        id: "jh-6",
        name: "Sana",
        nationality: "Nepali",
        languages: "English - Hindi - Nepali",
        image: "/assets/just-relax/therapists/sana.png",
        thankYouUrl: "/contact?branch=jouri-hotel&therapist=Sana",
      },
    ],
  },
  {
    branchSlug: "retaj-salwa",
    branchName: "Retaj Salwa Resort & Spa",
    therapists: [
      {
        id: "rs-1",
        name: "Layla",
        nationality: "Moroccan",
        languages: "Arabic - English - French",
        image: "/assets/just-relax/therapists/layla-jouri.png",
        thankYouUrl: "/contact?branch=retaj-salwa&therapist=Layla",
      },
      {
        id: "rs-2",
        name: "Helen",
        nationality: "Ethiopian",
        languages: "Arabic - English - French",
        image: "/assets/just-relax/therapists/helen-jouri.png",
        thankYouUrl: "/contact?branch=retaj-salwa&therapist=Helen",
      },
      {
        id: "rs-3",
        name: "Lucky",
        nationality: "Nepali",
        languages: "English - Hindi",
        image: "/assets/just-relax/therapists/lucky.jpg",
        thankYouUrl: "/contact?branch=retaj-salwa&therapist=Lucky",
      },
    ],
  },
  // Graceful fallback for legacy URLs
  {
    branchSlug: "sh-zayed",
    branchName: "Retaj Salwa Resort & Spa",
    therapists: [
      {
        id: "wb-1",
        name: "Master Karim",
        nationality: "Moroccan",
        languages: "Arabic · French · English",
        image: "/assets/just-relax/therapists/karim.jpg",
        thankYouUrl: "/contact?branch=retaj-salwa&therapist=Karim",
      },
      {
        id: "wb-2",
        name: "Youssef",
        nationality: "Moroccan",
        languages: "Arabic · French · English",
        image: "/assets/just-relax/therapists/youssef.jpg",
        thankYouUrl: "/contact?branch=retaj-salwa&therapist=Youssef",
      },
    ],
  },
  {
    branchSlug: "business-bay",
    branchName: "Jouri Hotel",
    therapists: [
      {
        id: "tp-1",
        name: "Sofia",
        nationality: "Moroccan",
        languages: "Arabic · French · English",
        image: "/assets/just-relax/therapists/sofia.jpg",
        thankYouUrl: "/contact?branch=jouri-hotel&therapist=Sofia",
      },
      {
        id: "tp-2",
        name: "Maya",
        nationality: "Syrian",
        languages: "Arabic · French · English",
        image: "/assets/just-relax/therapists/maya.jpg",
        thankYouUrl: "/contact?branch=jouri-hotel&therapist=Maya",
      },
    ],
  },
  {
    branchSlug: "al-barsha",
    branchName: "Retaj Salwa Resort & Spa",
    therapists: [],
  },
  {
    branchSlug: "garhoud",
    branchName: "Jouri Hotel",
    therapists: [],
  },
];
