// Business details shown across the website. Fill these in before launch;
// anything left empty is simply hidden on the site.
export const SITE = {
  // Full international number, digits only, e.g. "17045551234"
  whatsapp: "",
  email: "",
  instagram: "souknstory",
  // Shown in "Travel with confidence" once you have them
  hostAgency: "",
  groundPartner: "",
  // Hours you promise to reply to a journey request
  itineraryHours: 48,
};

export function whatsappLink(text = "") {
  if (!SITE.whatsapp) return null;
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${SITE.whatsapp}${q}`;
}
