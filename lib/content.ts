/**
 * Typed content constants, transcribed verbatim from
 * `Website content for DAHF.pdf`. Do not rewrite this copy (CLAUDE.md §10).
 *
 * Wording is the client's. Only structure is ours.
 */

import type { MotifVariant } from "@/components/motif";

/**
 * A photographic slot.
 *
 * No photography has been supplied (CLAUDE.md §0.12), so every `src` below is
 * absent and <Figure> stands a folk motif in its place. Adding a photo is a
 * one-line change here — drop the file in /public/images and set `src`.
 *
 * `alt` is written now, from the subject the client specified. It describes the
 * INTENDED photograph, so confirm it matches what actually lands before launch:
 * a wrong alt is worse than a late one.
 */
export type FestivalImage = {
  src?: string;
  alt: string;
  motif?: MotifVariant;
};

/**
 * The hero band. The content PDF asks for "a rotating image carousel featuring
 * a dance movement workshop, hospital arts programme, community mural, theatre
 * performance, nature-based arts session, elder engagement programme,
 * children's creative workshop, and a public art intervention in Delhi."
 *
 * Built as the rotating carousel the brief specifies — see <HeroCarousel> and
 * CLAUDE.md §0.10. This is a seventh animation moment beyond §4's six, added on
 * explicit client direction.
 */
export const HERO_STRIP: FestivalImage[] = [
  {
    src: "/images/homepagecarousel/slide-01.jpg",
    alt: "Participants raising their arms in a movement session on the lawn beside a historic domed tomb in Lodhi Garden",
    motif: "daisy",
  },
  {
    src: "/images/homepagecarousel/slide-02.jpg",
    alt: "A group holding hands in a circle under a tree at an evening gathering in the park, one person stepping through a hoop",
    motif: "kalash",
  },
  {
    src: "/images/homepagecarousel/slide-03.jpg",
    alt: "Two participants colouring in a large hand-drawn poster that spells ARTS, with crayons and markers on the grass",
    motif: "star",
  },
  {
    src: "/images/homepagecarousel/slide-04.jpg",
    alt: "A man and two children smiling behind a colourful hand-drawn FESTIVAL poster in the park",
    motif: "stairs",
  },
  {
    src: "/images/homepagecarousel/slide-05.jpg",
    alt: "Participants stretching their arms up in a group movement exercise in front of a domed tomb at sunset",
    motif: "daisy",
  },
  {
    src: "/images/homepagecarousel/slide-06.jpg",
    alt: "A volunteer photographing a smiling participant holding a handwritten note, on a lawn in Lodhi Garden",
    motif: "kalash",
  },
  {
    src: "/images/homepagecarousel/slide-07.jpg",
    alt: "Volunteers and participants seated on a rainbow parachute cloth beneath a hand-painted Poetry Corner sign",
    motif: "stairs",
  },
  {
    src: "/images/homepagecarousel/slide-08.jpg",
    alt: "People forming an arch with their arms beside a tomb, while a participant draws on a large sheet in the foreground",
    motif: "star",
  },
];

/** One editorial image inside the What is Arts & Health section. */
export const WHAT_IS_ARTS_HEALTH_IMAGE: FestivalImage = {
  src: "/images/what-is-arts-and-health.jpg",
  alt: "A collaborative artwork of swirling purple and blue pastel with orange crepe paper, painted leaves and splashes of red, green and yellow paint",
  motif: "daisy",
};

/** A wide Delhi image inside the Why Delhi block. */
export const WHY_DELHI_IMAGE: FestivalImage = {
  src: "/images/why-delhi.jpg",
  alt: "Participants holding their drawings in front of a monument at Lodhi Garden",
  motif: "stairs",
};

/** Beside the closing call to action. */
export const FINAL_CTA_IMAGE: FestivalImage = {
  src: "/images/cta-hands.jpg",
  alt: "A circle of hands joined together at the centre of a group",
  motif: "star",
};

export const FESTIVAL = {
  name: "Delhi Arts & Health Festival",
  shortName: "DAHF",
  tagline: "Reimagining Delhi as the Capital of Care",
  dates: "2 to 6 December 2026",
  datesLine: "2 to 6 December 2026 | Delhi, India",
  location: "Delhi, India",
  subheading:
    "Reimagining Delhi as the Capital of Care through arts, health, wellbeing, creativity, and community.",
  introParagraphs: [
    "The Delhi Arts & Health Festival (DAHF) is a city-wide initiative exploring the role of arts and creativity in health, wellbeing, care, and social connection.",
    "The festival brings together artists, healthcare professionals, researchers, educators, policymakers, organisations, and the public to imagine healthier futures for individuals, communities, and cities.",
  ],
} as const;

export const CONTACT = [
  { role: "General enquiries", email: "delhiartsandhealthfestival@gmail.com" },
  { role: "Partnerships and media", email: "partnerships.dahf@gmail.com" },
  { role: "Programming", email: "curation.dahf@gmail.com" },
  { role: "Sponsorship and funding", email: "fundraising.dahf@gmail.com" },
] as const;

export const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/delhiartsandhealthfestival",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/delhi-arts-and-health-festival/",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@DelhiArtsandHealthFestival",
  },
] as const;

export const FORMS = {
  preFestivalActivations: "https://forms.gle/3d5C56X9yva6AVJF8",
  festivalWeek: "https://forms.gle/yvkQMSHDnrd5Ye7v6",
  volunteer: "https://forms.gle/6hLFTHtdMsBd3XxP6",
  partner: "https://forms.gle/PnyLnSxBAEV5hyFs8",
  expressionOfInterest: "https://forms.gle/wpNtqojvKord8Kww6",
  factSheet:
    "https://docs.google.com/document/d/19_JJlEhz4D8SIDchD5tAkZBc2laLfywa2a2kb6r8n3A/edit",
  pressFaqs:
    "https://docs.google.com/document/d/1m66A1MgZiDp4gVXt3p7u6R7YIW3PpLqlzFGqraS__MU/edit?usp=sharing",
  programmes: "https://canva.link/zesmajihrnqgb4x",
} as const;

/**
 * The header CTA is labelled "Register" rather than "Stay Informed" — which
 * resolves the open question CLAUDE.md §0.12 raised (neither of the two
 * registration forms was labelled "Stay Informed", so it never had a clear
 * destination). "Register" points naturally at one of them; pointed at
 * Festival Week as the closer match to a header-level CTA. Swap this one
 * line if the client would rather it go to Pre-Festival Activations, or add
 * a second control if both need their own link.
 */
export const REGISTER_HREF: string = FORMS.festivalWeek;

/** Milaap fundraiser page for the festival — the client's payment link. */
export const DONATE_HREF: string =
  "https://milaap.org/fundraisers/support-the-delhi-arts-and-health-festival/deeplink?deeplink_type=paytm";

/**
 * Three top-level categories, each a dropdown of the pages/sections under it.
 * The category label itself has no href and isn't a page — every one of the
 * three would otherwise duplicate its own first child (e.g. "About" and
 * "About DAHF" pointing at the same route), so it's a hover/focus trigger
 * only, not a dead-end link pretending to be live.
 *
 * "Festival Team" and "Advisory Board" are their own routes now (they used
 * to be anchors into a single /team page; /team redirects to /festival-team).
 */
export const NAV = [
  {
    label: "About",
    children: [
      { label: "About DAHF", href: "/about" },
      { label: "Programme", href: "/programme" },
      { label: "Pre-Festival Events", href: "/pre-festival-events" },
    ],
  },
  {
    label: "Team",
    children: [
      { label: "Festival Team", href: "/festival-team" },
      { label: "Advisory Board & Consultants", href: "/advisory-board" },
    ],
  },
  {
    label: "Get Involved",
    children: [
      { label: "Be a part of DAHF", href: "/get-involved" },
      { label: "Press & Media", href: "/press" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
] as const;

/** Flat sitemap for the footer — plain page names, not the header's
 * marketing-flavoured dropdown labels ("Be a part of DAHF" reads fine as a
 * hover menu item, oddly breezy in a plain utility sitemap list). */
export const FOOTER_LINKS = [
  { label: "About", href: "/about" },
  { label: "Programme", href: "/programme" },
  { label: "Pre-Festival Events", href: "/pre-festival-events" },
  { label: "Festival Team", href: "/festival-team" },
  { label: "Advisory Board", href: "/advisory-board" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Press", href: "/press" },
  { label: "Contact", href: "/contact" },
] as const;

/** Marquee words, in order (CLAUDE.md §4). */
export const MARQUEE_WORDS = [
  "workshops",
  "performances",
  "exhibitions",
  "panels",
  "talks",
  "art installations",
  "research",
  "community experiences",
  "conversations",
] as const;

// ---------------------------------------------------------------------------
// Home
// ---------------------------------------------------------------------------

export const GLOBAL_ECOSYSTEM = {
  heading: "Part of a Growing Global Ecosystem",
  body: "The Delhi Arts & Health Festival is inspired and co-produced by the Global South Arts & Health Initiative (GSAH), established by the Global Arts in Medicine Fellowship (GAIMF). DAHF joins a growing ecosystem of arts and health festivals, conferences, healthcare programmes, and community initiatives across India and the world, including the Pune Arts & Health Festival, the Mumbai Arts & Health Festival, and arts and health gatherings, networks, and research collaborations taking place across Africa, Europe, North America, Latin America, Asia, and the Pacific.",
} as const;

export const WHAT_IS_ARTS_HEALTH = {
  heading: "What is Arts & Health?",
  paragraphs: [
    "Across the world, artists, healthcare professionals and communities are working together to improve health outcomes, strengthen social cohesion, and create more humane systems of care.",
    "The Delhi Arts & Health Festival aims to make this growing field visible, accessible, and relevant within the Indian context.",
  ],
} as const;

export const WHY_ARTS_HEALTH_COMMUNITY = [
  {
    term: "Creativity",
    body: "Creativity helps us make meaning of our experiences, express ourselves, process change, and imagine new possibilities.",
    accent: "pink",
  },
  {
    term: "Care",
    body: "Health is shaped by more than medicine. Care lives in our relationships, environments, cultures, and communities.",
    accent: "maroon",
  },
  {
    term: "Community",
    body: "Connection, belonging, participation, and collective wellbeing are essential to healthier societies.",
    accent: "purple",
  },
] as const;

export const WHY_DELHI = {
  heading: "Why Delhi?",
  lead: "Delhi is a city shaped by memory, migration, diversity, resilience, and reinvention. It is also home to some of India's leading healthcare institutions, universities, cultural organisations, researchers, artists, policymakers, and community initiatives. Few cities are as uniquely positioned to bring together conversations around health, culture, education, public life, and wellbeing. For DAHF, Delhi is not simply the location of the festival. It is both the context and the collaborator.",
  pillars: [
    {
      term: "Cultural Density",
      body: "Home to artists, performers, museums, cultural centres, festivals, and centuries of living traditions.",
      accent: "yellow",
    },
    {
      term: "Healthcare Infrastructure",
      body: "A city anchored by major hospitals, public health institutions, medical colleges, and healthcare innovators.",
      accent: "lime",
    },
    {
      term: "Policy & Systems Influence",
      body: "Where conversations around health, education, culture, and social development can influence national discourse.",
      accent: "pink",
    },
    {
      term: "Global Connections",
      body: "Embassies, international organisations, universities, foundations, and cultural networks make Delhi a uniquely connected city.",
      // Stays teal: these pillars sit on navy, where teal is 5.8:1 and maroon
      // would be 2.1:1. Only the "Care" column on cream moved to maroon.
      accent: "teal",
    },
  ],
} as const;

export const STATS = [
  { value: 5, suffix: "", label: "Days" },
  { value: 150, suffix: "+", label: "Experiences" },
  { value: 100, suffix: "+", label: "Artists, Facilitators & Speakers" },
  { value: 20, suffix: "+", label: "Venues Across Delhi" },
  { value: 10000, suffix: "+", label: "Participants" },
] as const;

export type Pathway = {
  term: string;
  body: string;
  bg: string;
  image: FestivalImage;
};

export const PATHWAYS: Pathway[] = [
  {
    term: "Reflect",
    body: "Panels, talks, conversations, roundtables, and research exchanges.",
    bg: "pink",
    image: {
      src: "/images/pathway-reflect.jpg",
      alt: "A seated circle of participants in conversation during a workshop",
      motif: "star",
    },
  },
  {
    term: "Immerse",
    body: "Workshops, movement practices, expressive arts, creative exploration, participatory experiences, and skill-building sessions.",
    bg: "yellow",
    image: {
      src: "/images/pathway-immerse.jpg",
      alt: "Hands finger-painting together across a large shared sheet",
      motif: "daisy",
    },
  },
  {
    term: "Discover",
    body: "Exhibitions, installations, public art, storytelling projects, and interactive spaces.",
    bg: "red",
    image: {
      src: "/images/pathway-discover.jpg",
      alt: "A large street-art mural covering the wall of a Delhi building",
      motif: "stairs",
    },
  },
  {
    term: "Energise",
    body: "Performances, music, theatre, dance, community celebrations, and collective experiences.",
    bg: "lime",
    image: {
      src: "/images/pathway-energise.jpg",
      alt: "Performers mid-scene in a theatre production",
      motif: "kalash",
    },
  },
  {
    term: "Refresh",
    body: "Community spaces, wellbeing zones, resource hubs, marketplaces, and opportunities to pause, connect, and recharge.",
    bg: "purple",
    image: {
      src: "/images/pathway-refresh.jpg",
      alt: "A lit candle beside a watercolour painting in a quiet corner",
      motif: "daisy",
    },
  },
];

export const THEMATIC_AREAS = [
  "Mental Health & Emotional Wellbeing",
  "Creativity & Self-Expression",
  "Community & Collective Care",
  "Arts in Healthcare",
  "Public Health & Social Change",
  "Gender, Sexuality & Queer Wellbeing",
  "Disability, Access & Inclusion",
  "Play, Joy & Celebration",
  "Arts, Culture & Heritage",
  "Nature, Ecology & Sustainability",
  "Research, Education & Professional Practice",
] as const;

export const FINAL_CTA = {
  heading: "Help Shape Delhi's First Arts & Health Festival",
  body: "Whether you are an artist, researcher, healthcare professional, organisation, volunteer, funder, or simply curious, there is a place for you in this growing movement.",
} as const;

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------

export const ABOUT = {
  heading: "Reimagining Delhi as the Capital of Care",
  question: "What would it look like if we placed care at the centre of city life?",
  opening: [
    "The Delhi Arts and Health Festival begins with a question that sounds simple until you sit with it. What would Delhi feel like if care were not something you went searching for in a crisis, but something woven quietly into everyday life?",
    "Many of us are carrying more than we say out loud. The pressure of keeping up, the ache of feeling alone in a crowded city, grief that has nowhere to go, the slow burn of exhaustion. Our hospitals and clinics do remarkable work. But health has never lived in hospitals alone. It lives in the people we belong to, the stories we are allowed to tell, and the art that helps us feel understood.",
    "DAHF brings together artists, doctors, therapists, researchers, teachers, and whole communities around a single belief: creativity is not a decoration at the edges of health. It belongs at the centre of it.",
    "For five days this December, we turn parts of Delhi into places to make, move, listen, and heal together. This is more than a festival. It is an invitation to imagine what a Capital of Care could actually look like.",
  ],
  vision: {
    heading: "Our Vision",
    body: "To nurture a future where arts and creativity are recognised, valued, and integrated as essential to health, healing, and human wellbeing.",
  },
  mission: {
    heading: "Our Mission",
    paragraphs: [
      "Our mission is to create opportunities for artists, healthcare professionals, researchers, educators, policymakers, cultural practitioners, and communities to come together across disciplines, share knowledge, and explore how arts and creativity can enrich health and wellbeing.",
      "Through collaboration, public engagement, and creative exchange, we seek to strengthen the arts and health ecosystem and inspire more compassionate, connected, and inclusive approaches to care and community wellbeing.",
    ],
  },
  globalMomentum: {
    heading: "Global momentum",
    paragraphs: [
      "Around the world, institutions such as the World Health Organization, University College London, and Johns Hopkins University have invested in research on how the arts support health, ease isolation, and improve quality of life. Hospitals are bringing artists into care teams, not as an afterthought, but as part of how people get better.",
      "DAHF is not introducing a new idea. It is joining a global movement that India has every reason to help lead.",
    ],
  },
  research: [
    {
      term: "900+ studies",
      body: "reviewed by the World Health Organization, pointing to the role of the arts in improving mental and physical health.",
    },
    {
      term: "Social prescribing",
      body: "clinicians referring patients to arts and community activities is now embedded in NHS England and practised in more than 30 countries.",
    },
    {
      term: "India's National Health Policy 2017",
      body: "emphasises preventive and promotive health and the mainstreaming of traditional practices such as Yoga and AYUSH, recognising culture and community as part of how people stay well.",
    },
    {
      term: "In India, 1 in 7 Indians",
      body: "lives with a mental health concern (NIMHANS, 2023).",
    },
  ],
  whyDelhi: {
    heading: "Why Delhi",
    paragraphs: [
      "A city shaped by migration, memory, culture and constant change, Delhi brings together diverse communities, creative practices and a rich healthcare ecosystem. It offers a powerful setting to explore what arts and health can mean in a contemporary Indian city.",
      "India has long recognised the relationship between creativity, community and healing. Our art forms, rituals, crafts and collective practices have supported people through joy, grief, celebration, healing and change across generations.",
      "DAHF builds on this indigenous knowledge while bringing it into conversation with contemporary health and mental health practice. The festival brings practitioners, communities and individuals together to experience, explore and expand the role of the arts in health, healing and wellbeing.",
    ],
  },
  gsah: {
    heading: "The Global South Arts and Health Initiative",
    paragraphs: [
      "DAHF is inspired and co-produced by the Global South Arts and Health Initiative (GSAH), an international network advancing arts and health education, research, and practice across the Global South.",
      "GSAH was established in 2023 by the Global Arts in Medicine Fellowship (GAIMF). It connects practitioners, researchers, healthcare professionals, artists, and institutions through collaborations, fellowships, conferences, and shared learning. As part of this network, DAHF links local practice in Delhi to conversations happening across regions and continents.",
    ],
  },
  indiaMoment: {
    heading: "India and Delhi's moment",
    paragraphs: [
      "India has always understood the closeness between creativity and healing. Our rituals, music, crafts, and communities have carried people through illness, loss, and change for generations. Yet somewhere along the way, our modern conversations about health drifted away from all of that.",
      "At a time when cities face rising mental health pressures, loneliness, migration, and environmental stress, there is a real chance to bring care and creativity back into the same room. Delhi is a fitting place to start. It is a city shaped by memory and migration, by contradiction and constant reinvention, and it holds both the density of culture and the depth of healthcare that this work needs.",
    ],
  },
  hopes: [
    "Stronger collaboration between arts, health, education and community sectors",
    "Greater integration of creative practice within healthcare and community wellbeing settings",
    "Increased visibility and opportunities for artists working in care and social impact",
    "More research, documentation and evidence emerging from India",
    "Stronger national and international collaborations across the Global South",
    "A growing public understanding that creativity is fundamental to health, wellbeing and collective care",
  ],
} as const;

// ---------------------------------------------------------------------------
// Programme
// ---------------------------------------------------------------------------

export const PROGRAMME = {
  heading: "Five Days. Five Themes. Many Conversations",
  intro:
    "The Delhi Arts and Health Festival unfolds across the city through workshops, performances, exhibitions, conversations, and shared experiences. You can follow a single thread through the week or wander between them.",
  // "(proposed)" dropped on request — flagging since the source PDF carried
  // it deliberately (the five-day structure wasn't presented as final there).
  // Worth a client check if that's still true; not ours to relitigate here.
  shapeHeading: "Shape of the week",
  shapeIntro:
    "We have built the five days as a journey inward and then back out toward each other. Each day carries a name and a feeling.",
} as const;

/** Hero image, top of the Programme page — matches the two-column
 * hero-style treatment on Home and About (CLAUDE.md §0.11's layout, applied
 * a third time for a consistent "page hero" pattern site-wide). */
export const PROGRAMME_HERO_IMAGE: FestivalImage = {
  src: "/images/programme-hero.jpg",
  alt: "Participants in a row at an evening workshop, laughing and dancing with their arms raised",
  motif: "kalash",
};

export type Day = {
  n: string;
  name: string;
  english: string;
  body: string;
  bg: string;
  image: FestivalImage;
};

/** Hindi/Urdu day names are non-negotiable content (CLAUDE.md §10). */
export const DAYS: Day[] = [
  {
    n: "Day 1",
    name: "Pehchaan",
    english: "Identity",
    body: "We begin with the self. Who are we, underneath the roles we carry and the pace we keep?",
    bg: "navy",
    image: {
      alt: "A participant pausing in a moment of self-reflection",
      motif: "daisy",
    },
  },
  {
    n: "Day 2",
    name: "Bayaan",
    english: "Expression",
    body: "What happens when we give that inner world a voice, through art, movement, and story?",
    bg: "pink",
    image: {
      alt: "Someone telling their story to a listening group",
      motif: "stairs",
    },
  },
  {
    n: "Day 3",
    name: "Armaan",
    english: "Longing",
    body: "The things we hope for, the things we grieve, and everything we are still reaching toward.",
    bg: "purple",
    image: {
      alt: "A quiet, contemplative moment in a festival session",
      motif: "star",
    },
  },
  {
    n: "Day 4",
    name: "Karwaan",
    english: "The Journey Together",
    body: "Care is not a solo act. This is the day we turn toward community.",
    bg: "teal",
    image: {
      alt: "A group working together in a community session",
      motif: "kalash",
    },
  },
  {
    n: "Day 5",
    name: "Muskaan",
    english: "Joy",
    body: "We end in celebration, because joy is not the opposite of care. It is part of it.",
    bg: "yellow",
    image: {
      alt: "People celebrating together at a festival gathering",
      motif: "daisy",
    },
  },
];

export const WAYS_TO_EXPERIENCE = [
  {
    term: "Reflect",
    body: "Panels, talks, roundtables, and research exchanges for anyone who wants to go deeper into the ideas.",
  },
  {
    term: "Immerse",
    body: "Hands-on workshops, movement practices, and expressive arts sessions where you take part rather than watch.",
  },
  {
    term: "Discover",
    body: "Exhibitions, installations, public art, and interactive spaces to explore at your own pace.",
  },
  {
    term: "Energise",
    body: "Performances, music, dance, theatre, and celebrations that bring people together in one room.",
  },
  {
    term: "Refresh",
    body: "Wellbeing zones, quiet corners, resource hubs, and gathering spaces to pause, connect, and catch your breath.",
  },
] as const;

export const FESTIVAL_EXPLORES = {
  heading: "Festival Thematic Areas",
  items: [
    {
      term: "Mental Health and Emotional Wellbeing",
      body: "Resilience, healing, and learning to name how we actually feel.",
    },
    {
      term: "Creativity and Self-Expression",
      body: "Art as a way to reflect, understand ourselves, and grow.",
    },
    {
      term: "Community and Collective Care",
      body: "Belonging, connection, and looking after one another.",
    },
    {
      term: "Arts in Healthcare",
      body: "Creative practice inside hospitals, clinics, and care settings.",
    },
    {
      term: "Public Health and Social Change",
      body: "Using the arts to raise awareness and shift systems.",
    },
    {
      term: "Gender, Sexuality and Queer Wellbeing",
      body: "Identity, visibility, inclusion, and care.",
    },
    {
      term: "Disability, Access and Inclusion",
      body: "Designing participation so that more people can take part.",
    },
    {
      term: "Arts, Culture and Heritage",
      body: "Traditional practice, cultural memory, and living knowledge.",
    },
    {
      term: "Nature, Ecology and Sustainability",
      body: "The link between our wellbeing and the world around us.",
    },
    {
      term: "Play, Joy and Celebration",
      body: "Creativity as pleasure and shared delight.",
    },
    {
      term: "Research, Education and Professional Practice",
      body: "Learning, evidence, and training for the field.",
    },
  ],
} as const;

export const TIMELINE = [
  { when: "August 2026", what: "First programme announcements." },
  { when: "September 2026", what: "Workshops, speakers, and performances revealed." },
  { when: "October to November 2026", what: "The full festival schedule goes live." },
  { when: "December 2026", what: "The festival takes place across Delhi." },
] as const;

// ---------------------------------------------------------------------------
// Team
// ---------------------------------------------------------------------------

export type Person = {
  name: string;
  /** Set when a headshot lands in /public/images/team. Falls back to a monogram. */
  photo?: string;
  pronouns?: string;
  role: string;
  tag?: string;
  bio: string[];
};

export const TEAM_INTRO = {
  heading: "The people behind the festival",
  body: "DAHF is built by a team that spans the arts, healthcare, research, and community work. Some of us come from clinics. Some from studios and stages. Some from classrooms and community organisations. What we share is a conviction that these worlds have far more to say to one another than they usually get the chance to.",
} as const;

export const LEADERSHIP: Person[] = [
  {
    name: "Dr Kunle Adewale",
    photo: "/images/team/kunle-adewale.jpg",
    pronouns: "he/him",
    role: "Chair and Global Development Lead, Global South Arts and Health",
    bio: [
      "Dr Kunle Adewale is a Nigerian-born, UK-based multimedia artist and a global arts and health leader. He founded the Arts in Medicine Projects, the Global Arts in Medicine Fellowship, and the Global Mental Health Fellowship, training over 1,000 professionals across 60 countries and impacting more than 60,000 people. As the Global Development Lead for the Global South Arts and Health Initiative, his programmes have reached over 500,000 people in 41 cities worldwide.",
      "Dr Kunle has pioneered major arts and health initiatives across Africa and worldwide through powerful collaborations with cultural organisations, government agencies, academic institutions, practitioners, and global health bodies. He is a Global Atlantic Fellow for Equity in Brain Health at the University of California, San Francisco. His humanitarian work spans children, youth, people with chronic illnesses and disabilities, people with dementia, refugees, and communities affected by conflict, and has been widely featured in international media.",
      'Recognised with multiple awards, including a dedicated "Kunle Adewale Day" in the US, he is also a Mandela Washington Fellow of President Barack Obama, a UK Commonwealth Youth Worker Award winner, and a Global Talent Exceptional Leader by Arts Council England. His global works have been endorsed by the Arts Council of England and the Smithsonian Museum, Washington, D.C. In 2025, he launched Young Leaders for Arts and Health, reaching over 300,000 people. He has featured on Voice of America, The Guardian UK, BBC Africa, TRT, France24, and Al Jazeera, among others. He currently leads one of the largest arts and health networks in the world, and is the 2025 recipient of the Social Impact Award for Community Development and Inclusion from the world\'s biggest entrepreneurship festival.',
    ],
  },
  {
    name: "Anvesha Vijay",
    photo: "/images/team/anvesha-vijay.jpg",
    pronouns: "they/she",
    role: "Festival Director",
    bio: [
      "Anvesha Vijay is a counselling psychologist, expressive arts therapy practitioner, and founder of Aatmanveshan, an integrative mental health practice that works at the intersection of psychology, expressive arts, and embodied healing. Her work brings together intermodal expressive arts, trauma-informed care, and relational approaches to support individuals and communities in reconnecting with their inner worlds, creativity, and sense of agency.",
      "A lifelong artist, Anvesha's relationship with the arts spans dance, poetry, expressive writing, and visual art. Trained in Kathak and currently training in hip-hop, she has performed at venues such as Talkatora Stadium and has exhibited and sold her artwork. Her artistic practice continues to inform her therapeutic work, shaping how she understands the body, movement, and creative expression as pathways for healing and transformation.",
      "Over the years, Anvesha has worked across NGOs, educational institutions, corporates, and psychiatric settings, designing and facilitating arts-based mental health programmes. Her work has been delivered in collaboration with organisations such as Sukoon Health, Life Insurance Corporation of India, Narayana Health, Concentrix, and HCL, as well as educational institutions including the National Insurance Academy, Ashoka University, Government Girls Colleges, and Blue Bells School. She has also worked extensively in psychiatric spaces, integrating expressive arts into both group and individual therapy to support recovery and emotional regulation.",
      "Alongside her therapeutic practice, she has developed employee resilience programmes and is currently building a curriculum centred on neurodivergent-affirmative and anti-ableist approaches to therapy, aimed at helping practitioners create more inclusive and accessible mental health spaces.",
      "Her work is grounded in trauma-informed, relational, and intersectional frameworks, drawing from somatic practices and trauma-informed care. She holds a Master's degree in Clinical Psychology and a Post Graduate Diploma in Expressive Arts Therapy from St. Xavier's College, Mumbai. Her advanced training includes a Certificate in Traumatic Stress Studies from the Trauma Research Foundation, Certified Clinical Trauma Professional (CCTP I and II) by Janina Fisher, and training in the Rhythm 2 Recovery model by Simon Faulkner.",
      "Anvesha has also been a Global Arts in Medicine Fellow and has presented her work at national symposiums, including with the Indian Association for Dance Movement Therapy. Her practice reflects a deep commitment to embedding mental health care within creative expression, community connection, and systemic transformation.",
    ],
  },
  {
    name: "Pragyan Behera",
    photo: "/images/team/pragyan-behera.jpg",
    pronouns: "she/her",
    role: "Festival Director",
    bio: [
      "Pragyan Behera is an expressive arts therapist, a dance movement therapy facilitator, multidisciplinary artist, and founder of The Safe Space Co., a psychosocial arts-based practice working at the intersection of creativity, embodiment, relational patterns, and emotional wellbeing. Her work integrates expressive arts, movement, somatic awareness, and reflective dialogue to support individuals and communities in reconnecting with their bodies, creativity, and sense of agency.",
      "A lifelong dancer and performer, Pragyan's artistic journey spans theatre, movement, and film. She has performed in stage productions including Shakespeare's A Midsummer Night's Dream and Barry Jones' production of Andrew Lloyd Webber's Jesus Christ Superstar, represented India at the Nile Group Festival's Egypt Oriental Dance Festival (2012), and appeared as an actor in the web series Couple Goals (Season 3). Having also studied film and media, her artistic practice continues to inform how she understands the body, storytelling, and performance as sites of expression and transformation.",
      "Over the past decade, Pragyan has worked across the intersections of arts, education, and psychosocial wellbeing, designing and facilitating expressive arts-based programmes for schools, universities, NGOs, and organisations. Her work has been delivered in collaboration with Smile Foundation, Salaam Baalak Trust, Empowering Minds, Artsphere, Symbiosis University, IIT, and Jagran Public School, alongside corporate partners including Google, HCL, Tata Power, NPCIL, Blue Star, and Benefit Cosmetics.",
      "Alongside her therapeutic practice, she has contributed to the design and scaling of arts-based learning initiatives within the EdTech sector, supporting experiential learning programmes across disciplines such as dance, music, visual arts, and public speaking for learners across India and global markets.",
      "Her practice is grounded in humanistic, trauma-informed, psychodynamically informed, and systemic perspectives, and is shaped by feminist and neurodivergence-affirmative approaches that recognise the relational, cultural, and structural contexts of wellbeing. She has completed training in Trauma-Informed Expressive Arts Therapy and is currently undertaking specialised training in sexual trauma-informed therapeutic practice.",
      'Pragyan is currently pursuing a PhD in Expressive Arts: Therapy, Education, Conflict Transformation and Peacebuilding at the European Graduate School, focusing on "Reimagining Womanhood: Expressive Arts Therapy and the Reclamation of Embodied Autonomy". She has presented her work at conferences and platforms, including those hosted by the Arisa Foundation, Pune, and is also a former Global Arts in Medicine Fellow, contributing to the growing arts and health ecosystem internationally.',
      "Her life and work stand as a testament to her commitment to advancing arts-based approaches to wellbeing, and to building more compassionate, creative, and connected systems of care.",
    ],
  },
  {
    name: "Jyotsna Ramachandran",
    photo: "/images/team/jyotsna-ramachandran.jpg",
    pronouns: "she/her",
    role: "Associate Festival Director",
    bio: [
      "Jyotsna Ramachandran is a psychologist and expressive arts therapy practitioner whose work sits at the intersection of mental health, arts, and community wellbeing. Holding Master's degrees in Social Work and Counselling Psychology, along with specialised training in Expressive Arts Therapy, she brings an interdisciplinary perspective to designing programmes, facilitating learning experiences, and creating spaces for reflection, dialogue, and connection through the arts.",
      "Rooted in Person-Centred and Expressive Arts Therapy approaches, her practice is informed by trauma-informed, queer-affirmative, and neurodivergence-affirming perspectives. Her work centres lived experience, relationships, and context, with a particular interest in how social identities, privilege, and systemic realities shape wellbeing.",
      "Her work extends beyond therapeutic practice into programme design, facilitation, training, and interdisciplinary collaboration across education, community, and workplace settings. She has designed and facilitated arts-based wellbeing programmes for schools, colleges, NGOs, healthcare organisations, and corporate teams, collaborating with organisations including DoctorDrama (Mumbai), The Art Sanctuary (Bengaluru), Manah Wellness (Pune), Noora Health, Reliance Brands Limited, Jagran News Media, Zinnov, Indifi Technologies, Nova Benefits, and Synergy Marine, while also contributing as a guest facilitator to training programmes conducted by the Creative Movement Therapy Association of India (CMTAI) and Swayam Foundation.",
      "A trained dancer with a longstanding engagement with writing and creative practice, Jyotsna believes creativity is fundamental to how we make meaning, build relationships, and foster belonging. She is interested in creating experiences that invite reflection, dialogue, and participation, while expanding the role of the arts in conversations around health, education, and community wellbeing.",
      "She also holds a Postgraduate Diploma in Expressive Arts Therapy from St. Xavier's College, Mumbai, and has pursued additional training in Dance Movement Therapy, Applied Buddhist Psychology, and Queer Affirmative Counselling Practice.",
      "Her work continues to be shaped by both professional practice and lived experience, as an arts enthusiast, parent, and lifelong learner, and reflects an ongoing commitment to making creativity more integral to health, education, and community life.",
    ],
  },
];

export const WIDER_TEAM_NOTE =
  "The festival is carried by a wider team and by seven working committees spanning programming and curation, partnerships and outreach, communications and design, operations and logistics, research and documentation, fundraising and grants, and health and ethics. Further team members will be added to this page as the festival takes shape.";

export const COMMITTEE: Person[] = [
  {
    name: "Shilka Agarwal",
    photo: "/images/team/shilka-agarwal.jpg",
    pronouns:"she/her",
    role: "Festival Implementation Lead",
    bio: [
      "A somatic and expressive arts therapist, researcher, multidisciplinary artist, and founder of Mind Movement Collective, Shilka Agarwal's work sits at the intersection of arts, trauma, embodiment, and our relationship with self.",
      "With over five years of experience in facilitation and therapeutic practice, and five years of prior experience in the corporate sector across marketing, branding, partnerships, and strategy, she brings together relational depth with systems thinking, creativity with implementation, and care with leadership.",
      "Her practice is grounded in trauma-informed approaches that invite people to be with themselves with greater care, compassion, curiosity, and structure as they navigate the ongoing process of becoming. For Shilka, healing is not about fixing ourselves but about creating the conditions to meet ourselves more fully.",
      "Art has been central to her own healing journey and continues to shape the way she works today: as a language for understanding, expressing, connecting, creating, and making meaning. What began as a personal search for healing gradually grew into a commitment to creating spaces where others can encounter themselves through creativity and embodied presence.",
      "Her writing and research have been published in Mad in South Asia and the Global Arts in Medicine Fellowship Anthology, reflecting her interest in arts, health, and community wellbeing. Beyond her therapeutic practice, she is a poet, theatre artist, dancer, and lifelong explorer of what becomes possible when art and care meet.",
      "As Festival Implementation Lead for the Delhi Arts & Health Festival, she brings together therapeutic depth, creative thinking, leadership, and systems-building to help shape a space where conversations around creativity, health, and collective wellbeing can deepen and flourish.",
    ],
  },
  {
    name: "Ananya Mahapatra",
    photo: "/images/team/ananya-mahapatra.jpg",
    pronouns:"she/her",
    role: "Committee Head — Research and Documentation",
    bio: [
      "Dr. Ananya Mahapatra is a psychiatrist with over 12 years of clinical and academic experience. An Alumni of All India Institute of Medical Sciences, New Delhi, and her research work has received multiple national and international academic recognitions. After more than a decade in academic and public health institutions, she transitioned into private practice, where her work increasingly began to move toward a deeper exploration of the inner life beyond diagnosis. Currently she is a Consultant with Cognis Mindcare & MAX Superspecialty Hospital, New Delhi.",
      "She is also a writer. Her short fiction and creative non-fiction have appeared in anthologies by Readomania and Kitaab International, USAWA Literary Magazine, Quillmark Magazine, and Champaca Publishers. Her work has been shortlisted and published in collections such as The Best Asian Short Stories 2018 and the Bristol Short Story Prize 2022, and she has been shortlisted twice for the Deodar Literary Prize in 2023 and 2024.",
      "Trained in Bibliotherapy, she also works at the intersection of psychiatry, reading, and reflective writing, exploring how stories, metaphors, and expressive writing can help individuals process grief, identity shifts, and transitions that often remain unspoken.",
      "She conducts therapeutic reading and reflective writing workshops that harness the psychological depth of literature and the healing potential of expressive writing practices. Through her work, she hopes to examine how language and storytelling can become not just a form of expression, but also a means to reclaim one's identity, emotions and narrative in this world.",
    ],
  },
  {
    name: "Preeti",
    photo: "/images/team/preeti.jpg",
    pronouns: "she/her",
    role: "Co-Committee Head — Logistics and Operations",
    bio: [
      "Preeti (she/her) is a Counselling Psychologist, Dance Movement Therapy facilitator, and Couples Therapist. Over the years, she's worked with individuals and groups across different age groups, using movement and the body as a way into things that are often hard to say out loud. She believes the body carries stories that words alone can't always hold, and her work is about creating space for people to listen to that.",
      "Alongside her individual practice, she works with couples navigating connection, conflict, and everything in between, and brings the same body-centred approach into how she thinks about relationships.",
      "Outside her practice, Preeti has volunteered as a crisis counselor and a sex educator, and continues to look for spaces where she can keep doing this kind of work - conversations that don't always find room elsewhere.",
      "In her free time, you'll find her dancing, painting, or lost in a book. For her, art and creativity aren't just tools for therapy - they're what sustain us. They hold our emotions and thoughts in ways we don't always realise, quietly doing the work of processing life alongside us.",
    ],
  },
  {
    name: "Nidhi",
    photo: "/images/team/nidhi.jpg",
    pronouns: "she/her",
    role: "Co-Committee Head — Logistics and Operations",
    bio: [
      "Nidhi is an event management professional with a passion for creating meaningful, people-centric experiences. With hands-on experience in corporate events, MICE, exhibitions, experiential marketing, and large-scale event operations, she has managed projects ranging from intimate experiences to events hosting thousands of attendees. Her expertise includes project coordination, client servicing, vendor and artist management, production planning, and on-ground execution, ensuring every event is delivered with precision and creativity.",
      "A lifelong learner with a strong interest in tourism, hospitality, branding, and experience design, Nidhi enjoys transforming ideas into memorable experiences that inspire connection and engagement. She is equally passionate about art, culture, wellness, and community-driven initiatives, believing that thoughtfully curated events can create lasting impact beyond the occasion itself.",
      "Beyond events, she finds inspiration in sketching, architecture, travel, reading novels, and discovering new music. These creative interests influence her approach to storytelling, design, and audience engagement.",
    ],
  },
  {
    name: "Ishmeet",
    photo: "/images/team/ishmeet.jpg",
    pronouns: "she/they",
    role: "Committee Head — Programming and Curation",
    bio: [
      "Ishmeet is an educator, psychotherapist, and drama & movement therapy facilitator whose work lies at the intersection of arts, mental health, learning, and community engagement.",
      "Ishmeet currently facilitates classrooms around happiness, well-being, and positive psychology across educational institutions, attempting to make learning experiential, accessible, and inclusive through storytelling, embodiment, and drama. Her research explores well-being through a physiological lens.",
      "Alongside her educational work, she facilitates therapeutic and expressive arts spaces with adolescents, queer folks, marginalized women, and shelter homes, where she designs interventions for emotional expression, resilience, and collective reflection.",
      "With a background in theatre, Ishmeet has worked across shadow theatre, street theatre, and stage performance. She has directed street plays in Delhi and Chandigarh addressing socio-political issues and has consistently used the performing arts as a medium for dialogue, awareness, and community engagement. She is also trained in Hindustani Classical Music and enjoys learning and playing a variety of musical instruments, bringing music and movement into her facilitation wherever appropriate.",
      "Ishmeet completed her B.A. (Psychology) from the University of Delhi and her M.A. (Psychology) from Punjabi University. She also holds a Postgraduate Certificate in Drama and Movement Therapy from VIMHANS, Delhi. Her work continues to integrate psychological science, creative arts, and embodied practice in educational, therapeutic, and community settings.",
    ],
  },
  {
    name: "Anukriti Chawla",
    photo: "/images/team/anukriti-chawla.jpg",
    pronouns: "she/her",
    role: "Committee Head — Fundraising and Grants",
    bio: [
      "Anukriti (she/her) is a Counselling Psychologist and Expressive Arts Therapy Practitioner who works from an intersectional person-centred lens, and takes a process oriented approach to mental healthcare and well-being. For her the arts are a medium to express stories that words often cannot tap into.",
      "Her artistic practice includes visual arts, craft and drama. She loves exploring new mediums and trying out new forms of creative expression. She has a deep personal connection with nature and incorporates that in her practice and as a way to ground herself.",
    ],
  },
  {
    name: "Riya",
    photo: "/images/team/riya.jpg",
    pronouns:"she/her",
    role: "Committee Head — Partnerships and Outreach",
    bio: [
      "Riya is a Dance Movement Therapy Facilitator and arts-based practitioner who creates movement and arts-based spaces for children, adults, and corporates. Her approach is rooted in the belief that any form of art - whether we experience, create, watch, listen, or witness - has the power to enrich, restore, and beautify our lives. Riya's artistic practice includes capoeira, belly dance, contemporary inspired intuitive movement and illustrative storytelling.",
      "Her past work spans NGOs, corporates, sports academies, open festivals, market fests, dancers, theatre practitioners, and more. Riya also supports wellness practitioners and purpose-led initiatives through partnerships, communication, and project support, helping meaningful work reach the communities it is intended to serve. These values of play, creativity through the arts guide her involvement with the Delhi Arts & Health Festival.",
    ],
  },
  {
    name: "Aarushi Panwar",
    photo: "/images/team/aarushi-panwar.jpg",
    pronouns:"she/her",
    role: "Committee Head — Communications and Design",
    bio: [
      "Aarushi is a psychotherapist and Expressive Arts Therapy Practitioner (ExAT-P) whose work is shaped by how arts can hold not only softness, but also play, intensity, grief, and chaos; allowing people to show up as they are. She is deeply curious about the inner and outer worlds people inhabit and move through, and how creative expression, connection & reflection can support emotional and sensory regulation.",
      "Alongside her private practice, she has experience across clinical & community settings with different populations & brings a neurodiversity-affirming, trauma-informed & client-centred approach to both individual and group work. Her work integrates talk therapy, intermodal expressive arts, embodied awareness, rhythm-informed processes, and nature-based practices, thoughtfully adapting to each person's unique context.",
      "Aarushi also draws upon nature-based ExAT practices, recognizing nature as an active co-facilitator. Her practice engages different elements of nature that mirror, hold & inform our inner worlds, to build a stronger connection with oneself and nature.",
      "Aarushi's artistic practice includes poetry, visual art, dance, storytelling, & hiking as a way of coming home to herself. Through DAHF, she hopes to co-create spaces where people can embrace curiosity, authenticity, connection, and experience the arts not as something to master, but as a way of belonging more deeply to themselves and one another.",
    ],
  },
];

export const ADVISORY_INTRO = {
  heading: "Guiding the Festival",
  body: "Our advisory board brings together respected voices across creative arts therapies, healthcare, accessibility, research, public art, and institutional strategy. They guide the festival's direction, protect its integrity, and keep us honest about the difference between good intentions and good practice.",
} as const;

export const ADVISORY_BOARD: Person[] = [
  {
    name: "Anshuma Kshetrapal",
    photo: "/images/team/anshuma-kshetrapal.jpeg",
    pronouns: "she/her",
    tag: "Creative Arts Therapies & Mental Health Integration",
    role: "Psychotherapist and Drama and Movement Therapist; Founder, The Color of Grey Cells; Co-founder, The Arts Therapists Colab",
    bio: [
      "Anshuma Kshetrapal is a drama and movement therapist, educator, researcher, and co-founder of many associations and organisations in the arts therapy space. She is the co-founder of The Arts Therapists Colab and runs a group mental health practice, The Color of Grey Cells, in Delhi. Her work sits at the intersection of embodied psychotherapy, arts-based practice, education, and community mental health.",
      "Anshuma has been actively involved in developing the field of drama and movement therapy in India through training programmes, supervision, curriculum design, public education, and advocacy. She teaches in academic and professional spaces and works to make arts therapies more accessible, ethical, and contextually grounded within Indian mental health settings. She is the past president of the Indian Association of Dance Movement Therapy and the current president of Drama Therapy India.",
      "Her current research explores decolonising arts therapy education in India, with a focus on how training, culture, power, and practice intersect. Across her work, Anshuma is committed to building community, training future therapists, and creating spaces where emotional health is taken seriously and the arts are an integral part of that.",
    ],
  },
  {
    name: "Shubham Srivastav",
    photo: "/images/team/shubham-srivastav.jpeg",
    pronouns: "she/her",
    tag: "Programme Curation & Festival Design",
    role: "Founder, The MoveVent Project",
    bio: [
      "A space-holder, facilitator, and founder of The MoveVent Project, while co-parenting Zanaan and ArtKaar Collective.",
      "Her journey moves through Dance Movement Therapy, Expressive Arts, Kathak, Theatre, and community work. Beyond the many roles she holds, what truly grounds her is a deep longing to nurture and co-create spaces where people can pause, move, feel, and find their way back to themselves.",
      "Each space she has facilitated has gently reminded her that healing is less about doing and more about being. More about listening. More about remembering.",
      "She loves hugs that feel like home, slow mornings, long walks with no destination, and conversations that feel like an exhale.",
    ],
  },
  {
    name: "Ritesh Sharma",
    photo: "/images/team/ritesh-sharma.jpeg",
    pronouns: "he/him",
    tag: "Public Art & Urban Interventions",
    role: "Project Director, St+art India Foundation",
    bio: [
      "Ritesh Sharma believes that meaningful change begins with the process. Whether in public art or in everyday life, he values consistency, thoughtful action, and showing up with intent, believing that when the process is honest, the outcomes naturally follow.",
      "Over the past decade, he has worked at the intersection of public art, cities, and communities, and currently serves as Project Director at St+art India Foundation. His work brings together artists, governments, institutions, and local communities to create public spaces that encourage dialogue, foster belonging, and strengthen the relationship between people and their cities.",
      "His perspective is shaped not only by his professional journey but also by his daily practice of meditation, movement, and mindful living. He does not see art and health as two separate disciplines, but as practices of paying attention, one to ourselves and the other to the world around us. He believes that the way we care for ourselves is reflected in the way we care for our families, our communities, and the spaces we share. For him, public art is not simply about beautifying places. It is about creating spaces where people feel a stronger sense of belonging.",
      "As a member of the Delhi Arts and Health Festival Advisory Board, he looks forward to contributing to conversations that place creativity, community, and wellbeing at the heart of healthier and more compassionate cities.",
    ],
  },
  {
    name: "Dr. Shruti Chakravarty",
    photo: "/images/team/shruti-chakravarty.jpeg",
    pronouns: "she/her",
    tag: "Legal, Policy & Rights-Based Frameworks",
    role: "Chief Advisor, Mariwala Health Initiative",
    bio: [
      "Shruti Chakravarty, PhD (cis woman; pronouns: she, her) has 20 years of experience in the social sector, as a mental health practitioner, researcher, trainer, and social worker. Her areas of engagement have been mental health, gender, and sexuality, from a rights-based perspective. She has an independent therapeutic practice based in Mumbai, has in-depth experience working with LGBTQIA+ clients in the therapeutic space, and has co-authored Queer Affirmative Counselling Practice (QACP): A Resource Book for Mental Health Practitioners in India. She is also the author of Homo and Juliet: Queer and Lesbian Love Stories. She has completed her PhD on the subject of queer intimacies from the Tata Institute of Social Sciences. Shruti is Chief Advisor and Training Team Lead at Mariwala Health Initiative (MHI) and also faculty at the Queer Affirmative Counselling Practice course run by MHI. She has also been an Assistant Professor of Psychology at KREA University.",
    ],
  },
  {
    name: "Dr. Vipul Rastogi",
    photo: "/images/team/vipul-rastogi.jpeg",
    pronouns: "he/him",
    tag: "Healthcare & Medical Systems",
    role: "Psychiatrist; Clinical Regional Head, Sukoon Health",
    bio: [
      "Dr. Vipul Rastogi is the Clinical Regional Head at Sukoon Health, Delhi NCR, and a TEDx speaker, with over two decades of experience in neuropsychiatry across the UK and India. Having worked in the UK's public health system and the private healthcare sector in India, he brings a rare blend of global clinical insight and practical expertise. He is among the few psychiatrists in India formally trained in both neurology and psychiatry, enabling him to take a uniquely integrated, brain and mind approach to mental health.",
      'Driven by a strong commitment to preventive mental healthcare, Dr. Rastogi focuses on early intervention and equipping individuals, especially young people, with the tools to navigate life\'s transitions. He is the author of the widely appreciated self-help book "What You Were Never Told: Journey from Adolescence to Adulthood," which empowers adolescents and young adults to better understand themselves and successfully transition into adult life.',
    ],
  },
  {
    name: "Prashant Das",
    photo: "/images/team/prashant-das.jpeg",
    pronouns: "he/him",
    tag: "Partnerships, CSR & Institutional Strategy",
    role: "Sustainability and CSR Specialist",
    bio: [
      "Prashant is a sustainability and CSR specialist with two decades of diverse experience across sectors. He has been part of leadership teams designing and implementing complex social investment strategies in health, education, livelihoods, and social entrepreneurship. In his work with corporates, non-profits, and government projects, he has built models for end-to-end solutions across industries including pharmaceuticals, energy, agriculture, fashion, textiles, and construction.",
      "With deep expertise in responsible sourcing, labour, and human rights, Prashant leads ESG responsibilities in his corporate role spanning South Asia and EMEA. His work on global compliance for supply chains complements his efforts to execute projects on circular economy. Prashant enjoys stakeholder management and building large-scale partnerships that drive solutions in corporate responsibility, sustainable labour, and supply chain practices, fostering measurable impact and behaviour change across ecosystems.",
    ],
  },
  {
    name: "Kavya Mukhija",
    photo: "/images/team/kavya-mukhija.jpeg",
    pronouns: "she/her",
    tag: "Diversity, Equity & Inclusion Practice",
    role: "Founder, Namastey Disability; Disability Rights Advocate",
    bio: [
      "Kavya Mukhija is a disability inclusion consultant, researcher, and storyteller whose work explores how accessibility, culture, health, and design intersect to shape everyday life. A Chevening Scholar and Diana Award recipient, she holds an MSc in Disability, Design and Innovation from University College London.",
      "Drawing from both lived experience as a wheelchair user and years of professional practice, Kavya uses research, advocacy, humour, and digital storytelling to challenge stereotypes surrounding disability and health. Her work spans accessibility consulting, public policy, disability rights, and inclusive communication, with a particular interest in how art and storytelling can transform attitudes, build empathy, and influence systems.",
      "As an advisory board member of the Delhi Arts and Health Festival, she brings a strong commitment to ensuring that conversations around arts, health, and wellbeing meaningfully include disabled voices, not as an afterthought, but as essential contributors to culture and society.",
    ],
  },
];

export const CONSULTANTS_INTRO = {
  heading: "Specialist support for a growing festival",
  body: "Alongside our core team, DAHF works with a small group of consultants who bring focused expertise to specific parts of the festival. They join for defined pieces of work, from community engagement and partnerships to specialist programming and operations. Their experience helps the festival move faster, plan better, and hold a higher standard than a founding team could reach on its own.",
} as const;

export const CONSULTANTS: Person[] = [
  {
    name: "Mehr Lungani",
    photo: "/images/team/mehr-lungani.jpeg",
    pronouns: "she/her",
    role: "Community & Partnerships Consultant",
    bio: [
      "Mehr Lungani (she/her) is a psychotherapist, mental health entrepreneur, community builder, and founder of Chaos to Cosmos, a mental health and alternative healing organisation based in New Delhi. With over eight years of experience in mental health, Mehr works at the intersection of therapy, creative expression, community, and alternative healing.",
      "Through Chaos to Cosmos and The Zarf Collective, she has built communities for therapists, trainees, facilitators, and individuals seeking more expansive approaches to mental health and wellbeing. Her work spans psychotherapy, clinical supervision, professional mentorship, workshops, retreats, and community-led experiences, giving her a unique understanding of both the mental health ecosystem and the people who shape it.",
      "Mehr is particularly interested in creating spaces where disciplines can meet meaningfully: where mental health professionals can engage with artists, facilitators can learn from one another, and communities can participate rather than simply observe. She brings to the Delhi Arts & Health Festival her experience in designing and facilitating participatory experiences, building professional networks, developing partnerships, and growing communities from the ground up.",
    ],
  },
  {
    name: "Chitra Kalyani",
    photo: "/images/team/chitra-kalyani.jpeg",
    pronouns: "she/her",
    role: "Creative Collaborations Consultant",
    bio: [
      "Chitra Kalyani (she/her) is a mental health advocate, writer, and communications professional based in New Delhi. Her initiative, Sahaayta, brings together mental health and the arts. As part of this work, she has co-organised 'Lights On Again,' a suicide prevention and care initiative. A part of the bipolar support group Sunny Side Up, she has also previously organised a mental health awareness week at VIMHANS.",
    ],
  },
  {
    name: "Muskan",
    photo: "/images/team/muskan.jpeg",
    pronouns: "any pronouns",
    role: "Intersectional Collaborations Consultant",
    bio: [
      "Muskan is a psychotherapist, interdisciplinary artist, and founder of Care Collage. Their work sits at the intersection of mental health, social justice, and community care. They create spaces that use art, movement, and storytelling to invite reflection and connection, with a focus on building more affirming ways of relating to ourselves and each other.",
      "Alongside their psychotherapy practice, Muskan works as an independent consultant, facilitator, and speaker, leading workshops, guest lectures, and conversations with organisations including the Karma Centre for Counselling and Wellbeing, Believe in the Invisible, TARSHI, and Nazariya, among others. They are also an Advisor with Sangath on Youth LEARN, a project bringing young people with lived experience and mental health researchers together to co-create more inclusive and meaningful mental health research in India.",
    ],
  },
];

// ---------------------------------------------------------------------------
// Get Involved
// ---------------------------------------------------------------------------

export const GET_INVOLVED = {
  heading: "Help shape Delhi's first Arts and Health Festival",
  intro:
    "DAHF is built by and with the people who show up. Through practices, ideas, conversations and collaborations, the festival continues to take shape. Whether you are an individual, a practitioner, an artist, a researcher or an organisation, there is a place for you here.",
  paths: [
    {
      heading: "Join the team",
      body: "We are looking for people to help run the festival, on the ground and behind the scenes, across operations, programming, hospitality, communications, research, accessibility, and audience care. You do not need a background in arts or health. You need curiosity and a willingness to pitch in.",
      cta: "Volunteer Interest Form",
      href: FORMS.volunteer,
      bg: "pink",
      image: {
        alt: "Festival volunteers working together behind the scenes",
        motif: "star",
      } as FestivalImage,
    },
    {
      heading: "Partner with us",
      body: "We welcome organisations who want to back this work: hospitals, universities, schools, NGOs, foundations, museums, cultural bodies, community groups, and public institutions. Whether you bring funding, space, expertise, or reach, a partnership with DAHF places you at the heart of a growing movement around creativity, health, and community.",
      cta: "Partner With Us",
      href: FORMS.partner,
      bg: "teal",
      image: {
        alt: "Partners and organisers in conversation at an event",
        motif: "stairs",
      } as FestivalImage,
    },
    {
      heading: "Share your practice",
      body: "We want to hear from artists and facilitators with something to share: a workshop, a performance, an exhibition, an installation, a talk, or a community project that explores the relationship between arts, health, and wellbeing. If your work lives in that space, we would love to see it.",
      cta: "Submit an Expression of Interest",
      href: FORMS.expressionOfInterest,
      bg: "yellow",
      image: {
        alt: "An artist facilitating a session with participants",
        motif: "kalash",
      } as FestivalImage,
    },
  ],
} as const;

/**
 * About page images — four, up from the original one. Sourced from the same
 * supplied photo set as the homepage (see public/images/README.md): real
 * unused originals, normalised the same way (EXIF baked in, capped at 2800px,
 * re-encoded, renamed).
 */

/** Opening "poster moment" — paired with the question in a hero-style
 * two-column layout, borrowing that section's photo treatment (§0.11). */
export const ABOUT_HERO_IMAGE: FestivalImage = {
  src: "/images/about-hero-dance.jpg",
  alt: "A dancer in silhouette, sheer black fabric billowing overhead like wings",
  motif: "star",
};

/** Under the opening passage. Alt rewritten to match the photo that actually
 * landed — a studio floor, not a "community space". */
export const ABOUT_IMAGE: FestivalImage = {
  src: "/images/about-workshop.jpg",
  alt: "Participants seated together on a studio floor, making art side by side",
  motif: "stairs",
};

/** Beside "Our Vision" — a participant's own hand-made vision board, found
 * among the supplied photos and too fitting not to use here specifically. */
export const ABOUT_VISION_IMAGE: FestivalImage = {
  src: "/images/about-vision-2026.jpg",
  alt: "A festival participant holding up a hand-made 'Vision 2026' collage at Lodhi Garden",
  motif: "daisy",
};

/** Beside "Global momentum" in Why Now — a body outline filled with
 * hand-written words from an expressive arts therapy session, which makes
 * the section's argument (creativity as health practice) visually rather
 * than just stating it. */
export const ABOUT_WHY_NOW_IMAGE: FestivalImage = {
  src: "/images/about-body-map.jpg",
  alt: "A body outline filled with hand-written words — care, growth, safety, courage — from an expressive arts therapy exercise",
  motif: "kalash",
};

/** A pair beneath the "Global momentum" paragraphs, bottom-aligned with the
 * body-map image beside them — the movement DAHF is joining, shown as
 * people rather than institutions, since none of the supplied photography
 * is of the WHO or NHS England. */
export const ABOUT_WHY_NOW_IMAGES: [FestivalImage, FestivalImage] = [
  {
    src: "/images/about-whynow-community.jpg",
    alt: "Schoolchildren gathered around a large collaborative drawing on the floor",
    motif: "daisy",
  },
  {
    src: "/images/about-whynow-unity.jpg",
    alt: "A group reaching their hands up together outdoors",
    motif: "star",
  },
];

/**
 * Opening hero, top of the Press page — same two-column treatment as Home,
 * About, and Programme. Sourced from the same supplied-photo pool as those
 * pages, not new photography.
 */
export const PRESS_HERO_IMAGE: FestivalImage = {
  src: "/images/press-hero.jpg",
  alt: "A group of performers linking hands mid-scene on a rooftop stage, string lights overhead",
  motif: "star",
};

/**
 * Images offered to press alongside the media resources block. Alt text
 * rewritten to match what actually landed — the originals described an
 * exhibition and a public performance, and neither photo in the set was
 * either of those things.
 */
export const PRESS_IMAGES: FestivalImage[] = [
  {
    src: "/images/press-media-1.jpg",
    alt: "Participants reaching toward each other during a movement workshop",
    motif: "daisy",
  },
  {
    src: "/images/press-media-2.jpg",
    alt: "Participants tossing balloons in a bright studio room",
    motif: "star",
  },
  {
    src: "/images/press-media-3.jpg",
    alt: "A facilitator engaging a group of costumed children in a colourful room",
    motif: "kalash",
  },
];

// ---------------------------------------------------------------------------
// Press
// ---------------------------------------------------------------------------

export const PRESS = {
  heading: "Press & Media",
  about: [
    "The Delhi Arts and Health Festival is a city-wide initiative exploring how arts and creativity shape health, wellbeing, and community. It runs from 2 to 6 December 2026 across venues around Delhi, bringing together artists, healthcare practitioners, researchers, educators, policymakers, cultural organisations, and the public.",
    "Built around the idea of Delhi as a Capital of Care, the festival opens up a public conversation about the role of creativity in how we heal and stay well. It aims to strengthen India's growing arts and health community while connecting it to work happening around the world.",
  ],
  quickFacts: [
    { term: "Location", body: "Delhi, India" },
    { term: "Dates", body: "2 to 6 December 2026" },
    { term: "Format", body: "Workshops, talks, performances, and exhibitions" },
    { term: "Scale", body: "150+ experiences across the city" },
    {
      term: "Who takes part",
      body: "Artists, researchers, healthcare professionals, and communities",
    },
  ],
  faqIntro: "A few of the questions we are asked most often. The full set is linked at the end.",
  faqs: [
    {
      q: "What makes the festival unique?",
      a: "DAHF brings arts and health together as interconnected practices, creating a city-wide platform where creativity, care, research, and community come into dialogue.",
    },
    {
      q: "What are the key highlights of the 2026 edition?",
      a: "The 2026 edition features 50+ events across Delhi, including performances, expressive arts and movement workshops, storytelling, conversations, installations, community activations, and research exchanges.",
    },
    {
      q: "Is the festival free or ticketed?",
      a: "Many events will be free and open to the public, while some may require prior registration or ticketing; details will be announced with the programme.",
    },
    {
      q: "Is the festival accessible?",
      a: "Accessibility is central to the festival’s design, with efforts to make programmes inclusive across physical, social, and economic contexts and reach diverse communities across the city.",
    },
    {
      q: "How can the media attend or cover the festival?",
      a: "Media representatives are welcome to attend and cover the festival; press registration, media kits, programme information, and interview opportunities will be shared closer to the festival.",
    },
    {
      q: "Where can the media find updates and press materials?",
      a: "Updates and press materials will be shared through DAHF’s official website, Instagram and LinkedIn channels, with detailed schedules and press releases released closer to the festival.",
    },
  ],
  mediaResources: [
    "Request the press kit, festival logos, and brand assets",
    "View press releases",
    "View festival images",
  ],
  mediaEmail: "partnerships.dahf@gmail.com",
} as const;

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------

export const CONTACT_PAGE = {
  heading: "Get in touch",
  intro:
    "Whether you are here about programming, partnerships, volunteering, media, or funding, or you simply want to know more, we would love to hear from you. Write to the right address below and the relevant team will get back to you.",
  followIntro: "Stay close to the festival as the programme takes shape.",
} as const;

/** Opening hero, top of the Contact page — same two-column treatment as
 * Home, About, Programme, and Press. A warm, human moment for a page that's
 * otherwise just a list of email addresses. */
export const CONTACT_HERO_IMAGE: FestivalImage = {
  src: "/images/contact-hero.jpg",
  alt: "Participants tossing coloured balloons together in a dance studio",
  motif: "kalash",
};

// ---------------------------------------------------------------------------
// Pre-Festival Events
// ---------------------------------------------------------------------------

export type PreFestivalEvent = {
  group?: string;
  title: string;
  subtitle?: string;
  partner?: string;
  location: string;
  date: string;
  /** One entry per carousel slide. Add `src` as photographs arrive; more
   * entries add more slides. */
  images: FestivalImage[];
};

export const PRE_FESTIVAL = {
  heading: "Pre-Festival Events",
  events: [
    {
      group: "Opening Event",
      title: "Dilli Art Jam",
      location: "Lodhi Garden",
      date: "30 August 2026",
      images: [
        {
          src: "/images/prefestival/dilli-art-jam.jpg",
          alt: "Five people sitting on the grass around a large hand-drawn ARTS poster, colouring with markers",
          motif: "daisy",
        },
      ],
    },
    {
      group: "School Initiative",
      title: "Knowledge Tree School",
      subtitle: "Teacher’s Day Wellness Event",
      partner: "In partnership with Read India Foundation",
      location: "Knowledge Tree School, Gurgaon",
      date: "5 September 2026",
      images: [
        {
          src: "/images/prefestival/knowledge-tree-school.jpg",
          alt: "A group of teachers posing together and smiling in a classroom after the wellness event",
          motif: "stairs",
        },
      ],
    },
    {
      group: "School Initiative",
      title: "Jagran Public School",
      subtitle: "Navigating Exam Stress - Session for Students",
      location: "Jagran Public School, Noida",
      date: "8 September 2026",
      images: [{ alt: "Students at the exam stress session at Jagran Public School, Noida", motif: "star" }],
    },
    {
      group: "School Initiative",
      title: "JSS Public School",
      subtitle: "Navigating Exam Stress - Session for Students",
      location: "JSS Public School, Noida",
      date: "15 September 2026",
      images: [
        {
          src: "/images/prefestival/jss-public-school.jpg",
          alt: "Schoolchildren in uniform crowded around a large sheet of paper, writing together during the exam stress session",
          motif: "kalash",
        },
      ],
    },
    {
      title: "Zine-Making Workshop",
      location: "Foresta Bistro and Cafe, Saket",
      date: "20 September 2026",
      images: [
        {
          src: "/images/prefestival/zine-making-workshop.jpg",
          alt: "Participants crafting zines around a cafe table covered in markers, crayons and paper",
          motif: "daisy",
        },
      ],
    },
  ] as PreFestivalEvent[],
  upcomingHeading: "Upcoming Events",
  upcoming: [
    { title: "Art Adda", partner: "with Shunya, Ramjas College Dramatics Club" },
    {
      title: "Khula Aasman - Creative Arts and Mental Health Fest",
      partner:
        "In partnership with Empowering Minds and Symbiosis Centre for Management Studies",
    },
    {
      title: "BeNaqaab - A Masquerade for MHPs",
      partner: "In partnership with Chaos to Cosmos",
    },
    {
      title: "Lights On, Again",
      partner: "In partnership with Sahaayta, Neev Mental Health and Hank Nunn Institute",
    },
  ],
  closingLink: "Stay tuned",
  closingRest: " for more updates on ongoing events.",
};

/** Sister festivals shown in the band under the Global Ecosystem section. */
export const OTHER_FESTIVALS = [
  { city: "Abuja", src: "/images/otherfestivals/abuja.png" },
  { city: "Accra", src: "/images/otherfestivals/accra.png" },
  { city: "Bengaluru", src: "/images/otherfestivals/bangalore.png" },
  { city: "Dharamshala", src: "/images/otherfestivals/dharamshala.png" },
  { city: "Hong Kong", src: "/images/otherfestivals/hong-kong.png" },
  { city: "Jaipur", src: "/images/otherfestivals/jaipur.png" },
  { city: "Lagos", src: "/images/otherfestivals/lagos.png" },
  { city: "Mumbai", src: "/images/otherfestivals/mumbai.png" },
  { city: "Pune", src: "/images/otherfestivals/pune.png" },
  { city: "Tehran", src: "/images/otherfestivals/tehran.png" },
] as const;
