import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Navigation, Phone, MessageCircle, Heart, Copy, Check, Share2 } from "lucide-react";
import { Divider, Monogram, Paisley } from "./Ornaments";
import { GOOGLE_MAPS_URL, PHONE_DISPLAY, PHONE_E164, VENUE_ADDRESS, waShareUrl, waRsvpUrl } from "../constants";
import funImg from "../assets/fun.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const venueAddress = VENUE_ADDRESS;

  const handleCopyAddress = () => {
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(venueAddress).then(done).catch(() => {
        window.prompt("Copy this address:", venueAddress);
      });
    } else {
      window.prompt("Copy this address:", venueAddress);
    }
  };

  const handleShare = () => {
    const shareData = {
      title: "Ashwin ♥ Aarti — Wedding Invitation",
      text: "With joyful hearts, Ashwin & Aarti invite you to their wedding on 09 December 2026 at Bigrahpur, Mau. Click to view the royal card: ",
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      window.open(waShareUrl(shareData.text + shareData.url), "_blank");
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Note from little ones
      gsap.from(".note-reveal", {
        opacity: 0,
        y: 35,
        duration: 0.9,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".note-section",
          start: "top 80%",
        },
      });

      // Venue & RSVP cards
      if (cardsRef.current) {
        gsap.from(".footer-card", {
          opacity: 0,
          y: 40,
          duration: 0.85,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={containerRef} className="relative overflow-hidden bg-[#FAF7F2] pattern-light text-maroon-900">
      {/* ─────────── Note from the little ones (Light & Warm) ─────────── */}
      <section className="note-section relative py-24 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_40%,rgba(240,170,180,0.18),transparent_70%)] pointer-events-none" />

        <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-6 md:grid-cols-[auto_1fr] md:gap-16">
          <div className="note-reveal relative mx-auto">
            <div className="arch-shadow rounded-t-full border-2 border-gold-400 bg-white p-2">
              <img
                src={funImg}
                alt="The little ones of the family"
                loading="lazy"
                decoding="async"
                className="h-72 w-60 rounded-t-full object-cover object-top md:h-80 md:w-64"
              />
            </div>
            <span className="absolute -bottom-4 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-gold-400 bg-white shadow-sm">
              <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
            </span>
          </div>

          <div className="text-center md:text-left">
            <p className="note-reveal font-hindi text-lg font-semibold tracking-wide text-gold-700">
              नन्हे मेहमानों की ओर से
            </p>
            <blockquote className="note-reveal mt-5 font-serif text-3xl font-medium italic leading-snug text-maroon-900 md:text-4xl">
              "Mere <span className="text-gold-grad font-semibold">mama ki shaadi</span> hai, aana zaroori hai…
              <br />
              <span className="text-maroon-700 font-semibold">bahaane-baazi nahi chalegi!</span>"
            </blockquote>
            <p className="note-reveal mt-5 font-sans text-[11px] font-semibold uppercase tracking-[0.35em] text-maroon-800/70">
              — the nieces & nephews, strictly no excuses
            </p>
          </div>
        </div>
      </section>

      {/* ─────────── Venue + RSVP (Straight, Crisp, Light) ─────────── */}
      <section className="relative border-t border-gold-400/40 bg-[#F5EFEB] py-20 md:py-24">
        <div
          ref={cardsRef}
          className="relative mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-2 md:gap-8"
        >
          {/* Venue Card */}
          <div className="footer-card group relative bg-white border border-gold-400/70 p-9 text-center shadow-[0_8px_30px_-8px_rgba(75,13,27,0.08)] transition-all duration-500 hover:border-gold-500 hover:shadow-md md:p-10">
            {/* Straight Corner Marks */}
            <span className="absolute left-2.5 top-2.5 h-3.5 w-3.5 border-l-2 border-t-2 border-gold-500" />
            <span className="absolute right-2.5 top-2.5 h-3.5 w-3.5 border-r-2 border-t-2 border-gold-500" />
            <span className="absolute bottom-2.5 left-2.5 h-3.5 w-3.5 border-b-2 border-l-2 border-gold-500" />
            <span className="absolute bottom-2.5 right-2.5 h-3.5 w-3.5 border-b-2 border-r-2 border-gold-500" />

            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/60 bg-gold-50 transition-transform duration-500 group-hover:scale-110">
              <MapPin className="h-6 w-6 text-maroon-800" />
            </span>
            <p className="mt-5 font-hindi text-base font-semibold text-gold-700">स्थान</p>
            <h3 className="mt-1 font-serif text-3xl font-semibold text-maroon-900 md:text-4xl">
              The Venue
            </h3>
            <div className="mx-auto mt-4 h-px w-16 bg-gold-400" />
            <p className="mt-5 font-serif text-xl leading-relaxed text-maroon-900/90 font-medium">
              {venueAddress}
            </p>
            <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.25em] text-maroon-700/70">
              Wedding & all ceremonies at the family residence
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-gold-400 bg-gold-500 px-6 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-maroon-950 transition-all duration-500 hover:bg-gold-600 hover:shadow-md"
              >
                <Navigation className="h-3.5 w-3.5" />
                Directions
              </a>

              <button
                type="button"
                onClick={handleCopyAddress}
                className="inline-flex items-center gap-2 border border-gold-400/80 bg-white px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-maroon-900 transition-all duration-300 hover:bg-gold-50"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-gold-700" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RSVP Card */}
          <div className="footer-card group relative bg-white border border-gold-400/70 p-9 text-center shadow-[0_8px_30px_-8px_rgba(75,13,27,0.08)] transition-all duration-500 hover:border-gold-500 hover:shadow-md md:p-10">
            {/* Straight Corner Marks */}
            <span className="absolute left-2.5 top-2.5 h-3.5 w-3.5 border-l-2 border-t-2 border-gold-500" />
            <span className="absolute right-2.5 top-2.5 h-3.5 w-3.5 border-r-2 border-t-2 border-gold-500" />
            <span className="absolute bottom-2.5 left-2.5 h-3.5 w-3.5 border-b-2 border-l-2 border-gold-500" />
            <span className="absolute bottom-2.5 right-2.5 h-3.5 w-3.5 border-b-2 border-r-2 border-gold-500" />

            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/60 bg-gold-50 transition-transform duration-500 group-hover:scale-110">
              <Phone className="h-6 w-6 text-maroon-800" />
            </span>
            <p className="mt-5 font-hindi text-base font-semibold text-gold-700">उपस्थिति</p>
            <h3 className="mt-1 font-serif text-3xl font-semibold text-maroon-900 md:text-4xl">
              Kindly RSVP
            </h3>
            <div className="mx-auto mt-4 h-px w-16 bg-gold-400" />
            <p className="mt-5 font-serif text-xl leading-relaxed text-maroon-900/90 font-medium">
              Invitation with love by
              <br />
              <span className="text-maroon-950 font-bold">Ashwin Maurya</span>
            </p>
            <p className="mt-1 font-sans text-sm font-semibold tracking-[0.15em] text-maroon-800">
              {PHONE_DISPLAY}
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`tel:${PHONE_E164}`}
                className="inline-flex items-center gap-2 border border-maroon-800 bg-white px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-maroon-900 transition-all duration-300 hover:bg-gold-50"
              >
                <Phone className="h-3.5 w-3.5 text-maroon-800" />
                Call
              </a>

              <a
                href={waRsvpUrl("Congratulations Ashwin & Aarti! We'll definitely be there ✨")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-emerald-600 bg-emerald-600 px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-emerald-700 shadow-sm"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp
              </a>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 border border-gold-400/80 bg-gold-50 px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-maroon-900 transition-all duration-300 hover:bg-gold-500 hover:text-white"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>{shared ? "Shared!" : "Share Card"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── Bottom Bar (Light & Royal) ─────────── */}
      <div className="relative border-t border-gold-400/30 bg-[#FAF6EF] pt-12 pb-24 sm:pb-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
          <div className="relative">
            <Monogram className="h-24 w-24 animate-spin-slow opacity-90 text-gold-600" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-script pt-1.5 text-3xl text-gold-grad">A&A</span>
            </div>
          </div>
          <Divider tone="maroon" className="h-8 w-64" />
          <p className="font-serif text-2xl italic text-maroon-900">
            #Ashwin<span className="text-gold-700 font-semibold">Weds</span>Aarti
          </p>
          <div className="flex items-center gap-3">
            <Paisley className="h-8 w-8 text-gold-600 opacity-80" />
            <p className="font-hindi text-base font-semibold text-maroon-800">
              ॥ वर-वधू को शुभ आशीर्वाद दें ॥
            </p>
            <Paisley className="h-8 w-8 -scale-x-100 text-gold-600 opacity-80" />
          </div>
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.35em] text-maroon-700/60">
            Crafted with love · December 2026 · Mau, Uttar Pradesh
          </p>
        </div>
      </div>
    </footer>
  );
}
