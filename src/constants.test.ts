import { describe, it, expect } from "vitest";
import {
  PHONE_E164,
  VENUE_ADDRESS,
  WEDDING_DATE_ISO,
  waRsvpUrl,
  waShareUrl,
} from "./constants";

describe("constants", () => {
  it("phone is a valid E.164 Indian number", () => {
    expect(PHONE_E164).toMatch(/^\+91\d{10}$/);
  });

  it("venue mentions Bigrahpur and Mau", () => {
    expect(VENUE_ADDRESS).toContain("Bigrahpur");
    expect(VENUE_ADDRESS).toContain("Mau");
  });

  it("wedding date stamp is 09 Dec 2026 IST", () => {
    const d = new Date(WEDDING_DATE_ISO);
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(11);
    expect(d.getDate()).toBe(9);
  });

  it("waRsvpUrl encodes the message", () => {
    const url = waRsvpUrl("hello world");
    expect(url).toContain(`https://wa.me/${PHONE_E164}?text=`);
    expect(url).toContain("hello%20world");
  });

  it("waShareUrl has no recipient", () => {
    expect(waShareUrl("hi")).toMatch(/^https:\/\/wa\.me\/\?text=/);
  });
});
