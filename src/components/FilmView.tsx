import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import {
  Volume2,
  VolumeX,
  MapPin,
  Navigation,
  Phone,
  MessageCircle,
  RotateCcw,
  Share2,
  Copy,
  Check,
  Pause,
  Heart,
  Sparkles as SparklesIcon,
} from "lucide-react";
import {
  Divider,
  Ganesha,
  Petals,
  Sparkles,
  Diya,
  Kalash,
  WeddingBells,
} from "./Ornaments";
import PersonalizedInvitationModal from "./PersonalizedInvitationModal";

import img1773 from "../assets/dsc_1773.jpg";
import img1776 from "../assets/dsc_1776.jpg";
import img1777 from "../assets/dsc_1777.jpg";
import img3488 from "../assets/dsc_3488.jpg";
import img3501 from "../assets/dsc_3501.jpg";
import funImg from "../assets/fun.jpg";

interface FilmViewProps {
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onSwitchToScroll: () => void;
}

export default function FilmView({
  isPlayingMusic,
  onToggleMusic,
  onSwitchToScroll,
}: FilmViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [extraPetals, setExtraPetals] = useState<number[]>([]);
  const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);

  // Subtitles for each cinematic scene
  const subtitles = [
    "[ मंगल शहनाई वादन ] With the divine blessings of Lord Ganesha, our sacred journey begins.",
    "[ मुख्य नायक-नायिका ] Starring Ashwin & Aarti — An eternal love story sealed by destiny.",
    "[ पारिवारिक मिलन ] Bound by sacred traditions & elders' blessings: The Maurya & Radheshyam families unite.",
    "[ चार दिवसीय उत्सव ] Four joyous celebrations: Tilak (05 Dec), Haldi (07 Dec), Sangeet (08 Dec), Shubh Vivah (09 Dec).",
    "[ अनमोल वादा ] Two souls, one heartbeat — Sealed with sacred rings and a lifetime of devotion.",
    "[ नन्हें मेहमानों का हुक्म ] Special Guest Appearance: Mere Mama ki shaadi hai, aana zaroori hai!",
    "[ गोधूलि बेला में सात फेरे ] Saat Phere, Saat Vachan — Walking into forever under the blessed golden twilight.",
    "[ आभार व निमंत्रण ] Samast Maurya Parivar awaits to welcome you with folded hands at Village Bigrahpur, Mau.",
  ];

  const sceneLabels = [
    "प्रारंभ · गणेश वंदना",
    "नायक-नायिका · शुभ विवाह",
    "पारिवारिक मिलन · कुटुंब",
    "उत्सव की तिथियाँ · चार दिवस",
    "प्रेम कहानी · अंगूठी व वचन",
    "नन्हें मेहमानों का हुक्म",
    "गोधूलि बेला · सात फेरे",
    "आभार व शुभ स्थल",
  ];

  // Double tap / click to shower flower petals (पुष्प वर्षा)
  const showerPetals = () => {
    const id = Date.now();
    setExtraPetals((prev) => [...prev, id]);
    setTimeout(() => {
      setExtraPetals((prev) => prev.filter((p) => p !== id));
    }, 4500);
  };

  // Build the cinematic master timeline with fullscreen Ken Burns motion
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".film-scene", { opacity: 0, display: "none" });
      gsap.set("#scene-0", { opacity: 0, display: "flex" });

      const tl = gsap.timeline({
        onComplete: () => {
          setIsEnded(true);
        },
      });

      masterTimelineRef.current = tl;

      // ──────────────────────────────────────────────────────────
      // SCENE 0: SACRED PRODUCTION PROLOGUE (0.0s - 6.5s)
      // ──────────────────────────────────────────────────────────
      tl.call(() => setActiveSceneIndex(0))
        .to("#scene-0", { opacity: 1, duration: 1.2, ease: "power2.out" })
        .from("#scene-0 .ganesh-icon-box", { scale: 0.75, opacity: 0, duration: 1.1, ease: "back.out(1.4)" }, "-=0.8")
        .from("#scene-0 .diya-flame", { scale: 0, opacity: 0, duration: 0.9, stagger: 0.15, ease: "power2.out" }, "-=0.7")
        .from("#scene-0 .ganesh-text", { y: 22, opacity: 0, duration: 1, stagger: 0.2, ease: "power2.out" }, "-=0.6")
        .to({}, { duration: 3.5 })
        .to("#scene-0", { opacity: 0, duration: 1.0, ease: "power2.in" })
        .set("#scene-0", { display: "none" });

      // ──────────────────────────────────────────────────────────
      // SCENE 1: THE LEADING CAST & MAIN TITLE (DSC_3488) (6.5s - 14.2s)
      // Fullscreen edge-to-edge Ken Burns zoom
      // ──────────────────────────────────────────────────────────
      tl.call(() => setActiveSceneIndex(1))
        .set("#scene-1", { display: "flex" })
        .to("#scene-1", { opacity: 1, duration: 1.2, ease: "power2.out" })
        .fromTo(
          "#scene-1 .ken-burns-img",
          { scale: 1.0, y: 0 },
          { scale: 1.12, y: -18, duration: 7.5, ease: "none" },
          "-=1.2"
        )
        .from("#scene-1 .title-fade", { y: 30, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power3.out" }, "-=7.0")
        .to({}, { duration: 2.5 })
        .to("#scene-1", { opacity: 0, duration: 1.0, ease: "power2.in" })
        .set("#scene-1", { display: "none" });

      // ──────────────────────────────────────────────────────────
      // SCENE 2: TWO FAMILIES UNITE (DSC_1776) (14.2s - 22.0s)
      // Fullscreen wide shot with Ken Burns drift
      // ──────────────────────────────────────────────────────────
      tl.call(() => setActiveSceneIndex(2))
        .set("#scene-2", { display: "flex" })
        .to("#scene-2", { opacity: 1, duration: 1.1, ease: "power2.out" })
        .fromTo(
          "#scene-2 .ken-burns-img",
          { scale: 1.12, x: 10 },
          { scale: 1.0, x: -10, duration: 7.5, ease: "none" },
          "-=1.1"
        )
        .from("#scene-2 .family-title-fade", { y: 25, opacity: 0, duration: 1, stagger: 0.18, ease: "power3.out" }, "-=7.0")
        .to({}, { duration: 3.0 })
        .to("#scene-2", { opacity: 0, duration: 1.0, ease: "power2.in" })
        .set("#scene-2", { display: "none" });

      // ──────────────────────────────────────────────────────────
      // SCENE 3: CELEBRATIONS & 4 FUNCTIONS (DSC_1777) (22.0s - 30.5s)
      // Joyous candid portrait with floating schedule slates
      // ──────────────────────────────────────────────────────────
      tl.call(() => setActiveSceneIndex(3))
        .set("#scene-3", { display: "flex" })
        .to("#scene-3", { opacity: 1, duration: 1.1, ease: "power2.out" })
        .fromTo(
          "#scene-3 .ken-burns-img",
          { scale: 1.0, y: 0 },
          { scale: 1.1, y: 15, duration: 8.0, ease: "none" },
          "-=1.1"
        )
        .from("#scene-3 .event-card-item", {
          y: 35,
          opacity: 0,
          duration: 0.9,
          stagger: 0.16,
          ease: "power3.out",
        }, "-=7.2")
        .to({}, { duration: 3.5 })
        .to("#scene-3", { opacity: 0, duration: 1.0, ease: "power2.in" })
        .set("#scene-3", { display: "none" });

      // ──────────────────────────────────────────────────────────
      // SCENE 4: OUR STORY / THE RING & PROMISE (DSC_1773) (30.5s - 38.0s)
      // Intimate cinematic zoom into the promise & rings
      // ──────────────────────────────────────────────────────────
      tl.call(() => setActiveSceneIndex(4))
        .set("#scene-4", { display: "flex" })
        .to("#scene-4", { opacity: 1, duration: 1.1, ease: "power2.out" })
        .fromTo(
          "#scene-4 .ken-burns-img",
          { scale: 1.1, x: -12 },
          { scale: 1.0, x: 12, duration: 7.5, ease: "none" },
          "-=1.1"
        )
        .from("#scene-4 .story-text-fade", { y: 25, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" }, "-=6.8")
        .to({}, { duration: 3.2 })
        .to("#scene-4", { opacity: 0, duration: 1.0, ease: "power2.in" })
        .set("#scene-4", { display: "none" });

      // ──────────────────────────────────────────────────────────
      // SCENE 5: SPECIAL CAMEO — NIECE & NEPHEW (FUN.JPG) (38.0s - 44.5s)
      // Warm playful frame with speech dialogue
      // ──────────────────────────────────────────────────────────
      tl.call(() => setActiveSceneIndex(5))
        .set("#scene-5", { display: "flex" })
        .to("#scene-5", { opacity: 1, duration: 1.1, ease: "power2.out" })
        .fromTo(
          "#scene-5 .ken-burns-img",
          { scale: 1.0, y: 0 },
          { scale: 1.09, y: -10, duration: 6.5, ease: "none" },
          "-=1.1"
        )
        .from("#scene-5 .kids-dialogue", { scale: 0.85, opacity: 0, duration: 1, ease: "back.out(1.3)" }, "-=5.8")
        .to({}, { duration: 3.0 })
        .to("#scene-5", { opacity: 0, duration: 1.0, ease: "power2.in" })
        .set("#scene-5", { display: "none" });

      // ──────────────────────────────────────────────────────────
      // SCENE 6: GODHULI BELA — 16:9 SUNSET PANORAMA (DSC_3501) (44.5s - 52.5s)
      // Ultra-widescreen golden hour cinematic pan
      // ──────────────────────────────────────────────────────────
      tl.call(() => setActiveSceneIndex(6))
        .set("#scene-6", { display: "flex" })
        .to("#scene-6", { opacity: 1, duration: 1.2, ease: "power2.out" })
        .fromTo(
          "#scene-6 .ken-burns-img",
          { scale: 1.0, x: -25 },
          { scale: 1.08, x: 25, duration: 7.5, ease: "none" },
          "-=1.2"
        )
        .from("#scene-6 .panorama-caption-fade", { y: 25, opacity: 0, duration: 1, stagger: 0.22, ease: "power3.out" }, "-=6.8")
        .to({}, { duration: 3.2 })
        .to("#scene-6", { opacity: 0, duration: 1.0, ease: "power2.in" })
        .set("#scene-6", { display: "none" });

      // ──────────────────────────────────────────────────────────
      // SCENE 7: GRAND CLIMAX & YOUR PERSONALIZED INVITATION (52.5s onwards)
      // ──────────────────────────────────────────────────────────
      tl.call(() => setActiveSceneIndex(7))
        .set("#scene-7", { display: "flex" })
        .to("#scene-7", { opacity: 1, duration: 1.2, ease: "power2.out" })
        .from("#scene-7 .venue-item", {
          y: 22,
          opacity: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power2.out",
        }, "-=0.8");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Screen click toggles pause / resume and triggers petals
  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a, button, input")) return;
    showerPetals();

    if (!masterTimelineRef.current) return;
    if (masterTimelineRef.current.paused()) {
      masterTimelineRef.current.play();
      setIsPaused(false);
    } else {
      masterTimelineRef.current.pause();
      setIsPaused(true);
    }
  };

  const handleReplay = useCallback(() => {
    setIsEnded(false);
    setIsPaused(false);
    if (masterTimelineRef.current) {
      gsap.set(".film-scene", { opacity: 0, display: "none" });
      gsap.set("#scene-0", { opacity: 1, display: "flex" });
      masterTimelineRef.current.seek(0);
      masterTimelineRef.current.play();
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard
      .writeText("Village Bigrahpur, Post Dubari, Mau — Uttar Pradesh")
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
  };

  const handleShare = () => {
    const text =
      "Watch the royal wedding invitation film of Ashwin & Aarti (09 Dec 2026 · Mau, UP): " +
      window.location.href;
    if (navigator.share) {
      navigator.share({ title: "Ashwin weds Aarti — Wedding Film", text, url: window.location.href }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleScreenClick}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black text-white select-none overflow-hidden cursor-pointer"
    >
      {/* ─────────── 1. Cinematic Film Letterbox Bars (Top & Bottom) ─────────── */}
      <div className="absolute top-0 inset-x-0 h-6 sm:h-10 bg-black z-40 pointer-events-none flex items-center justify-between px-6 text-[10px] font-mono text-gold-400/60 uppercase tracking-[0.25em]">
        <span>REC ● LIVE · 24 FPS · 4K CINEMASCOPE</span>
        <span className="hidden sm:inline">MAURYA PRODUCTIONS · ASHWIN &amp; AARTI</span>
      </div>
      <div className="absolute bottom-0 inset-x-0 h-8 sm:h-12 bg-black z-40 pointer-events-none" />

      {/* Floating Scene Chapter Badge on Top-Left */}
      <div className="absolute top-8 left-6 sm:top-12 sm:left-10 z-40 flex items-center gap-2 rounded-full border border-gold-400/40 bg-black/60 px-3.5 py-1 text-xs backdrop-blur-md pointer-events-none shadow-lg">
        <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
        <span className="font-hindi text-gold-200 font-semibold text-[11px] sm:text-xs">
          {sceneLabels[activeSceneIndex]}
        </span>
      </div>

      {/* ─────────── 2. Atmospheric Golden Sparkles & Floating Rose Petals ─────────── */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <Sparkles count={16} />
        <Petals count={14} />
      </div>

      {/* Flower Petal Shower on Tap */}
      {extraPetals.map((id) => (
        <div key={id} className="pointer-events-none absolute inset-0 z-35">
          <Petals count={20} />
        </div>
      ))}

      {/* ─────────── 3. Subtle Corner Floating Utilities (No Header/Footer Bar) ─────────── */}
      <div className="absolute top-8 right-6 sm:top-12 sm:right-10 z-50 flex items-center gap-3 pointer-events-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSwitchToScroll();
          }}
          className="text-[11px] font-sans font-semibold uppercase tracking-wider text-gold-200 hover:text-white bg-black/50 border border-gold-400/50 px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-md transition-all hover:bg-gold-500 hover:text-maroon-950"
        >
          📜 Scroll Card
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleMusic();
          }}
          aria-label="Toggle background music"
          className="h-8 w-8 rounded-full border border-gold-400/80 bg-black/60 shadow-lg flex items-center justify-center text-gold-300 hover:bg-gold-500 hover:text-maroon-950 transition-colors backdrop-blur-md"
        >
          {isPlayingMusic ? (
            <Volume2 className="h-4 w-4 animate-pulse" />
          ) : (
            <VolumeX className="h-4 w-4 text-rose-300" />
          )}
        </button>
      </div>

      {/* Play/Pause Overlay Indicator on Screen Tap */}
      {isPaused && !isEnded && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex items-center gap-2.5 rounded-full border-2 border-gold-400 bg-black/85 px-6 py-2.5 text-xs font-semibold text-gold-300 shadow-2xl backdrop-blur-md pointer-events-none animate-pulse">
          <Pause className="h-4 w-4 fill-current text-gold-400" />
          <span>चित्रपट रुका हुआ है · Tap anywhere to Resume</span>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
          SCENE 0: MANGALACHARAN & SACRED DIYAS (श्री गणेशाय नमः)
      ════════════════════════════════════════════════════════════ */}
      <section
        id="scene-0"
        className="film-scene absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-[#180208] via-[#2d0510] to-[#140106]"
      >
        <div className="flex items-center justify-center gap-6 md:gap-12 mb-4">
          <div className="diya-flame hidden sm:block">
            <Diya className="h-14 w-14 md:h-20 md:w-20 animate-flicker text-gold-400" />
          </div>

          <div className="ganesh-icon-box relative">
            <div className="h-28 w-28 md:h-40 md:w-40 rounded-full border-2 border-gold-400 bg-white shadow-[0_0_50px_rgba(201,162,75,0.7)] flex items-center justify-center p-4">
              <Ganesha className="h-20 w-20 md:h-28 md:w-28 text-maroon-900" />
            </div>
            <div className="absolute inset-0 rounded-full border border-dashed border-gold-400 animate-spin-slow pointer-events-none" />
          </div>

          <div className="diya-flame hidden sm:block">
            <Diya className="h-14 w-14 md:h-20 md:w-20 animate-flicker text-gold-400" />
          </div>
        </div>

        <p className="ganesh-text font-hindi text-3xl md:text-5xl font-bold tracking-widest text-gold-grad shimmer drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] mb-2">
          ॥ श्री गणेशाय नमः ॥
        </p>

        <Divider tone="maroon" className="ganesh-text h-7 w-64 mx-auto my-3" />

        <blockquote className="ganesh-text font-hindi text-xl md:text-3xl font-medium leading-relaxed text-gold-100 max-w-2xl bg-black/60 border border-gold-400/50 p-6 md:p-8 rounded-2xl shadow-2xl backdrop-blur-sm my-3">
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
          <br />
          निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
        </blockquote>

        <p className="ganesh-text font-serif text-base md:text-xl italic text-gold-200/90 mt-2">
          "With the sacred blessings of Lord Ganesha, beginning the auspicious journey of marriage"
        </p>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SCENE 1: THE LEADING CAST & MAIN TITLE (DSC_3488)
          Edge-to-Edge Fullscreen 4K Movie Frame with Ken Burns Zoom
      ════════════════════════════════════════════════════════════ */}
      <section
        id="scene-1"
        className="film-scene absolute inset-0 z-20 flex flex-col justify-end pb-20 md:pb-24 px-6 md:px-16"
      >
        {/* Fullscreen Video-Style Photography with Cinematic Slow Drift */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={img3488}
            alt="Ashwin and Aarti"
            className="ken-burns-img h-full w-full object-cover object-top will-change-transform brightness-[0.92] contrast-[1.05]"
          />
          {/* Deep Cinematic Film Vignette & Shadow Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40" />
        </div>

        {/* Real Movie Trailer Title Cards */}
        <div className="relative z-10 max-w-3xl">
          <p className="title-fade font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.45em] text-gold-300 mb-1">
            Maurya Family Productions Presents
          </p>

          <p className="title-fade font-hindi text-2xl sm:text-3xl font-bold tracking-widest text-gold-400 cinema-title-shadow">
            ॥ शुभ विवाह ॥
          </p>

          <h1 className="title-fade font-script text-7xl sm:text-8xl md:text-9xl font-bold text-gold-grad shimmer leading-tight drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)] my-1">
            Ashwin &amp; Aarti
          </h1>

          <div className="title-fade flex items-center gap-3 my-2">
            <span className="h-px w-14 sm:w-24 bg-gold-400" />
            <p className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.35em] text-gold-100">
              Wednesday · 09 December 2026
            </p>
            <span className="h-px w-14 sm:w-24 bg-gold-400" />
          </div>

          <p className="title-fade flex items-center gap-2 font-serif text-sm sm:text-lg text-gold-200/90 italic">
            <MapPin className="h-4 w-4 text-gold-400 shrink-0" />
            Village Bigrahpur, Post Dubari, Mau — Uttar Pradesh
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SCENE 2: TWO FAMILIES UNITE (DSC_1776)
          Fullscreen Wide Shot with Family Title Plates
      ════════════════════════════════════════════════════════════ */}
      <section
        id="scene-2"
        className="film-scene absolute inset-0 z-20 flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-16"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={img1776}
            alt="The Union"
            className="ken-burns-img h-full w-full object-cover object-center will-change-transform brightness-[0.88] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
          <p className="family-title-fade font-hindi text-base sm:text-lg font-bold text-gold-400">
            ॥ पारिवारिक मिलन ॥
          </p>
          <h2 className="family-title-fade font-serif text-3xl sm:text-5xl font-bold text-white cinema-title-shadow mt-0.5">
            Two Families <span className="text-gold-grad italic font-serif">United in Love</span>
          </h2>

          {/* Floating Glassmorphic Family Title Plates */}
          <div className="family-title-fade grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-left">
            {/* Groom's Family */}
            <div className="bg-black/75 border-2 border-gold-400/80 p-5 rounded-2xl backdrop-blur-md shadow-2xl">
              <p className="font-hindi text-xs font-bold uppercase tracking-wider text-gold-400">
                दूल्हा पक्ष (The Groom)
              </p>
              <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                Ashwin Maurya
              </h3>
              <p className="text-xs uppercase tracking-wider text-gold-200/80 mt-1">
                Son of
              </p>
              <p className="font-serif text-lg font-semibold text-gold-100">
                Shri Vijay Narayan Maurya &amp; Smt. Nirmala Maurya
              </p>
            </div>

            {/* Bride's Family */}
            <div className="bg-black/75 border-2 border-gold-400/80 p-5 rounded-2xl backdrop-blur-md shadow-2xl">
              <p className="font-hindi text-xs font-bold uppercase tracking-wider text-gold-400">
                दुल्हन पक्ष (The Bride)
              </p>
              <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                Aarti Maurya
              </h3>
              <p className="text-xs uppercase tracking-wider text-gold-200/80 mt-1">
                Daughter of
              </p>
              <p className="font-serif text-lg font-semibold text-gold-100">
                Shri Radheshyam Maurya &amp; Smt. Suman Maurya
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SCENE 3: CELEBRATIONS & 4 FUNCTIONS (DSC_1777)
          Fullscreen Candid Radiance with Sliding Event Slates
      ════════════════════════════════════════════════════════════ */}
      <section
        id="scene-3"
        className="film-scene absolute inset-0 z-20 flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={img1777}
            alt="Celebration Radiance"
            className="ken-burns-img h-full w-full object-cover object-center will-change-transform brightness-[0.88] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
          <p className="font-hindi text-base font-bold text-gold-400">हमारे उत्सव</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white cinema-title-shadow">
            Wedding <span className="text-gold-grad italic font-serif">Celebrations</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-center">
            <div className="event-card-item bg-black/80 border border-gold-400/80 p-4 rounded-xl backdrop-blur-md shadow-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-gold-500 text-maroon-950 px-2 py-0.5 rounded font-mono">
                05 Dec 2026
              </span>
              <p className="font-hindi text-sm font-bold text-gold-300 mt-2">शुभ तिलक</p>
              <h4 className="font-serif text-xl font-bold text-white">Tilak</h4>
              <p className="text-xs text-gold-200/80">7:00 PM Onwards</p>
            </div>

            <div className="event-card-item bg-black/80 border border-gold-400/80 p-4 rounded-xl backdrop-blur-md shadow-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-gold-500 text-maroon-950 px-2 py-0.5 rounded font-mono">
                07 Dec 2026
              </span>
              <p className="font-hindi text-sm font-bold text-gold-300 mt-2">हल्दी समारोह</p>
              <h4 className="font-serif text-xl font-bold text-white">Haldi</h4>
              <p className="text-xs text-gold-200/80">7:00 PM Onwards</p>
            </div>

            <div className="event-card-item bg-black/80 border border-gold-400/80 p-4 rounded-xl backdrop-blur-md shadow-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-gold-500 text-maroon-950 px-2 py-0.5 rounded font-mono">
                08 Dec 2026
              </span>
              <p className="font-hindi text-sm font-bold text-gold-300 mt-2">मेहंदी व संगीत</p>
              <h4 className="font-serif text-xl font-bold text-white">Sangeet</h4>
              <p className="text-xs text-gold-200/80">7:00 PM Onwards</p>
            </div>

            <div className="event-card-item bg-gradient-to-b from-maroon-950/90 to-black/90 border-2 border-gold-400 p-4 rounded-xl backdrop-blur-md shadow-2xl">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-gold-400 text-maroon-950 px-2 py-0.5 rounded font-mono font-bold">
                09 Dec 2026
              </span>
              <p className="font-hindi text-sm font-bold text-gold-300 mt-2">शुभ विवाह</p>
              <h4 className="font-serif text-xl font-bold text-white">The Wedding</h4>
              <p className="text-xs text-gold-200 font-bold">Shubh Muhurat</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SCENE 4: OUR STORY / THE RING & PROMISE (DSC_1773)
          Intimate Fullscreen Cinematic Frame with Poetic Typography
      ════════════════════════════════════════════════════════════ */}
      <section
        id="scene-4"
        className="film-scene absolute inset-0 z-20 flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-16"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={img1773}
            alt="Ring and Promise"
            className="ken-burns-img h-full w-full object-cover object-top will-change-transform brightness-[0.88] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 max-w-2xl bg-black/75 border-l-4 border-gold-400 p-6 md:p-8 rounded-r-2xl backdrop-blur-md shadow-2xl">
          <p className="story-text-fade font-hindi text-base font-bold text-gold-400">हमारी कहानी</p>
          <h2 className="story-text-fade font-serif text-3xl sm:text-5xl font-bold text-white cinema-title-shadow mt-1">
            From this day, <span className="text-gold-grad italic font-serif">forever.</span>
          </h2>
          <blockquote className="story-text-fade font-serif text-lg sm:text-2xl italic text-gold-100 my-3 leading-relaxed">
            "दो दिल मिले, दो राहें एक हुईं... जहाँ से शुरू होती है हमारी सबसे ख़ूबसूरत दास्तान।"
          </blockquote>
          <p className="story-text-fade font-script text-4xl sm:text-5xl text-gold-300 font-bold">
            Ashwin &amp; Aarti
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SCENE 5: SPECIAL CAMEO — NIECE & NEPHEW (FUN.JPG)
          Warm Cinema Dialogue Card
      ════════════════════════════════════════════════════════════ */}
      <section
        id="scene-5"
        className="film-scene absolute inset-0 z-20 flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-16"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={funImg}
            alt="The Little Ones"
            className="ken-burns-img h-full w-full object-cover object-top will-change-transform brightness-[0.90] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/60" />
        </div>

        <div className="kids-dialogue relative z-10 max-w-xl mx-auto w-full text-center bg-black/85 border-2 border-gold-400 p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="h-5 w-5 fill-rose-500 text-rose-500 animate-bounce" />
            <p className="font-hindi text-base font-bold text-gold-400">नन्हें मेहमानों की ओर से</p>
            <Heart className="h-5 w-5 fill-rose-500 text-rose-500 animate-bounce" />
          </div>

          <blockquote className="font-serif text-2xl sm:text-4xl font-medium italic leading-snug text-white">
            "Mere <span className="text-gold-grad font-bold">mama ki shaadi</span> hai, aana zaroori hai…
            <br />
            <span className="text-gold-300 font-bold">bahaane-baazi strictly nahi chalegi!</span>"
          </blockquote>

          <p className="font-sans text-xs uppercase tracking-[0.25em] text-gold-200/80 font-bold mt-3">
            — sweet insistence from nieces &amp; nephews
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SCENE 6: GODHULI BELA — 16:9 SUNSET PANORAMA (DSC_3501)
          Ultra-Widescreen Golden Hour Sunset Pan
      ════════════════════════════════════════════════════════════ */}
      <section
        id="scene-6"
        className="film-scene absolute inset-0 z-20 flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-16"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={img3501}
            alt="Ashwin and Aarti Golden Hour Sunset"
            className="ken-burns-img h-full w-full object-cover object-center will-change-transform brightness-[0.92] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <p className="panorama-caption-fade font-hindi text-base font-bold text-gold-400">
            गोधूलि बेला · सात फेरे
          </p>
          <h2 className="panorama-caption-fade font-serif text-4xl sm:text-6xl font-bold text-white cinema-title-shadow leading-tight my-1">
            The Golden Hour Promise
          </h2>
          <p className="panorama-caption-fade font-hindi text-xl sm:text-2xl text-gold-200 font-medium">
            सात फेरे, सात वचन — सात जन्मों का अटूट बंधन।
          </p>
          <p className="panorama-caption-fade font-script text-3xl sm:text-4xl text-gold-300 mt-2">
            Ashwin &amp; Aarti
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SCENE 7: GRAND FINALE & YOUR INVITATION (Final Screen)
      ════════════════════════════════════════════════════════════ */}
      <section
        id="scene-7"
        className="film-scene absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto overflow-y-auto py-8"
      >
        <div className="venue-item flex items-center justify-center gap-3 mb-1">
          <WeddingBells className="h-8 w-8 text-gold-400" />
          <span className="h-12 w-12 flex items-center justify-center rounded-full border-2 border-gold-400 bg-black/60 shadow-md">
            <MapPin className="h-6 w-6 text-gold-300" />
          </span>
          <WeddingBells className="h-8 w-8 text-gold-400 -scale-x-100" />
        </div>

        <div className="venue-item mb-2">
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.35em] text-gold-300 bg-gold-900/60 border border-gold-400/60 px-3.5 py-1 rounded-full">
            ॥ शुभ स्थल व आमंत्रण ॥
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-1 cinema-title-shadow">
            Village Bigrahpur, Mau
          </h2>
        </div>

        {/* Traditional Maurya Family Blessing Strip */}
        <div className="venue-item w-full bg-black/80 border border-gold-400/80 p-5 shadow-2xl rounded-2xl my-2 backdrop-blur-md">
          <div className="flex items-center justify-center gap-3">
            <Kalash className="h-6 w-6 text-gold-400" />
            <p className="font-hindi text-base sm:text-lg font-bold text-gold-300">
              स्वागताकांक्षी: समस्त मौर्य परिवार
            </p>
            <Kalash className="h-6 w-6 text-gold-400 -scale-x-100" />
          </div>
          <p className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
            Village Bigrahpur, Post Dubari, Mau — Uttar Pradesh
          </p>
          <p className="font-sans text-xs uppercase tracking-wider text-gold-200/80 mt-1">
            Wedding Invitation by <strong className="text-gold-300 font-bold">Ashwin Maurya</strong> (+91 99583 00518)
          </p>
        </div>

        {/* 🌟 🌟 🌟 KEY FEATURE: YOUR PERSONALIZED INVITATION BUTTON 🌟 🌟 🌟 */}
        <div className="venue-item my-3 w-full max-w-md mx-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsInvitationModalOpen(true);
            }}
            className="group relative w-full overflow-hidden rounded-2xl border-2 border-gold-400 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 p-1 shadow-[0_12px_40px_-5px_rgba(201,162,75,0.8)] hover:shadow-[0_18px_50px_-5px_rgba(201,162,75,1)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <div className="flex items-center justify-center gap-3 rounded-xl bg-maroon-950/95 px-5 py-3.5 text-white backdrop-blur-sm group-hover:bg-maroon-900 transition-colors">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-gold-400 bg-gold-500/20 text-gold-300 shadow-inner group-hover:rotate-12 transition-transform">
                <SparklesIcon className="h-6 w-6 text-gold-400 animate-pulse" />
              </span>
              <div className="text-left">
                <p className="font-serif text-xl sm:text-2xl font-bold text-gold-grad shimmer leading-tight">
                  Your Invitation 💌
                </p>
                <p className="font-hindi text-xs sm:text-sm text-gold-200 font-semibold mt-0.5">
                  नाम दर्ज कर अपना व्यक्तिगत कार्ड देखें ✨
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Action Buttons for Guests */}
        <div className="venue-item flex flex-wrap items-center justify-center gap-2.5 mt-2">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Bigrahpur,+Dubari,+Mau,+Uttar+Pradesh"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 border border-gold-400 bg-gold-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-maroon-950 hover:bg-gold-400 transition-colors shadow-md rounded-lg"
          >
            <Navigation className="h-3.5 w-3.5" />
            Directions
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 border border-gold-400/80 bg-black/60 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold-200 hover:bg-black/90 transition-colors shadow-sm rounded-lg"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-gold-400" />}
            <span>{copied ? "Copied!" : "Copy Address"}</span>
          </button>

          <a
            href="tel:+919958300518"
            className="inline-flex items-center gap-1.5 border border-gold-400/80 bg-black/60 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold-200 hover:bg-black/90 transition-colors shadow-sm rounded-lg"
          >
            <Phone className="h-3.5 w-3.5 text-gold-400" />
            Call
          </a>

          <a
            href="https://wa.me/919958300518?text=Congratulations%20Ashwin%20%26%20Aarti!%20We%27ll%20definitely%20be%20there%20%E2%9C%A8"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 border border-emerald-500 bg-emerald-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-700 transition-colors shadow-md rounded-lg"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </a>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 border border-gold-400/80 bg-gold-900/40 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold-200 hover:bg-gold-500 hover:text-maroon-950 transition-colors shadow-sm rounded-lg"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>{shared ? "Shared!" : "Share"}</span>
          </button>
        </div>

        {/* Replay Film & Scroll Card Options */}
        <div className="venue-item mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleReplay();
            }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-gold-500 bg-gradient-to-r from-gold-600 to-gold-500 px-6 py-2 text-xs font-bold uppercase tracking-[0.2em] text-maroon-950 shadow-md hover:scale-105 transition-all"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Replay Film 📽️</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSwitchToScroll();
            }}
            className="text-xs font-sans font-semibold uppercase tracking-wider text-gold-300 hover:text-white underline underline-offset-4"
          >
            Scroll Full Card 📜
          </button>
        </div>
      </section>

      {/* ─────────── 4. Authentic Cinematic Movie Subtitles ─────────── */}
      <div className="relative z-40 w-full px-6 pb-3 text-center pointer-events-none">
        <div className="inline-block max-w-3xl bg-black/75 backdrop-blur-md border border-gold-400/40 px-5 py-2 rounded-xl shadow-2xl">
          <p className="cinema-subtitle font-serif text-sm sm:text-base italic leading-relaxed text-gold-100">
            "{subtitles[activeSceneIndex]}"
          </p>
        </div>
      </div>

      {/* ─────────── 5. Personalized Royal Invitation Modal ─────────── */}
      <PersonalizedInvitationModal
        isOpen={isInvitationModalOpen}
        onClose={() => setIsInvitationModalOpen(false)}
      />
    </div>
  );
}