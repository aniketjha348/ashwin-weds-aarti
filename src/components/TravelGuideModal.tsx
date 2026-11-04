import { X, Train, Plane, Car, Phone, Navigation } from "lucide-react";
import { CornerFlourish, Divider, Diya } from "./Ornaments";

interface TravelGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TravelGuideModal({ isOpen, onClose }: TravelGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-6 overflow-y-auto animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#FFFDF9] text-maroon-900 rounded-2xl sm:rounded-3xl border-2 border-gold-400 p-4 sm:p-9 shadow-[0_25px_80px_rgba(31,4,10,0.6)] my-auto select-text overflow-hidden max-h-[92dvh] overflow-y-auto"
      >
        <CornerFlourish className="absolute -left-1 -top-1 h-12 w-12 text-gold-600 pointer-events-none" />
        <CornerFlourish className="absolute -right-1 -top-1 h-12 w-12 rotate-90 text-gold-600 pointer-events-none" />
        <CornerFlourish className="absolute -bottom-1 -right-1 h-12 w-12 rotate-180 text-gold-600 pointer-events-none" />
        <CornerFlourish className="absolute -bottom-1 -left-1 h-12 w-12 -rotate-90 text-gold-600 pointer-events-none" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close travel guide"
          className="absolute top-4 right-4 h-9 w-9 rounded-full border border-gold-400/80 bg-white flex items-center justify-center text-maroon-800 hover:bg-gold-100 transition-colors shadow-sm cursor-pointer z-10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-5">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold-400 bg-gold-50 shadow-sm">
            <Diya className="h-7 w-7 text-gold-700 animate-flicker" />
          </div>
          <p className="font-hindi text-sm font-bold text-gold-700">॥ यात्रा सुगम हो ॥</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-900 mt-0.5">
            Travel &amp; Route Guide
          </h2>
          <p className="font-hindi text-xs sm:text-sm text-maroon-700 mt-1">
            ग्राम बिगहपुर, पोस्ट दुबारी, मऊ (उत्तर प्रदेश) पहुँचने का सुगम मार्ग
          </p>
          <Divider tone="maroon" className="h-4 w-44 mx-auto my-2" />
        </div>

        <div className="space-y-3.5 max-w-xl mx-auto">
          {/* Train Route */}
          <div className="bg-white border border-gold-400/80 p-4 rounded-2xl shadow-sm flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-gold-100 border border-gold-400 flex items-center justify-center shrink-0 text-maroon-900 mt-0.5">
              <Train className="h-5 w-5 text-gold-700" />
            </div>
            <div className="text-left flex-1">
              <h3 className="font-serif text-lg font-bold text-maroon-900">
                निकटतम रेलवे स्टेशन (By Train)
              </h3>
              <p className="font-sans text-xs sm:text-sm text-maroon-800/90 mt-1">
                • <strong className="text-maroon-950 font-bold">बेल्थरा रोड स्टेशन (BLTR)</strong>: मात्र ~18 किमी (सबसे नज़दीकी स्टेशन, लोकल ऑटो/टैक्सी उपलब्ध)।
              </p>
              <p className="font-sans text-xs sm:text-sm text-maroon-800/90 mt-0.5">
                • <strong className="text-maroon-950 font-bold">मऊ जंक्शन (MAU)</strong>: ~35 किमी (दिल्ली, मुंबई, कोलकाता से प्रमुख ट्रेनों का स्टॉप)।
              </p>
            </div>
          </div>

          {/* Air Route */}
          <div className="bg-white border border-gold-400/80 p-4 rounded-2xl shadow-sm flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-gold-100 border border-gold-400 flex items-center justify-center shrink-0 text-maroon-900 mt-0.5">
              <Plane className="h-5 w-5 text-gold-700" />
            </div>
            <div className="text-left flex-1">
              <h3 className="font-serif text-lg font-bold text-maroon-900">
                निकटतम हवाई अड्डे (By Air)
              </h3>
              <p className="font-sans text-xs sm:text-sm text-maroon-800/90 mt-1">
                • <strong className="text-maroon-950 font-bold">वाराणसी एयरपोर्ट (VNS)</strong>: ~120 किमी (लाल बहादुर शास्त्री अंतर्राष्ट्रीय हवाई अड्डा)।
              </p>
              <p className="font-sans text-xs sm:text-sm text-maroon-800/90 mt-0.5">
                • <strong className="text-maroon-950 font-bold">गोरखपुर एयरपोर्ट (GOP)</strong>: ~105 किमी।
              </p>
            </div>
          </div>

          {/* Road / Car Route */}
          <div className="bg-white border border-gold-400/80 p-4 rounded-2xl shadow-sm flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-gold-100 border border-gold-400 flex items-center justify-center shrink-0 text-maroon-900 mt-0.5">
              <Car className="h-5 w-5 text-gold-700" />
            </div>
            <div className="text-left flex-1">
              <h3 className="font-serif text-lg font-bold text-maroon-900">
                सड़क मार्ग (By Road / GPS)
              </h3>
              <p className="font-sans text-xs sm:text-sm text-maroon-800/90 mt-1">
                मऊ-मधुबन-दुबारी मुख्य मार्ग से होते हुए ग्राम बिगहपुर आसानी से पहुँचा जा सकता है।
              </p>
            </div>
          </div>
        </div>

        {/* Live Navigation & Contact */}
        <div className="mt-6 pt-4 border-t border-gold-300 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Bigrahpur,+Dubari,+Mau,+Uttar+Pradesh"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-gold-400 bg-gold-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-maroon-950 hover:bg-gold-600 transition-colors shadow-md"
          >
            <Navigation className="h-4 w-4" />
            <span>Google Maps Route</span>
          </a>

          <a
            href="tel:+919958300518"
            className="inline-flex items-center gap-2 rounded-xl border border-maroon-800 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-maroon-900 hover:bg-gold-50 transition-colors shadow-sm"
          >
            <Phone className="h-4 w-4 text-maroon-800" />
            <span>Call for Guidance (+91 99583 00518)</span>
          </a>
        </div>
      </div>
    </div>
  );
}