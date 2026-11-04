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
  CornerFlourish,
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
    "प्रारंभ · श्री गणेशाय नमः",
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

  // Build the cinematic master timeline in light royal theme
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
      // SCENE 1: THE LEADING CAST & MAIN TITLE (DSC_3488) (6.5s - 14.5s)
      // Royal Palace Arch Frame - Faces & Outfits 100% clearly visible!
      // ──────────────────────────────────────────────────────────
      tl.call(() => setActiveSceneIndex(1))
        .set("#scene-1", { display: "flex" })
        .to("#scene-1", { opacity: 1, duration: 1.2, ease: "power2.out" })
        .from("#scene-1 .couple-arch-box", { scale: 0.92, y: 30, opacity: 0, duration: 1.2, ease: "power3.out" }, "-=0.9")
        .from("#scene-1 .couple-title-text", { y: 25, opacity: 0, duration: 1.1, stagger: 0.18, ease: "power2.out" }, "-=0.7")
        .to("#scene-1 .couple-arch-img", { scale: 1.06, duration: 5.5, ease: "none" }, "-=2.5")
        .to({}, { duration: 2.8 })
        .to("#scene-1", { opacity: 0, duration: 1.0, ease: "power2.in" })
        .set("#scene-1", { display: "none" });

      // ──────────────────────────────────────────────────────────
      // SCENE 2: TWO FAMILIES UNITE (DSC_1776) (14.5s - 22.0s)
      // ──────────────────────────────────────────────────────────
      tl.call(() => setActiveSceneIndex(2))
        .set("#scene-2", { display: "flex" })
        .to("#scene-2", { opacity: 1, duration: 1.1, ease: "power2.out" })
        .from("#scene-2 .family-photo-box", { scale: 0.92, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.7")
        .from("#scene-2 .family-card-item", { y: 25, opacity: 0, duration: 0.9, stagger: 0.18, ease: "power3.out" }, "-=0.6")
        .to({}, { duration: 3.5 })
        .to("#scene-2", { opacity: 0, duration: 1.0, ease: "power2.in" })
        .set("#scene-2", { display: "none" });

      // ──────────────────────────────────────────────────────────
      // SCENE 3: CELEBRATIONS & 4 FUNCTIONS (DSC_1777) (22.0s - 30.5s)
      // ──────────────────────────────────────────────────────────
      tl.call(() => setActiveSceneIndex(3))
        .set("#scene-3", { display: "flex" })
        .to("#scene-3", { opacity: 1, duration: 1.1, ease: "power2.out" })
        .from("#scene-3 .events-photo-box", { scale: 0.92, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.7")
        .from("#scene-3 .event-card-item", {
          y: 25,
          opacity: 0,
          duration: 0.85,
          stagger: 0.15,
          ease: "power3.out",
        }, "-=0.6")
        .to({}, { duration: 3.8 })
        .to("#scene-3", { opacity: 0, duration: 1.0, ease: "power2.in" })
        .set("#scene-3", { display: "none" });

      // ──────────────────────────────────────────────────────────
      // SCENE 4: OUR STORY / THE RING & PROMISE (DSC_1773) (30.5s - 38.0s)
      // ──────────────────────────────────────────────────────────
      tl.call(() => setActiveSceneIndex(4))
        .set("#scene-4", { display: "flex" })
        .to("#scene-4", { opacity: 1, duration: 1.1, ease: "power2.out" })
        .from("#scene-4 .story-photo-box", { scale: 0.92, opacity: 0, duration: 1.1, ease: "power3.out" }, "-=0.7")
        .from("#scene-4 .story-text-item", { y: 22, opacity: 0, duration: 0.9, stagger: 0.18, ease: "power3.out" }, "-=0.6")
        .to({}, { duration: 3.5 })
        .to("#scene-4", { opacity: 0, duration: 1.0, ease: "power2.in" })
        .set("#scene-4", { display: "none" });

      // ──────────────────────────────────────────────────────────
      // SCENE 5: SPECIAL CAMEO — NIECE & NEPHEW (FUN.JPG) (38.0s - 44.5s)
      // ──────────────────────────────────────────────────────────
      tl.call(() => setActiveSceneIndex(5))
        .set("#scene-5", { display: "flex" })
        .to("#scene-5", { opacity: 1, duration: 1.1, ease: "power2.out" })
        .from("#scene-5 .kids-photo-box", { scale: 0.88, opacity: 0, duration: 1, ease: "back.out(1.2)" }, "-=0.7")
        .from("#scene-5 .kids-dialogue", { scale: 0.9, opacity: 0, duration: 0.9, ease: "power2.out" }, "-=0.5")
        .to({}, { duration: 3.5 })
        .to("#scene-5", { opacity: 0, duration: 1.0, ease: "power2.in" })
        .set("#scene-5", { display: "none" });

      // ──────────────────────────────────────────────────────────
      // SCENE 6: GODHULI BELA — 16:9 SUNSET PANORAMA (DSC_3501) (44.5s - 52.5s)
      // ──────────────────────────────────────────────────────────
      tl.call(() => setActiveSceneIndex(6))
        .set("#scene-6", { display: "flex" })
        .to("#scene-6", { opacity: 1, duration: 1.2, ease: "power2.out" })
        .from("#scene-6 .panorama-box", { scale: 0.95, opacity: 0, duration: 1.1, ease: "power3.out" }, "-=0.8")
        .from("#scene-6 .panorama-caption", { y: 22, opacity: 0, duration: 0.9, stagger: 0.18, ease: "power3.out" }, "-=0.6")
        .to({}, { duration: 3.8 })
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
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#FAF7F2] pattern-light text-maroon-900 select-none overflow-hidden cursor-pointer"
    >
      {/* ─────────── 1. Royal Ivory Ambient Glow & Subtle Gold Trims ─────────── */}
      <div className="absolute inset-0 pointer-events-none vignette-hero-light z-10" />

      {/* Thin Gold Cinema Letterbox Trims */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 z-40 pointer-events-none shadow-sm" />
      <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 z-40 pointer-events-none shadow-sm" />

      {/* Floating Sparkles & Rose Petals */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <Sparkles count={14} />
        <Petals count={14} />
      </div>

      {/* Flower Petal Shower on Tap */}
      {extraPetals.map((id) => (
        <div key={id} className="pointer-events-none absolute inset-0 z-35">
          <Petals count={20} />
        </div>
      ))}

      {/* ─────────── 2. Top-Left Floating Scene Badge ─────────── */}
      <div className="absolute top-5 left-5 sm:top-7 sm:left-8 z-40 flex items-center gap-2 rounded-full border border-gold-400/80 bg-white/95 px-3.5 py-1 text-xs shadow-md backdrop-blur-md pointer-events-none">
        <span className="h-2 w-2 rounded-full bg-gold-600 animate-pulse" />
        <span className="font-hindi text-maroon-900 font-bold text-xs">
          {sceneLabels[activeSceneIndex]}
        </span>
      </div>

      {/* ─────────── 3. Top-Right Floating Utilities ─────────── */}
      <div className="absolute top-5 right-5 sm:top-7 sm:right-8 z-40 flex items-center gap-2.5 pointer-events-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSwitchToScroll();
          }}
          className="text-[11px] font-sans font-semibold uppercase tracking-wider text-maroon-800 hover:text-maroon-950 bg-white/95 border border-gold-400/80 px-3.5 py-1.5 rounded-full shadow-md backdrop-blur-md transition-all hover:bg-gold-50 cursor-pointer"
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
          className="h-8 w-8 rounded-full border border-gold-400 bg-white/95 shadow-md flex items-center justify-center text-maroon-900 hover:bg-gold-50 transition-colors backdrop-blur-md cursor-pointer"
        >
          {isPlayingMusic ? (
            <Volume2 className="h-4 w-4 text-gold-700 animate-pulse" />
          ) : (
            <VolumeX className="h-4 w-4 text-maroon-600" />
          )}
        </button>
      </div>

      {/* Play/Pause Overlay Indicator on Screen Tap */}
      {isPaused && !isEnded && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex items-center gap-2.5 rounded-full border-2 border-gold-400 bg-white/95 px-6 py-2.5 text-xs font-semibold text-maroon-900 shadow-2xl backdrop-blur-md pointer-events-none animate-pulse">
          <Pause className="h-4 w-4 fill-current text-gold-700" />
          <span>चित्रपट रुका हुआ है · Tap anywhere to Resume</span>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
          SCENE 0: MANGALACHARAN & SACRED DIYAS (श्री गणेशाय नमः)
      ════════════════════════════════════════════════════════════ */}
      <section
        id="scene-0"
        className="film-scene absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6"
      >
        <div className="flex items-center justify-center gap-6 md:gap-12 mb-3">
          <div className="diya-flame hidden sm:block">
            <Diya className="h-14 w-14 md:h-18 md:w-18 animate-flicker text-gold-600" />
          </div>

          <div className="ganesh-icon-box relative">
            <div className="h-28 w-28 md:h-36 md:w-36 rounded-full border-2 border-gold-400 bg-white shadow-xl flex items-center justify-center p-4">
              <Ganesha className="h-20 w-20 md:h-24 md:w-24 text-maroon-800" />
            </div>
            <div className="absolute inset-0 rounded-full border border-dashed border-gold-500 animate-spin-slow pointer-events-none" />
          </div>

          <div className="diya-flame hidden sm:block">
            <Diya className="h-14 w-14 md:h-18 md:w-18 animate-flicker text-gold-600" />
          </div>
        </div>

        <p className="ganesh-text font-hindi text-3xl md:text-5xl font-bold tracking-widest text-gold-700 mb-2">
          ॥ श्री गणेशाय नमः ॥
        </p>

        <Divider tone="maroon" className="ganesh-text h-7 w-64 mx-auto my-2" />

        <blockquote className="ganesh-text font-hindi text-xl md:text-3xl font-medium leading-relaxed text-maroon-950 max-w-2xl bg-white/90 border border-gold-400/80 p-6 md:p-8 rounded-2xl shadow-lg my-3">
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
          <br />
          निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
        </blockquote>

        <p className="ganesh-text font-serif text-base md:text-xl italic text-maroon-800/90 mt-2">
          "With the sacred blessings of Lord Ganesha, beginning the auspicious journey of marriage"
        </p>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SCENE 1: THE LEADING CAST & MAIN TITLE (DSC_3488)
          Royal Palace Arch Frame - Faces, Smiles & Outfits 100% CLEAR!
      ════════════════════════════════════════════════════════════ */}
      <section
        id="scene-1"
        className="film-scene absolute inset-0 z-20 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-14 px-6 md:px-16"
      >
        {/* Ornate Royal Palace Arch with Couple Portrait */}
        <div className="couple-arch-box relative shrink-0">
          <div className="arch-shadow rounded-t-[14rem] rounded-b-2xl border-4 border-gold-400 bg-white p-2.5 shadow-2xl">
            <div className="overflow-hidden rounded-t-[13.5rem] rounded-b-xl border border-gold-300">
              <img
                src={img3488}
                alt="Ashwin and Aarti"
                className="couple-arch-img h-[48vh] sm:h-[56vh] md:h-[64vh] w-auto aspect-[4/5] object-cover object-top will-change-transform"
              />
            </div>
          </div>
          <CornerFlourish className="absolute -left-2 -top-2 h-10 w-10 text-gold-600 pointer-events-none" />
          <CornerFlourish className="absolute -right-2 -top-2 h-10 w-10 rotate-90 text-gold-600 pointer-events-none" />
          <CornerFlourish className="absolute -bottom-2 -right-2 h-10 w-10 rotate-180 text-gold-600 pointer-events-none" />
          <CornerFlourish className="absolute -bottom-2 -left-2 h-10 w-10 -rotate-90 text-gold-600 pointer-events-none" />
        </div>

        {/* Wedding Cinema Titles */}
        <div className="text-center md:text-left max-w-xl">
          <p className="couple-title-text font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.45em] text-maroon-700/80 mb-1">
            Maurya Family Productions Presents
          </p>

          <p className="couple-title-text font-hindi text-2xl sm:text-3xl font-bold tracking-widest text-gold-700">
            ॥ शुभ विवाह ॥
          </p>

          <h1 className="couple-title-text font-script text-6xl sm:text-7xl md:text-8xl font-bold text-gold-grad shimmer leading-tight my-1">
            Ashwin &amp; Aarti
          </h1>

          <div className="couple-title-text flex items-center justify-center md:justify-start gap-3 my-2.5">
            <span className="h-px w-12 sm:w-20 bg-gold-400" />
            <p className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.35em] text-maroon-900">
              Wednesday · 09 December 2026
            </p>
            <span className="h-px w-12 sm:w-20 bg-gold-400" />
          </div>

          <p className="couple-title-text flex items-center justify-center md:justify-start gap-2 font-serif text-base sm:text-lg text-maroon-800/90 italic">
            <MapPin className="h-4 w-4 text-gold-600 shrink-0" />
            Village Bigrahpur, Post Dubari, Mau — Uttar Pradesh
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SCENE 2: TWO FAMILIES UNITE (DSC_1776)
          Union Photo & Family Title Cards
      ════════════════════════════════════════════════════════════ */}
      <section
        id="scene-2"
        className="film-scene absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto"
      >
        <p className="font-hindi text-base sm:text-lg font-bold text-gold-700">
          ॥ पारिवारिक मिलन ॥
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-maroon-900 cinema-title-shadow">
          Two Families <span className="text-gold-grad italic font-serif">United in Love</span>
        </h2>

        {/* Featured Photo: DSC_1776 */}
        <div className="family-photo-box my-3 border-2 border-gold-400 bg-white p-2 rounded-xl shadow-lg max-w-sm mx-auto">
          <img
            src={img1776}
            alt="The Union"
            className="h-44 sm:h-52 w-full object-cover rounded-lg"
          />
        </div>

        {/* Groom & Bride Family Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-1">
          <div className="family-card-item bg-white/95 border-2 border-gold-400/80 p-5 rounded-2xl shadow-md text-center">
            <p className="font-hindi text-xs font-bold uppercase tracking-wider text-gold-700">
              दूल्हा पक्ष (The Groom)
            </p>
            <h3 className="font-serif text-2xl font-bold text-maroon-900 mt-0.5">
              Ashwin Maurya
            </h3>
            <p className="text-[11px] uppercase tracking-wider text-maroon-600 mt-1">
              Son of
            </p>
            <p className="font-serif text-lg font-semibold text-maroon-900">
              Shri Vijay Narayan Maurya &amp; Smt. Nirmala Maurya
            </p>
          </div>

          <div className="family-card-item bg-white/95 border-2 border-gold-400/80 p-5 rounded-2xl shadow-md text-center">
            <p className="font-hindi text-xs font-bold uppercase tracking-wider text-gold-700">
              दुल्हन पक्ष (The Bride)
            </p>
            <h3 className="font-serif text-2xl font-bold text-maroon-900 mt-0.5">
              Aarti Maurya
            </h3>
            <p className="text-[11px] uppercase tracking-wider text-maroon-600 mt-1">
              Daughter of
            </p>
            <p className="font-serif text-lg font-semibold text-maroon-900">
              Shri Radheshyam Maurya &amp; Smt. Suman Maurya
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SCENE 3: CELEBRATIONS & 4 FUNCTIONS (DSC_1777)
          Celebratory Photo & 4 Event Cards
      ════════════════════════════════════════════════════════════ */}
      <section
        id="scene-3"
        className="film-scene absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto"
      >
        <p className="font-hindi text-base font-bold text-gold-700">हमारे उत्सव</p>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-maroon-900 cinema-title-shadow">
          Wedding <span className="text-gold-grad italic font-serif">Celebrations</span>
        </h2>

        {/* Candid Photo: DSC_1777 */}
        <div className="events-photo-box my-2.5 border-2 border-gold-400 bg-white p-1.5 rounded-xl shadow-md max-w-xs mx-auto">
          <img
            src={img1777}
            alt="Celebration Radiance"
            className="h-36 sm:h-44 w-full object-cover rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mt-1 text-center">
          <div className="event-card-item bg-white/95 border border-gold-400/80 p-3.5 rounded-xl shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-gold-100 text-maroon-900 px-2 py-0.5 rounded font-mono border border-gold-300">
              05 Dec 2026
            </span>
            <p className="font-hindi text-sm font-bold text-gold-700 mt-2">शुभ तिलक</p>
            <h4 className="font-serif text-lg font-bold text-maroon-900">Tilak</h4>
            <p className="text-xs text-maroon-700">7:00 PM Onwards</p>
          </div>

          <div className="event-card-item bg-white/95 border border-gold-400/80 p-3.5 rounded-xl shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-gold-100 text-maroon-900 px-2 py-0.5 rounded font-mono border border-gold-300">
              07 Dec 2026
            </span>
            <p className="font-hindi text-sm font-bold text-gold-700 mt-2">हल्दी समारोह</p>
            <h4 className="font-serif text-lg font-bold text-maroon-900">Haldi</h4>
            <p className="text-xs text-maroon-700">7:00 PM Onwards</p>
          </div>

          <div className="event-card-item bg-white/95 border border-gold-400/80 p-3.5 rounded-xl shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-gold-100 text-maroon-900 px-2 py-0.5 rounded font-mono border border-gold-300">
              08 Dec 2026
            </span>
            <p className="font-hindi text-sm font-bold text-gold-700 mt-2">मेहंदी व संगीत</p>
            <h4 className="font-serif text-lg font-bold text-maroon-900">Sangeet</h4>
            <p className="text-xs text-maroon-700">7:00 PM Onwards</p>
          </div>

          <div className="event-card-item bg-[#FFFDF9] border-2 border-gold-500 p-3.5 rounded-xl shadow-md">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-gold-500 text-white px-2 py-0.5 rounded font-mono font-bold shadow-sm">
              09 Dec 2026
            </span>
            <p className="font-hindi text-sm font-bold text-maroon-900 mt-2">शुभ विवाह</p>
            <h4 className="font-serif text-lg font-bold text-maroon-900">The Wedding</h4>
            <p className="text-xs text-maroon-900 font-bold">Shubh Muhurat</p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SCENE 4: OUR STORY / THE RING & PROMISE (DSC_1773)
      ════════════════════════════════════════════════════════════ */}
      <section
        id="scene-4"
        className="film-scene absolute inset-0 z-20 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 px-6 max-w-4xl mx-auto"
      >
        <div className="story-photo-box relative shrink-0">
          <div className="relative border-2 border-gold-500 bg-white p-2.5 shadow-xl rounded-xl">
            <img
              src={img1773}
              alt="Ring and Promise"
              className="h-60 w-48 sm:h-76 sm:w-60 md:h-88 md:w-72 object-cover object-top rounded-lg"
            />
            <CornerFlourish className="absolute -left-2 -top-2 h-9 w-9 text-gold-600" />
            <CornerFlourish className="absolute -right-2 -top-2 h-9 w-9 rotate-90 text-gold-600" />
            <CornerFlourish className="absolute -bottom-2 -right-2 h-9 w-9 rotate-180 text-gold-600" />
            <CornerFlourish className="absolute -bottom-2 -left-2 h-9 w-9 -rotate-90 text-gold-600" />
          </div>
          <p className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap border border-gold-400 bg-white px-3.5 py-0.5 font-script text-lg text-maroon-900 shadow-sm rounded-full">
            the ring &amp; the promise
          </p>
        </div>

        <div className="text-center md:text-left max-w-md">
          <p className="story-text-item font-hindi text-base font-bold text-gold-700">हमारी कहानी</p>
          <h2 className="story-text-item font-serif text-3xl sm:text-5xl font-semibold text-maroon-900 mt-1">
            From this day, <span className="italic text-gold-700 font-serif">forever.</span>
          </h2>
          <Divider tone="maroon" className="story-text-item h-5 w-44 my-2 mx-auto md:mx-0" />
          <blockquote className="story-text-item font-serif text-lg md:text-xl italic text-maroon-800/90 my-2.5">
            "दो दिल मिले, दो राहें एक हुईं... जहाँ से शुरू होती है हमारी सबसे ख़ूबसूरत दास्तान।"
          </blockquote>
          <p className="story-text-item font-script text-4xl sm:text-5xl text-maroon-900 font-bold mt-2">
            Ashwin &amp; Aarti
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SCENE 5: SPECIAL CAMEO — NIECE & NEPHEW (FUN.JPG)
      ════════════════════════════════════════════════════════════ */}
      <section
        id="scene-5"
        className="film-scene absolute inset-0 z-20 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 px-6 max-w-3xl mx-auto"
      >
        <div className="kids-photo-box relative shrink-0">
          <div className="arch-shadow rounded-t-full border-2 border-gold-400 bg-white p-2 shadow-xl">
            <img
              src={funImg}
              alt="The Little Ones"
              className="h-60 w-48 sm:h-72 sm:w-56 md:h-80 md:w-64 rounded-t-full object-cover object-top"
            />
          </div>
          <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-gold-400 bg-white shadow-md">
            <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
          </span>
        </div>

        <div className="kids-dialogue text-center md:text-left max-w-md">
          <p className="font-hindi text-base font-bold text-gold-700">नन्हे मेहमानों की ओर से</p>
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium italic leading-snug text-maroon-900 my-3">
            "Mere <span className="text-gold-grad font-bold">mama ki shaadi</span> hai, aana zaroori hai…
            <br />
            <span className="text-maroon-700 font-bold">bahaane-baazi strictly nahi chalegi!</span>"
          </blockquote>
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-maroon-700 mt-2">
            — strictly no excuses from nieces &amp; nephews!
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SCENE 6: GODHULI BELA — 16:9 SUNSET PANORAMA (DSC_3501)
      ════════════════════════════════════════════════════════════ */}
      <section
        id="scene-6"
        className="film-scene absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto"
      >
        <div className="panorama-caption mb-3">
          <p className="font-hindi text-gold-700 text-base font-bold">गोधूलि बेला · सात फेरे</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-maroon-900">
            The Golden Hour Promise
          </h2>
        </div>

        <div className="panorama-box relative border-2 border-gold-400 bg-white p-2.5 shadow-2xl w-full max-w-3xl rounded-2xl">
          <div className="relative overflow-hidden h-60 sm:h-76 md:h-96 rounded-xl">
            <img
              src={img3501}
              alt="Ashwin and Aarti Golden Hour Sunset"
              className="h-full w-full object-cover object-center will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-white">
              <span className="font-hindi text-gold-300 text-sm md:text-base font-semibold flex items-center gap-1.5">
                <SparklesIcon className="h-4 w-4 text-gold-400" />
                <span>सात फेरे, अटूट विश्वास</span>
              </span>
              <span className="font-script text-2xl md:text-3xl text-gold-200">
                Ashwin &amp; Aarti
              </span>
            </div>
          </div>
          <CornerFlourish className="absolute -left-1.5 -top-1.5 h-8 w-8 text-gold-600" />
          <CornerFlourish className="absolute -right-1.5 -top-1.5 h-8 w-8 rotate-90 text-gold-600" />
          <CornerFlourish className="absolute -bottom-1.5 -right-1.5 h-8 w-8 rotate-180 text-gold-600" />
          <CornerFlourish className="absolute -bottom-1.5 -left-1.5 h-8 w-8 -rotate-90 text-gold-600" />
        </div>

        <p className="panorama-caption font-serif text-base md:text-lg italic text-maroon-800/85 mt-3">
          "सात फेरे, सात वचन — सात जन्मों का अटूट बंधन।"
        </p>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SCENE 7: GRAND CLIMAX & YOUR INVITATION (Final Screen)
      ════════════════════════════════════════════════════════════ */}
      <section
        id="scene-7"
        className="film-scene absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto overflow-y-auto py-8"
      >
        <div className="venue-item flex items-center justify-center gap-3 mb-1">
          <WeddingBells className="h-8 w-8 text-gold-600" />
          <span className="h-12 w-12 flex items-center justify-center rounded-full border-2 border-gold-400 bg-white shadow-md">
            <MapPin className="h-6 w-6 text-maroon-800" />
          </span>
          <WeddingBells className="h-8 w-8 text-gold-600 -scale-x-100" />
        </div>

        <div className="venue-item mb-2">
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.35em] text-gold-700 bg-gold-100/90 border border-gold-300 px-3 py-0.5 rounded-full">
            ॥ शुभ स्थल व आमंत्रण ॥
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-maroon-900 mt-1">
            Village Bigrahpur, Mau
          </h2>
        </div>

        {/* Traditional Maurya Family Blessing Strip */}
        <div className="venue-item w-full bg-white/95 border border-gold-400/80 p-4 shadow-md rounded-2xl my-2">
          <div className="flex items-center justify-center gap-3">
            <Kalash className="h-6 w-6 text-gold-600" />
            <p className="font-hindi text-base sm:text-lg font-bold text-gold-700">
              स्वागताकांक्षी: समस्त मौर्य परिवार
            </p>
            <Kalash className="h-6 w-6 text-gold-600 -scale-x-100" />
          </div>
          <p className="font-serif text-xl sm:text-2xl font-bold text-maroon-900 mt-1">
            Village Bigrahpur, Post Dubari, Mau — Uttar Pradesh
          </p>
          <p className="font-sans text-xs uppercase tracking-wider text-maroon-700 mt-1">
            Wedding Invitation by <strong className="text-maroon-900 font-bold">Ashwin Maurya</strong> (+91 99583 00518)
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
            className="group relative w-full overflow-hidden rounded-2xl border-2 border-gold-500 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 p-1 shadow-[0_12px_35px_-5px_rgba(201,162,75,0.7)] hover:shadow-[0_18px_45px_-5px_rgba(201,162,75,0.9)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <div className="flex items-center justify-center gap-3 rounded-xl bg-white/95 px-5 py-3.5 text-maroon-950 backdrop-blur-sm group-hover:bg-gold-50/95 transition-colors">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-gold-500 bg-gold-100 text-maroon-900 shadow-inner group-hover:rotate-12 transition-transform">
                <SparklesIcon className="h-6 w-6 text-gold-700 animate-pulse" />
              </span>
              <div className="text-left">
                <p className="font-serif text-lg sm:text-xl font-bold text-maroon-950 leading-tight">
                  Your Invitation 💌
                </p>
                <p className="font-hindi text-xs sm:text-sm text-gold-800 font-bold mt-0.5">
                  नाम दर्ज कर अपना व्यक्तिगत कार्ड देखें ✨
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Action Buttons for Guests */}
        <div className="venue-item flex flex-wrap items-center justify-center gap-2 mt-2">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Bigrahpur,+Dubari,+Mau,+Uttar+Pradesh"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 border border-gold-400 bg-gold-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-maroon-950 hover:bg-gold-600 transition-colors shadow-md rounded-lg"
          >
            <Navigation className="h-3.5 w-3.5" />
            Directions
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 border border-gold-400/80 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-maroon-900 hover:bg-gold-50 transition-colors shadow-sm rounded-lg cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-gold-700" />}
            <span>{copied ? "Copied!" : "Copy Address"}</span>
          </button>

          <a
            href="tel:+919958300518"
            className="inline-flex items-center gap-1.5 border border-maroon-800 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-maroon-900 hover:bg-gold-50 transition-colors shadow-sm rounded-lg"
          >
            <Phone className="h-3.5 w-3.5 text-maroon-800" />
            Call
          </a>

          <a
            href="https://wa.me/919958300518?text=Congratulations%20Ashwin%20%26%20Aarti!%20We%27ll%20definitely%20be%20there%20%E2%9C%A8"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 border border-emerald-600 bg-emerald-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-700 transition-colors shadow-md rounded-lg"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </a>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 border border-gold-400 bg-gold-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-maroon-900 hover:bg-gold-500 hover:text-white transition-colors shadow-sm rounded-lg cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5 text-maroon-800" />
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
            className="inline-flex items-center gap-2 rounded-full border-2 border-gold-500 bg-gradient-to-r from-gold-600 to-gold-500 px-6 py-2 text-xs font-bold uppercase tracking-[0.2em] text-maroon-950 shadow-md hover:scale-105 transition-all cursor-pointer"
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
            className="text-xs font-sans font-semibold uppercase tracking-wider text-maroon-700 hover:text-maroon-950 underline underline-offset-4 cursor-pointer"
          >
            Scroll Full Card 📜
          </button>
        </div>
      </section>

      {/* ─────────── 4. Subtitles in Clean Light Frosted Pill ─────────── */}
      <div className="relative z-40 w-full px-6 pb-4 text-center pointer-events-none">
        <div className="inline-block max-w-3xl bg-white/95 backdrop-blur-md border border-gold-400 px-5 py-2 rounded-full shadow-md">
          <p className="font-serif text-sm sm:text-base italic leading-relaxed text-maroon-950 font-medium">
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