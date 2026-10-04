// Signature journeys. Hotels are real properties used as examples and must be
// confirmed with the ground partner before sale. Prices: set `fromPrice`
// (USD per person, Luxury tier) once quotes are in; null shows "on request".

export const TIERS = [
  {
    key: "signature",
    name: "Signature",
    blurb: "Boutique riads · economy or premium economy flights",
    features: [
      "Economy or premium economy flights",
      "Boutique riads and four-star hotels",
      "Private driver, guides in key cities",
      "Desert camp with private tent",
    ],
  },
  {
    key: "luxury",
    name: "Luxury",
    blurb: "Palace hotels · business class",
    features: [
      "Business class from your city",
      "Five-star palaces and luxury riads",
      "Private expert guide throughout",
      "Luxury desert camp, private dinners",
      "Airport VIP meet and greet",
    ],
    featured: true,
  },
  {
    key: "private",
    name: "Private Collection",
    blurb: "Suites and buyouts · first class via Europe",
    features: [
      "First class via Europe, or business",
      "Top suites and private villas",
      "Dedicated host for your whole stay",
      "Hot-air balloon, private chef, exclusive access",
    ],
  },
];

export const JOURNEYS = [
  {
    slug: "imperial-cities",
    theme: "Imperial",
    title: "The Imperial Cities",
    days: 10,
    arrive: "Casablanca",
    depart: "Marrakech",
    fromPrice: null,
    short: "Casablanca, Rabat, Fes, Meknes and Volubilis, ending in a Marrakech palace.",
    intro:
      "Morocco's four royal capitals in one unhurried journey, from the Atlantic mosque of Casablanca to the palaces of Marrakech.",
    tint: "#D9CDB6",
    route: [
      { city: "Casablanca", nights: 1 },
      { city: "Rabat", nights: 1 },
      { city: "Meknes", nights: 1 },
      { city: "Fes", nights: 3 },
      { city: "Marrakech", nights: 3 },
    ],
    itinerary: [
      { day: "01", title: "Arrival in Casablanca", text: "Your driver meets you inside the airport. Rest, then a private afternoon tour of the Hassan II Mosque above the Atlantic.", stay: "Royal Mansour Casablanca", drive: "45 min from the airport", meals: "Dinner" },
      { day: "02", title: "Rabat, the capital", text: "The blue-and-white Kasbah of the Udayas, Hassan Tower, the Mausoleum of Mohammed V and the Chellah ruins.", stay: "Fairmont La Marina Rabat-Salé", drive: "1 hr 15", meals: "Breakfast, dinner" },
      { day: "03", title: "Meknes and Volubilis", text: "The grand gate of Bab Mansour, Roman mosaics at Volubilis, and a wine tasting at a château in the hills.", stay: "Château Roslane", drive: "2 hr", meals: "All included" },
      { day: "04", title: "Arrival in Fes", text: "An afternoon in Fes el-Jdid: the Royal Palace gates and the Mellah, the old Jewish quarter.", stay: "Riad Fès", drive: "1 hr", meals: "Breakfast, dinner" },
      { day: "05", title: "The Fes medina", text: "A full day in Fes el-Bali with a licensed guide: Bou Inania Medersa, the Chouara tannery and artisan workshops.", stay: "Riad Fès", meals: "Breakfast, dinner" },
      { day: "06", title: "Cooking and hammam", text: "A private morning cooking class, then a traditional hammam and a free afternoon.", stay: "Riad Fès", meals: "Breakfast, lunch" },
      { day: "07", title: "Through the cedar forest", text: "A scenic road through Ifrane and the Middle Atlas cedars to Marrakech, or a short domestic flight if you prefer.", stay: "La Mamounia", drive: "About 7 hr, or fly", meals: "Breakfast, dinner" },
      { day: "08", title: "Palaces and gardens", text: "Bahia Palace, the Saadian Tombs, the Koutoubia and Majorelle Garden, then the evening drama of Jemaa el-Fna.", stay: "La Mamounia", meals: "Breakfast" },
      { day: "09", title: "Lunch in the High Atlas", text: "A drive into the mountains for lunch at Kasbah Tamadot, then a farewell dinner back in Marrakech.", stay: "La Mamounia", drive: "1 hr each way", meals: "All included" },
      { day: "10", title: "Bslama, until next time", text: "Private transfer to Marrakech airport for your flight home.", drive: "20 min", meals: "Breakfast" },
    ],
  },
  {
    slug: "atlas-to-sahara",
    theme: "Nature",
    title: "Atlas to Sahara",
    days: 9,
    arrive: "Marrakech",
    depart: "Marrakech",
    fromPrice: null,
    short: "A mountain kasbah, the Todra and Dades gorges, a luxury desert camp and the Essaouira coast.",
    intro:
      "From snow-capped peaks to the dunes of Erg Chebbi and on to the Atlantic: Morocco's great landscapes, in comfort.",
    tint: "#C9B593",
    route: [
      { city: "High Atlas", nights: 2 },
      { city: "Skoura", nights: 1 },
      { city: "Sahara", nights: 2 },
      { city: "Skoura", nights: 1 },
      { city: "Marrakech", nights: 1 },
      { city: "Essaouira", nights: 1 },
    ],
    itinerary: [
      { day: "01", title: "Into the High Atlas", text: "Meet and greet in Marrakech, then up into the mountains for sunset on the terrace.", stay: "Kasbah Tamadot", drive: "1 hr", meals: "Dinner" },
      { day: "02", title: "Berber villages", text: "A guided walk through villages near Imlil in Toubkal National Park, with lunch at a local family's home.", stay: "Kasbah Tamadot", meals: "All included" },
      { day: "03", title: "Over the Tizi n'Tichka", text: "The high pass, the kasbah of Aït Benhaddou, then the palm grove of Skoura.", stay: "Dar Ahlam", drive: "About 4.5 hr", meals: "All included" },
      { day: "04", title: "Gorges to dunes", text: "The Dades and Todra gorges, then a sunset camel ride into the dunes of Erg Chebbi.", stay: "Luxury desert camp", drive: "About 5.5 hr", meals: "All included" },
      { day: "05", title: "A day in the Sahara", text: "4x4 through the dunes, Gnawa music in Khamlia, sandboarding, and a private dinner under the stars.", stay: "Luxury desert camp", meals: "All included" },
      { day: "06", title: "Sunrise and the oases", text: "Watch the sun rise over the dunes, then drive west through the oases.", stay: "Dar Ahlam", drive: "About 5 hr", meals: "Breakfast, dinner" },
      { day: "07", title: "Back to Marrakech", text: "Back over the Atlas for a spa evening in the city.", stay: "Royal Mansour Marrakech", drive: "About 4.5 hr", meals: "Breakfast" },
      { day: "08", title: "To the coast", text: "An argan cooperative on the way, then Essaouira's ramparts, port and medina.", stay: "Heure Bleue Palais", drive: "About 3 hr", meals: "Breakfast, dinner" },
      { day: "09", title: "Bslama, until next time", text: "Private transfer to Marrakech airport for your flight home.", drive: "About 3 hr", meals: "Breakfast" },
    ],
  },
  {
    slug: "taste-of-morocco",
    theme: "Food",
    title: "A Taste of Morocco",
    days: 8,
    arrive: "Marrakech",
    depart: "Marrakech",
    fromPrice: null,
    short: "Marrakech markets with a chef, a mountain family kitchen, argan oil and Essaouira seafood.",
    intro:
      "Short drives and long lunches: city markets, a mountain kitchen and the fish of the Atlantic coast.",
    tint: "#D6BFA8",
    route: [
      { city: "Marrakech", nights: 2 },
      { city: "High Atlas", nights: 2 },
      { city: "Essaouira", nights: 2 },
      { city: "Marrakech", nights: 1 },
    ],
    itinerary: [
      { day: "01", title: "Welcome to Marrakech", text: "Meet and greet, then a welcome dinner of Moroccan classics.", stay: "La Mamounia", drive: "20 min", meals: "Dinner" },
      { day: "02", title: "The markets with a chef", text: "Spices, olives, bread ovens and slow-cooked tangia, ending with a rooftop dinner.", stay: "La Mamounia", meals: "All included" },
      { day: "03", title: "A mountain kitchen", text: "Farm-to-table cooking with a Berber family and a traditional mint tea ceremony.", stay: "Kasbah Tamadot", drive: "1 hr", meals: "All included" },
      { day: "04", title: "Slow day in the Atlas", text: "A free morning, a picnic lunch in the valley, and a chef's tasting dinner.", stay: "Kasbah Tamadot", meals: "All included" },
      { day: "05", title: "Argan and the coast", text: "Tasting at a women's argan oil cooperative, then grilled fish at the Essaouira port.", stay: "Heure Bleue Palais", drive: "About 3.5 hr", meals: "Breakfast, lunch" },
      { day: "06", title: "Fish market and vineyard", text: "The morning fish market, a seafood cooking class, and a vineyard visit in the countryside.", stay: "Heure Bleue Palais", meals: "Breakfast, lunch" },
      { day: "07", title: "Dinner in the desert", text: "Back to Marrakech for a sunset dinner under the stars in the Agafay desert.", stay: "Royal Mansour Marrakech", drive: "About 3 hr", meals: "Breakfast, dinner" },
      { day: "08", title: "Bslama, until next time", text: "Private transfer to Marrakech airport for your flight home.", drive: "20 min", meals: "Breakfast" },
    ],
  },
  {
    slug: "morocco-on-film",
    theme: "Film",
    title: "Morocco on Film",
    days: 8,
    arrive: "Casablanca",
    depart: "Marrakech",
    fromPrice: null,
    short: "Ouarzazate's studios, the kasbah of Aït Benhaddou, Essaouira's walls and a Casablanca evening.",
    intro:
      "Real filming locations, from the studios of Ouarzazate to the sea walls of Essaouira, with a night at Rick's Café to begin.",
    tint: "#BFA98A",
    route: [
      { city: "Casablanca", nights: 1 },
      { city: "Marrakech", nights: 1 },
      { city: "Ouarzazate", nights: 1 },
      { city: "Skoura", nights: 1 },
      { city: "Marrakech", nights: 1 },
      { city: "Essaouira", nights: 1 },
      { city: "Marrakech", nights: 1 },
    ],
    itinerary: [
      { day: "01", title: "Here's looking at Casablanca", text: "Rest after your flight, then an evening at Rick's Café, the bar inspired by the film.", stay: "Royal Mansour Casablanca", drive: "45 min", meals: "Dinner" },
      { day: "02", title: "To Marrakech", text: "Morning at the Hassan II Mosque, then an evening in Jemaa el-Fna.", stay: "La Mamounia", drive: "About 3 hr", meals: "Breakfast" },
      { day: "03", title: "The studios of Ouarzazate", text: "Over the Tizi n'Tichka pass for an afternoon tour of the Atlas Film Studios.", stay: "Le Berbère Palace", drive: "About 4 hr", meals: "Breakfast, dinner" },
      { day: "04", title: "Aït Benhaddou", text: "A guided visit of the ksar seen in Gladiator and Game of Thrones, and the cinema museum.", stay: "Dar Ahlam", drive: "30 min, then 40 min", meals: "All included" },
      { day: "05", title: "Back over the mountains", text: "Return to Marrakech for a free evening.", stay: "Royal Mansour Marrakech", drive: "About 4.5 hr", meals: "Breakfast" },
      { day: "06", title: "Essaouira's ramparts", text: "The Skala sea walls where Orson Welles filmed Othello, and the port at sunset.", stay: "Heure Bleue Palais", drive: "About 3 hr", meals: "Breakfast, dinner" },
      { day: "07", title: "Farewell in the desert", text: "Back to Marrakech for a farewell dinner in the Agafay desert.", stay: "La Mamounia", drive: "About 3 hr", meals: "Breakfast, dinner" },
      { day: "08", title: "Bslama, until next time", text: "Private transfer to Marrakech airport for your flight home.", drive: "20 min", meals: "Breakfast" },
    ],
  },
  {
    slug: "morocco-and-andalusia",
    theme: "Two continents",
    title: "Morocco & Andalusia",
    days: 12,
    arrive: "Casablanca",
    depart: "Málaga",
    fromPrice: null,
    short: "Fes, Chefchaouen and Tangier, then across the strait to Seville and Granada.",
    intro:
      "Two continents, one story: the medinas of northern Morocco, a ferry across the Strait of Gibraltar, and the palaces of Andalusia.",
    tint: "#CDBFA9",
    route: [
      { city: "Fes", nights: 3 },
      { city: "Chefchaouen", nights: 1 },
      { city: "Tangier", nights: 2 },
      { city: "Seville", nights: 2 },
      { city: "Granada", nights: 3 },
    ],
    itinerary: [
      { day: "01", title: "Arrival and on to Fes", text: "Meet and greet in Casablanca, then a domestic connection or private drive to Fes.", stay: "Riad Fès", drive: "Connection or about 4 hr", meals: "Dinner" },
      { day: "02", title: "The Fes medina", text: "Fes el-Bali with a licensed guide and its artisan workshops.", stay: "Riad Fès", meals: "Breakfast, dinner" },
      { day: "03", title: "Meknes and Volubilis", text: "Roman ruins, imperial Meknes, and a wine lunch at Château Roslane.", stay: "Riad Fès", drive: "1 hr each way", meals: "Breakfast, lunch" },
      { day: "04", title: "The blue city", text: "An afternoon in Chefchaouen's blue medina and sunset from the Spanish Mosque.", stay: "Boutique riad", drive: "About 4 hr", meals: "Breakfast, dinner" },
      { day: "05", title: "Tangier", text: "Arrive for sunset tea overlooking the Strait of Gibraltar.", stay: "Fairmont Tazi Palace Tangier", drive: "About 2 hr", meals: "Breakfast" },
      { day: "06", title: "Kasbah and Cap Spartel", text: "The kasbah and medina, then Cap Spartel and the Caves of Hercules.", stay: "Fairmont Tazi Palace Tangier", meals: "Breakfast, dinner" },
      { day: "07", title: "Across the strait", text: "The ferry to Tarifa, where your driver waits to take you to Seville.", stay: "Hotel Alfonso XIII", drive: "1 hr ferry, about 2.5 hr drive", meals: "Breakfast" },
      { day: "08", title: "Seville", text: "The Real Alcázar and the Cathedral, then an evening of flamenco.", stay: "Hotel Alfonso XIII", meals: "Breakfast" },
      { day: "09", title: "To Granada", text: "An afternoon in the old Albaicín quarter.", stay: "Hotel Alhambra Palace", drive: "About 3 hr", meals: "Breakfast, dinner" },
      { day: "10", title: "The Alhambra", text: "A private guided visit of the Alhambra and the Generalife gardens.", stay: "Hotel Alhambra Palace", meals: "Breakfast" },
      { day: "11", title: "A free day in Granada", text: "Time at your own pace, then a farewell dinner.", stay: "Hotel Alhambra Palace", meals: "Breakfast, dinner" },
      { day: "12", title: "Hasta luego", text: "Private transfer to Málaga airport for your flight home.", drive: "About 1.5 hr", meals: "Breakfast" },
    ],
  },
];

export function getJourney(slug) {
  return JOURNEYS.find((j) => j.slug === slug);
}

// Unique hotels in the order they appear, with total nights in each.
export function hotelsFor(journey) {
  const out = [];
  journey.itinerary.forEach((d) => {
    if (!d.stay) return;
    const found = out.find((h) => h.name === d.stay);
    if (found) found.nights += 1;
    else out.push({ name: d.stay, nights: 1 });
  });
  return out;
}

export function priceLabel(journey) {
  return journey.fromPrice
    ? `From $${journey.fromPrice.toLocaleString("en-US")} per person`
    : "Price on request";
}
