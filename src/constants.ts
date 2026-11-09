/** Single source of truth — every date, phone and venue string lives here. */
export const PHONE_DISPLAY = "+91 99583 00518";
export const PHONE_E164 = "+919958300518";
export const VENUE_ADDRESS = "Village Bigrahpur, Post Dubari, Mau — Uttar Pradesh";
export const WEDDING_DATE_ISO = "2026-12-09T19:00:00+05:30";
export const VENUE_SHORT =
  "Vill. Bigrahpur, Post Dubari, Mau, Uttar Pradesh";
export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Bigrahpur,+Dubari,+Mau,+Uttar+Pradesh";

/** WhatsApp RSVP deep-link to the family. */
export const waRsvpUrl = (message: string) =>
  `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(message)}`;

/** WhatsApp share deep-link (no fixed recipient). */
export const waShareUrl = (message: string) =>
  `https://wa.me/?text=${encodeURIComponent(message)}`;

/** Google Calendar TEMPLATE link for the Shubh Vivah. */
export const WEDDING_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ashwin%20%E2%99%A5%20Aarti%20%E2%80%94%20Shubh%20Vivah&dates=20261209T133000Z%2F20261209T170000Z&details=Saat%20phere%2C%20ek%20vaada.%20Join%20the%20celebration!&location=Vill.%20Bigrahpur%2C%20Post%20Dubari%2C%20Mau%2C%20Uttar%20Pradesh";
