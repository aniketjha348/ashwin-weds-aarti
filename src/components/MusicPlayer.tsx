import { Play, VolumeX, Sparkles, Compass, Heart } from "lucide-react";

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
  onOpenFilm: () => void;
  onOpenInvitation: () => void;
  onOpenTravel?: () => void;
  onOpenBlessings?: () => void;
}

export default function MusicPlayer({
  isPlaying,
  onToggle,
  onOpenFilm,
  onOpenInvitation,
  onOpenTravel,
  onOpenBlessings,
}: MusicPlayerProps) {
  return (
    <div className="fixed bottom-3 right-2.5 sm:bottom-6 sm:right-6 z-[80] flex flex-wrap items-center justify-end gap-1.5 sm:gap-2.5 max-w-[calc(100vw-1.25rem)]">
      {/* Personalized invitation — the card's headline feature, reachable from scroll mode */}
      <button
        type="button"
        onClick={onOpenInvitation}
        className="flex items-center gap-1.5 rounded-full border-2 border-gold-500 bg-white/95 px-3 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-maroon-900 shadow-md backdrop-blur-md transition-all hover:bg-gold-50 hover:scale-105 active:scale-95"
        title="Get your personalized invitation card"
      >
        <Sparkles className="h-3.5 w-3.5 text-gold-700" />
        <span className="hidden sm:inline">Your Invitation</span>
        <span className="sm:hidden">Invite</span>
      </button>

      {/* Button to open Film View anytime from Scroll Mode */}
      <button
        type="button"
        onClick={onOpenFilm}
        className="flex items-center gap-1.5 rounded-full border-2 border-gold-500 bg-gold-500 text-maroon-950 px-3.5 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-md hover:bg-gold-600 transition-all hover:scale-105 active:scale-95"
        title="Watch as Auto-Playing Film"
      >
        <Play className="h-3.5 w-3.5 fill-current" />
        <span className="hidden sm:inline">Watch Film 🎬</span>
        <span className="sm:hidden">Film 🎬</span>
      </button>

      {/* Music Toggle Button */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={isPlaying ? "Mute music" : "Play music"}
        aria-pressed={isPlaying}
        className="flex h-9 sm:h-11 items-center gap-1.5 sm:gap-2 rounded-full border border-gold-400 bg-white/95 px-2.5 sm:px-3.5 text-maroon-900 shadow-md backdrop-blur-md transition-all duration-300 hover:border-gold-500 hover:bg-gold-50 active:scale-95"
      >
        {isPlaying ? (
          <>
            <div className="flex h-3.5 items-end gap-0.5">
              <span className="w-0.5 rounded-full bg-gold-600 animate-eq-1" />
              <span className="w-0.5 rounded-full bg-maroon-700 animate-eq-2" />
              <span className="w-0.5 rounded-full bg-gold-600 animate-eq-3" />
              <span className="w-0.5 rounded-full bg-maroon-700 animate-eq-4" />
            </div>
            <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-maroon-900">
              Music On
            </span>
          </>
        ) : (
          <>
            <VolumeX className="h-4 w-4 text-maroon-700/70" />
            <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-maroon-700/80">
              Music Off
            </span>
          </>
        )}
      </button>

      {onOpenTravel && (
        <button
          type="button"
          onClick={onOpenTravel}
          className="flex items-center gap-1.5 rounded-full border border-gold-400/80 bg-white/95 px-2.5 sm:px-3 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-maroon-900 shadow-md backdrop-blur-md transition-all hover:bg-gold-50 hover:scale-105 active:scale-95"
          title="Travel and route guide"
          aria-label="Travel and route guide"
        >
          <Compass className="h-3.5 w-3.5 text-gold-700" />
          <span className="hidden sm:inline">Route</span>
        </button>
      )}

      {onOpenBlessings && (
        <button
          type="button"
          onClick={onOpenBlessings}
          className="flex items-center gap-1.5 rounded-full border border-gold-400/80 bg-white/95 px-2.5 sm:px-3 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-maroon-900 shadow-md backdrop-blur-md transition-all hover:bg-gold-50 hover:scale-105 active:scale-95"
          title="Bless the couple"
          aria-label="Bless the couple"
        >
          <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
          <span className="hidden sm:inline">Bless</span>
        </button>
      )}
    </div>
  );
}
