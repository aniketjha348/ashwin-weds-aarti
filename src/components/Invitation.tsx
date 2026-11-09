import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Divider } from "./Ornaments";
import inviteCoupleImg from "../assets/dsc_1776.jpg";

gsap.registerPlugin(ScrollTrigger);

/* ─────────── Straight Gold Marquee Ribbon (No Slopes) ─────────── */
export function Marquee() {
  const items = [
    "Ashwin ♥ Aarti",
    "॥ शुभ विवाह ॥",
    "09 · 12 · 2026",
    "Bigrahpur · Mau",
    "Save The Date",
  ];
  const row = [...items, ...items, ...items, ...items];

  return (
    <div className="relative z-10 border-y border-gold-500/60 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 py-3.5 shadow-[0_4px_25px_-5px_rgba(201,162,75,0.35)] overflow-hidden">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap px-5">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span
              className={
                i % 2 === 0
                  ? "font-serif text-lg font-medium italic text-maroon-950"
                  : "font-hindi text-lg font-semibold text-maroon-950"
              }
            >
              {t}
            </span>
            <span className="h-2 w-2 rotate-45 bg-maroon-950/70" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────── The Invitation Section (Light & Regal) ─────────── */
export default function Invitation() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header elements
      gsap.from(".inv-reveal", {
        opacity: 0,
        y: 35,
        duration: 0.85,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // Animate family cards
      if (cardsRef.current) {
        gsap.from(".family-card", {
          opacity: 0,
          y: 45,
          duration: 0.9,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="invitation"
      ref={containerRef}
      className="paper relative overflow-hidden py-24 md:py-32"
    >
      {/* Soft warm glows */}
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-rose-300/20 blur-[110px] pointer-events-none" />
      <div className="absolute -right-32 bottom-24 h-96 w-96 rounded-full bg-gold-400/20 blur-[110px] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="inv-reveal font-hindi text-4xl text-maroon-800">
          ॐ
        </p>

        <p className="inv-reveal mt-4 font-sans text-[11px] font-semibold uppercase tracking-[0.5em] text-gold-700">
          With joyful hearts
        </p>

        <h2 className="inv-reveal mt-3 font-serif text-3xl sm:text-4xl font-medium text-maroon-900 md:text-6xl">
          We are getting <span className="italic text-gold-600">married!</span>
        </h2>

        <div className="inv-reveal">
          <Divider tone="maroon" className="mx-auto mt-6 h-9 w-64 md:w-80" />
        </div>

        <p className="inv-reveal mx-auto mt-6 sm:mt-8 max-w-2xl font-serif text-base sm:text-lg leading-relaxed text-maroon-900/85 md:text-2xl">
          We invite you to be part of our celebration as
          <span className="italic font-semibold text-gold-700"> two hearts</span> begin a beautiful
          <span className="italic font-semibold text-gold-700"> forever</span> together.
        </p>

        {/* Real Couple Photo (DSC_1776) */}
        <div className="inv-reveal mx-auto mt-10 max-w-lg border-2 border-gold-400 bg-white p-2.5 shadow-lg">
          <img
            src={inviteCoupleImg}
            alt="Ashwin & Aarti Together"
            loading="lazy"
            decoding="async"
            className="h-52 sm:h-64 md:h-72 w-full object-cover"
          />
        </div>

        {/* Groom & Bride Cards - Straight, Clean, Regal */}
        <div
          ref={cardsRef}
          className="mt-16 grid items-stretch gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-8"
        >
          <FamilyCard
            side="The Dulha · Groom"
            hindi="दूल्हा"
            name="Ashwin Maurya"
            relation="Son of"
            parents="Shri Vijay Narayan Maurya & Smt. Nirmala Maurya"
          />

          {/* Heart divider between the two */}
          <div className="family-card hidden items-center justify-center md:flex">
            <div className="relative flex h-16 w-16 items-center justify-center">
              <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-gold-500/70" />
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-maroon-700">
                <path d="M12 21c-4.8-3.6-9-6.9-9-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 4.1-4.2 7.4-9 11Z" />
              </svg>
            </div>
          </div>

          <FamilyCard
            side="The Bride · Dulhan"
            hindi="दुल्हन"
            name="Aarti Maurya"
            relation="Daughter of"
            parents="Shri Radheshyam Maurya & Smt. Suman Maurya"
          />
        </div>

        <p className="inv-reveal mx-auto mt-10 sm:mt-14 max-w-xl font-sans text-xs font-medium uppercase leading-loose tracking-[0.15em] sm:tracking-[0.3em] text-maroon-800/80">
          request the honour of your gracious presence
          <br />
          on the auspicious occasion
        </p>
      </div>
    </section>
  );
}

function FamilyCard({
  side,
  hindi,
  name,
  relation,
  parents,
}: {
  side: string;
  hindi: string;
  name: string;
  relation: string;
  parents: string;
}) {
  return (
    <div className="family-card group relative bg-white border border-gold-400/60 p-5 sm:p-8 text-center shadow-[0_10px_35px_-10px_rgba(75,13,27,0.08)] transition-all duration-500 hover:border-gold-500 hover:shadow-[0_15px_45px_-10px_rgba(201,162,75,0.25)] md:p-10">
      {/* Straight Corner Filigrees */}
      <span className="absolute left-2.5 top-2.5 h-3.5 w-3.5 border-l-2 border-t-2 border-gold-500" />
      <span className="absolute right-2.5 top-2.5 h-3.5 w-3.5 border-r-2 border-t-2 border-gold-500" />
      <span className="absolute bottom-2.5 left-2.5 h-3.5 w-3.5 border-b-2 border-l-2 border-gold-500" />
      <span className="absolute bottom-2.5 right-2.5 h-3.5 w-3.5 border-b-2 border-r-2 border-gold-500" />

      <p className="font-hindi text-base font-semibold text-gold-700">{hindi}</p>
      <p className="mt-1 font-sans text-[11px] font-semibold uppercase tracking-[0.35em] text-maroon-700/80">
        {side}
      </p>

      <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-semibold text-maroon-900 md:text-4xl">
        {name}
      </h3>

      <div className="mx-auto my-5 h-px w-20 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <p className="font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-maroon-600/75">
        {relation}
      </p>
      <p className="mt-2 font-serif text-base sm:text-lg leading-relaxed text-maroon-900/90 font-medium">
        {parents}
      </p>
    </div>
  );
}
