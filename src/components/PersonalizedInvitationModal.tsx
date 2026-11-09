import { useState, useEffect } from "react";
import {
  X,
  Share2,
  Copy,
  Check,
  Edit3,
  Sparkles,
  Heart,
  MapPin,
  Calendar,
  Users,
  Download,
  Clock,
} from "lucide-react";
import { Ganesha, Diya, CornerFlourish, Divider, Petals, Monogram } from "./Ornaments";
import { useCountdown } from "../hooks/useCountdown";
import { GOOGLE_MAPS_URL, WEDDING_CALENDAR_URL, waRsvpUrl } from "../constants";
import { generateWeddingCardImage } from "../utils/downloadCard";
import { useModalBehavior } from "../hooks/useModalBehavior";
import coupleImg from "../assets/dsc_3488.jpg";

interface PersonalizedInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialName?: string;
}

export default function PersonalizedInvitationModal({
  isOpen,
  onClose,
  initialName = "",
}: PersonalizedInvitationModalProps) {
  const [guestName, setGuestName] = useState(initialName);
  const [inputName, setInputName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(!initialName);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showCelebrationPetals, setShowCelebrationPetals] = useState(false);
  const [rsvpDone, setRsvpDone] = useState<null | "yes" | "no">(null);

  const countdown = useCountdown();
  const panelRef = useModalBehavior(isOpen, onClose);

  const normalizeName = (v: string) => v.replace(/\s+/g, " ").trim().slice(0, 60);

  const passNo = (() => {
    const n = normalizeName(guestName || inputName || "Guest");
    let h = 0;
    for (let i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) >>> 0;
    return `№ AA-${1000 + (h % 9000)}`;
  })();

  // Read URL query parameter "?guest=Name" if present
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const queryGuest = urlParams.get("guest");
      if (queryGuest && !initialName) {
        setGuestName(queryGuest);
        setInputName(queryGuest);
        setIsEditing(false);
      }
    } catch {
      // ignore
    }
  }, [initialName]);

  // Trigger celebration petals on card reveal
  useEffect(() => {
    if (!isEditing && guestName) {
      setShowCelebrationPetals(true);
      const t = setTimeout(() => setShowCelebrationPetals(false), 4500);
      return () => clearTimeout(t);
    }
  }, [isEditing, guestName]);

  if (!isOpen) return null;

  const handleSaveName = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = normalizeName(inputName);
    if (trimmed) {
      setGuestName(trimmed);
      setInputName(trimmed);
      setIsEditing(false);
    }
  };

  const appendSuffix = (suffix: string) => {
    if (!inputName.includes(suffix)) {
      setInputName((prev) => (prev ? `${prev.trim()} ${suffix}` : suffix));
    }
  };

  const handleCopyLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("guest", guestName || inputName);
    const text = url.toString();
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => {
        window.prompt("Copy this link:", text);
      });
    } else {
      window.prompt("Copy this link:", text);
    }
  };

  const handleShareWhatsApp = () => {
    const name = guestName || inputName || "अतिथि";
    const base = `${window.location.origin}${window.location.pathname}`;
    const text = `सादर प्रणाम 🙏\n\nAshwin weds Aarti के शुभ विवाह (09 Dec 2026, मऊ) का डिजिटल निमंत्रण पत्र आदरणीय ${name} सपरिवार के लिए:\n${base}?guest=${encodeURIComponent(name)}`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleConfirmAttendance = (attending: boolean) => {
    const name = guestName || inputName || "अतिथि";
    const message = attending
      ? `सादर प्रणाम अश्विन भैया! 🙏 मैं *${name}* सपरिवार आपके और आरती जी के शुभ विवाह (09 दिसम्बर 2026, गाँव बिगहपुर, मऊ) में अवश्य पधारूँगा। आप दोनों को बहुत-बहुत बधाई व मंगलकामनाएँ! 🌸✨`
      : `सादर प्रणाम अश्विन भैया! 🙏 मैं *${name}* आप दोनों को शुभ विवाह की हार्दिक बधाई व अनंत शुभकामनाएँ प्रेषित करता हूँ। ईश्वर आपकी जोड़ी सदा बनाए रखे! 💐`;
    window.open(waRsvpUrl(message), "_blank");
    setRsvpDone(attending ? "yes" : "no");
    setTimeout(() => setRsvpDone(null), 6000);
  };

  const handleDownloadCard = async () => {
    setIsDownloading(true);
    try {
      const dataUrl = await generateWeddingCardImage(guestName || inputName || "अतिथि");
      if (dataUrl) {
        const link = document.createElement("a");
        const safeName = (guestName || inputName || "Guest").replace(/[^a-zA-Z0-9_\u0900-\u097F]/g, "_");
        link.download = `Ashwin_Aarti_Nimantran_${safeName}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error("Card download error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 overflow-y-auto animate-overlay-in"
    >
      {/* Celebration Petal Shower on Card Opening */}
      {showCelebrationPetals && (
        <div className="pointer-events-none fixed inset-0 z-[130]">
          <Petals count={24} />
        </div>
      )}

      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Your personalized wedding invitation"
        className="relative w-full max-w-2xl bg-[#FFFDF9] text-maroon-900 rounded-2xl sm:rounded-3xl border-2 border-gold-400 p-4 sm:p-10 shadow-[0_25px_80px_rgba(31,4,10,0.6)] my-auto select-text overflow-hidden max-h-[92dvh] overflow-y-auto animate-fade-in"
      >
        {/* Ornate Corner Flourishes */}
        <CornerFlourish className="absolute -left-1 -top-1 h-12 w-12 text-gold-600 pointer-events-none" />
        <CornerFlourish className="absolute -right-1 -top-1 h-12 w-12 rotate-90 text-gold-600 pointer-events-none" />
        <CornerFlourish className="absolute -bottom-1 -right-1 h-12 w-12 rotate-180 text-gold-600 pointer-events-none" />
        <CornerFlourish className="absolute -bottom-1 -left-1 h-12 w-12 -rotate-90 text-gold-600 pointer-events-none" />

        {/* Close Modal Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close invitation"
          className="absolute top-4 right-4 h-9 w-9 rounded-full border border-gold-400/80 bg-white flex items-center justify-center text-maroon-800 hover:bg-gold-100 transition-colors shadow-sm cursor-pointer z-10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* ────────── STATE A: Ask for Name ────────── */}
        {isEditing ? (
          <div className="text-center py-4 sm:py-6">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold-400 bg-gold-50 shadow-md">
              <Ganesha className="h-10 w-10 text-maroon-900" />
            </div>

            <p className="font-hindi text-base sm:text-lg font-bold text-gold-700">
              ॥ श्री गणेशाय नमः ॥
            </p>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-950 mt-1">
              Your Personalized Invitation
            </h3>
            <p className="font-hindi text-sm sm:text-base text-maroon-800/80 mt-1 max-w-md mx-auto">
              कृपया अपना शुभ नाम दर्ज करें ताकि आपके नाम से अलंकृत राजसी निमंत्रण पत्र तैयार किया जा सके:
            </p>

            <form onSubmit={handleSaveName} className="mt-6 max-w-md mx-auto text-left">
              <label htmlFor="guest-name" className="block text-center text-[11px] font-bold uppercase tracking-[0.2em] text-maroon-700">
                आपका शुभ नाम · Your Full Name
              </label>
              <div className="relative mt-2">
                <input
                  id="guest-name"
                  type="text"
                  autoFocus
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="उदा. श्री राजेश कुमार शर्मा / Ramesh Gupta"
                  maxLength={60}
                  autoComplete="name"
                  dir="auto"
                  className="w-full rounded-2xl border-2 border-gold-400 bg-white px-5 py-4 text-center font-serif text-lg sm:text-xl font-bold text-maroon-950 placeholder:text-maroon-400/50 shadow-inner focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-600 transition-all"
                />
              </div>
              <p className="mt-1.5 text-center text-[11px] font-medium text-maroon-600/80">
                {inputName.length}/60 · नाम कार्ड पर ठीक वैसे ही छपेगा जैसा आप लिखेंगे
              </p>

              {/* Quick Suffix Chips */}
              <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
                <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-maroon-600">
                  Quick tags:
                </span>
                <button
                  type="button"
                  onClick={() => appendSuffix("सपरिवार")}
                  className="rounded-full border border-gold-400/80 bg-gold-50 px-3 py-1 text-xs font-semibold text-maroon-900 hover:bg-gold-200 transition-colors cursor-pointer"
                >
                  + सपरिवार
                </button>
                <button
                  type="button"
                  onClick={() => appendSuffix("जी")}
                  className="rounded-full border border-gold-400/80 bg-gold-50 px-3 py-1 text-xs font-semibold text-maroon-900 hover:bg-gold-200 transition-colors cursor-pointer"
                >
                  + जी
                </button>
                <button
                  type="button"
                  onClick={() => appendSuffix("एवं मित्रगण")}
                  className="rounded-full border border-gold-400/80 bg-gold-50 px-3 py-1 text-xs font-semibold text-maroon-900 hover:bg-gold-200 transition-colors cursor-pointer"
                >
                  + मित्रगण
                </button>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="submit"
                  disabled={!inputName.trim()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gold-500 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-maroon-950 shadow-md hover:brightness-110 disabled:opacity-50 transition-all cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>निमंत्रण पत्र खोलें (Open Invitation)</span>
                </button>

                {guestName && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="w-full sm:w-auto px-5 py-3 text-xs uppercase tracking-wider font-semibold text-maroon-700 hover:text-maroon-950 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          /* ────────── STATE B: The Royal Personalized Card (professional) ────────── */
          <div className="text-center py-1 relative">
            {/* Inner hairline frame */}
            <div className="pointer-events-none absolute inset-1 rounded-[1.35rem] border border-gold-300/70" aria-hidden />

            {/* Top Ganesha Blessing */}
            <div className="relative flex items-center justify-center gap-4 mb-1">
              <Diya className="h-8 w-8 animate-flicker hidden sm:block" />
              <div className="relative">
                <div className="h-14 w-14 rounded-full border-2 border-gold-400 bg-white shadow-md flex items-center justify-center p-2">
                  <Ganesha className="h-10 w-10 text-maroon-900" />
                </div>
                <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 rounded-full border border-gold-400 bg-[#FFFDF9] px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider text-gold-800">
                  {passNo}
                </span>
              </div>
              <Diya className="h-8 w-8 animate-flicker hidden sm:block" />
            </div>

            <p className="relative font-hindi text-sm sm:text-base font-bold text-gold-700 mt-3">
              ॥ श्री गणेशाय नमः ॥
            </p>
            <p className="relative font-hindi text-[11px] sm:text-xs font-bold text-maroon-800 uppercase tracking-[0.25em] mt-0.5">
              ॥ माङ्गल्यं तनोतु सर्वदा ॥
            </p>

            <div className="relative mx-auto mt-2 w-40">
              <Monogram className="mx-auto h-14 w-14 text-gold-600" />
            </div>

            <p className="relative font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-maroon-700 mt-1">
              · Royal Wedding Invitation ·
            </p>

            <Divider tone="maroon" className="h-5 w-56 mx-auto my-2" />

            {/* Honoured guest plate */}
            <div className="relative my-3 bg-gradient-to-br from-gold-50 via-white to-gold-50 border-2 border-gold-400/90 py-5 px-6 rounded-2xl shadow-md max-w-lg mx-auto">
              <p className="font-hindi text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-gold-800">
                सादर नमस्कार · Cordial Invitation
              </p>
              <p className="font-hindi text-xs font-semibold text-maroon-700 mt-1">आदरणीय</p>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gold-grad shimmer mt-1 cinema-title-shadow break-words leading-tight">
                {guestName}
              </h2>

              <div className="mt-2 flex items-center justify-center gap-2">
                <span className="rounded-full border border-gold-400 bg-gold-100 px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-maroon-900">
                  सपरिवार · With Family
                </span>
                <span className="rounded-full border border-gold-300 bg-white px-3 py-1 font-mono text-[10px] sm:text-[11px] font-bold text-gold-800">
                  {passNo}
                </span>
              </div>

              {/* Edit button */}
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="absolute top-3 right-3 rounded-full p-1.5 text-gold-700 hover:text-maroon-900 hover:bg-gold-100 transition-colors cursor-pointer"
                title="Change Name"
              >
                <Edit3 className="h-4 w-4" />
              </button>
            </div>

            {/* Couple portrait + names */}
            <div className="relative mx-auto max-w-md">
              <div className="arch-shadow rounded-t-[7rem] rounded-b-2xl border-2 border-gold-400 bg-white p-1.5 shadow-lg">
                <div className="overflow-hidden rounded-t-[6.5rem] rounded-b-xl border border-gold-300">
                  <img
                    src={coupleImg}
                    alt="Ashwin and Aarti"
                    loading="lazy"
                    decoding="async"
                    className="h-44 sm:h-56 w-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="mt-3">
                <p className="font-hindi text-sm font-semibold text-maroon-800">
                  परमपिता परमेश्वर की असीम अनुकंपा से
                </p>
                <p className="font-serif text-3xl sm:text-4xl font-bold text-maroon-900 mt-1">Ashwin</p>
                <p className="text-xs text-maroon-700">(सुपुत्र: श्री विजय नारायण मौर्य एवं श्रीमती निर्मला मौर्य)</p>
                <div className="flex items-center justify-center gap-2 my-1.5 text-gold-700">
                  <span className="h-px w-8 bg-gold-400" />
                  <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                  <span className="font-hindi font-bold text-sm">संग</span>
                  <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                  <span className="h-px w-8 bg-gold-400" />
                </div>
                <p className="font-serif text-3xl sm:text-4xl font-bold text-maroon-900">Aarti</p>
                <p className="text-xs text-maroon-700">(सुपुत्री: श्री राधेश्याम मौर्य एवं श्रीमती सुमन मौर्य)</p>
              </div>
            </div>

            {/* All celebrations at a glance */}
            <div className="relative mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-lg mx-auto">
              {[
                { d: "05 Dec", t: "Tilak", h: "तिलक" },
                { d: "07 Dec", t: "Haldi", h: "हल्दी" },
                { d: "08 Dec", t: "Sangeet", h: "संगीत" },
                { d: "09 Dec", t: "Wedding", h: "विवाह" },
              ].map((e) => (
                <div key={e.d} className="rounded-xl border border-gold-300/80 bg-gold-50/60 px-2 py-2 text-center">
                  <p className="font-sans text-[10px] font-bold uppercase tracking-wider text-maroon-800">{e.d}</p>
                  <p className="font-hindi text-xs font-bold text-gold-800">{e.h}</p>
                  <p className="font-serif text-xs font-bold text-maroon-900">{e.t}</p>
                </div>
              ))}
            </div>

            <p className="relative mt-3 max-w-xl mx-auto px-2 font-hindi text-base leading-relaxed text-maroon-950">
              के <strong className="text-gold-800 font-bold">शुभ विवाह</strong> के पावन अवसर पर
              आप सपरिवार सादर आमंत्रित हैं। आपकी गरिमामयी उपस्थिति वर-वधू को नवजीवन का आशीष प्रदान करेगी।
            </p>

            {/* Event & Venue Info */}
            <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-lg mx-auto bg-gold-50/70 border border-gold-300/80 p-3.5 rounded-xl">
              <div className="flex items-start gap-2.5">
                <Calendar className="h-5 w-5 text-gold-700 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] uppercase font-bold text-maroon-700">शुभ तिथि</p>
                  <p className="font-serif text-base font-bold text-maroon-950">
                    बुधवार, 09 दिसम्बर 2026
                  </p>
                  <p className="text-xs text-maroon-700">शुभ विवाह एवं प्रीतिभोज</p>
                  <div className="flex items-center gap-2 mt-1">
                    <a
                      href={WEDDING_CALENDAR_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-bold text-gold-800 hover:text-maroon-900 underline underline-offset-2"
                    >
                      + Add to Calendar 📅
                    </a>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-[10px] font-hindi font-bold text-maroon-900 bg-gold-200/60 border border-gold-300 px-2 py-0.5 rounded">
                    <Clock className="h-3 w-3 text-gold-800 shrink-0" />
                    <span>शेष: {countdown.days} दिन · {countdown.hours}घं · {countdown.mins}मि</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="h-5 w-5 text-gold-700 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] uppercase font-bold text-maroon-700">शुभ स्थल</p>
                  <p className="font-serif text-sm font-bold text-maroon-950 leading-tight">
                    ग्राम बिगहपुर, पोस्ट दुबारी
                  </p>
                  <p className="text-xs text-maroon-700">मऊ — उत्तर प्रदेश</p>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-1 text-[11px] font-bold text-gold-800 hover:text-maroon-900 underline underline-offset-2"
                  >
                    Google Maps 📍
                  </a>
                </div>
              </div>
            </div>

            {/* 🌸 RSVP Attendance Confirmation Section */}
            <div className="mt-4 p-3.5 bg-gradient-to-r from-gold-100/80 via-white to-gold-100/80 border border-gold-400 rounded-xl max-w-lg mx-auto">
              <p className="font-hindi text-xs sm:text-sm font-bold text-maroon-900 flex items-center justify-center gap-1.5">
                <Users className="h-4 w-4 text-gold-700" />
                <span>क्या आप विवाह में पधार रहे हैं? (Will you attend?)</span>
              </p>
              <div className="mt-2.5 flex items-center justify-center gap-2.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleConfirmAttendance(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-600 bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer"
                >
                  <span>🌸 हाँ, अवश्य पधारेंगे</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleConfirmAttendance(false)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gold-400/80 bg-white px-4 py-2 text-xs font-bold text-maroon-900 hover:bg-gold-50 transition-colors shadow-sm cursor-pointer"
                >
                  <span>💐 शुभकामना संदेश</span>
                </button>
              </div>
              {rsvpDone && (
                <p className="mt-2 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-800 animate-fade-in">
                  {rsvpDone === "yes"
                    ? `धन्यवाद, ${guestName}! WhatsApp खुल रहा है — भेजने पर आपकी उपस्थिति दर्ज हो जाएगी। 🙏`
                    : `शुक्रिया! WhatsApp खुल रहा है — आपकी शुभकामना परिवार तक पहुँचेगी। 🙏`}
                </p>
              )}
            </div>

            <p className="mt-3 font-serif text-sm italic text-maroon-700/80">
              #Ashwin<span className="text-gold-700 font-semibold">Weds</span>Aarti · स्वागताकांक्षी: समस्त मौर्य परिवार
            </p>

            {/* Sharing & Action Options */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 pt-3 border-t border-gold-300">
              <button
                type="button"
                onClick={handleDownloadCard}
                disabled={isDownloading}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-gold-500 bg-gradient-to-r from-gold-600 to-gold-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-maroon-950 hover:brightness-110 transition-all shadow-md cursor-pointer disabled:opacity-60"
              >
                <Download className="h-4 w-4" />
                <span>{isDownloading ? "तैयार हो रहा है..." : "कार्ड डाउनलोड (Save Card)"}</span>
              </button>

              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-600 bg-emerald-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-700 transition-colors shadow-md cursor-pointer"
              >
                <Share2 className="h-4 w-4" />
                <span>{shared ? "Shared!" : "WhatsApp Card"}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 rounded-xl border border-gold-400 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-maroon-900 hover:bg-gold-50 transition-colors shadow-sm cursor-pointer"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-gold-700" />}
                <span>{copied ? "Link Copied!" : "Copy Link"}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-gold-400/80 bg-gold-50 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-maroon-900 hover:bg-gold-200 transition-colors shadow-sm cursor-pointer"
              >
                <Edit3 className="h-4 w-4" />
                <span>Change Name</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}