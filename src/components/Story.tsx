import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarPlus } from "lucide-react";
import { CornerFlourish, Divider } from "./Ornaments";
import storyImg from "../assets/dsc_1773.jpg";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════ Our Story (Light & Straight) ═══════════════════════ */
export function Story() {
  const containerRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Photo reveal - perfectly straight, no tilt
      if (photoRef.current) {
        gsap.from(photoRef.current, {
          opacity: 0,
          y: 45,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: photoRef.current,
            start: "top 80%",
          },
        });
      }

      // Text reveal
      if (textRef.current) {
        gsap.from(textRef.current.querySelectorAll(".story-anim"), {
          opacity: 0,
          y: 30,
          duration: 0.85,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="paper relative overflow-hidden py-24 md:py-32">
      <div className="absolute -right-40 top-10 h-[26rem] w-[26rem] rounded-full bg-rose-300/20 blur-[110px] pointer-events-none" />
      <div className="absolute -left-40 bottom-10 h-[26rem] w-[26rem] rounded-full bg-gold-400/20 blur-[110px] pointer-events-none" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2 md:gap-16">
        {/* Straight Framed Photo (No Rotations / No Slopes) */}
        <div ref={photoRef} className="relative mx-auto w-full max-w-md">
          {/* Subtle straight background frame */}
          <div className="absolute -inset-2.5 border border-gold-400/40 bg-white/50 shadow-[0_15px_40px_-15px_rgba(75,13,27,0.12)]" />
          
          <div className="relative border border-gold-500/70 bg-white p-3.5 shadow-[0_20px_50px_-20px_rgba(75,13,27,0.18)]">
            <div className="relative overflow-hidden">
              <img
                src={storyImg}
                alt="Ashwin putting a ring on Aarti's finger"
                className="h-[26rem] w-full object-cover object-top md:h-[30rem]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/15 via-transparent to-transparent" />
            </div>

            {/* Corner flourishes */}
            <CornerFlourish className="absolute -left-2 -top-2 h-12 w-12 text-gold-600" />
            <CornerFlourish className="absolute -right-2 -top-2 h-12 w-12 rotate-90 text-gold-600" />
            <CornerFlourish className="absolute -bottom-2 -right-2 h-12 w-12 rotate-180 text-gold-600" />
            <CornerFlourish className="absolute -bottom-2 -left-2 h-12 w-12 -rotate-90 text-gold-600" />
          </div>

          <p className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap border border-gold-400/70 bg-white px-5 py-1.5 font-script text-2xl text-maroon-800 shadow-sm">
            the ring & the promise
          </p>
        </div>

        {/* Text */}
        <div ref={textRef} className="text-center md:text-left">
          <p className="story-anim font-hindi text-lg font-semibold text-maroon-800 md:text-xl">
            हमारी कहानी
          </p>
          <h2 className="story-anim mt-3 font-serif text-5xl font-medium text-maroon-900 md:text-6xl">
            From this day, <span className="text-gold-grad shimmer italic font-serif">forever.</span>
          </h2>

          <div className="story-anim">
            <Divider tone="maroon" className="mx-auto mt-5 h-9 w-64 md:mx-0 md:w-80" />
          </div>

          <p className="story-anim mt-8 font-serif text-xl italic leading-relaxed text-maroon-800/90 md:text-2xl">
            "We found a little magic in ordinary moments, and now we are ready to create a lifetime of extraordinary ones."
          </p>

          <p className="story-anim mt-6 font-sans text-sm font-normal leading-relaxed text-maroon-900/80 md:text-base">
            Every love story is special, but ours is our favourite. Join us as we take our sacred seven vows, surrounded by loved ones, laughter, and lifelong memories.
          </p>

          <p className="story-anim mt-6 font-script text-3xl text-maroon-800 md:text-4xl">
            Ashwin & Aarti
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ Countdown (Light & Straight) ═══════════════════════ */
const TARGET = new Date("2026-12-09T19:00:00+05:30").getTime();

export function useCountdown() {
  const calc = () => {
    const diff = Math.max(0, TARGET - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor(diff / 3600000) % 24,
      mins: Math.floor(diff / 60000) % 60,
      secs: Math.floor(diff / 1000) % 60,
      done: diff === 0,
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export function Countdown() {
  const t = useCountdown();
  const containerRef = useRef<HTMLElement>(null);
  const units = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.mins },
    { label: "Seconds", value: t.secs },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cd-reveal", {
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

      gsap.from(".cd-box", {
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cd-grid",
          start: "top 85%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-[#FAF6EF] pattern-light py-24 md:py-32">
      {/* glows */}
      <div className="absolute left-1/2 top-1/2 h-[30rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 animate-glowpulse rounded-full bg-gold-400/15 blur-[130px] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="cd-reveal font-hindi text-lg font-semibold tracking-wide text-maroon-800 md:text-xl">
          शुभ घड़ी
        </p>
        <h2 className="cd-reveal mt-3 font-serif text-5xl font-medium text-maroon-900 md:text-6xl">
          {t.done ? (
            <span className="text-gold-grad shimmer italic font-serif">Just Married!</span>
          ) : (
            <>
              Counting down to <span className="text-gold-grad shimmer italic font-serif">forever</span>
            </>
          )}
        </h2>

        {/* Straight Countdown Boxes */}
        <div className="cd-grid mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6">
          {units.map((u) => (
            <div
              key={u.label}
              className="cd-box group relative bg-white border border-gold-400/60 px-4 py-8 shadow-[0_8px_25px_-8px_rgba(75,13,27,0.08)] transition-all duration-300 hover:border-gold-500 hover:shadow-md md:py-10"
            >
              {/* Straight Corner Pins */}
              <span className="absolute left-1.5 top-1.5 h-2.5 w-2.5 border-l-2 border-t-2 border-gold-500" />
              <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 border-r-2 border-t-2 border-gold-500" />
              <span className="absolute bottom-1.5 left-1.5 h-2.5 w-2.5 border-b-2 border-l-2 border-gold-500" />
              <span className="absolute bottom-1.5 right-1.5 h-2.5 w-2.5 border-b-2 border-r-2 border-gold-500" />

              <p className="font-serif text-6xl font-bold tabular-nums text-maroon-900 md:text-7xl">
                {String(u.value).padStart(2, "0")}
              </p>
              <div className="mx-auto mt-4 h-px w-10 bg-gold-400 transition-all duration-500 group-hover:w-16" />
              <p className="mt-3 font-sans text-[11px] font-semibold uppercase tracking-[0.35em] text-maroon-700/80">
                {u.label}
              </p>
            </div>
          ))}
        </div>

        <div className="cd-reveal mt-12 flex flex-col items-center gap-5">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.45em] text-maroon-800/80">
            09 · 12 · 2026 — Bigrahpur, Mau
          </p>
          <a
            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ashwin%20%E2%99%A5%20Aarti%20%E2%80%94%20Shubh%20Vivah&dates=20261209T133000Z%2F20261209T170000Z&details=Saat%20phere%2C%20ek%20vaada.%20Join%20the%20celebration!&location=Vill.%20Bigrahpur%2C%20Post%20Dubari%2C%20Mau%2C%20Uttar%20Pradesh"
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden border border-gold-400 bg-maroon-800 px-8 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-100 transition-all duration-500 hover:bg-maroon-900 hover:shadow-[0_12px_35px_-8px_rgba(75,13,27,0.35)]"
          >
            <CalendarPlus className="h-4 w-4 text-gold-300" />
            Save the date
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
        </div>
      </div>
    </section>
  );
}
