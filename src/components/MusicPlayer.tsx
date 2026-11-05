import { Play, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
  onOpenFilm: () => void;
}

export default function MusicPlayer({
  isPlaying,
  onToggle,
  onOpenFilm,
}: MusicPlayerProps) {
  return (
    <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-[80] flex items-center gap-1.5 sm:gap-2.5">
      {/* Button to open Film View anytime from Scroll Mode */}
      <button
        type="button"
        onClick={onOpenFilm}
        className="flex items-center gap-1.5 rounded-full border-2 border-gold-500 bg-gold-500 text-maroon-950 px-3.5 py-2 text-xs font-bold uppercase tracking-wider shadow-md hover:bg-gold-600 transition-all hover:scale-105 active:scale-95"
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
        className="flex h-9 sm:h-11 items-center gap-1.5 sm:gap-2 rounded-full border border-gold-400 bg-white/95 px-2.5 sm:px-3.5 text-maroon-900 shadow-md backdrop-blur-md transition-all duration-300 hover:border-gold-500 hover:bg-gold-50 active:scale-95"
      >
        {isPlaying ? (
          <>
            <div className="flex h-3.5 items-end gap-0.5">
              <span className="w-0.5 rounded-full bg-gold-600 animate-[pulse_0.8s_ease-in-out_infinite] h-3" />
              <span className="w-0.5 rounded-full bg-maroon-700 animate-[pulse_0.6s_ease-in-out_infinite_0.2s] h-3.5" />
              <span className="w-0.5 rounded-full bg-gold-600 animate-[pulse_0.9s_ease-in-out_infinite_0.4s] h-2" />
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
    </div>
  );
}
