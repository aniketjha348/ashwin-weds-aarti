import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, MapPin } from "lucide-react";
import { Mandala, Petals, Sparkles } from "./Ornaments";
import coupleImg from "../assets/dsc_3488.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const namesRef = useRef<HTMLDivElement>(null);
  const mandalaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance timeline
      const tl = gsap.timeline({ delay: 1.8 });

      tl.from(".hero-subhead", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      })
        .from(
          photoRef.current,
          {
            opacity: 0,
            y: 40,
            scale: 0.95,
            duration: 1.1,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          namesRef.current,
          {
            opacity: 0,
            y: 35,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .from(
          ".hero-meta",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          ".hero-scroll",
          {
            opacity: 0,
            y: 10,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2"
        );

      // 2. Parallax on scroll
      if (photoRef.current) {
        gsap.to(photoRef.current, {
          y: 60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (mandalaRef.current) {
        gsap.to(mandalaRef.current, {
          y: 90,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#FAF7F2] pattern-light text-maroon-900"
    >
      {/* Ambient soft glows */}
      <div className="absolute inset-0 vignette-hero-light pointer-events-none" />
      <div className="absolute -top-32 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-gold-400/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 h-72 w-72 rounded-full bg-rose-300/20 blur-[100px] pointer-events-none" />

      {/* Grand frame borders */}
      <div className="pointer-events-none absolute inset-3 md:inset-5 border border-gold-500/25 z-20" />
      <div className="pointer-events-none absolute inset-5 md:inset-7 border border-gold-500/15 z-20" />
      <span className="pointer-events-none absolute top-3 left-3 md:top-5 md:left-5 h-2 w-2 bg-gold-500 z-20" />
      <span className="pointer-events-none absolute top-3 right-3 md:top-5 md:right-5 h-2 w-2 bg-gold-500 z-20" />
      <span className="pointer-events-none absolute bottom-3 left-3 md:bottom-5 md:left-5 h-2 w-2 bg-gold-500 z-20" />
      <span className="pointer-events-none absolute bottom-3 right-3 md:bottom-5 md:right-5 h-2 w-2 bg-gold-500 z-20" />

      {/* Rotating background mandalas */}
      <div
        ref={mandalaRef}
        className="pointer-events-none absolute inset-0 flex items-start justify-center pt-8 md:pt-4"
      >
        <Mandala className="h-[125vw] w-[125vw] max-h-[54rem] max-w-[54rem] animate-spin-slow opacity-35" />
      </div>
      <div className="pointer-events-none absolute -bottom-56 -right-40 h-[28rem] w-[28rem] animate-spin-rev opacity-25">
        <Mandala className="h-full w-full" />
      </div>

      <Sparkles count={12} />
      <Petals count={12} />

      {/* Main hero content */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 pb-24 pt-20 text-center"
      >
        <p className="hero-subhead font-hindi text-xl md:text-2xl tracking-wide text-maroon-800 font-medium">
          ॥ शुभ विवाह ॥
        </p>

        <p className="hero-subhead mt-3 font-sans text-[11px] md:text-xs font-medium uppercase tracking-[0.55em] text-maroon-700/80">
          Together with their families
        </p>

        {/* Straight Arch-framed couple portrait */}
        <div ref={photoRef} className="relative mt-8 md:mt-10">
          <div className="arch-shadow rounded-t-[13rem] rounded-b-[1.4rem] border-2 border-gold-400/70 bg-gradient-to-b from-white to-ivory-100 p-2 md:rounded-t-[15rem] md:p-2.5">
            <div className="overflow-hidden rounded-t-[12rem] rounded-b-[1rem] border border-gold-300/60 md:rounded-t-[14rem]">
              <img
                src={coupleImg}
                alt="Ashwin and Aarti"
                className="h-[21rem] w-[16rem] object-cover object-top sm:h-[24rem] sm:w-[18rem] md:h-[27rem] md:w-[21rem]"
              />
            </div>
          </div>
          {/* Subtle side hanging accents - clean vertical float, no tilted sway */}
          <div className="absolute -left-8 top-10 hidden animate-float md:block">
            <PaisleyDot />
          </div>
          <div
            className="absolute -right-8 top-10 hidden animate-float md:block"
            style={{ animationDelay: "-3.5s" }}
          >
            <PaisleyDot />
          </div>
        </div>

        {/* Names */}
        <div ref={namesRef} className="relative mt-8 md:mt-11">
          <h1 className="flex flex-col items-center leading-[0.95]">
            <span className="font-script text-gold-grad shimmer text-[4.4rem] sm:text-8xl md:text-[8.5rem]">
              Ashwin
            </span>
            <span className="my-1 flex items-center gap-4 md:my-2">
              <span className="gold-line-h h-px w-16 md:w-28" />
              <span className="font-serif italic text-3xl text-maroon-700 md:text-5xl">
                &
              </span>
              <span className="gold-line-h h-px w-16 md:w-28" />
            </span>
            <span className="font-script text-gold-grad shimmer text-[4.4rem] sm:text-8xl md:text-[8.5rem]">
              Aarti
            </span>
          </h1>

          <p className="hero-meta mx-auto mt-6 max-w-xl font-serif text-lg italic text-maroon-800/85 md:text-xl">
            "Two hearts, one soul — beginning a beautiful forever together"
          </p>

          <div className="hero-meta mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="gold-line-h h-px w-14 md:w-24" />
              <p className="font-sans text-xs md:text-sm font-semibold uppercase tracking-[0.45em] text-maroon-800">
                Wednesday · 09 December 2026
              </p>
              <span className="gold-line-h h-px w-14 md:w-24" />
            </div>
            <p className="flex items-center gap-2 font-sans text-[11px] md:text-xs font-medium uppercase tracking-[0.3em] text-maroon-700/80">
              <MapPin className="h-3.5 w-3.5 text-gold-600" />
              Vill. Bigrahpur · Post Dubari · Mau
            </p>
          </div>
        </div>

        {/* Scroll cue */}
        <a
          href="#invitation"
          className="hero-scroll group absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
          aria-label="Scroll to invitation"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-maroon-700/70 group-hover:text-maroon-900 transition-colors font-medium">
            Scroll
          </span>
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-gold-500/50 p-1">
            <ChevronDown className="h-3 w-3 animate-scrollcue text-gold-600" />
          </span>
        </a>
      </div>

      {/* Gentle bottom line transition */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ivory-200/50 to-transparent" />
    </section>
  );
}

function PaisleyDot() {
  return (
    <svg viewBox="0 0 40 70" className="h-16 w-10" fill="none" aria-hidden>
      <path
        d="M20 4 V46"
        stroke="#c9a24b"
        strokeWidth="1.2"
        strokeDasharray="1 5"
        strokeLinecap="round"
      />
      <path
        d="M20 46 C28 50 30 58 25 63 C20 68 12 66 10 59 C8 53 13 48 18 50"
        stroke="#c9a24b"
        strokeWidth="1.4"
      />
      <circle cx="20" cy="4" r="2.4" fill="#c9a24b" />
      <circle cx="17" cy="57" r="2" fill="#c9a24b" />
    </svg>
  );
}
