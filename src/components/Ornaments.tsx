import { useMemo } from "react";

/* ──────────────────────────────── Flourish divider ─────────────────────────────── */
export function Divider({ className = "", tone = "gold" }: { className?: string; tone?: "gold" | "maroon" }) {
  const c = tone === "gold" ? "#c9a24b" : "#781a2f";
  return (
    <svg viewBox="0 0 460 44" className={className} fill="none" aria-hidden>
      <g stroke={c} strokeWidth="1.4" strokeLinecap="round">
        <path d="M8 22 H178" opacity="0.9" />
        <path d="M282 22 H452" opacity="0.9" />
        <path d="M178 22 c10 -10 22 -10 30 0 c-8 10 -20 10 -30 0 Z" fill={c} stroke="none" opacity="0.9" />
        <path d="M282 22 c-10 -10 -22 -10 -30 0 c8 10 20 10 30 0 Z" fill={c} stroke="none" opacity="0.9" />
        <path d="M230 8 L244 22 L230 36 L216 22 Z" fill="none" />
        <path d="M230 14 L237 22 L230 30 L223 22 Z" fill={c} stroke="none" />
        <circle cx="196" cy="22" r="2.4" fill={c} stroke="none" />
        <circle cx="264" cy="22" r="2.4" fill={c} stroke="none" />
        <path d="M8 22 c-6 -8 -2 -14 6 -12" opacity="0.7" />
        <path d="M452 22 c6 -8 2 -14 -6 -12" opacity="0.7" />
      </g>
    </svg>
  );
}

/* ──────────────────────────────── Rotating mandala ─────────────────────────────── */
export function Mandala({ className = "" }: { className?: string }) {
  const petals = useMemo(() => Array.from({ length: 24 }, (_, i) => i * 15), []);
  const dots = useMemo(() => Array.from({ length: 36 }, (_, i) => i * 10), []);
  return (
    <svg viewBox="0 0 600 600" className={className} fill="none" aria-hidden>
      <circle cx="300" cy="300" r="296" stroke="#c9a24b" strokeOpacity="0.25" strokeWidth="1" />
      <circle cx="300" cy="300" r="268" stroke="#c9a24b" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="2 10" />
      {petals.map((r) => (
        <path
          key={r}
          d="M300 60 C 326 118, 326 148, 300 186 C 274 148, 274 118, 300 60 Z"
          stroke="#c9a24b"
          strokeOpacity="0.35"
          strokeWidth="1"
          transform={`rotate(${r} 300 300)`}
        />
      ))}
      {dots.map((r) => (
        <circle
          key={r}
          cx="300"
          cy="226"
          r="3"
          fill="#c9a24b"
          fillOpacity="0.4"
          transform={`rotate(${r} 300 300)`}
        />
      ))}
      <circle cx="300" cy="300" r="212" stroke="#c9a24b" strokeOpacity="0.3" strokeWidth="1" />
      {petals.map((r) => (
        <path
          key={`i${r}`}
          d="M300 122 C 318 164, 318 186, 300 212 C 282 186, 282 164, 300 122 Z"
          stroke="#e7cf8b"
          strokeOpacity="0.28"
          strokeWidth="1"
          transform={`rotate(${r + 7.5} 300 300)`}
        />
      ))}
      <circle cx="300" cy="300" r="158" stroke="#c9a24b" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="1 8" />
    </svg>
  );
}

/* ──────────────────────────────── Frame corner flourish ─────────────────────────────── */
export function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 90" className={className} fill="none" aria-hidden>
      <g stroke="#c9a24b" strokeWidth="1.6" strokeLinecap="round">
        <path d="M6 84 V30 C6 16 16 6 30 6 H84" />
        <path d="M16 84 V36 C16 25 25 16 36 16 H84" strokeOpacity="0.55" />
        <path d="M6 30 c8 -2 12 2 10 10 c-8 2 -12 -2 -10 -10 Z" fill="#c9a24b" stroke="none" />
        <path d="M30 6 c-2 8 2 12 10 10 c2 -8 -2 -12 -10 -10 Z" fill="#c9a24b" stroke="none" />
        <circle cx="27" cy="27" r="3" fill="#e7cf8b" stroke="none" />
      </g>
    </svg>
  );
}

/* ──────────────────────────────── Small paisley motif ─────────────────────────────── */
export function Paisley({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" aria-hidden>
      <path
        d="M30 6 C46 14 52 30 46 43 C40 55 24 57 16 48 C9 40 12 28 21 26 C29 24 35 30 33 37 C31 43 24 43 22 38"
        stroke="#c9a24b"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="30" cy="14" r="2.2" fill="#c9a24b" />
      <circle cx="47" cy="30" r="2.2" fill="#c9a24b" />
    </svg>
  );
}

/* ──────────────────────────────── Falling rose petals ─────────────────────────────── */
export function Petals({ count = 14 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 37 + 11) % 100,
        delay: -(i * 1.9),
        duration: 10 + ((i * 7) % 6),
        size: 12 + ((i * 13) % 14),
        drift: ((i * 29) % 40) - 20,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {petals.map((p, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="absolute -top-10 animate-petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            filter: "blur(0.2px)",
          }}
        >
          <path
            d="M12 2 C19 7 21 14 15 20 C10 25 3 21 3 13 C3 6 7 2 12 2 Z"
            fill={i % 3 === 0 ? "#cf6675" : i % 3 === 1 ? "#b0485a" : "#e08a97"}
            fillOpacity="0.85"
            style={{ transform: `translateX(${p.drift * 0.1}px)` }}
          />
          <path d="M12 4 C15 8 15.5 13 12.5 17" stroke="#96233c" strokeOpacity="0.5" strokeWidth="0.8" fill="none" />
        </svg>
      ))}
    </div>
  );
}

/* ──────────────────────────────── Twinkling gold sparkles ─────────────────────────────── */
export function Sparkles({ count = 12 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 53 + 7) % 100,
        top: (i * 31 + 5) % 100,
        delay: (i * 0.7) % 3.6,
        size: 8 + ((i * 5) % 10),
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {stars.map((s, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="absolute animate-twinkle"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
        >
          <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="#e7cf8b" />
        </svg>
      ))}
    </div>
  );
}

/* ──────────────────────────────── AA monogram emblem ─────────────────────────────── */
export function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden>
      <circle cx="60" cy="60" r="56" stroke="#c9a24b" strokeWidth="1.4" />
      <circle cx="60" cy="60" r="49" stroke="#c9a24b" strokeWidth="0.8" strokeOpacity="0.6" strokeDasharray="1 6" />
      {Array.from({ length: 12 }, (_, i) => (
        <circle key={i} cx="60" cy="6.5" r="1.6" fill="#e7cf8b" transform={`rotate(${i * 30} 60 60)`} />
      ))}
    </svg>
  );
}

/* ──────────────────────────────── Divine Ganesha Motif ─────────────────────────────── */
export function Ganesha({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" aria-hidden>
      <path d="M50 8 L58 24 H42 Z" strokeWidth="2" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2" />
      <circle cx="50" cy="6" r="2.5" fill="currentColor" />
      <path d="M42 24 C30 22 22 28 20 38 C18 46 24 50 34 50" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M58 24 C70 22 78 28 80 38 C82 46 76 50 66 50" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M45 28 H55 M46 32 H54 M48 36 H52 M50 26 V38" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="50" cy="41" r="1.5" fill="currentColor" />
      <path d="M46 44 C46 54 44 64 50 72 C56 80 66 78 68 70 C69 64 64 62 60 64" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M40 50 L34 54" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="28" cy="62" r="4.5" fill="currentColor" fillOpacity="0.8" />
    </svg>
  );
}

/* ──────────────────────────────── Sacred Diya (Oil Lamp) ─────────────────────────────── */
export function Diya({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path
        d="M12 40 C14 52 50 52 52 40 C44 42 20 42 12 40 Z"
        fill="#C9A24B"
        stroke="#84652C"
        strokeWidth="1.2"
      />
      <ellipse cx="32" cy="40" rx="20" ry="4" fill="#E7CF8B" stroke="#C9A24B" strokeWidth="1" />
      <path
        d="M32 38 C32 30 27 22 32 12 C37 22 32 30 32 38 Z"
        fill="url(#diyaFlameGrad)"
      />
      <defs>
        <radialGradient id="diyaFlameGrad" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#FFF9D2" />
          <stop offset="50%" stopColor="#FFB300" />
          <stop offset="100%" stopColor="#E53935" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ──────────────────────────────── Sacred Kalash ─────────────────────────────── */
export function Kalash({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <ellipse cx="32" cy="52" rx="10" ry="2.5" fill="#84652C" />
      <path
        d="M20 32 C14 42 18 52 32 52 C46 52 50 42 44 32 Z"
        fill="#C9A24B"
        stroke="#84652C"
        strokeWidth="1.2"
      />
      <ellipse cx="32" cy="32" rx="12" ry="3.5" fill="#E7CF8B" stroke="#C9A24B" strokeWidth="1" />
      <path d="M22 30 C18 20 28 16 32 28 Z" fill="#2E7D32" />
      <path d="M42 30 C46 20 36 16 32 28 Z" fill="#388E3C" />
      <circle cx="32" cy="22" r="7" fill="#6D4C41" stroke="#4E342E" strokeWidth="1" />
      <path d="M30 15 L32 11 L34 15 Z" fill="#2E7D32" />
    </svg>
  );
}

/* ──────────────────────────────── Royal Wedding Bells ─────────────────────────────── */
export function WeddingBells({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path
        d="M24 16 C24 16 28 28 32 32 C20 34 16 34 16 32 C20 28 24 16 24 16 Z"
        fill="#C9A24B"
        stroke="#84652C"
        strokeWidth="1.2"
      />
      <ellipse cx="24" cy="33" rx="8" ry="2.5" fill="#E7CF8B" stroke="#84652C" strokeWidth="1" />
      <circle cx="24" cy="36" r="2" fill="#84652C" />
      <path d="M20 16 C24 12 28 12 32 16" stroke="#96233C" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
