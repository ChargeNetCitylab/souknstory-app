// The three signature packages: one route (Marrakech, High Atlas, Agafay
// desert), three ways to travel it. Prices are per person sharing, land only,
// and match the pricing model; hotels are examples subject to availability.

export const PACKAGES = [
  {
    slug: "the-first-story",
    tier: "Intro Luxury · small group",
    name: "The First Story",
    tagline: "Your first taste of Morocco, done beautifully.",
    intro:
      "Eight unhurried days from the medina of Marrakech to a mountain village and the stone desert of Agafay, with up to 12 guests and five moments made just for you.",
    price: 3290,
    flights: "Economy from about $1,100",
    wow: "5 wow moments",
    format: "Small group, up to 12 · every Saturday",
    cta: { label: "See 2027 departures", href: "/departures" },
    dark: false,
    highlights: ["Boutique riad, mountain lodge, desert camp", "Licensed tour leader and private minibus", "Five wow moments included"],
    days: [
      ["1", "The door in the wall", "Boutique riad, Marrakech medina", "Your driver is waiting inside arrivals with your name. Behind a plain cedar door in the medina: a courtyard of orange trees, a fountain, and the smell of mint.", "Two tea glasses engraved with your names, and a welcome note in Arabic calligraphy."],
      ["2", "The red city", "Boutique riad, Marrakech medina", "A private guide leads you through the souks, the carved ceilings of Bahia Palace and the blue of the Majorelle Garden.", "An evening hammam ritual: black soap, a warm scrub, eucalyptus steam, then a massage."],
      ["3", "Above the Atlas", "Boutique riad, Marrakech medina", "A 5 a.m. pickup and hot tea in the dark. The basket lifts and the first sun turns the Atlas peaks pink. Dinner on a rooftop as the call to prayer rolls over the city.", "A sunrise hot-air balloon flight, with breakfast where you land."],
      ["4", "Bread from the clay oven", "Mountain lodge, High Atlas", "The road climbs into the High Atlas, and a short walk brings you to a village of red earth houses where a family welcomes you into their kitchen.", "Cook a tagine with the family, bake bread in their clay oven, and pour mint tea from a height."],
      ["5", "The valley at your pace", "Mountain lodge, High Atlas", "Walnut groves and terraced fields with a mountain guide, a picnic by the river, and an evening by the fire under the stars.", null],
      ["6", "The stone desert", "Luxury tented camp, Agafay", "An hour from Marrakech, the land turns to rolling, rocky hills with the snowy Atlas on the horizon. A camel ride at sunset brings you back as the lanterns are lit.", "A private dinner under the stars with lanterns, a fire and Gnawa musicians."],
      ["7", "A sky full of stars", "Luxury tented camp, Agafay", "A slow morning, the pool, a book. After dinner, blankets by the fire and more stars than you knew existed.", null],
      ["8", "Bslama, until next time", "Flight home", "Mint tea one last time, then a private transfer to Marrakech airport.", null],
    ],
    included: [
      "7 nights in a boutique riad, mountain lodge and luxury desert camp, breakfast daily",
      "Licensed English-speaking tour leader and private minibus",
      "Airport meet and assist",
      "Five wow moments: engraved tea glasses, hammam ritual, sunrise balloon, Berber family cooking, private desert dinner with Gnawa music",
      "Camel ride in Agafay and WhatsApp support throughout",
    ],
  },
  {
    slug: "the-grand-story",
    tier: "Luxury · private",
    name: "The Grand Story",
    tagline: "Palaces, mountains and a private night in the desert.",
    intro:
      "The same journey raised to its finest: legendary hotels, an expert private guide, business class from your city and all seven wow moments.",
    price: 8350,
    flights: "Business class from about $3,200",
    wow: "All 7 wow moments",
    format: "Private, any dates",
    cta: { label: "Plan The Grand Story", href: "/onboarding?journey=the-grand-story" },
    dark: true,
    highlights: ["La Mamounia and Kasbah Tamadot", "Expert private guide and V-Class with driver", "All seven wow moments"],
    days: [
      ["1", "A palace welcome", "La Mamounia, Marrakech", "VIP fast track at the airport, then through the gates of a palace hotel set in centuries-old gardens. Dinner under the trees as the lanterns come on.", "Engraved tea glasses and a welcome note in Arabic calligraphy."],
      ["2", "Secrets of the medina", "La Mamounia, Marrakech", "An expert guide opens doors most visitors pass by: a master artisan's workshop, a hidden courtyard, the stories behind Bahia Palace and Majorelle.", "A hammam and massage ritual at the hotel spa."],
      ["3", "Above the Atlas, over the rooftops", "La Mamounia, Marrakech", "A premium balloon basket rises at sunrise. In the evening the city glows red from a rooftop above the medina.", "A sunrise balloon flight, and a rooftop tasting with a medina chef."],
      ["4", "Into the mountains", "Kasbah Tamadot, High Atlas", "A kasbah of terraces and gardens facing the High Atlas, then a short drive to a Berber village.", "Cooking with a Berber family in their home."],
      ["5", "Light on the peaks", "Kasbah Tamadot, High Atlas", "A guided walk through walnut groves and river valleys, then a long afternoon by the pool facing the mountains.", "A private photographer for the golden hour."],
      ["6", "Dinner with the Gnawa", "Premium camp, Agafay desert", "The rocky hills of Agafay turn copper at sunset. A camel ride brings you back to a table set for you alone.", "A private dinner under the stars with Gnawa musicians."],
      ["7", "Stars and silence", "Premium camp, Agafay desert", "Sunrise from your terrace, a lazy day by the pool, and an evening beneath a sky with no city lights.", null],
      ["8", "Bslama, until next time", "Business class home", "One last desert breakfast, then VIP assistance at Marrakech airport.", null],
    ],
    included: [
      "7 nights at La Mamounia, Kasbah Tamadot and a premium Agafay camp",
      "Private Mercedes V-Class with driver and an expert guide on six days",
      "Airport VIP fast track and meet and greet",
      "All seven wow moments, including a rooftop chef tasting and a golden-hour photographer",
      "Camel ride in Agafay and WhatsApp support throughout",
    ],
  },
  {
    slug: "the-private-story",
    tier: "Private Collection",
    name: "The Private Story",
    tagline: "Every door opened, every moment yours alone.",
    intro:
      "A private riad, a private balloon, a camp reserved only for you and a dedicated host from the moment you land to the moment you leave.",
    price: 20250,
    flights: "First class via Europe from about $9,000",
    wow: "All 7, privatized",
    format: "Private, any dates",
    cta: { label: "Request The Private Story", href: "/onboarding?journey=the-private-story" },
    dark: true,
    highlights: ["Private riad and exclusive desert camp", "Dedicated host for all 8 days", "Private balloon and private chef"],
    days: [
      ["1", "A riad of your own", "Private riad, Marrakech", "Your dedicated host meets you on arrival and walks you through VIP fast track. In the medina, a private riad on several floors is yours, with staff who already know your names.", "On the rooftop at sunset: engraved tea glasses, a calligraphy note, and your host pouring the first glass of mint tea."],
      ["2", "The medina, privately", "Private riad, Marrakech", "Your expert guide arranges quiet, early visits and the workshops of master craftsmen, at the pace you choose.", "A long hammam and massage ritual."],
      ["3", "A balloon for two", "Private riad, Marrakech", "Only the two of you and the pilot. The basket lifts as the light reaches the snow on the Atlas.", "A private hot-air balloon flight at sunrise."],
      ["4", "The mountain table", "Mountain suite, High Atlas", "A Berber family welcomes you to cook in their village home. In the evening a private chef serves dinner on your terrace facing the peaks.", "Berber family cooking, then a private chef's dinner."],
      ["5", "Your own valley", "Mountain suite, High Atlas", "A private trek with a mountain guide, a picnic set up by the river, and nobody else on the trail.", "A private photographer for the golden hour."],
      ["6", "A camp just for you", "Exclusive private camp, Agafay", "An entire camp in the stone desert, set up for your stay alone. A camel ride at sunset, then the fire is lit.", "A private dinner under the stars with Gnawa musicians playing for you alone."],
      ["7", "Nothing planned", "Exclusive private camp, Agafay", "Your host shapes the day around you: a sunrise ride, a spa treatment in your tent, or simply silence.", "A rooftop tasting with a medina chef, if you want to see the city once more."],
      ["8", "Until next time", "First class home, via Europe", "Breakfast in the desert, a private transfer and lounge access. Your host sees you to the gate.", null],
    ],
    included: [
      "7 nights in a private riad, a mountain suite and an exclusive private camp, all meals",
      "A dedicated host for all 8 days, an expert guide and a top vehicle with driver",
      "VIP airport fast track and lounge",
      "Private balloon flight, private chef dinner and all seven wow moments",
      "Engraved tea glasses and a calligraphy welcome",
    ],
  },
];

export function getPackage(slug) {
  return PACKAGES.find((p) => p.slug === slug);
}

export const usd = (n) => `$${n.toLocaleString("en-US")}`;
