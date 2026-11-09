import { useState, useEffect } from "react";
import { X, Send, Heart, Sparkles, MessageCircle } from "lucide-react";
import { CornerFlourish, Divider, Diya, Petals } from "./Ornaments";
import { useModalBehavior } from "../hooks/useModalBehavior";

interface Blessing {
  id: string;
  name: string;
  message: string;
  badge: string;
  date: string;
}

const DEFAULT_BLESSINGS: Blessing[] = [
  {
    id: "1",
    name: "चाचाजी व समस्त परिवार",
    badge: "🌸 सदा सुहागन रहो",
    message: "अश्विन और आरती को वैवाहिक जीवन की अनंत शुभकामनाएँ! प्रभु श्री राम का आशीर्वाद सदा आप पर रहे।",
    date: "04 Nov 2026",
  },
  {
    id: "2",
    name: "राजेश वर्मा व मित्रगण",
    badge: "👑 Made for Each Other",
    message: "Heartiest congratulations Ashwin bhai & Aarti bhabhi! Looking forward to the grand celebrations!",
    date: "04 Nov 2026",
  },
  {
    id: "3",
    name: "मौसी जी (लखनऊ)",
    badge: "💖 अखंड सौभाग्यवती भव:",
    message: "दोनों बच्चों की जोड़ी सदा सलामत रहे, हँसते-खेलते संसार आगे बढ़े। खूब-खूब प्यार!",
    date: "04 Nov 2026",
  },
];

const PRESET_BADGES = [
  "🌸 सदा सुहागन रहो",
  "💖 अखंड सौभाग्य",
  "👑 Made for Each Other",
  "💫 रब ने बना दी जोड़ी",
  "💐 बहुत-बहुत बधाई",
];

interface BlessingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestName?: string;
}

export default function BlessingsModal({ isOpen, onClose, guestName = "" }: BlessingsModalProps) {
  const [blessings, setBlessings] = useState<Blessing[]>(() => {
    try {
      const saved = localStorage.getItem("ashwin_aarti_blessings");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_BLESSINGS;
  });

  const [authorName, setAuthorName] = useState(guestName);
  const [selectedBadge, setSelectedBadge] = useState(PRESET_BADGES[0]);
  const [customMessage, setCustomMessage] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const panelRef = useModalBehavior(isOpen, onClose);

  useEffect(() => {
    if (guestName && !authorName) {
      setAuthorName(guestName);
    }
  }, [guestName, authorName]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = authorName.trim() || "स्नेहीजन";
    const msg = customMessage.trim() || selectedBadge;

    const newBlessing: Blessing = {
      id: Date.now().toString(),
      name,
      badge: selectedBadge,
      message: msg,
      date: "Just now",
    };

    const updated = [newBlessing, ...blessings];
    setBlessings(updated);
    try {
      localStorage.setItem("ashwin_aarti_blessings", JSON.stringify(updated));
    } catch {
      // ignore
    }

    setShowCelebration(true);
    setSentSuccess(true);
    setTimeout(() => {
      setShowCelebration(false);
      setSentSuccess(false);
      setCustomMessage("");
    }, 3000);
  };

  const handleSendWhatsAppWish = () => {
    const name = authorName.trim() || "स्नेहीजन";
    const msg = customMessage.trim() || selectedBadge;
    const text = `सादर प्रणाम अश्विन भैया! 🙏\n\n*${name}* की ओर से आप दोनों को वैवाहिक जीवन की अनंत शुभकामनाएँ व मंगल आशीष:\n\n"${msg}" 🌸✨\n(09 Dec 2026, मऊ)`;
    const waUrl = `https://wa.me/919958300518?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-6 overflow-y-auto animate-overlay-in"
    >
      {showCelebration && (
        <div className="pointer-events-none fixed inset-0 z-[130]">
          <Petals count={26} />
        </div>
      )}

      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Bless the couple"
        className="relative w-full max-w-2xl bg-[#FFFDF9] text-maroon-900 rounded-3xl border-2 border-gold-400 p-5 sm:p-9 shadow-[0_25px_80px_rgba(31,4,10,0.6)] my-auto select-text overflow-hidden max-h-[90dvh] flex flex-col animate-fade-in"
      >
        <CornerFlourish className="absolute -left-1 -top-1 h-12 w-12 text-gold-600 pointer-events-none" />
        <CornerFlourish className="absolute -right-1 -top-1 h-12 w-12 rotate-90 text-gold-600 pointer-events-none" />
        <CornerFlourish className="absolute -bottom-1 -right-1 h-12 w-12 rotate-180 text-gold-600 pointer-events-none" />
        <CornerFlourish className="absolute -bottom-1 -left-1 h-12 w-12 -rotate-90 text-gold-600 pointer-events-none" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close blessings"
          className="absolute top-4 right-4 h-9 w-9 rounded-full border border-gold-400/80 bg-white flex items-center justify-center text-maroon-800 hover:bg-gold-100 transition-colors shadow-sm cursor-pointer z-10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-4 shrink-0">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold-400 bg-gold-50 shadow-sm">
            <Diya className="h-7 w-7 text-gold-700 animate-flicker" />
          </div>
          <p className="font-hindi text-sm font-bold text-gold-700">॥ मंगल आशीर्वाद ॥</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-900 mt-0.5">
            Bless the Couple
          </h2>
          <p className="font-hindi text-xs sm:text-sm text-maroon-700 mt-1">
            अश्विन और आरती के सुखद दांपत्य जीवन हेतु अपना स्नेह व आशीष प्रदान करें
          </p>
          <Divider tone="maroon" className="h-4 w-44 mx-auto my-1.5" />
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1 space-y-4 px-1 pr-2">
          {/* Write a Blessing Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white border-2 border-gold-400/80 p-4 rounded-2xl shadow-sm"
          >
            <p className="font-hindi text-xs sm:text-sm font-bold text-maroon-900 mb-2">
              अपना आशीर्वाद / शुभकामना संदेश लिखें:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-2.5">
              <label className="sr-only" htmlFor="blessing-name">Your name</label>
              <input
                id="blessing-name"
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="आपका नाम (उदा. चाचाजी / रमेश शर्मा)"
                className="w-full rounded-xl border border-gold-300 bg-gold-50/50 px-3.5 py-2 font-serif text-sm font-semibold text-maroon-950 focus:outline-none focus:ring-1 focus:ring-gold-500"
              />

              <label className="sr-only" htmlFor="blessing-badge">Choose a blessing badge</label>
              <select
                id="blessing-badge"
                value={selectedBadge}
                onChange={(e) => setSelectedBadge(e.target.value)}
                className="w-full rounded-xl border border-gold-300 bg-gold-50/50 px-3.5 py-2 font-hindi text-xs font-bold text-maroon-900 focus:outline-none focus:ring-1 focus:ring-gold-500"
              >
                {PRESET_BADGES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <label className="sr-only" htmlFor="blessing-message">Your blessing message</label>
            <textarea
              id="blessing-message"
              rows={2}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="मंगलकामना संदेश लिखें (उदा. दोनों बच्चों को बहुत-बहुत बधाई व प्यार...)"
              className="w-full rounded-xl border border-gold-300 bg-white px-3.5 py-2 font-serif text-sm text-maroon-950 focus:outline-none focus:ring-1 focus:ring-gold-500"
            />

            <div className="mt-2.5 flex items-center justify-between gap-2 flex-wrap">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl border border-gold-500 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 px-5 py-2 text-xs font-bold uppercase tracking-wider text-maroon-950 shadow-md hover:brightness-110 cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
                <span>{sentSuccess ? "आशीर्वाद दर्ज हुआ! 🌸" : "आशीर्वाद दें (Post Blessing)"}</span>
              </button>

              <button
                type="button"
                onClick={handleSendWhatsAppWish}
                className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-600 bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>WhatsApp पर भेजें</span>
              </button>
            </div>
          </form>

          {/* Live Blessings Wall */}
          <div className="space-y-2.5">
            <p className="font-hindi text-xs font-bold uppercase tracking-wider text-gold-700 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-gold-600" />
              <span>स्नेहीजनों के मंगल संदेश ({blessings.length})</span>
            </p>

            {blessings.map((b) => (
              <div
                key={b.id}
                className="bg-white/90 border border-gold-300/80 p-3.5 rounded-2xl shadow-sm text-left hover:border-gold-500 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500 shrink-0" />
                    <h4 className="font-serif text-base font-bold text-maroon-900 leading-tight">
                      {b.name}
                    </h4>
                  </div>
                  <span className="text-[10px] font-hindi font-bold bg-gold-100 text-gold-800 px-2 py-0.5 rounded-full border border-gold-300">
                    {b.badge}
                  </span>
                </div>
                <p className="font-serif text-sm italic text-maroon-800/90 mt-1 pl-5">
                  "{b.message}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}