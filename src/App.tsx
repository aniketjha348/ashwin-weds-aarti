import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Intro from "./components/Intro";
import Hero from "./components/Hero";
import Invitation, { Marquee } from "./components/Invitation";
import Celebrations from "./components/Celebrations";
import { Story, Countdown } from "./components/Story";
import Gallery from "./components/Gallery";
import MusicPlayer from "./components/MusicPlayer";
import FilmView from "./components/FilmView";
import Footer from "./components/Footer";
import PersonalizedInvitationModal from "./components/PersonalizedInvitationModal";
import TravelGuideModal from "./components/TravelGuideModal";
import BlessingsModal from "./components/BlessingsModal";
import { Mangalacharan, Swagatakankshi } from "./components/FamilyBlessings";

gsap.registerPlugin(ScrollTrigger);

const AUDIO_URL = "./song.mp3";
const FALLBACK_AUDIO_URL =
  "https://gvn-photon-weddifly.sgp1.digitaloceanspaces.com/uploads/flipbook/song/5ImyqTtOc8pdxr0XmwTnD5sYVR1leRbspUzaIfSa.mp3";

export default function App() {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isFilmMode, setIsFilmMode] = useState(true);
  const [introFinished, setIntroFinished] = useState(false);
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isTravelOpen, setIsTravelOpen] = useState(false);
  const [isBlessingsOpen, setIsBlessingsOpen] = useState(false);

  // Deep-link magic: ?guest=Name opens the personalized card straight away
  useEffect(() => {
    try {
      if (new URLSearchParams(window.location.search).has("guest")) {
        setIsInvitationOpen(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const fadeAnimRef = useRef<number | null>(null);

  const cancelFade = useCallback(() => {
    if (fadeAnimRef.current !== null) {
      cancelAnimationFrame(fadeAnimRef.current);
      fadeAnimRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      cancelFade();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [cancelFade]);

  // Initialize background audio
  const startMusic = useCallback(() => {
    cancelFade();
    if (!audioRef.current) {
      const audio = new Audio(AUDIO_URL);
      audio.loop = true;
      audio.volume = 0.55;
      let triedFallback = false;
      audio.onerror = () => {
        if (triedFallback) return;
        triedFallback = true;
        audio.src = FALLBACK_AUDIO_URL;
        audio.load();
        audio.play().catch(() => setIsPlayingMusic(false));
      };
      audioRef.current = audio;
    }

    audioRef.current.volume = 0.55;
    audioRef.current
      .play()
      .then(() => setIsPlayingMusic(true))
      .catch(() => {});
  }, [cancelFade]);

  // Smooth cinematic S-curve audio fade-out within 1-3 seconds
  const fadeOutMusic = useCallback(
    (durationMs = 2200) => {
      if (!audioRef.current) return;
      const audio = audioRef.current;
      if (audio.paused) return;

      cancelFade();
      const startVolume = audio.volume > 0 ? audio.volume : 0.55;
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / durationMs);
        // Cosine S-curve: starts soft, drops smoothly, no abrupt cut
        const factor = 0.5 * (1 + Math.cos(progress * Math.PI));
        audio.volume = Math.max(0, startVolume * factor);

        if (progress < 1) {
          fadeAnimRef.current = requestAnimationFrame(step);
        } else {
          audio.pause();
          audio.volume = 0.55; // Reset volume for next playback
          setIsPlayingMusic(false);
          fadeAnimRef.current = null;
        }
      };

      fadeAnimRef.current = requestAnimationFrame(step);
    },
    [cancelFade]
  );

  const restartMusic = useCallback(() => {
    cancelFade();
    if (!audioRef.current) {
      startMusic();
      return;
    }
    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.volume = 0.55;
    audio
      .play()
      .then(() => setIsPlayingMusic(true))
      .catch(() => {});
  }, [cancelFade, startMusic]);

  const toggleMusic = useCallback(() => {
    cancelFade();
    if (!audioRef.current) {
      startMusic();
      return;
    }
    const audio = audioRef.current;
    if (isPlayingMusic) {
      audio.pause();
      setIsPlayingMusic(false);
    } else {
      audio.volume = 0.55;
      audio
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch(() => {});
    }
  }, [cancelFade, isPlayingMusic, startMusic]);

  // Handle intro choice - launches the cinema hall film
  const handleStartFilm = () => {
    startMusic();
    setIntroFinished(true);
    setIsFilmMode(true);
  };

  // Scroll progress for Scroll View
  useEffect(() => {
    if (isFilmMode || !progressBarRef.current) return;

    const anim = gsap.to(progressBarRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2,
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [isFilmMode]);

  // Keep ScrollTriggers valid when toggling between film and scroll modes
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 60);
    return () => window.clearTimeout(id);
  }, [isFilmMode, introFinished]);

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-maroon-900 font-sans antialiased">
      {/* 1. Theatre Curtains Opening */}
      {!introFinished && <Intro onStartFilm={handleStartFilm} />}

      {/* 2. Pure Cinema Hall Wedding Film Mode (Zero Button Clutter) */}
      {introFinished && isFilmMode && (
        <FilmView
          isPlayingMusic={isPlayingMusic}
          onToggleMusic={toggleMusic}
          onSwitchToScroll={() => setIsFilmMode(false)}
          onFadeOutMusic={fadeOutMusic}
          onRestartMusic={restartMusic}
        />
      )}

      {/* 3. Continuous Scroll View — mounted only when visible so
          ScrollTrigger measures the real layout and entrances replay */}
      {!isFilmMode && (
      <main
        className="grain relative bg-ivory-50 text-maroon-900 font-sans antialiased transition-opacity duration-500"
      >
        {/* Golden scroll progress */}
        <div
          ref={progressBarRef}
          className="fixed inset-x-0 top-0 z-[95] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 shadow-[0_1px_6px_rgba(201,162,75,0.4)]"
        />

        <Mangalacharan />
        <Hero />

        <div className="relative z-20">
          <Marquee />
        </div>

        <Invitation />
        <Celebrations />
        <Story />
        <Gallery />
        <Countdown />
        <Swagatakankshi />
        <Footer />

        {/* Floating Utilities (Music + Switch to Film View) */}
        <MusicPlayer
          isPlaying={isPlayingMusic}
          onToggle={toggleMusic}
          onOpenFilm={() => setIsFilmMode(true)}
          onOpenInvitation={() => setIsInvitationOpen(true)}
          onOpenTravel={() => setIsTravelOpen(true)}
          onOpenBlessings={() => setIsBlessingsOpen(true)}
        />
      </main>
      )}

      {/* Modals live at root so ?guest= deep-links work even in film mode */}
      <PersonalizedInvitationModal
        isOpen={isInvitationOpen}
        onClose={() => setIsInvitationOpen(false)}
      />

      <TravelGuideModal isOpen={isTravelOpen} onClose={() => setIsTravelOpen(false)} />

      <BlessingsModal isOpen={isBlessingsOpen} onClose={() => setIsBlessingsOpen(false)} />
    </div>
  );
}
