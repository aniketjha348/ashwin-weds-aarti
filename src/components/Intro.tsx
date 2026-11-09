import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { Play, Sparkles as SparklesIcon, Film } from "lucide-react";
import { Ganesha, CornerFlourish, Diya } from "./Ornaments";

interface IntroProps {
  onStartFilm: () => void;
}

export default function Intro({ onStartFilm }: IntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const centerLightBeamRef = useRef<HTMLDivElement>(null);
  const valanceRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);

  const [countdownNum, setCountdownNum] = useState<number | string>(3);
  const [isStarting, setIsStarting] = useState(false);

  // Lock page scroll while curtains are up
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleOpenCurtains = () => {
    if (isStarting) return;
    setIsStarting(true);

    // Harmonious temple chime / conch resonance when curtains open
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof window.AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        if (ctx.state === "suspended") ctx.resume();
        const freqs = [440, 554.37, 659.25, 880];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.08 / (idx + 1), ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + 3.4);
        });
      }
    } catch {
      // ignore
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = "none";
        }
        document.body.style.overflow = "";
        onStartFilm();
      },
    });

    // 1. Ticket zooms slightly and fades into the vintage countdown leader
    tl.to(ticketRef.current, {
      scale: 0.92,
      opacity: 0,
      duration: 0.45,
      ease: "power2.in",
    })
      .set(countdownRef.current, { display: "flex", opacity: 1 })
      .to({}, { duration: 0.4, onStart: () => setCountdownNum(3) })
      .to({}, { duration: 0.4, onStart: () => setCountdownNum(2) })
      .to({}, { duration: 0.4, onStart: () => setCountdownNum(1) })
      .to({}, { duration: 0.35, onStart: () => setCountdownNum("ACTION! 🎬") })
      .to(countdownRef.current, {
        opacity: 0,
        scale: 1.25,
        duration: 0.35,
        ease: "power2.in",
      })
      // 2. Light beam bursts through the center seam
      .to(centerLightBeamRef.current, {
        opacity: 1,
        scaleX: 2.5,
        duration: 0.4,
        ease: "power2.out",
      })
      // 3. Real heavy velvet curtains GATHER and bunch up towards left and right
      .to(
        leftCurtainRef.current,
        {
          xPercent: -88,
          scaleX: 0.22,
          transformOrigin: "left center",
          duration: 1.8,
          ease: "power3.inOut",
        },
        "curtains"
      )
      .to(
        rightCurtainRef.current,
        {
          xPercent: 88,
          scaleX: 0.22,
          transformOrigin: "right center",
          duration: 1.8,
          ease: "power3.inOut",
        },
        "curtains"
      )
      // Top valance lifts slightly as stage opens
      .to(
        valanceRef.current,
        {
          yPercent: -40,
          opacity: 0.4,
          duration: 1.6,
          ease: "power3.inOut",
        },
        "curtains"
      );
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] overflow-hidden flex items-center justify-center bg-[#0d0104] select-none"
    >
      {/* ───────── Center Behind-Curtain Radiant Light Beam ───────── */}
      <div
        ref={centerLightBeamRef}
        className="light-beam pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-48 opacity-0 z-10"
      />

      {/* ───────── 1. REAL LEFT VELVET CURTAIN (मखमली बायाँ पर्दा) ───────── */}
      <div
        ref={leftCurtainRef}
        className="curtain-panel-velvet absolute inset-y-0 left-0 w-1/2 z-20 flex justify-end shadow-[25px_0_60px_rgba(0,0,0,0.9)] overflow-hidden"
      >
        {/* Deep Pleat Vertical Highlight Shadows */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/70 pointer-events-none" />

        {/* Golden Embroidered Braided Lace on Center Seam */}
        <div className="relative h-full w-4 sm:w-5 bg-gradient-to-r from-gold-600 via-gold-300 to-gold-600 shadow-[-2px_0_8px_rgba(0,0,0,0.8)] border-l border-gold-300/80 flex flex-col justify-around py-4">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="mx-auto h-2 w-2 rounded-full border border-gold-700 bg-gold-200 shadow-sm"
            />
          ))}
        </div>

        {/* Bottom Gold Fringe Tassels */}
        <div className="absolute bottom-0 inset-x-0 h-10 flex items-end justify-between px-2 overflow-hidden pointer-events-none">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center shrink-0 w-3">
              <span className="h-2 w-2 rounded-full bg-gold-300 shadow-sm" />
              <span className="h-6 w-0.5 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700" />
            </div>
          ))}
        </div>
      </div>

      {/* ───────── 2. REAL RIGHT VELVET CURTAIN (मखमली दायाँ पर्दा) ───────── */}
      <div
        ref={rightCurtainRef}
        className="curtain-panel-velvet absolute inset-y-0 right-0 w-1/2 z-20 flex justify-start shadow-[-25px_0_60px_rgba(0,0,0,0.9)] overflow-hidden"
      >
        {/* Deep Pleat Vertical Highlight Shadows */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/60 pointer-events-none" />

        {/* Golden Embroidered Braided Lace on Center Seam */}
        <div className="relative h-full w-4 sm:w-5 bg-gradient-to-r from-gold-600 via-gold-300 to-gold-600 shadow-[2px_0_8px_rgba(0,0,0,0.8)] border-r border-gold-300/80 flex flex-col justify-around py-4">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="mx-auto h-2 w-2 rounded-full border border-gold-700 bg-gold-200 shadow-sm"
            />
          ))}
        </div>

        {/* Bottom Gold Fringe Tassels */}
        <div className="absolute bottom-0 inset-x-0 h-10 flex items-end justify-between px-2 overflow-hidden pointer-events-none">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center shrink-0 w-3">
              <span className="h-2 w-2 rounded-full bg-gold-300 shadow-sm" />
              <span className="h-6 w-0.5 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700" />
            </div>
          ))}
        </div>
      </div>

      {/* ───────── 3. THEATRE TOP SCALLOPED VALANCE / PELMET (रॉयल झालर) ───────── */}
      <div
        ref={valanceRef}
        className="pointer-events-none absolute top-0 inset-x-0 z-25 flex flex-col items-center"
      >
        {/* Top Velvet Banner with Scallops */}
        <div className="curtain-valance-scallop w-full h-12 sm:h-20 flex items-center justify-around border-b-2 border-gold-400 relative overflow-hidden">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="relative flex flex-col items-center shrink-0">
              {/* Scallop swag curve */}
              <div className="h-8 sm:h-14 w-16 sm:w-28 rounded-b-full border-b-2 border-x border-gold-400/90 shadow-lg bg-gradient-to-b from-[#40050e] to-[#780d1e]" />
              {/* Hanging Golden Tassel at Scallop peak */}
              <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-gold-300 -mt-1 shadow" />
              <span className="h-3 sm:h-4 w-0.5 sm:w-1 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700" />
            </div>
          ))}
        </div>

        {/* Valance Bottom Golden Braid Trim */}
        <div className="w-full h-1.5 sm:h-2 bg-gradient-to-r from-gold-600 via-gold-300 to-gold-600 shadow-md" />
      </div>

      {/* ───────── 4. CINEMA HALL COUNTDOWN LEADER (3, 2, 1, ACTION!) ───────── */}
      <div
        ref={countdownRef}
        className="absolute z-35 hidden flex-col items-center justify-center pointer-events-none"
      >
        <div className="relative flex h-32 w-32 sm:h-44 sm:w-44 items-center justify-center rounded-full border-4 border-gold-400 bg-maroon-950/95 shadow-[0_0_60px_rgba(201,162,75,0.85)] backdrop-blur-md">
          <div className="absolute inset-x-0 top-1/2 h-px bg-gold-400/60" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-gold-400/60" />
          <div className="absolute inset-2 rounded-full border border-dashed border-gold-400/70 animate-spin-slow" />
          <span
            className={`px-2 text-center font-serif font-bold text-gold-200 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] ${
              typeof countdownNum === "string"
                ? "text-lg sm:text-2xl leading-tight"
                : "text-3xl sm:text-5xl"
            }`}
          >
            {countdownNum}
          </span>
        </div>
        <p className="relative mt-3 sm:mt-4 inline-block rounded-full bg-[#0d0104]/85 px-4 sm:px-5 py-1 font-sans text-[11px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-gold-200 font-bold shadow-lg backdrop-blur-sm">
          ॥ शुभ आरंभ ॥
        </p>
      </div>

      {/* ───────── 5. CENTER CINEMA PREMIERE TICKET STUB ───────── */}
      <div
        ref={ticketRef}
        className="relative z-30 flex flex-col items-center justify-center px-3 sm:px-4 max-w-xl w-full"
      >
        {/* Cinema Marquee Header */}
        <div className="relative text-center mb-2 sm:mb-3">
          {/* Scrim so the gold curtain seam never cuts through the title */}
          <div
            className="pointer-events-none absolute -inset-x-8 -inset-y-3 bg-[radial-gradient(ellipse_at_center,rgba(13,1,4,0.92)_0%,rgba(13,1,4,0.72)_55%,transparent_85%)]"
            aria-hidden
          />
          <div className="relative inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-gold-400 bg-maroon-950/90 px-3 sm:px-4 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gold-300 shadow-xl backdrop-blur-sm">
            <Film className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gold-400 animate-pulse" />
            <span>★ MAURYA CINEMAS PRESENTS ★</span>
          </div>
          <p className="relative mt-1.5 font-serif text-[11px] sm:text-xs italic text-gold-100/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            A Royal Wedding Film Premiere Experience
          </p>
        </div>

        {/* 🎟️ Royal Cinema Premiere Ticket Stub */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Open the curtains and start the wedding film"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleOpenCurtains();
            }
          }}
          onClick={handleOpenCurtains}
          className="film-ticket group w-full rounded-2xl bg-white p-4 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.8)] cursor-pointer hover:scale-[1.01] transition-transform duration-300 relative overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400"
        >
          {/* Golden Corner Flourishes */}
          <CornerFlourish className="absolute -left-1 -top-1 h-8 w-8 sm:h-9 sm:w-9 text-gold-600" />
          <CornerFlourish className="absolute -right-1 -top-1 h-8 w-8 sm:h-9 sm:w-9 rotate-90 text-gold-600" />
          <CornerFlourish className="absolute -bottom-1 -right-1 h-8 w-8 sm:h-9 sm:w-9 rotate-180 text-gold-600" />
          <CornerFlourish className="absolute -bottom-1 -left-1 h-8 w-8 sm:h-9 sm:w-9 -rotate-90 text-gold-600" />

          {/* Ticket Notches (Left & Right Cutouts) */}
          <div className="absolute top-1/2 -left-3.5 h-6 w-6 sm:h-7 sm:w-7 -translate-y-1/2 rounded-full bg-[#0d0104] border border-gold-400" />
          <div className="absolute top-1/2 -right-3.5 h-6 w-6 sm:h-7 sm:w-7 -translate-y-1/2 rounded-full bg-[#0d0104] border border-gold-400" />

          {/* Top Bar of Ticket */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 border-b border-gold-300/70 pb-2.5 sm:pb-3">
            <Diya className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-hindi text-xs sm:text-sm font-bold text-maroon-900">
              ॥ श्री गणेशाय नमः ॥
            </span>
          </div>

          {/* Main Body of Ticket */}
          <div className="my-3 sm:my-4 text-center">
            <div className="mx-auto mb-1.5 sm:mb-2 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-gold-400 bg-gold-50 shadow-inner">
              <Ganesha className="h-7 w-7 sm:h-9 sm:w-9 text-maroon-900" />
            </div>

            <p className="font-hindi text-sm sm:text-base md:text-lg font-bold text-gold-700">
              ॥ शुभ विवाह फ़िल्म ॥
            </p>

            <p className="font-script text-4xl sm:text-6xl text-gold-grad shimmer font-bold leading-tight my-0.5 sm:my-1">
              Ashwin &amp; Aarti
            </p>

            <p className="font-serif text-xs sm:text-sm italic text-maroon-800">
              "Two Hearts · Seven Vows · One Epic Journey"
            </p>

            {/* Ticket Details Strip */}
            <div className="mt-2.5 sm:mt-3.5 grid grid-cols-3 divide-x divide-gold-300/70 border-y border-gold-300/70 py-2 sm:py-2.5 text-center bg-gold-50/50">
              <div>
                <p className="text-[9px] sm:text-[10px] uppercase font-bold text-maroon-600">Show Date</p>
                <p className="font-serif text-xs sm:text-sm font-bold text-maroon-950 mt-0.5">
                  09 DEC 2026
                </p>
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] uppercase font-bold text-maroon-600">Admit Seat</p>
                <p className="font-serif text-xs sm:text-sm font-bold text-gold-800 mt-0.5">
                  VIP GUEST
                </p>
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] uppercase font-bold text-maroon-600">Location</p>
                <p className="font-serif text-xs sm:text-sm font-bold text-maroon-950 mt-0.5">
                  Mau, UP
                </p>
              </div>
            </div>
          </div>

          {/* Ticket Call To Action Button */}
          <div className="pt-1.5 sm:pt-2 text-center">
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 sm:gap-3 rounded-xl border-2 border-gold-500 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 py-3 sm:py-3.5 px-3 sm:px-6 text-xs sm:text-sm font-bold uppercase tracking-wider sm:tracking-[0.25em] text-maroon-950 shadow-[0_10px_25px_-5px_rgba(201,162,75,0.6)] group-hover:brightness-110 group-hover:shadow-[0_15px_35px_-5px_rgba(201,162,75,0.8)] transition-all"
            >
              <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current text-maroon-950 animate-pulse" />
              <span>पर्दा उठाएँ व फ़िल्म शुरू करें 🎬</span>
              <SparklesIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-maroon-950" />
            </button>
            <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-[11px] font-serif italic text-maroon-700/75">
              (Tap ticket to part velvet curtains with music)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}