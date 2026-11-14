export interface TreatmentItem {
  id: number;
  slug: string;
  title: string;
  category: "bath" | "massage" | "hydrotherapy" | "grooming";
  description: string;
  about: string[];
  duration: string;
  bookingNote: string;
  locationsNote: string;
  benefits: string[];
  technique: string[];
  journey: {
    num: string;
    title: string;
    desc: string;
  }[];
  preparation: string[];
  image: string;
  serviceId: string;
  relatedSlugs: string[];
}

export const TREATMENTS_DATA: TreatmentItem[] = [
  {
    id: 1,
    slug: "royal-moroccan",
    title: "Royal Moroccan Bath",
    category: "bath",
    description: "A luxurious traditional cleansing treatment using premium organic black soap, exfoliating glove, and aromatic herbs.",
    about: [
      "Embark on an extraordinary cleansing ritual rooted in centuries of Moroccan heritage. Your skin is thoroughly prepared in a private steam chamber, followed by an intensive exfoliation with authentic Beldi black soap and Kessa glove.",
      "The ritual culminates in an aromatic herb-infused rinse and nourishing hair treatment, leaving your body deeply purified, radiant, and renewed."
    ],
    duration: "60-90 minutes",
    bookingNote: "Subject to branch availability",
    locationsNote: "All branches",
    benefits: [
      "Deeply exfoliates and lifts dead skin cells, revealing smooth and nourished skin.",
      "Stimulates blood circulation and lymphatic drainage through traditional steam therapy.",
      "Calms the nervous system and purifies the respiratory tract with natural botanical herbs."
    ],
    technique: [
      "The experience begins with warm steam preparation to soften pores and relax muscles. Authentic Moroccan eucalyptus black soap is applied over the body, allowing active plant lipids to penetrate the dermal layers.",
      "Our certified hammam master performs controlled, rhythmic exfoliation using a personal Kessa mitt, followed by a warm herbal wash and botanical hydration."
    ],
    journey: [
      {
        num: "01",
        title: "Steam & Preparation",
        desc: "Relax in private steam to open pores and soften skin before application of pure organic black soap."
      },
      {
        num: "02",
        title: "Kessa Exfoliation",
        desc: "Expert full-body exfoliation removes impurities, dead skin, and improves systemic circulation."
      },
      {
        num: "03",
        title: "Aromatic Rinse & Rest",
        desc: "Finished with warm botanical herbal rinses, cold towel refresh, and restorative Moroccan mint tea."
      }
    ],
    preparation: [
      "Arrive 10 to 15 minutes before your scheduled ritual to decompress in the relaxation lounge.",
      "Avoid heavy meals or caffeine within 90 minutes of the treatment.",
      "Please inform your therapist of any heat sensitivity, respiratory conditions, or skin allergies."
    ],
    image: "/assets/just-relax/treatments/royal-moroccan.jpg",
    serviceId: "royal-moroccan",
    relatedSlugs: ["moroccan-herbs", "turkish-bath", "jacuzzi-salts"]
  },
  {
    id: 2,
    slug: "moroccan-herbs",
    title: "Moroccan Bath with Herbs",
    category: "bath",
    description: "Purify your body and mind with a gentle steam bath infused with a secret blend of calming natural Moroccan herbs.",
    about: [
      "A soothing variant of the traditional hammam, this treatment focuses on natural botanical aromatherapy. Hand-picked mountain herbs from the Atlas region release therapeutic vapors that soothe muscles and calm the nervous system.",
      "Combines gentle cleansing with an intensive botanical herbal mask that hydrates skin, leaving a subtle natural fragrance."
    ],
    duration: "60-90 minutes",
    bookingNote: "Subject to branch availability",
    locationsNote: "All branches",
    benefits: [
      "Calms mental fatigue and sensory overload through botanical herbal steam.",
      "Provides gentle purification suitable for sensitive skin profiles.",
      "Enhances natural skin moisture retention with antioxidant herb extracts."
    ],
    technique: [
      "Vaporization of dried rosemary, lavender, chamomile, and Atlas eucalyptus creates a restorative chamber environment.",
      "Herbal body pack application followed by gentle dead-skin exfoliation and a concluding warm mineral infusion rinse."
    ],
    journey: [
      {
        num: "01",
        title: "Botanical Inhalation",
        desc: "Inhale aromatic steam infused with authentic dried Moroccan herbs to relax the respiratory system."
      },
      {
        num: "02",
        title: "Herbal Cleansing",
        desc: "Application of gentle herbal soap and mild exfoliation to nourish and polish the epidermis."
      },
      {
        num: "03",
        title: "Restorative Rinse",
        desc: "A soothing warm rainfall rinse and cooling herb mist to lock in hydration."
      }
    ],
    preparation: [
      "Arrive 10-15 minutes prior. Disclose any botanical sensitivities to your therapist beforehand.",
      "Stay hydrated before entering the warm steam suite."
    ],
    image: "/assets/just-relax/treatments/moroccan-herbs.jpg",
    serviceId: "moroccan-herbs",
    relatedSlugs: ["royal-moroccan", "turkish-bath", "swedish-massage"]
  },
  {
    id: 3,
    slug: "turkish-bath",
    title: "Turkish Bath",
    category: "bath",
    description: "Indulge in a classic soap-foam massage on a warm marble bed, followed by gentle exfoliation and warm water rinse.",
    about: [
      "Step into the timeless tranquility of the Ottoman hammam. Lying upon a heated marble belly stone (Gobek Tasi), you will experience warm water ablutions, thorough Kese peeling, and an airy cocoon of fragrant soap bubbles.",
      "The soap foam massage releases tension from shoulders and back while gently stimulating cellular turnover across the entire body."
    ],
    duration: "60-90 minutes",
    bookingNote: "Subject to branch availability",
    locationsNote: "All branches",
    benefits: [
      "Heated marble slab warms the core, loosening deep muscular stiffness.",
      "Luxurious cloud-like soap foam provides gentle friction-free relaxation.",
      "Restores vibrant skin texture and thorough head-to-toe cleanliness."
    ],
    technique: [
      "Therapist whips pure olive-oil soap into a voluminous warm foam cloud using a traditional Torba lather sack.",
      "Therapeutic sliding strokes over the heated marble bed followed by traditional copper bowl water pours."
    ],
    journey: [
      {
        num: "01",
        title: "Marble Bed Acclimatization",
        desc: "Lie upon the heated marble slab to relax muscular structure with radiating warmth."
      },
      {
        num: "02",
        title: "Kese & Foam Cloud",
        desc: "Gentle peeling followed by full immersion in a voluminous blanket of olive-oil soap foam."
      },
      {
        num: "03",
        title: "Copper Bowl Rinse",
        desc: "Traditional rhythmic water pours followed by refreshing cool compresses."
      }
    ],
    preparation: [
      "Arrive 10-15 minutes early. Ensure you are well hydrated.",
      "Recommended as a prelude to a deep tissue massage for maximum muscular release."
    ],
    image: "/assets/just-relax/treatments/turkish-bath.jpg",
    serviceId: "turkish-bath",
    relatedSlugs: ["royal-moroccan", "underwater-soapy", "swedish-massage"]
  },
  {
    id: 4,
    slug: "swedish-massage",
    title: "Swedish Massage",
    category: "massage",
    description: "Relaxing full-body massage using long, gliding strokes to ease tension, improve circulation, and enhance flexibility.",
    about: [
      "The gold standard of therapeutic relaxation. Developed to promote overall well-being, this modality uses five classic variations of long strokes (effleurage), kneading (petrissage), friction, tapping, and gentle vibration.",
      "Designed to melt away every trace of stress, ease tight joints, and restore mental clarity in a soundproof luxury suite."
    ],
    duration: "60-90 minutes",
    bookingNote: "Subject to branch availability",
    locationsNote: "All branches",
    benefits: [
      "Significantly reduces cortisol stress hormones and elevates mental relaxation.",
      "Improves venous blood flow back toward the heart, oxygenating vital muscle tissues.",
      "Enhances joint flexibility and eases superficial tension across back and limbs."
    ],
    technique: [
      "Long, flowing strokes applied with warm natural organic massage oils along the contours of your musculature.",
      "Customizable pressure from gentle to medium, aligned with your immediate comfort preferences."
    ],
    journey: [
      {
        num: "01",
        title: "Preference Review",
        desc: "Consult with your therapist on targeted tension areas and pressure preferences."
      },
      {
        num: "02",
        title: "Flowing Muscle Work",
        desc: "Full-body continuous strokes focusing on back, shoulders, arms, and legs."
      },
      {
        num: "03",
        title: "Towel Compress & Awaken",
        desc: "Warm moist towel compress, gentle stretching, and herbal tea service."
      }
    ],
    preparation: [
      "Arrive 10 minutes prior to unwind in the quiet suite.",
      "Communicate your desired pressure level openly at any point during your session."
    ],
    image: "/assets/just-relax/treatments/swedish-massage.jpg",
    serviceId: "swedish-massage",
    relatedSlugs: ["deep-tissue", "hot-stone", "massage-natural-oils"]
  },
  {
    id: 5,
    slug: "deep-tissue",
    title: "Deep Tissue Massage",
    category: "massage",
    description: "Targeted therapeutic pressure designed to release chronic muscle tension and promote deep muscular recovery.",
    about: [
      "A focused therapeutic treatment targeting the deeper layers of muscle tissue, tendons, and protective fascia. Slow strokes and firm finger pressure reach deep into chronic trigger points, breaking down adhesion knots.",
      "Ideal for athletes, active gentlemen, and executives carrying postural tension from long desk hours or frequent travel."
    ],
    duration: "60-90 minutes",
    bookingNote: "Subject to branch availability",
    locationsNote: "All branches",
    benefits: [
      "Breaks down chronic muscular knots and scar tissue bands that cause stiffness.",
      "Relieves persistent lower back, neck, and shoulder discomfort.",
      "Restores structural posture alignment and expands range of motion."
    ],
    technique: [
      "Uses concentrated thumb, forearm, and elbow techniques with minimal oil to maintain precise grip on deep fascia.",
      "Gradual warm-up of surface layers before deep trigger point manipulation."
    ],
    journey: [
      {
        num: "01",
        title: "Assessment",
        desc: "Targeted evaluation of posture, tight bands, and previous sports injuries."
      },
      {
        num: "02",
        title: "Deep Fascial Release",
        desc: "Focused deep pressure techniques targeting chronic trigger points and stiffness."
      },
      {
        num: "03",
        title: "Recovery Guidance",
        desc: "Post-treatment stretching recommendations and hydration support."
      }
    ],
    preparation: [
      "Ensure you drink plenty of water before and after treatment to aid toxin flush.",
      "Expect moderate therapeutic pressure; communicate clearly with therapist."
    ],
    image: "/assets/just-relax/treatments/deep-tissue.jpg",
    serviceId: "deep-tissue",
    relatedSlugs: ["sports-massage", "gun-massage", "hot-stone"]
  },
  {
    id: 6,
    slug: "hot-stone",
    title: "Hot Stone Massage",
    category: "massage",
    description: "Heated volcanic basalt stones are placed on key energy points to melt away stress and induce a state of pure bliss.",
    about: [
      "Smooth, water-heated volcanic basalt stones rich in iron retain thermal energy and transfer penetrating warmth deep into muscle fibers. Stones are placed along energy meridians and used directly by the therapist as massage extensions.",
      "The heat allows muscles to relax exponentially faster than standard manual pressure, inducing profound tranquility."
    ],
    duration: "60-90 minutes",
    bookingNote: "Subject to branch availability",
    locationsNote: "All branches",
    benefits: [
      "Penetrating heat relaxes rigid muscles without aggressive physical force.",
      "Significantly improves vascular circulation and oxygenates deep tissue beds.",
      "Induces rapid meditative alpha-wave relaxation, easing insomnia and mental fatigue."
    ],
    technique: [
      "Basalt stones heated to precisely 52°C–54°C in a water bath, applied with organic essential oils.",
      "Synchronous long gliding strokes with warm stones followed by stationary placement along spinal points."
    ],
    journey: [
      {
        num: "01",
        title: "Thermal Placement",
        desc: "Placement of warm volcanic stones along key spinal and chakra points to melt initial tension."
      },
      {
        num: "02",
        title: "Stone Gliding Therapy",
        desc: "Full-body massage utilizing warm oiled basalt stones as smooth therapeutic tools."
      },
      {
        num: "03",
        title: "Thermal Grounding",
        desc: "Gradual cooling compresses, gentle limb stretching, and grounding mineral hydration."
      }
    ],
    preparation: [
      "Avoid direct sun exposure or tanning immediately prior to your appointment.",
      "Inform therapist if you have high blood pressure or heat sensitivities."
    ],
    image: "/assets/just-relax/treatments/hot-stone.jpg",
    serviceId: "hot-stone",
    relatedSlugs: ["swedish-massage", "deep-tissue", "argan-oil-massage"]
  },
  {
    id: 7,
    slug: "jacuzzi-salts",
    title: "Jacuzzi with Organic Salts",
    category: "hydrotherapy",
    description: "Soak in our hydrotherapy hot tub enriched with therapeutic mineral salts to detoxify and soothe tired muscles.",
    about: [
      "Immerse your body in an opulent private hydrotherapy suite. High-pressure aquatic jets target the back, calves, and soles, while water enriched with organic Dead Sea magnesium and pink Himalayan crystals rebalances your body.",
      "A sublime solitary or pre-treatment experience that purges toxins, alleviates joint inflammation, and relieves muscular fatigue."
    ],
    duration: "45-60 minutes",
    bookingNote: "Subject to branch availability",
    locationsNote: "All branches",
    benefits: [
      "Mineral salts replenish vital intracellular magnesium and trace electrolytes.",
      "Buoyancy reduces skeletal pressure, relieving spinal compression.",
      "Multi-directional aquatic jets massage sore muscle groups simultaneously."
    ],
    technique: [
      "Temperature-controlled hydrotherapy tub maintained between 37°C–39°C with calibrated water jet zones.",
      "Infusion of 100% organic unrefined mineral salts and therapeutic botanical extracts."
    ],
    journey: [
      {
        num: "01",
        title: "Mineral Immersion",
        desc: "Step into warm hydrotherapy bath infused with authentic restorative salts."
      },
      {
        num: "02",
        title: "Jet Stimulation",
        desc: "Targeted water jet therapy massages back, lumbar, hamstrings, and feet."
      },
      {
        num: "03",
        title: "Relaxation Lounge",
        desc: "Post-bath cooldown with chilled mineral water, plush bathrobe, and resting lounge."
      }
    ],
    preparation: [
      "Shower before entering the bath. Stay hydrated during the session.",
      "Best enjoyed as a prelude to a hammam or full-body massage."
    ],
    image: "/assets/just-relax/treatments/jacuzzi-salts.jpg",
    serviceId: "jacuzzi-salts",
    relatedSlugs: ["underwater-soapy", "royal-moroccan", "swedish-massage"]
  },
  {
    id: 8,
    slug: "underwater-soapy",
    title: "Underwater Soapy Massage",
    category: "hydrotherapy",
    description: "A unique sensory hydro-massage combining warm water currents with exfoliating aromatic soap suds.",
    about: [
      "An exclusive signature aquatic ritual. Submerged in warm, silky hydro-jets, your therapist administers a specialized friction massage using abundant aromatic botanical foam under and over continuous warm water currents.",
      "The combination of zero gravity buoyancy and rich lather provides an unprecedented sensation of complete physical release."
    ],
    duration: "60-90 minutes",
    bookingNote: "Subject to branch availability",
    locationsNote: "All branches",
    benefits: [
      "Eliminates friction on the skin while providing therapeutic muscular stimulation.",
      "Hydro-currents stimulate lymphatic flow and promote systemic detoxification.",
      "Unique multisensory water and foam interaction creates unprecedented stress relief."
    ],
    technique: [
      "Administered inside custom aquatic therapy chambers with specialized water management.",
      "Continuous application of warm herbal foam while therapist utilizes aquatic massage strokes."
    ],
    journey: [
      {
        num: "01",
        title: "Warm Water Acclimation",
        desc: "Submerge in temperature-calibrated private hydro suite."
      },
      {
        num: "02",
        title: "Submerged Foam Massage",
        desc: "Full-body therapy combining high-volume botanical foam with aquatic strokes."
      },
      {
        num: "03",
        title: "Thermal Rain Finish",
        desc: "Gentle warm overhead cascade rinse followed by relaxation lounge rest."
      }
    ],
    preparation: [
      "Arrive 15 minutes early. Private dressing suite and amenities provided.",
      "Ideal for individuals seeking a gentle, luxurious, and non-traditional experience."
    ],
    image: "/assets/just-relax/treatments/underwater-soapy.jpg",
    serviceId: "underwater-soapy",
    relatedSlugs: ["jacuzzi-salts", "turkish-bath", "royal-moroccan"]
  },
  {
    id: 9,
    slug: "massage-natural-oils",
    title: "Massage with Natural Oils",
    category: "massage",
    description: "Therapeutic relaxation with premium natural oils.",
    about: [
      "A lavish full-body massage centered on pure, cold-pressed natural plant oils including sweet almond, jojoba, and grapeseed. Formulated without synthetic additives, the oils feed your skin essential fatty acids.",
      "Our therapists adapt their stroke cadence to your personal preference, leaving muscles supple and skin impeccably nourished."
    ],
    duration: "60-90 minutes",
    bookingNote: "Subject to branch availability",
    locationsNote: "All branches",
    benefits: [
      "Nourishes dry skin with vitamins A, E, and essential Omega fatty acids.",
      "Delivers smooth, continuous gliding strokes that melt muscular tightness.",
      "Aromatherapeutic properties elevate mood and enhance sleep quality."
    ],
    technique: [
      "Warmed organic oil is smoothed over the body using rhythmic circular and longitudinal strokes.",
      "Balanced focus between joint mobilization and muscle decompression."
    ],
    journey: [
      {
        num: "01",
        title: "Aroma Selection",
        desc: "Sample and select your preferred cold-pressed organic oil blend."
      },
      {
        num: "02",
        title: "Whole-Body Oil Ritual",
        desc: "Full-body rhythmic strokes with continuous application of warmed botanical oil."
      },
      {
        num: "03",
        title: "Finishing Warm Wrap",
        desc: "Hot towel wraps to absorb excess oil, leaving skin silky and soft."
      }
    ],
    preparation: [
      "Arrive 10 minutes prior. Mention any nut or botanical oil allergies."
    ],
    image: "/assets/just-relax/treatments/massage-natural-oils.jpg",
    serviceId: "massage-natural-oils",
    relatedSlugs: ["swedish-massage", "argan-oil-massage", "massage-organic-cream"]
  },
  {
    id: 10,
    slug: "massage-organic-cream",
    title: "Massage with Organic Cream",
    category: "massage",
    description: "Luxury massage with premium organic cream.",
    about: [
      "Ideal for clients who prefer a non-oily finish, this treatment utilizes an ultra-rich organic shea butter and aloe vera emulsion. The cream offers exceptional grip for deeper muscular manipulation while absorbing cleanly into the skin.",
      "Leaves you feeling completely refreshed and ready to attend meetings or continue your day without feeling greasy."
    ],
    duration: "60-90 minutes",
    bookingNote: "Subject to branch availability",
    locationsNote: "All branches",
    benefits: [
      "Matte, non-greasy absorption allows immediate dressing after session.",
      "Deeply hydrates rough skin, elbows, and heels with organic shea and vitamin E.",
      "Enables firmer structural grip for targeted tension relief."
    ],
    technique: [
      "Application of velvety organic butter cream that warms naturally with therapist touch.",
      "Combines Swedish effleurage with targeted deep tissue pressure."
    ],
    journey: [
      {
        num: "01",
        title: "Consultation",
        desc: "Discuss pressure goals and areas requiring special focus."
      },
      {
        num: "02",
        title: "Rich Cream Application",
        desc: "Muscular therapy using velvety organic cream that absorbs cleanly."
      },
      {
        num: "03",
        title: "Awaken & Refresh",
        desc: "Gentle neck and scalp massage followed by refreshing herbal tea."
      }
    ],
    preparation: [
      "Arrive 10-15 minutes prior. Perfect option if returning to office or dinner."
    ],
    image: "/assets/just-relax/treatments/massage-organic-cream.jpg",
    serviceId: "massage-organic-cream",
    relatedSlugs: ["massage-natural-oils", "deep-tissue", "sports-massage"]
  },
  {
    id: 11,
    slug: "argan-oil-massage",
    title: "Argan Oil Massage",
    category: "massage",
    description: "Moroccan liquid gold massage experience.",
    about: [
      "Experience the pinnacle of Moroccan luxury. 100% pure culinary and cosmetic grade Argan oil, sustainably sourced from indigenous Arganeraie UNESCO reserves in Morocco, is known as nature's 'Liquid Gold'.",
      "Extremely rich in natural tocopherols (Vitamin E) and squalene, it rejuvenates aging skin while the therapist's masterful hands soothe tired sinews."
    ],
    duration: "60-90 minutes",
    bookingNote: "Subject to branch availability",
    locationsNote: "All branches",
    benefits: [
      "Potent antioxidant properties defend against cellular aging and dryness.",
      "Intensely restores skin elasticity and smooths uneven texture.",
      "Deeply relaxing full-body strokes relieve chronic mental exhaustion."
    ],
    technique: [
      "Warm virgin Argan oil is applied with slow, deliberate, flowing strokes.",
      "Includes specialized facial and scalp acupressure using pure cosmetic Argan elixir."
    ],
    journey: [
      {
        num: "01",
        title: "Welcome Elixir",
        desc: "Welcome tea and warm towel foot ritual."
      },
      {
        num: "02",
        title: "Liquid Gold Therapy",
        desc: "Full-body therapy with pure organic Moroccan Argan oil."
      },
      {
        num: "03",
        title: "Facial & Scalp Accents",
        desc: "Subtle cranial acupressure and gentle facial smoothing."
      }
    ],
    preparation: [
      "Arrive 10-15 minutes early. Highly recommended following a Moroccan bath ritual."
    ],
    image: "/assets/just-relax/treatments/argan-oil-massage.jpg",
    serviceId: "argan-oil-massage",
    relatedSlugs: ["royal-moroccan", "massage-natural-oils", "swedish-massage"]
  },
  {
    id: 12,
    slug: "sports-massage",
    title: "Sports Massage",
    category: "massage",
    description: "Specialized massage for athletes and active individuals.",
    about: [
      "Designed specifically for athletes, fitness enthusiasts, and gentlemen engaged in high-intensity training. This treatment incorporates dynamic active stretching, cross-fiber friction, and joint mobilization.",
      "Accelerates lactic acid clearance, prevents muscular injuries, and optimizes peak athletic performance."
    ],
    duration: "60-90 minutes",
    bookingNote: "Subject to branch availability",
    locationsNote: "All branches",
    benefits: [
      "Shortens post-workout recovery time by expediting metabolic waste flushing.",
      "Significantly increases flexibility, joint range of motion, and tendon elasticity.",
      "Breaks down micro-adhesions before they manifest into acute athletic injuries."
    ],
    technique: [
      "Combines vigorous compression, cross-fiber friction, and assisted passive stretching.",
      "Therapist focuses heavily on hamstring, gluteal, shoulder, and rotator cuff groups."
    ],
    journey: [
      {
        num: "01",
        title: "Athletic Evaluation",
        desc: "Review your training regimen, target sports, and acute tightness."
      },
      {
        num: "02",
        title: "Targeted Rehabilitation",
        desc: "Firm compression and assisted muscle stretching tailored to your sport."
      },
      {
        num: "03",
        title: "Flexibility Post-Care",
        desc: "Guidance on mobility maintenance and post-session hydration."
      }
    ],
    preparation: [
      "Suitable either 24-48 hours before an athletic event or within 48 hours after heavy exertion.",
      "Wear comfortable gym attire if pre-stretching is desired."
    ],
    image: "/assets/just-relax/treatments/sports-massage.jpg",
    serviceId: "sports-massage",
    relatedSlugs: ["deep-tissue", "gun-massage", "hot-stone"]
  },
  {
    id: 13,
    slug: "gun-massage",
    title: "Gun Massage (Percussion Therapy)",
    category: "massage",
    description: "Modern deep tissue treatment with a professional massage gun.",
    about: [
      "State-of-the-art percussive acoustic technology meets traditional manual therapy. Using high-frequency medical-grade percussion devices, rapid pulses reach 16mm deep into the muscle belly.",
      "Instantly desensitizes painful trigger points and increases localized blood flow by up to 300%."
    ],
    duration: "30-60 minutes",
    bookingNote: "Subject to branch availability",
    locationsNote: "All branches",
    benefits: [
      "Delivers rapid acoustic vibrations that disarm tight muscle spasms effortlessly.",
      "Reaches deeper than human fingers alone without creating surface bruising.",
      "Perfect quick-relief treatment for calves, IT bands, trapezius, and lower back."
    ],
    technique: [
      "Professional percussion applicator with interchangeable dampening heads.",
      "Calibrated amplitude applied in 60-second intervals per muscle cluster, followed by soothing manual smoothing."
    ],
    journey: [
      {
        num: "01",
        title: "Target Mapping",
        desc: "Identification of hypertonic trigger zones and stubborn knots."
      },
      {
        num: "02",
        title: "Percussive Application",
        desc: "Calibrated percussion treatment across tight muscle clusters."
      },
      {
        num: "03",
        title: "Manual Integration",
        desc: "Manual effleurage smoothing strokes to flush lymphatic drainage."
      }
    ],
    preparation: [
      "Avoid direct percussion over bone prominences, fractures, or acute inflammation.",
      "Can be experienced fully clothed or with traditional spa drape."
    ],
    image: "/assets/just-relax/treatments/gun-massage.jpg",
    serviceId: "gun-massage",
    relatedSlugs: ["sports-massage", "deep-tissue", "swedish-massage"]
  },
  {
    id: 14,
    slug: "lomi-lomi-massage",
    title: "Lomi Lomi Massage",
    category: "massage",
    description: "Ancient Hawaiian healing art massage.",
    about: [
      "Originating in traditional Hawaiian healing, Lomi Lomi ('loving touch') uses broad, continuous, wave-like forearm strokes that travel across multiple parts of the body simultaneously.",
      "The unbroken rhythm mimics the tranquil rolling waves of the Pacific ocean, calming the mind and dissolving deep physical resistance."
    ],
    duration: "75-90 minutes",
    bookingNote: "Subject to branch availability",
    locationsNote: "All branches",
    benefits: [
      "Unbroken full-body strokes prevent the brain from over-analyzing the massage pattern, triggering profound release.",
      "Gentle joint mobilization and rotational stretches release stored emotional stress.",
      "Enhances systemic lymphatic drainage and energy flow."
    ],
    technique: [
      "Therapist utilizes forearms and palms in sweeping, continuous figures of eight.",
      "Seamless transitions across upper and lower body using warm tropical botanical oils."
    ],
    journey: [
      {
        num: "01",
        title: "Grounding Breathing",
        desc: "Synchronized deep breathing to align focus and release mental stress."
      },
      {
        num: "02",
        title: "Wave-Form Bodywork",
        desc: "Continuous, rhythmic forearm strokes traversing the entire length of the body."
      },
      {
        num: "03",
        title: "Harmonic Awakening",
        desc: "Warm moist compress application and meditative rest."
      }
    ],
    preparation: [
      "Arrive 15 minutes before your scheduled ritual to settle comfortably.",
      "Embrace the fluid, full-body drape and flow of this ancient technique."
    ],
    image: "/assets/just-relax/treatments/lomi-lomi-massage.jpg",
    serviceId: "lomi-lomi-massage",
    relatedSlugs: ["swedish-massage", "hot-stone", "argan-oil-massage"]
  },
  {
    id: 15,
    slug: "therapist-massage",
    title: "Therapist Massage",
    category: "massage",
    description: "Customized therapeutic massage by expert therapists.",
    about: [
      "The ultimate bespoke bodywork experience. Rather than adhering to a single rigid protocol, our senior master therapist assesses your muscular condition on arrival and crafts an individualized fusion.",
      "May combine elements of deep tissue, acupressure, Swedish gliding, and trigger point therapy to deliver your exact desired outcome."
    ],
    duration: "60-90 minutes",
    bookingNote: "Subject to branch availability",
    locationsNote: "All branches",
    benefits: [
      "100% customized to your unique muscular anatomy, tension points, and fatigue level.",
      "Combines best-of-breed modalities for optimal therapeutic efficacy.",
      "Supervised by our most experienced master therapists."
    ],
    technique: [
      "Initial palpation test to diagnose areas of hypertonicity.",
      "Adaptive application of therapeutic modalities adjusted in real-time based on muscle feedback."
    ],
    journey: [
      {
        num: "01",
        title: "Diagnostic Intake",
        desc: "Discussion of your lifestyle, sleep, tension zones, and goals."
      },
      {
        num: "02",
        title: "Bespoke Fusion Therapy",
        desc: "Tailored combination of massage modalities applied with precision."
      },
      {
        num: "03",
        title: "Wellness Summary",
        desc: "Therapist recommendations for posture, tension management, and follow-up."
      }
    ],
    preparation: [
      "Arrive 15 minutes prior for an in-depth consultation with your therapist."
    ],
    image: "/assets/just-relax/treatments/therapist-massage.jpg",
    serviceId: "therapist-massage",
    relatedSlugs: ["deep-tissue", "swedish-massage", "sports-massage"]
  },
  {
    id: 16,
    slug: "full-body-waxing",
    title: "Full Body Waxing",
    category: "grooming",
    description: "Professional full-body waxing service.",
    about: [
      "Discreet, hygienic, and precise body grooming performed in private suites. We use premium hypoallergenic hot and strip waxes infused with soothing chamomile and azulene to minimize redness and discomfort.",
      "Leaves skin silky smooth, hair-free, and clean for 4 to 6 weeks."
    ],
    duration: "60-90 minutes",
    bookingNote: "Subject to branch availability",
    locationsNote: "All branches",
    benefits: [
      "Long-lasting hair removal with significantly finer and softer regrowth.",
      "Exfoliates top layer of dead skin while removing hairs from the root.",
      "Carried out with complete professional discretion in private suites."
    ],
    technique: [
      "Skin preparation with sanitizing and numbing botanical pre-wax lotion.",
      "Low-temperature hot wax applied to delicate zones, followed by soothing post-depilatory tea tree oil."
    ],
    journey: [
      {
        num: "01",
        title: "Skin Preparation",
        desc: "Cleansing and degreasing of treatment areas with soothing toner."
      },
      {
        num: "02",
        title: "Precise Waxing",
        desc: "Application of premium temperature-calibrated wax with swift, gentle removal."
      },
      {
        num: "03",
        title: "Calming Emulsion",
        desc: "Cooling aloe vera and anti-inflammatory lotion applied to soothe follicles."
      }
    ],
    preparation: [
      "Hair should be at least 5mm in length (approx. 2-3 weeks of growth).",
      "Avoid sun exposure, hot tubs, or strenuous workouts for 24 hours post-waxing."
    ],
    image: "/assets/just-relax/treatments/full-body-waxing.jpg",
    serviceId: "full-body-waxing",
    relatedSlugs: ["full-body-shaving", "royal-moroccan", "swedish-massage"]
  },
  {
    id: 17,
    slug: "full-body-shaving",
    title: "Full Body Shaving",
    category: "grooming",
    description: "Professional body shaving service.",
    about: [
      "A pain-free, comfortable alternative to waxing. Using professional single-use surgical-grade razors, sanitizing foam, and lubricating oils, our groomers deliver an impeccably clean and smooth finish across any desired areas.",
      "Includes skin soothing balms to eliminate razor burn, irritation, or ingrown hairs."
    ],
    duration: "60-90 minutes",
    bookingNote: "Subject to branch availability",
    locationsNote: "All branches",
    benefits: [
      "Completely painless grooming experience with instant results.",
      "Guaranteed single-use sterile blades and hospital-grade sanitization.",
      "Perfect for athletic events, photo sessions, or personal comfort."
    ],
    technique: [
      "Warm towel prep to soften follicles followed by rich conditioning lather.",
      "Skilled multi-pass shaving followed by antiseptic splash and soothing post-shave balm."
    ],
    journey: [
      {
        num: "01",
        title: "Warm Towel Prep",
        desc: "Hot towels applied to soften hair follicles and open skin pores."
      },
      {
        num: "02",
        title: "Discreet Shaving",
        desc: "Gentle shaving using fresh sterile single-use blades and conditioning cream."
      },
      {
        num: "03",
        title: "Soothe & Nourish",
        desc: "Antiseptic mist and cold-pressed hydrating lotion applied to calm skin."
      }
    ],
    preparation: [
      "No special preparation required. Clean and private shower suites available on site."
    ],
    image: "/assets/just-relax/treatments/full-body-shaving.jpg",
    serviceId: "full-body-shaving",
    relatedSlugs: ["full-body-waxing", "royal-moroccan", "turkish-bath"]
  }
];

