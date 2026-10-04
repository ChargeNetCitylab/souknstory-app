// The First Story: weekly small-group departures (Saturday to Saturday).
// The live calendar is read from the Supabase `departures` table
// (supabase/departures.sql). If the table is empty or unreachable, the page
// falls back to the schedule generated here so it never shows a blank page.

export const GROUP_PRODUCT = {
  slug: "first-story",
  title: "The First Story",
  subtitle: "8 days · Marrakech · High Atlas · Agafay desert",
  basePrice: 3290,
  peakSurcharge: 300,
  foundingDiscount: 300,
  capacity: 12,
  guaranteedAt: 6,
  singleSupplement: 1190,
};

const PEAK_MONTHS = [3, 4, 5, 10, 11]; // Mar–May, Oct–Nov
const PAUSED_MONTHS = [7, 8]; // Jul–Aug: inland heat

export function priceFor(dateStr, founding = false) {
  const month = Number(dateStr.slice(5, 7));
  let price = GROUP_PRODUCT.basePrice + (PEAK_MONTHS.includes(month) ? GROUP_PRODUCT.peakSurcharge : 0);
  if (founding) price -= GROUP_PRODUCT.foundingDiscount;
  return price;
}

// Saturdays from 20 March 2027 (after Ramadan) to mid-December 2027, skipping July and August.
export function generatedSchedule() {
  const out = [];
  const d = new Date(Date.UTC(2027, 2, 20));
  const end = new Date(Date.UTC(2027, 11, 18));
  let i = 0;
  while (d <= end) {
    const iso = d.toISOString().slice(0, 10);
    const month = d.getUTCMonth() + 1;
    if (!PAUSED_MONTHS.includes(month)) {
      const founding = i < 2;
      out.push({
        start_date: iso,
        capacity: GROUP_PRODUCT.capacity,
        seats_booked: 0,
        price_usd: priceFor(iso, founding),
        status: "open",
        founding,
      });
      i += 1;
    }
    d.setUTCDate(d.getUTCDate() + 7);
  }
  return out;
}

export function addDays(dateStr, n) {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function formatDate(dateStr, opts = { weekday: "short", month: "short", day: "numeric" }) {
  return new Date(`${dateStr}T00:00:00Z`).toLocaleDateString("en-US", { ...opts, timeZone: "UTC" });
}

export function monthLabel(dateStr) {
  return formatDate(dateStr, { month: "long", year: "numeric" });
}

export function seatState(dep) {
  const left = Math.max(0, dep.capacity - dep.seats_booked);
  if (dep.status === "cancelled") return { key: "cancelled", label: "Cancelled", left };
  if (dep.status === "full" || left === 0) return { key: "full", label: "Full", left: 0 };
  if (left <= 3) return { key: "few", label: `Only ${left} ${left === 1 ? "seat" : "seats"} left`, left };
  if (dep.status === "guaranteed" || dep.seats_booked >= GROUP_PRODUCT.guaranteedAt)
    return { key: "guaranteed", label: "Guaranteed to run", left };
  return { key: "open", label: `${left} seats available`, left };
}
