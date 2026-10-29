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

export const THERAPISTS_DATA: BranchTeam[] = [
  {
    branchSlug: "west-bay",
    branchName: "West Bay Diplomatic Suite",
    therapists: [
      {
        id: "wb-1",
        name: "Master Karim",
        nationality: "Moroccan",
        languages: "Arabic · French · English",
        image: "/assets/just-relax/therapists/karim.jpg",
        thankYouUrl: "/contact?branch=west-bay&therapist=Karim",
      },
      {
        id: "wb-2",
        name: "Youssef",
        nationality: "Moroccan",
        languages: "Arabic · French · English",
        image: "/assets/just-relax/therapists/youssef.jpg",
        thankYouUrl: "/contact?branch=west-bay&therapist=Youssef",
      },
      {
        id: "wb-3",
        name: "Rashid",
        nationality: "Tunisian",
        languages: "Arabic · French · English",
        image: "/assets/just-relax/therapists/rashid.jpg",
        thankYouUrl: "/contact?branch=west-bay&therapist=Rashid",
      },
      {
        id: "wb-4",
        name: "Tarek",
        nationality: "Egyptian",
        languages: "Arabic · English",
        image: "/assets/just-relax/therapists/tarek.jpg",
        thankYouUrl: "/contact?branch=west-bay&therapist=Tarek",
      },
      {
        id: "wb-5",
        name: "Amina",
        nationality: "Moroccan",
        languages: "Arabic · French · English",
        image: "/assets/just-relax/therapists/amina.jpg",
        thankYouUrl: "/contact?branch=west-bay&therapist=Amina",
      },
      {
        id: "wb-6",
        name: "Layla",
        nationality: "Lebanese",
        languages: "Arabic · English · French",
        image: "/assets/just-relax/therapists/layla.jpg",
        thankYouUrl: "/contact?branch=west-bay&therapist=Layla",
      },
    ],
  },
  {
    branchSlug: "the-pearl",
    branchName: "The Pearl-Qatar & Lusail Marina Suite",
    therapists: [
      {
        id: "tp-1",
        name: "Sofia",
        nationality: "Moroccan",
        languages: "Arabic · French · English",
        image: "/assets/just-relax/therapists/sofia.jpg",
        thankYouUrl: "/contact?branch=the-pearl&therapist=Sofia",
      },
      {
        id: "tp-2",
        name: "Maya",
        nationality: "Syrian",
        languages: "Arabic · English",
        image: "/assets/just-relax/therapists/maya.jpg",
        thankYouUrl: "/contact?branch=the-pearl&therapist=Maya",
      },
      {
        id: "tp-3",
        name: "Master Karim",
        nationality: "Moroccan",
        languages: "Arabic · French · English",
        image: "/assets/just-relax/therapists/karim.jpg",
        thankYouUrl: "/contact?branch=the-pearl&therapist=Karim",
      },
      {
        id: "tp-4",
        name: "Youssef",
        nationality: "Moroccan",
        languages: "Arabic · French · English",
        image: "/assets/just-relax/therapists/youssef.jpg",
        thankYouUrl: "/contact?branch=the-pearl&therapist=Youssef",
      },
    ],
  },
  // Graceful fallback for legacy URLs
  {
    branchSlug: "sh-zayed",
    branchName: "West Bay Diplomatic Suite",
    therapists: [
      {
        id: "wb-1",
        name: "Master Karim",
        nationality: "Moroccan",
        languages: "Arabic · French · English",
        image: "/assets/just-relax/therapists/karim.jpg",
        thankYouUrl: "/contact?branch=west-bay&therapist=Karim",
      },
      {
        id: "wb-2",
        name: "Youssef",
        nationality: "Moroccan",
        languages: "Arabic · French · English",
        image: "/assets/just-relax/therapists/youssef.jpg",
        thankYouUrl: "/contact?branch=west-bay&therapist=Youssef",
      },
    ],
  },
  {
    branchSlug: "business-bay",
    branchName: "The Pearl-Qatar & Lusail Marina Suite",
    therapists: [
      {
        id: "tp-1",
        name: "Sofia",
        nationality: "Moroccan",
        languages: "Arabic · French · English",
        image: "/assets/just-relax/therapists/sofia.jpg",
        thankYouUrl: "/contact?branch=the-pearl&therapist=Sofia",
      },
      {
        id: "tp-2",
        name: "Maya",
        nationality: "Syrian",
        languages: "Arabic · English",
        image: "/assets/just-relax/therapists/maya.jpg",
        thankYouUrl: "/contact?branch=the-pearl&therapist=Maya",
      },
    ],
  },
  {
    branchSlug: "al-barsha",
    branchName: "West Bay Diplomatic Suite",
    therapists: [],
  },
  {
    branchSlug: "garhoud",
    branchName: "The Pearl-Qatar & Lusail Marina Suite",
    therapists: [],
  },
];
