import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarPlus, Clock, Droplets, Flower2, Heart, Music, Sparkles } from "lucide-react";
import { Divider, Sparkles as SparkleField } from "./Ornaments";

gsap.registerPlugin(ScrollTrigger);

type Event = {
  no: string;
  title: string;
  hindi: string;
  dateISO: string;
  time: string;
  note: string;
  icon: typeof Sparkles;
  big?: boolean;
};

const EVENTS: Event[] = [
  {
    no: "01",
    title: "Shubh Tilak",
    hindi: "शुभ तिलक",
    dateISO: "2026-12-05T19:00:00+05:30",
    time: "7:00 PM onwards",
    note: "The auspicious beginning of the wedding festivities",
    icon: Sparkles,
  },
  {
    no: "02",
    title: "Haldi",
    hindi: "हल्दी",
    dateISO: "2026-12-07T19:00:00+05:30",
    time: "7:00 PM onwards",
    note: "A golden glow of turmeric, laughter and blessings",
    icon: Droplets,
  },
  {
    no: "03",
    title: "Mehndi & Sangeet",
    hindi: "मेहंदी · संगीत",
    dateISO: "2026-12-08T19:00:00+05:30",
    time: "7:00 PM onwards",
    note: "Henna, dholak and a night of music & dance",
    icon: Music,
  },
  {
    no: "04",
    title: "The Wedding",
    hindi: "शुभ विवाह",
    dateISO: "2026-12-09T19:00:00+05:30",
    time: "Shubh Muhurat · Evening",
    note: "Saat phere, ek vaada — the sacred seven vows",
    icon: Heart,
    big: true,
  },
];

function weekday(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { weekday: "long", timeZone: "Asia/Kolkata" });
}
function dayMon(iso: string) {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString("en-IN", { day: "2-digit", timeZone: "Asia/Kolkata" }),
    mon: d.toLocaleDateString("en-IN", { month: "short", timeZone: "Asia/Kolkata" }),
  };
}

function makeCalendarUrl(title: string, dateISO: string, note: string) {
  const start = new Date(dateISO);
  const end = new Date(start.getTime() + 3 * 3600 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Ashwin ♥ Aarti — ${title}`
  )}&dates=${fmt(start)}/${fmt(end)}&details=${encodeURIComponent(
    `${note}. With joyful hearts, Ashwin & Aarti invite you!`
  )}&location=${encodeURIComponent("Vill. Bigrahpur, Post Dubari, Mau, Uttar Pradesh")}`;
}

export default function Celebrations() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(".cel-head", {
        opacity: 0,
        y: 30,
        duration: 0.85,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // Timeline event rows
      const rows = gsap.utils.toArray<HTMLElement>(".event-row");
      rows.forEach((row) => {
        gsap.from(row.querySelectorAll(".event-card, .event-node, .event-ghost"), {
          opacity: 0,
          y: 40,
          duration: 0.85,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#FAF7F2] pattern-light py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,rgba(201,162,75,0.12),transparent_65%)] pointer-events-none" />
      <SparkleField count={10} />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* heading */}
        <div className="text-center">
          <p className="cel-head font-hindi text-lg font-semibold tracking-wide text-maroon-800 md:text-xl">
            हमारे उत्सव
          </p>
          <h2 className="cel-head mt-3 font-serif text-5xl font-medium text-maroon-900 md:text-6xl">
            Our <span className="text-gold-grad shimmer italic font-serif">Celebrations</span>
          </h2>
          <div className="cel-head">
            <Divider tone="maroon" className="mx-auto mt-5 h-9 w-64 md:w-80" />
          </div>
          <p className="cel-head mt-6 font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-maroon-700/80">
            05 — 09 December 2026 · Bigrahpur, Mau
          </p>
        </div>

        {/* timeline */}
        <div className="relative mt-16 md:mt-20">
          {/* center line */}
          <div className="absolute left-[1.35rem] top-0 h-full w-px bg-gradient-to-b from-transparent via-gold-500/50 to-transparent md:left-1/2" />

          <div className="flex flex-col gap-12 md:gap-16">
            {EVENTS.map((ev, i) => {
              const left = i % 2 === 0;
              const dm = dayMon(ev.dateISO);
              const Icon = ev.icon;
              return (
                <div
                  key={ev.no}
                  className={`event-row relative flex md:items-center ${
                    left ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* node */}
                  <span className="event-node absolute left-[1.35rem] top-8 z-10 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                    <span
                      className={`block rounded-full border-2 ${
                        ev.big
                          ? "h-4 w-4 border-gold-500 bg-maroon-800 shadow-[0_0_15px_rgba(201,162,75,0.8)]"
                          : "h-3.5 w-3.5 border-gold-400 bg-white shadow-sm"
                      }`}
                    />
                  </span>

                  {/* ghost number (opposite side) */}
                  <div
                    className={`event-ghost hidden md:flex md:w-1/2 ${
                      left ? "justify-end pr-16" : "justify-start pl-16"
                    }`}
                  >
                    <span className="font-serif text-[7rem] font-semibold leading-none text-gold-600/15 select-none">
                      {ev.no}
                    </span>
                  </div>

                  {/* card */}
                  <div
                    className={`ml-14 w-full md:ml-0 md:w-1/2 ${
                      left ? "md:pr-16" : "md:pl-16"
                    }`}
                  >
                    <div
                      className={`event-card group relative overflow-hidden bg-white p-7 transition-all duration-500 hover:-translate-y-1 md:p-8 ${
                        ev.big
                          ? "big-day-glow border-2 border-gold-400/80 bg-[#FFFDF9]"
                          : "card-light border border-gold-400/50 hover:border-gold-500 hover:shadow-md"
                      }`}
                    >
                      {ev.big && (
                        <span className="absolute right-0 top-0 bg-gradient-to-r from-gold-600 to-gold-400 px-3.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-maroon-950 shadow-sm">
                          The Big Day
                        </span>
                      )}

                      <div className="flex items-center gap-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-400/60 bg-gold-50 transition-transform duration-500 group-hover:scale-110">
                          <Icon className="h-5 w-5 text-gold-700" />
                        </span>
                        <div>
                          <p className="font-hindi text-sm font-semibold text-gold-700">{ev.hindi}</p>
                          <h3
                            className={`font-serif text-maroon-900 ${
                              ev.big ? "text-3xl font-semibold md:text-4xl" : "text-2xl font-medium md:text-3xl"
                            }`}
                          >
                            {ev.title}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-4 font-serif text-base italic leading-relaxed text-maroon-900/80">
                        {ev.note}
                      </p>

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-gold-400/30 pt-4">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="border border-gold-400/60 bg-gold-50/80 px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-maroon-800">
                            {weekday(ev.dateISO)}
                          </span>
                          <span className="font-serif text-2xl font-bold text-gold-grad">{dm.day}</span>
                          <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-maroon-700/80">
                            {dm.mon} 2026
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <p className="flex items-center gap-1.5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-maroon-700/80">
                            <Clock className="h-3.5 w-3.5 text-gold-600" /> {ev.time}
                          </p>

                          <a
                            href={makeCalendarUrl(ev.title, ev.dateISO, ev.note)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 border border-gold-400/80 bg-white px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-maroon-900 transition-all hover:bg-gold-500 hover:text-white hover:border-gold-500 rounded-sm"
                            title={`Add ${ev.title} to Google Calendar`}
                          >
                            <CalendarPlus className="h-3 w-3 text-gold-700 group-hover:text-white" />
                            <span>Add</span>
                          </a>
                        </div>
                      </div>

                      {/* hover golden sheen */}
                      <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* closing note */}
        <p className="cel-head mx-auto mt-16 flex max-w-md items-center justify-center gap-3 text-center font-sans text-[11px] font-medium uppercase tracking-[0.35em] text-maroon-800/80">
          <Flower2 className="h-4 w-4 text-maroon-600" />
          Followed by grand reception & dinner
        </p>
      </div>
    </section>
  );
}
