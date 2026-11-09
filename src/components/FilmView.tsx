import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import {
  Volume2,
  VolumeX,
  MapPin,
  Navigation,
  MessageCircle,
  RotateCcw,
  Share2,
  Pause,
  Heart,
  Sparkles as SparklesIcon,
  Clock,
  ChevronDown,
  Flame,
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
import { useCountdown } from "../hooks/useCountdown";
import { GOOGLE_MAPS_URL, PHONE_DISPLAY, VENUE_ADDRESS, waRsvpUrl, waShareUrl } from "../constants";
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
  const [shared, setShared] = useState(false);
  const [extraPetals, setExtraPetals] = useState<number[]>([]);
  const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);
  const [isDiyaLit, setIsDiyaLit] = useState(false);
  const [isChapterMenuOpen, setIsChapterMenuOpen] = useState(false);
  const [petalShowerCount, setPetalShowerCount] = useState(0);
  const [progress, setProgress] = useState(0);

  const countdown = useCountdown();

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

  const sceneLabelsShort = [
    "श्री गणेशाय नमः",
    "नायक-नायिका",
    "पारिवारिक मिलन",
    "उत्सव तिथियाँ",
    "प्रेम कहानी",
    "मामा की शादी",
    "सात फेरे",
    "शुभ स्थल व कार्ड",
  ];

  // Double tap / click to shower flower petals (पुष्प वर्षा)
  const showerPetals = () => {
    const id = Date.now();
    setExtraPetals((prev) => [...prev, id]);
    setTimeout(() => {
      setExtraPetals((prev) => prev.filter((p) => p !== id));
    }, 4500);
  };

  // Harmonious temple chime / chime bells on Diya lighting
  const playTempleChime = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof window.AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") ctx.resume();

      const freqs = [528, 660, 792];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.08 / (idx + 1), ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + 3.0);
      });
    } catch {
      // ignore
    }
  }, []);

  const handleLightDiya = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDiyaLit(true);
    playTempleChime();
    showerPetals();
    setPetalShowerCount((c) => c + 1);
  };

  const jumpToScene = (index: number) => {
    setIsChapterMenuOpen(false);
    setActiveSceneIndex(index);
    gsap.set(".film-scene", { opacity: 0, display: "none" });
    gsap.set(`#scene-${index}`, { opacity: 1, display: "flex" });

    if (masterTimelineRef.current) {
      const label = `scene-${index}`;
      const target = masterTimelineRef.current.labels?.[label];
      const FALLBACK_OFFSETS = [0, 6.6, 14.6, 22.1, 30.6, 38.1, 44.6, 52.6];
      const targetTime = typeof target === "number" ? target : FALLBACK_OFFSETS[index] ?? 0;
      masterTimelineRef.current.seek(targetTime);
      masterTimelineRef.current.play();
      setIsPaused(false);
    }
    showerPetals();
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
      tl.addLabel("scene-0").call(() => setActiveSceneIndex(0))
        .to("#scene-0", { opacity: 1, duration: 1.2, ease: "power2.out" })
        .from("#scene-0 .ganesh-icon-box", { scale: 0.75, opacity: 0, duration: 1.1, ease: "back.out(1.4)" }, "-=0.8")
        .from("#scene-0 .diya-flame", { scale: 0.5, opacity: 0, duration: 0.9, stagger: 0.15, ease: "power2.out" }, "-=0.7")
        .from("#scene-0 .ganesh-text", { y: 22, opacity: 0, duration: 1, stagger: 0.2, ease: "power2.out" }, "-=0.6")
        .to({}, { duration: 3.5 })
        .to("#scene-0", { opacity: 0, duration: 1.0, ease: "power2.in" })
        .set("#scene-0", { display: "none" });

      // ──────────────────────────────────────────────────────────
      // SCENE 1: THE LEADING CAST & MAIN TITLE (DSC_3488) (6.5s - 14.5s)
      // Royal Palace Arch Frame - Faces & Outfits 100% clearly visible!
      // ──────────────────────────────────────────────────────────
      tl.addLabel("scene-1").call(() => setActiveSceneIndex(1))
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
      tl.addLabel("scene-2").call(() => setActiveSceneIndex(2))
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
      tl.addLabel("scene-3").call(() => setActiveSceneIndex(3))
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
      tl.addLabel("scene-4").call(() => setActiveSceneIndex(4))
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
      tl.addLabel("scene-5").call(() => setActiveSceneIndex(5))
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
      tl.addLabel("scene-6").call(() => setActiveSceneIndex(6))
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
      tl.addLabel("scene-7").call(() => setActiveSceneIndex(7))
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

  // Track film progress for the scrubber
  useEffect(() => {
    const id = window.setInterval(() => {
      const tl = masterTimelineRef.current;
      if (!tl) return;
      const total = tl.duration();
      setProgress(total > 0 ? Math.min(1, tl.time() / total) : 0);
    }, 250);
    return () => window.clearInterval(id);
  }, []);

  // Keyboard: space = play/pause, arrows = scenes, Esc = close chapter menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || tag === "BUTTON") return;

      if (e.key === "Escape") {
        setIsChapterMenuOpen(false);
        return;
      }
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        const tl = masterTimelineRef.current;
        if (!tl) return;
        if (tl.paused()) {
          tl.play();
          setIsPaused(false);
        } else {
          tl.pause();
          setIsPaused(true);
        }
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        jumpToScene(Math.min(7, activeSceneIndex + 1));
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        jumpToScene(Math.max(0, activeSceneIndex - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeSceneIndex]);

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

  const handleShare = () => {
    const text =
      "Watch the royal wedding invitation film of Ashwin & Aarti (09 Dec 2026 · Mau, UP): " +
      window.location.href;
    if (navigator.share) {
      navigator.share({ title: "Ashwin weds Aarti — Wedding Film", text, url: window.location.href }).catch(() => {});
    } else {
      window.open(waShareUrl(text), "_blank");
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleScreenClick}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#FAF7F2] pattern-light text-maroon-900 select-none overflow-hidden cursor-pointer"
      role="region"
      aria-label="Wedding film"
    >
      {/* ─────────── 1. Royal Ivory Ambient Glow & Subtle Gold Trims ─────────── */}
      <div className="absolute inset-0 pointer-events-none vignette-hero-light z-10" />

      {/* Thin Gold Cinema Letterbox Trims */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 z-40 pointer-events-none shadow-sm" />
      <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 z-40 pointer-events-none shadow-sm" />

      {/* Chapter progress rail — where am I in the film */}
      {!isEnded && (
        <div className="absolute top-1.5 inset-x-0 z-40 pointer-events-none">
          <div className="film-progress-track h-[2px] w-full">
            <div
              className="film-progress-fill h-full origin-left transition-[width] duration-300 ease-linear"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </div>
      )}

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

      {/* ─────────── 2. Cinema Top Header Navigation (Fully Responsive) ─────────── */}
      <header className="absolute top-0 inset-x-0 z-40 flex items-center justify-between px-3 sm:px-6 md:px-8 pt-3 sm:pt-4 pointer-events-none">
        {/* Left: Chapter Selector with Short Label on Mobile */}
        <div className="relative pointer-events-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsChapterMenuOpen((prev) => !prev);
            }}
            aria-expanded={isChapterMenuOpen}
            aria-haspopup="menu"
            className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-gold-400/90 bg-white/95 px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-xs shadow-md backdrop-blur-md hover:bg-gold-50 transition-colors cursor-pointer group"
            title="Click to jump to any scene"
          >
            <span className="h-2 w-2 rounded-full bg-gold-600 animate-pulse shrink-0" />
            <span className="font-hindi text-maroon-900 font-bold text-xs truncate max-w-[130px] sm:max-w-none">
              <span className="sm:hidden">{sceneLabelsShort[activeSceneIndex]}</span>
              <span className="hidden sm:inline">{sceneLabels[activeSceneIndex]}</span>
            </span>
            <ChevronDown className="h-3 w-3 text-gold-700 group-hover:translate-y-0.5 transition-transform shrink-0" />
          </button>

          {/* Chapter Menu Dropdown - Fully bounded on mobile */}
          {isChapterMenuOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 top-full mt-2 w-72 max-w-[calc(100vw-24px)] rounded-2xl border-2 border-gold-400 bg-white/98 p-2.5 shadow-2xl backdrop-blur-lg animate-fade-in z-50"
            >
              <div className="flex items-center justify-between border-b border-gold-200 px-3 py-1.5">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold-800">
                  ★ दृश्य चयन (Chapters) ★
                </span>
                <button
                  type="button"
                  onClick={() => setIsChapterMenuOpen(false)}
                  aria-label="Close chapters"
                  className="text-xs text-maroon-600 hover:text-maroon-950 font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="mt-1 divide-y divide-gold-100 max-h-64 sm:max-h-72 overflow-y-auto">
                {sceneLabels.map((label, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => jumpToScene(idx)}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors rounded-lg cursor-pointer ${
                      activeSceneIndex === idx
                        ? "bg-gold-100 text-maroon-950 font-bold border border-gold-400"
                        : "text-maroon-800 hover:bg-gold-50"
                    }`}
                  >
                    <span className="font-hindi truncate">{label}</span>
                    <span className="text-[10px] font-mono text-gold-700 ml-2">0{idx + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Scroll Mode Toggle & Audio Controls */}
        <div className="flex items-center gap-2 pointer-events-auto shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSwitchToScroll();
            }}
            className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-wider text-maroon-800 hover:text-maroon-950 bg-white/95 border border-gold-400/80 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-md backdrop-blur-md transition-all hover:bg-gold-50 cursor-pointer"
          >
            <span className="sm:hidden">📜 Card</span>
            <span className="hidden sm:inline">📜 Scroll Card</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleMusic();
            }}
            aria-label="Toggle background music"
            className="h-7 sm:h-8 px-2 sm:px-2.5 rounded-full border border-gold-400 bg-white/95 shadow-md flex items-center justify-center gap-1.5 text-maroon-900 hover:bg-gold-50 transition-colors backdrop-blur-md cursor-pointer"
          >
            {isPlayingMusic ? (
              <>
                <div className="flex items-end gap-[2px] h-3 sm:h-3.5 px-0.5" title="Shehnai playing">
                  <span className="w-[2.5px] sm:w-[3px] bg-gold-600 rounded-full animate-eq-1" />
                  <span className="w-[2.5px] sm:w-[3px] bg-gold-500 rounded-full animate-eq-2" />
                  <span className="w-[2.5px] sm:w-[3px] bg-gold-400 rounded-full animate-eq-3" />
                  <span className="w-[2.5px] sm:w-[3px] bg-gold-600 rounded-full animate-eq-4" />
                </div>
                <Volume2 className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-gold-700" />
              </>
            ) : (
              <VolumeX className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-maroon-600" />
            )}
          </button>
        </div>
      </header>

      {/* ─────────── Floating Bottom-Left Petal Shower Button ─────────── */}
      <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 z-40 pointer-events-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            showerPetals();
            setPetalShowerCount((c) => c + 1);
          }}
          className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/90 bg-white/95 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-hindi font-bold text-maroon-900 shadow-md backdrop-blur-md hover:bg-gold-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Tap to shower auspicious flowers"
        >
          <span className="text-sm sm:text-base">🌸</span>
          <span>पुष्प वर्षा {petalShowerCount > 0 ? `(${petalShowerCount})` : ""}</span>
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
        <div className="flex items-center justify-center gap-6 md:gap-12 mb-2">
          <button
            type="button"
            onClick={handleLightDiya}
            className={`diya-flame group relative p-1.5 rounded-full transition-transform cursor-pointer ${
              isDiyaLit ? "scale-110" : "hover:scale-105"
            }`}
            title="Tap to light the sacred flame"
          >
            <Diya
              className={`h-14 w-14 md:h-18 md:w-18 animate-flicker text-gold-600 transition-all ${
                isDiyaLit ? "drop-shadow-[0_0_25px_rgba(234,179,8,0.95)]" : ""
              }`}
            />
            {isDiyaLit && (
              <span className="absolute inset-0 rounded-full bg-amber-400/20 blur-md pointer-events-none animate-ping" />
            )}
          </button>

          <div className="ganesh-icon-box relative">
            <div
              className={`h-28 w-28 md:h-36 md:w-36 rounded-full border-2 border-gold-400 bg-white shadow-xl flex items-center justify-center p-4 transition-all ${
                isDiyaLit ? "shadow-[0_0_40px_rgba(201,162,75,0.7)] border-gold-500" : ""
              }`}
            >
              <Ganesha className="h-20 w-20 md:h-24 md:w-24 text-maroon-800" />
            </div>
            <div className="absolute inset-0 rounded-full border border-dashed border-gold-500 animate-spin-slow pointer-events-none" />
          </div>

          <button
            type="button"
            onClick={handleLightDiya}
            className={`diya-flame group relative p-1.5 rounded-full transition-transform cursor-pointer ${
              isDiyaLit ? "scale-110" : "hover:scale-105"
            }`}
            title="Tap to light the sacred flame"
          >
            <Diya
              className={`h-14 w-14 md:h-18 md:w-18 animate-flicker text-gold-600 transition-all ${
                isDiyaLit ? "drop-shadow-[0_0_25px_rgba(234,179,8,0.95)]" : ""
              }`}
            />
            {isDiyaLit && (
              <span className="absolute inset-0 rounded-full bg-amber-400/20 blur-md pointer-events-none animate-ping" />
            )}
          </button>
        </div>

        {/* 🪔 Interactive Diya Lighting Prompt Button */}
        <div className="my-2 pointer-events-auto">
          <button
            type="button"
            onClick={handleLightDiya}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-hindi font-bold shadow-md transition-all cursor-pointer ${
              isDiyaLit
                ? "border-gold-500 bg-gold-100 text-maroon-950 shadow-[0_0_20px_rgba(201,162,75,0.4)]"
                : "border-gold-400/80 bg-white/95 text-maroon-900 hover:bg-gold-50 animate-bounce"
            }`}
          >
            <Flame className={`h-3.5 w-3.5 ${isDiyaLit ? "text-amber-600 fill-amber-500" : "text-gold-600"}`} />
            <span>
              {isDiyaLit
                ? "॥ शुभं करोति कल्याणं आरोग्यं धनसंपदा · दीप प्रज्ज्वलित ॥"
                : "✨ दीप प्रज्ज्वलित कर आशीर्वाद लें (Tap to light flame)"}
            </span>
          </button>
        </div>

        <p className="ganesh-text font-hindi text-3xl md:text-5xl font-bold tracking-widest text-gold-700 mb-1">
          ॥ श्री गणेशाय नमः ॥
        </p>

        <Divider tone="maroon" className="ganesh-text h-7 w-64 mx-auto my-1.5" />

        <blockquote className="ganesh-text font-hindi text-xl md:text-3xl font-medium leading-relaxed text-maroon-950 max-w-2xl bg-white/90 border border-gold-400/80 p-5 md:p-7 rounded-2xl shadow-lg my-2">
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
          <br />
          निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
        </blockquote>

        <p className="ganesh-text font-serif text-base md:text-xl italic text-maroon-800/90 mt-1">
          "With the sacred blessings of Lord Ganesha, beginning the auspicious journey of marriage"
        </p>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SCENE 1: THE LEADING CAST & MAIN TITLE (DSC_3488)
          Royal Palace Arch Frame - Faces, Smiles & Outfits 100% CLEAR!
      ════════════════════════════════════════════════════════════ */}
      <section
        id="scene-1"
        className="film-scene absolute inset-0 z-20 flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-6 md:gap-14 px-4 sm:px-8 md:px-16 pt-12 sm:pt-0"
      >
        {/* Ornate Royal Palace Arch with Couple Portrait */}
        <div className="couple-arch-box relative shrink-0">
          <div className="arch-shadow rounded-t-[10rem] sm:rounded-t-[12rem] md:rounded-t-[14rem] rounded-b-xl sm:rounded-b-2xl border-2 sm:border-4 border-gold-400 bg-white p-1.5 sm:p-2.5 shadow-2xl">
            <div className="overflow-hidden rounded-t-[9.5rem] sm:rounded-t-[11.5rem] md:rounded-t-[13.5rem] rounded-b-lg sm:rounded-b-xl border border-gold-300">
              <img
                src={img3488}
                alt="Ashwin and Aarti"
                className="couple-arch-img h-[28vh] sm:h-[38vh] md:h-[58vh] max-h-[380px] md:max-h-[520px] w-auto aspect-[4/5] object-cover object-top will-change-transform"
              />
            </div>
          </div>
          <CornerFlourish className="absolute -left-1.5 -top-1.5 sm:-left-2 sm:-top-2 h-7 w-7 sm:h-10 sm:w-10 text-gold-600 pointer-events-none" />
          <CornerFlourish className="absolute -right-1.5 -top-1.5 sm:-right-2 sm:-top-2 h-7 w-7 sm:h-10 sm:w-10 rotate-90 text-gold-600 pointer-events-none" />
          <CornerFlourish className="absolute -bottom-1.5 -right-1.5 sm:-bottom-2 sm:-right-2 h-7 w-7 sm:h-10 sm:w-10 rotate-180 text-gold-600 pointer-events-none" />
          <CornerFlourish className="absolute -bottom-1.5 -left-1.5 sm:-bottom-2 sm:-left-2 h-7 w-7 sm:h-10 sm:w-10 -rotate-90 text-gold-600 pointer-events-none" />
        </div>

        {/* Wedding Cinema Titles */}
        <div className="text-center md:text-left max-w-xl">
          <p className="couple-title-text font-sans text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.3em] sm:tracking-[0.45em] text-maroon-700/80 mb-0.5 sm:mb-1">
            Maurya Family Productions Presents
          </p>

          <p className="couple-title-text font-hindi text-xl sm:text-2xl md:text-3xl font-bold tracking-widest text-gold-700">
            ॥ शुभ विवाह ॥
          </p>

          <p className="couple-title-text font-script text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gold-grad shimmer leading-[1.05] sm:leading-tight my-0.5 sm:my-1">
            Ashwin &amp; Aarti
          </p>

          <div className="couple-title-text flex items-center justify-center md:justify-start gap-2 sm:gap-3 my-1.5 sm:my-2.5">
            <span className="h-px w-8 sm:w-16 md:w-20 bg-gold-400" />
            <p className="font-sans text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.25em] sm:tracking-[0.35em] text-maroon-900">
              Wednesday · 09 December 2026
            </p>
            <span className="h-px w-8 sm:w-16 md:w-20 bg-gold-400" />
          </div>

          {/* Live Auspicious Countdown Badge */}
          <div className="couple-title-text flex items-center justify-center md:justify-start gap-1.5 my-1 sm:my-2">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-gold-400/90 bg-white/95 px-3 sm:px-3.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-hindi font-bold text-maroon-900 shadow-sm backdrop-blur-sm">
              <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gold-700 animate-spin-slow shrink-0" />
              <span>
                शुभ विवाह में शेष: {countdown.days} दिन · {countdown.hours} घंटे · {countdown.mins} मिनट · {countdown.secs} सेकंड
              </span>
            </div>
          </div>

          <p className="couple-title-text flex items-center justify-center md:justify-start gap-1.5 sm:gap-2 font-serif text-xs sm:text-base md:text-lg text-maroon-800/90 italic">
            <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold-600 shrink-0" />
            {VENUE_ADDRESS}
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SCENE 2: TWO FAMILIES UNITE (DSC_1776)
          Union Photo & Family Title Cards
      ════════════════════════════════════════════════════════════ */}
      <section
        id="scene-2"
        className="film-scene absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto pt-10 sm:pt-0"
      >
        <p className="font-hindi text-sm sm:text-base md:text-lg font-bold text-gold-700">
          ॥ पारिवारिक मिलन ॥
        </p>
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-maroon-900 cinema-title-shadow">
          Two Families <span className="text-gold-grad italic font-serif">United in Love</span>
        </h2>

        {/* Featured Photo: DSC_1776 */}
        <div className="family-photo-box my-2 sm:my-3 border-2 border-gold-400 bg-white p-1.5 sm:p-2 rounded-xl shadow-lg max-w-xs sm:max-w-sm mx-auto">
          <img
            src={img1776}
            alt="The Union"
            className="h-32 sm:h-44 md:h-52 w-full object-cover rounded-lg"
          />
        </div>

        {/* Groom & Bride Family Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 w-full mt-1 max-w-2xl">
          <div className="family-card-item bg-white/95 border-2 border-gold-400/80 p-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-md text-center">
            <p className="font-hindi text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gold-700">
              दूल्हा पक्ष (The Groom)
            </p>
            <h3 className="font-serif text-lg sm:text-2xl font-bold text-maroon-900 mt-0.5">
              Ashwin Maurya
            </h3>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-maroon-600 mt-0.5">
              Son of
            </p>
            <p className="font-serif text-sm sm:text-lg font-semibold text-maroon-900">
              Shri Vijay Narayan Maurya &amp; Smt. Nirmala Maurya
            </p>
          </div>

          <div className="family-card-item bg-white/95 border-2 border-gold-400/80 p-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-md text-center">
            <p className="font-hindi text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gold-700">
              दुल्हन पक्ष (The Bride)
            </p>
            <h3 className="font-serif text-lg sm:text-2xl font-bold text-maroon-900 mt-0.5">
              Aarti Maurya
            </h3>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-maroon-600 mt-0.5">
              Daughter of
            </p>
            <p className="font-serif text-sm sm:text-lg font-semibold text-maroon-900">
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
        className="film-scene absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto pt-10 sm:pt-0"
      >
        <p className="font-hindi text-sm sm:text-base font-bold text-gold-700">हमारे उत्सव</p>
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-maroon-900 cinema-title-shadow">
          Wedding <span className="text-gold-grad italic font-serif">Celebrations</span>
        </h2>

        {/* Candid Photo: DSC_1777 */}
        <div className="events-photo-box my-1.5 sm:my-2.5 border-2 border-gold-400 bg-white p-1 sm:p-1.5 rounded-xl shadow-md max-w-[200px] sm:max-w-xs mx-auto">
          <img
            src={img1777}
            alt="Celebration Radiance"
            className="h-28 sm:h-36 md:h-44 w-full object-cover rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 w-full mt-1 text-center">
          <div className="event-card-item bg-white/95 border border-gold-400/80 p-2 sm:p-3 rounded-xl shadow-sm">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-gold-100 text-maroon-900 px-1.5 sm:px-2 py-0.5 rounded font-mono border border-gold-300">
              05 Dec 2026
            </span>
            <p className="font-hindi text-xs sm:text-sm font-bold text-gold-700 mt-1">शुभ तिलक</p>
            <h4 className="font-serif text-sm sm:text-lg font-bold text-maroon-900">Tilak</h4>
            <p className="text-[11px] sm:text-xs text-maroon-700">7:00 PM Onwards</p>
            <p className="text-[9px] sm:text-[10px] font-sans font-medium text-gold-800 mt-0.5">👔 Royal Traditional</p>
          </div>

          <div className="event-card-item bg-white/95 border border-gold-400/80 p-2 sm:p-3 rounded-xl shadow-sm">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-gold-100 text-maroon-900 px-1.5 sm:px-2 py-0.5 rounded font-mono border border-gold-300">
              07 Dec 2026
            </span>
            <p className="font-hindi text-xs sm:text-sm font-bold text-gold-700 mt-1">हल्दी समारोह</p>
            <h4 className="font-serif text-sm sm:text-lg font-bold text-maroon-900">Haldi</h4>
            <p className="text-[11px] sm:text-xs text-maroon-700">7:00 PM Onwards</p>
            <p className="text-[9px] sm:text-[10px] font-sans font-medium text-amber-700 mt-0.5">💛 Haldi Yellow</p>
          </div>

          <div className="event-card-item bg-white/95 border border-gold-400/80 p-2 sm:p-3 rounded-xl shadow-sm">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-gold-100 text-maroon-900 px-1.5 sm:px-2 py-0.5 rounded font-mono border border-gold-300">
              08 Dec 2026
            </span>
            <p className="font-hindi text-xs sm:text-sm font-bold text-gold-700 mt-1">मेहंदी व संगीत</p>
            <h4 className="font-serif text-sm sm:text-lg font-bold text-maroon-900">Sangeet</h4>
            <p className="text-[11px] sm:text-xs text-maroon-700">7:00 PM Onwards</p>
            <p className="text-[9px] sm:text-[10px] font-sans font-medium text-emerald-800 mt-0.5">✨ Indo-Western</p>
          </div>

          <div className="event-card-item bg-[#FFFDF9] border-2 border-gold-500 p-2 sm:p-3 rounded-xl shadow-md">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-gold-500 text-white px-1.5 sm:px-2 py-0.5 rounded font-mono font-bold shadow-sm">
              09 Dec 2026
            </span>
            <p className="font-hindi text-xs sm:text-sm font-bold text-maroon-900 mt-1">शुभ विवाह</p>
            <h4 className="font-serif text-sm sm:text-lg font-bold text-maroon-900">The Wedding</h4>
            <p className="text-[11px] sm:text-xs text-maroon-900 font-bold">Shubh Muhurat</p>
            <p className="text-[9px] sm:text-[10px] font-sans font-medium text-rose-800 mt-0.5">👑 Royal Red &amp; Gold</p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SCENE 4: OUR STORY / THE RING & PROMISE (DSC_1773)
      ════════════════════════════════════════════════════════════ */}
      <section
        id="scene-4"
        className="film-scene absolute inset-0 z-20 flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-6 md:gap-12 px-4 sm:px-6 max-w-4xl mx-auto pt-10 sm:pt-0"
      >
        <div className="story-photo-box relative shrink-0">
          <div className="relative border-2 border-gold-500 bg-white p-1.5 sm:p-2.5 shadow-xl rounded-xl">
            <img
              src={img1773}
              alt="Ring and Promise"
              className="h-44 w-36 sm:h-60 sm:w-48 md:h-80 md:w-68 object-cover object-top rounded-lg"
            />
            <CornerFlourish className="absolute -left-1.5 -top-1.5 sm:-left-2 sm:-top-2 h-7 w-7 sm:h-9 sm:w-9 text-gold-600" />
            <CornerFlourish className="absolute -right-1.5 -top-1.5 sm:-right-2 sm:-top-2 h-7 w-7 sm:h-9 sm:w-9 rotate-90 text-gold-600" />
            <CornerFlourish className="absolute -bottom-1.5 -right-1.5 sm:-bottom-2 sm:-right-2 h-7 w-7 sm:h-9 sm:w-9 rotate-180 text-gold-600" />
            <CornerFlourish className="absolute -bottom-1.5 -left-1.5 sm:-bottom-2 sm:-left-2 h-7 w-7 sm:h-9 sm:w-9 -rotate-90 text-gold-600" />
          </div>
          <p className="absolute -bottom-3 sm:-bottom-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap border border-gold-400 bg-white px-3 sm:px-3.5 py-0.5 font-script text-base sm:text-lg text-maroon-900 shadow-sm rounded-full">
            the ring &amp; the promise
          </p>
        </div>

        <div className="text-center md:text-left max-w-md">
          <p className="story-text-item font-hindi text-sm sm:text-base font-bold text-gold-700">हमारी कहानी</p>
          <h2 className="story-text-item font-serif text-2xl sm:text-4xl md:text-5xl font-semibold text-maroon-900 mt-0.5 sm:mt-1">
            From this day, <span className="italic text-gold-700 font-serif">forever.</span>
          </h2>
          <Divider tone="maroon" className="story-text-item h-4 sm:h-5 w-36 sm:w-44 my-1 sm:my-2 mx-auto md:mx-0" />
          <blockquote className="story-text-item font-serif text-sm sm:text-lg md:text-xl italic text-maroon-800/90 my-1 sm:my-2.5">
            "दो दिल मिले, दो राहें एक हुईं... जहाँ से शुरू होती है हमारी सबसे ख़ूबसूरत दास्तान।"
          </blockquote>
          <p className="story-text-item font-script text-3xl sm:text-4xl md:text-5xl text-maroon-900 font-bold mt-1 sm:mt-2">
            Ashwin &amp; Aarti
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SCENE 5: SPECIAL CAMEO — NIECE & NEPHEW (FUN.JPG)
      ════════════════════════════════════════════════════════════ */}
      <section
        id="scene-5"
        className="film-scene absolute inset-0 z-20 flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-6 md:gap-12 px-4 sm:px-6 max-w-3xl mx-auto pt-10 sm:pt-0"
      >
        <div className="kids-photo-box relative shrink-0">
          <div className="arch-shadow rounded-t-full border-2 border-gold-400 bg-white p-1.5 sm:p-2 shadow-xl">
            <img
              src={funImg}
              alt="The Little Ones"
              className="h-44 w-36 sm:h-56 sm:w-44 md:h-72 md:w-56 rounded-t-full object-cover object-top"
            />
          </div>
          <span className="absolute -bottom-3 sm:-bottom-3.5 left-1/2 -translate-x-1/2 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border-2 border-gold-400 bg-white shadow-md">
            <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-rose-500 text-rose-500" />
          </span>
        </div>

        <div className="kids-dialogue text-center md:text-left max-w-md">
          <p className="font-hindi text-sm sm:text-base font-bold text-gold-700">नन्हे मेहमानों की ओर से</p>
          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl font-medium italic leading-snug text-maroon-900 my-1.5 sm:my-3">
            "Mere <span className="text-gold-grad font-bold">mama ki shaadi</span> hai, aana zaroori hai…
            <br />
            <span className="text-maroon-700 font-bold">bahaane-baazi strictly nahi chalegi!</span>"
          </blockquote>
          <p className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-maroon-700 mt-1 sm:mt-2">
            — strictly no excuses from nieces &amp; nephews!
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SCENE 6: GODHULI BELA — 16:9 SUNSET PANORAMA (DSC_3501)
      ════════════════════════════════════════════════════════════ */}
      <section
        id="scene-6"
        className="film-scene absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto pt-10 sm:pt-0"
      >
        <div className="panorama-caption mb-1.5 sm:mb-3">
          <p className="font-hindi text-gold-700 text-sm sm:text-base font-bold">गोधूलि बेला · सात फेरे</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-maroon-900">
            The Golden Hour Promise
          </h2>
        </div>

        <div className="panorama-box relative border-2 border-gold-400 bg-white p-1.5 sm:p-2.5 shadow-2xl w-full max-w-3xl rounded-xl sm:rounded-2xl">
          <div className="relative overflow-hidden h-44 sm:h-60 md:h-80 lg:h-96 rounded-lg sm:rounded-xl">
            <img
              src={img3501}
              alt="Ashwin and Aarti Golden Hour Sunset"
              className="h-full w-full object-cover object-center will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/65 via-transparent to-transparent" />
            <div className="absolute bottom-2.5 left-3 right-3 sm:bottom-4 sm:left-6 sm:right-6 flex items-end justify-between text-white">
              <span className="font-hindi text-gold-300 text-xs sm:text-base font-semibold flex items-center gap-1.5">
                <SparklesIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold-400" />
                <span>सात फेरे, अटूट विश्वास</span>
              </span>
              <span className="font-script text-xl sm:text-2xl md:text-3xl text-gold-200">
                Ashwin &amp; Aarti
              </span>
            </div>
          </div>
          <CornerFlourish className="absolute -left-1.5 -top-1.5 h-6 w-6 sm:h-8 sm:w-8 text-gold-600" />
          <CornerFlourish className="absolute -right-1.5 -top-1.5 h-6 w-6 sm:h-8 sm:w-8 rotate-90 text-gold-600" />
          <CornerFlourish className="absolute -bottom-1.5 -right-1.5 h-6 w-6 sm:h-8 sm:w-8 rotate-180 text-gold-600" />
          <CornerFlourish className="absolute -bottom-1.5 -left-1.5 h-6 w-6 sm:h-8 sm:w-8 -rotate-90 text-gold-600" />
        </div>

        <p className="panorama-caption font-serif text-sm sm:text-base md:text-lg italic text-maroon-800/85 mt-2 sm:mt-3">
          "सात फेरे, सात वचन — सात जन्मों का अटूट बंधन।"
        </p>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SCENE 7: GRAND CLIMAX & YOUR INVITATION (Final Screen)
      ════════════════════════════════════════════════════════════ */}
      <section
        id="scene-7"
        className="film-scene absolute inset-0 z-20 flex flex-col items-center justify-start sm:justify-center text-center px-3 sm:px-6 max-w-2xl mx-auto overflow-y-auto pt-14 sm:pt-16 pb-8"
      >
        <div className="venue-item flex items-center justify-center gap-3 mb-1">
          <WeddingBells className="h-6 w-6 sm:h-8 sm:w-8 text-gold-600" />
          <span className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-full border-2 border-gold-400 bg-white shadow-md">
            <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-maroon-800" />
          </span>
          <WeddingBells className="h-6 w-6 sm:h-8 sm:w-8 text-gold-600 -scale-x-100" />
        </div>

        <div className="venue-item mb-1.5 sm:mb-2">
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] sm:tracking-[0.35em] text-gold-700 bg-gold-100/90 border border-gold-300 px-3 py-0.5 rounded-full">
            ॥ शुभ स्थल व आमंत्रण ॥
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-maroon-900 mt-1">
            Village Bigrahpur, Mau
          </h2>
          <div className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-gold-400/90 bg-gold-100/70 px-3 py-0.5 text-[10px] sm:text-[11px] font-hindi font-bold text-maroon-900 shadow-sm">
            <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gold-800 shrink-0" />
            <span>
              शुभ लग्न में शेष: {countdown.days} दिन · {countdown.hours} घंटे · {countdown.mins} मिनट
            </span>
          </div>
        </div>

        {/* Traditional Maurya Family Blessing Strip */}
        <div className="venue-item w-full bg-white/95 border border-gold-400/80 p-3 sm:p-4 shadow-md rounded-xl sm:rounded-2xl my-1.5 sm:my-2">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <Kalash className="h-5 w-5 sm:h-6 sm:w-6 text-gold-600" />
            <p className="font-hindi text-sm sm:text-base md:text-lg font-bold text-gold-700">
              स्वागताकांक्षी: समस्त मौर्य परिवार
            </p>
            <Kalash className="h-5 w-5 sm:h-6 sm:w-6 text-gold-600 -scale-x-100" />
          </div>
          <p className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-maroon-900 mt-0.5 sm:mt-1">
            {VENUE_ADDRESS}
          </p>
          <p className="font-sans text-[11px] sm:text-xs uppercase tracking-wider text-maroon-700 mt-0.5">
            Wedding Invitation by <strong className="text-maroon-900 font-bold">Ashwin Maurya</strong> ({PHONE_DISPLAY})
          </p>
        </div>

        {/* 🌟 🌟 🌟 KEY FEATURE: YOUR PERSONALIZED INVITATION BUTTON 🌟 🌟 🌟 */}
        <div className="venue-item my-2 sm:my-3 w-full max-w-md mx-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsInvitationModalOpen(true);
            }}
            className="group relative w-full overflow-hidden rounded-2xl border-2 border-gold-500 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 p-1 shadow-[0_12px_35px_-5px_rgba(201,162,75,0.7)] hover:shadow-[0_18px_45px_-5px_rgba(201,162,75,0.9)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <div className="flex items-center justify-center gap-2.5 sm:gap-3 rounded-xl bg-white/95 px-3.5 sm:px-5 py-2.5 sm:py-3.5 text-maroon-950 backdrop-blur-sm group-hover:bg-gold-50/95 transition-colors">
              <span className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full border-2 border-gold-500 bg-gold-100 text-maroon-900 shadow-inner group-hover:rotate-12 transition-transform">
                <SparklesIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gold-700 animate-pulse" />
              </span>
              <div className="text-left">
                <p className="font-serif text-base sm:text-xl font-bold text-maroon-950 leading-tight">
                  Your Invitation 💌
                </p>
                <p className="font-hindi text-[11px] sm:text-sm text-gold-800 font-bold mt-0.5">
                  नाम दर्ज कर अपना व्यक्तिगत कार्ड देखें ✨
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Minimal guest dock — 3 essentials, next-level clean finale */}
        <div className="venue-item mt-2 sm:mt-3 w-full max-w-md">
          <div className="flex items-stretch justify-center gap-2 sm:gap-3">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="group flex flex-1 flex-col items-center gap-1.5 rounded-2xl border border-gold-400/80 bg-white/95 px-2 py-2.5 sm:py-3 shadow-sm backdrop-blur-md transition-all hover:bg-gold-50 hover:border-gold-500 active:scale-95"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400 bg-gold-100 transition-transform group-hover:scale-110">
                <Navigation className="h-4 w-4 text-maroon-900" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-maroon-900">Directions</span>
            </a>

            <a
              href={waRsvpUrl("Congratulations Ashwin & Aarti! We'll definitely be there ✨")}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="group flex flex-1 flex-col items-center gap-1.5 rounded-2xl border border-emerald-600 bg-emerald-600 px-2 py-2.5 sm:py-3 shadow-sm transition-all hover:bg-emerald-700 active:scale-95"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:scale-110">
                <MessageCircle className="h-4 w-4 text-white" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white">WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
              className="group flex flex-1 flex-col items-center gap-1.5 rounded-2xl border border-gold-400/80 bg-white/95 px-2 py-2.5 sm:py-3 shadow-sm backdrop-blur-md transition-all hover:bg-gold-50 hover:border-gold-500 active:scale-95 cursor-pointer"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400 bg-gold-100 transition-transform group-hover:scale-110">
                <Share2 className="h-4 w-4 text-maroon-900" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-maroon-900">{shared ? "Shared!" : "Share"}</span>
            </button>
          </div>
        </div>

        {/* Replay Film & Scroll Card Options */}
        <div className="venue-item mt-3 sm:mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleReplay();
            }}
            className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-maroon-900 underline underline-offset-4 decoration-gold-500 decoration-2 hover:text-gold-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span>Replay Film</span>
          </button>

          <span className="h-1 w-1 rounded-full bg-gold-600/60" aria-hidden />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSwitchToScroll();
            }}
            className="text-[11px] sm:text-xs font-sans font-semibold uppercase tracking-wider text-maroon-700 hover:text-maroon-950 underline underline-offset-4 cursor-pointer"
          >
            Scroll Full Card 📜
          </button>
        </div>

        <p className="venue-item mt-3 font-serif text-sm italic text-maroon-700/80">
          #Ashwin<span className="text-gold-700 font-semibold">Weds</span>Aarti · 09 Dec 2026
        </p>
      </section>

      {/* ─────────── 4. Subtitles — slim cinematic caption, pinned above the letterbox ─────────── */}
      {activeSceneIndex !== 7 && (
        <div className="absolute inset-x-0 bottom-9 sm:bottom-12 z-40 px-3 text-center pointer-events-none">
          <p className="inline-block max-w-[92%] sm:max-w-xl rounded-full bg-maroon-950/85 px-4 py-1.5 font-serif text-[11px] sm:text-xs italic leading-snug text-ivory-100 shadow-lg backdrop-blur-sm border border-gold-400/30 animate-fade-in">
            {subtitles[activeSceneIndex]}
          </p>
        </div>
      )}

      {/* ─────────── 5. Personalized Royal Invitation Modal ─────────── */}
      <PersonalizedInvitationModal
        isOpen={isInvitationModalOpen}
        onClose={() => setIsInvitationModalOpen(false)}
      />
    </div>
  );
}