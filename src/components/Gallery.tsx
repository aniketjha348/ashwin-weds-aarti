import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera, Sparkles } from "lucide-react";
import { Divider, CornerFlourish } from "./Ornaments";

import img1773 from "../assets/dsc_1773.jpg";
import img1776 from "../assets/dsc_1776.jpg";
import img1777 from "../assets/dsc_1777.jpg";
import img3488 from "../assets/dsc_3488.jpg";
import img3501 from "../assets/dsc_3501.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-head", {
        opacity: 0,
        y: 30,
        duration: 0.85,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".gallery-item", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 85%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative overflow-hidden bg-[#FAF6EF] pattern-light py-24 md:py-32 border-t border-gold-400/40"
    >
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section Heading */}
        <div className="text-center">
          <span className="gallery-head mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold-400 bg-white text-maroon-800 shadow-sm mb-3">
            <Camera className="h-6 w-6 text-gold-700" />
          </span>
          <p className="gallery-head font-hindi text-lg font-bold text-gold-700">
            मधुर स्मृतियाँ
          </p>
          <h2 className="gallery-head mt-1 font-serif text-4xl sm:text-5xl font-semibold text-maroon-900">
            Glimpses of <span className="text-gold-grad shimmer italic font-serif">Togetherness</span>
          </h2>
          <div className="gallery-head">
            <Divider tone="maroon" className="mx-auto mt-4 h-8 w-64 md:w-80" />
          </div>
          <p className="gallery-head mx-auto mt-4 max-w-xl font-serif text-lg italic text-maroon-800/80">
            "Capturing moments of today that will wow our hearts tomorrow"
          </p>
        </div>

        {/* Gallery Grid Featuring All Real Photos */}
        <div className="gallery-grid mt-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Main Panorama: DSC_3501 (Widescreen 16:9) */}
          <div className="gallery-item md:col-span-12 group relative border-2 border-gold-400 bg-white p-3 shadow-lg">
            <div className="relative overflow-hidden h-72 sm:h-96 md:h-[28rem]">
              <img
                src={img3501}
                alt="Ashwin and Aarti Golden Hour"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <p className="font-hindi text-gold-300 text-sm font-semibold flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-gold-400" />
                    <span>गोधूलि बेला</span>
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ivory-50">
                    The Golden Hour Promise
                  </h3>
                </div>
                <span className="font-script text-2xl sm:text-3xl text-gold-300">
                  Ashwin &amp; Aarti
                </span>
              </div>
            </div>
            <CornerFlourish className="absolute -left-2 -top-2 h-10 w-10 text-gold-600" />
            <CornerFlourish className="absolute -right-2 -top-2 h-10 w-10 rotate-90 text-gold-600" />
            <CornerFlourish className="absolute -bottom-2 -right-2 h-10 w-10 rotate-180 text-gold-600" />
            <CornerFlourish className="absolute -bottom-2 -left-2 h-10 w-10 -rotate-90 text-gold-600" />
          </div>

          {/* Left Portrait: DSC_3488 (Vertical 2:3) */}
          <div className="gallery-item md:col-span-5 group relative border-2 border-gold-400 bg-white p-2.5 shadow-md">
            <div className="relative overflow-hidden h-80 sm:h-96 md:h-full">
              <img
                src={img3488}
                alt="Ashwin and Aarti Royal Portrait"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/50 via-transparent to-transparent opacity-70" />
              <p className="absolute bottom-3 left-4 font-serif text-lg font-medium text-ivory-50">
                Royal Portrait
              </p>
            </div>
          </div>

          {/* Right Column with DSC_1773, DSC_1776, DSC_1777 */}
          <div className="gallery-item md:col-span-7 flex flex-col gap-6">
            {/* Top: DSC_1773 */}
            <div className="group relative border-2 border-gold-400 bg-white p-2.5 shadow-md">
              <div className="relative overflow-hidden h-52 sm:h-64">
                <img
                  src={img1773}
                  alt="Ashwin and Aarti Moments"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/50 via-transparent to-transparent opacity-70" />
                <p className="absolute bottom-3 left-4 font-serif text-lg font-medium text-ivory-50">
                  Cherished Promises
                </p>
              </div>
            </div>

            {/* Bottom 2 Split: DSC_1776 and DSC_1777 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="group relative border-2 border-gold-400 bg-white p-2 shadow-sm">
                <div className="relative overflow-hidden h-44 sm:h-52">
                  <img
                    src={img1776}
                    alt="Ashwin and Aarti Candid"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/50 via-transparent to-transparent opacity-70" />
                  <p className="absolute bottom-2 left-3 font-serif text-sm font-medium text-ivory-50">
                    Together Forever
                  </p>
                </div>
              </div>

              <div className="group relative border-2 border-gold-400 bg-white p-2 shadow-sm">
                <div className="relative overflow-hidden h-44 sm:h-52">
                  <img
                    src={img1777}
                    alt="Ashwin and Aarti Celebration"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/50 via-transparent to-transparent opacity-70" />
                  <p className="absolute bottom-2 left-3 font-serif text-sm font-medium text-ivory-50">
                    Pure Joy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
