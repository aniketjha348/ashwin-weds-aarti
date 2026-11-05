import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Divider, Ganesha, Monogram } from "./Ornaments";

gsap.registerPlugin(ScrollTrigger);

/* ─────────── 1. Auspicious Mangalacharan (Ganesh Shloka) ─────────── */
export function Mangalacharan() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ganesh-reveal", {
        opacity: 0,
        y: 25,
        duration: 0.85,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-12 px-6 bg-[#FAF7F2] text-center border-b border-gold-400/30">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <div className="ganesh-reveal h-16 w-16 rounded-full border-2 border-gold-400 bg-white p-3 shadow-sm flex items-center justify-center mb-2">
          <Ganesha className="h-12 w-12 text-maroon-800" />
        </div>

        <p className="ganesh-reveal font-hindi text-base md:text-lg font-bold text-gold-700">
          ॥ श्री गणेशाय नमः ॥
        </p>

        <Divider tone="maroon" className="ganesh-reveal h-6 w-44 my-2" />

        <p className="ganesh-reveal font-hindi text-lg md:text-xl font-medium text-maroon-900 leading-relaxed bg-white/60 border border-gold-400/40 py-3 px-6 rounded-lg shadow-sm">
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
          <br />
          निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
        </p>
      </div>
    </section>
  );
}

/* ─────────── 2. Swagatakankshi & Darshanabhilashi ─────────── */
export function Swagatakankshi() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".swagat-reveal", {
        opacity: 0,
        y: 30,
        duration: 0.85,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-20 px-6 bg-[#FAF6EF] pattern-light border-t border-gold-400/40 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="swagat-reveal h-16 w-16 rounded-full border border-gold-400 bg-white flex items-center justify-center shadow-sm mb-3">
          <Monogram className="h-12 w-12 text-gold-600 animate-spin-slow" />
        </div>

        <p className="swagat-reveal font-hindi text-base font-bold text-gold-700">
          ॥ स्नेह निमंत्रण ॥
        </p>

        <h2 className="swagat-reveal font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-maroon-900 mt-1">
          स्वागताकांक्षी व दर्शनाभिलाषी
        </h2>

        <div className="swagat-reveal">
          <Divider tone="maroon" className="h-8 w-64 mx-auto my-3" />
        </div>

        <div className="swagat-reveal grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mt-6 max-w-2xl">
          <div className="bg-white border border-gold-400/70 p-6 shadow-sm">
            <span className="inline-block font-hindi text-base font-bold text-maroon-900 border-b border-gold-400 pb-1">
              स्वागताकांक्षी
            </span>
            <p className="font-serif text-xl font-semibold text-maroon-800 mt-3">
              समस्त मौर्य परिवार
            </p>
            <p className="font-sans text-xs uppercase tracking-wider text-maroon-600 mt-1">
              The Entire Maurya Family &amp; Relatives
            </p>
          </div>

          <div className="bg-white border border-gold-400/70 p-6 shadow-sm">
            <span className="inline-block font-hindi text-base font-bold text-maroon-900 border-b border-gold-400 pb-1">
              दर्शनाभिलाषी
            </span>
            <p className="font-serif text-xl font-semibold text-maroon-800 mt-3">
              समस्त स्नेहीजन एवं मित्रगण
            </p>
            <p className="font-sans text-xs uppercase tracking-wider text-maroon-600 mt-1">
              All Well-Wishers &amp; Dear Friends
            </p>
          </div>
        </div>

        <p className="swagat-reveal font-hindi text-sm sm:text-base font-semibold text-maroon-800 mt-6 sm:mt-8 bg-white/80 border border-gold-400/60 py-3 px-4 sm:px-8 rounded-full shadow-sm max-w-xl">
          ॥ आपकी गरिमामयी उपस्थिति हमारे लिए सौभाग्य एवं मंगलकारी होगी ॥
        </p>
      </div>
    </section>
  );
}
