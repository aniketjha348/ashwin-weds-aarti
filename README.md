# Ashwin & Aarti — Royal Wedding Film Invitation 🎬💍

A cinematic, Bollywood-style interactive digital wedding invitation card for **Ashwin & Aarti** (09 December 2026 · Village Bigrahpur, Mau, Uttar Pradesh).

**Live:** https://ashwin-weds-aarti.vercel.app/

## ✨ Features

- 🎭 **Real Velvet Theatre Curtains**: Interactive 3D pleated crimson velvet curtains that part with conch & temple chime acoustic resonance.
- 🎬 **Pure Cinema Mode**: Edge-to-edge 4K fullscreen presentation with continuous Ken Burns camera motion on all 5 original Nikon DSLR photography assets (`DSC_3488`, `DSC_1776`, `DSC_1777`, `DSC_1773`, `DSC_3501`).
  - Chapter navigator (8 scenes) + keyboard (Space = play/pause, ←/→ = scenes, Esc = close menu)
  - Chapter progress rail + touch/click to pause & shower petals (पुष्प वर्षा)
  - Interactive diya lighting (दीप प्रज्ज्वलन) with temple chime
- 📜 **Continuous Scroll Mode**: Light royal ivory theme (`#FAF7F2`) with GSAP ScrollTrigger animations, mandalas, petals, and pre-wedding gallery.
- 💌 **Personalized Invitation Card**: Guests enter their name and receive a dynamically generated gold-foil royal patrika with:
  - Downloadable PNG card (`?guest=Name` deep link)
  - WhatsApp RSVP confirmation directly to the family (+91 99XXX XXXXX)
  - Copy invite link / share via WhatsApp
- 🙏 **Blessings Wall**: Guests post शुभकामना messages (stored locally) or send them via WhatsApp.
- 🗺️ **Travel & Route Guide**: Nearest stations (Belthara Road / Mau Jn), airports (VNS / GOP), and Google Maps directions.
- 📅 **Celebrations Timeline**: Tilak (05 Dec) · Haldi (07 Dec) · Sangeet (08 Dec) · Shubh Vivah (09 Dec) with 1-click Google Calendar links.
- ⏰ **Live Countdown**: Days/hours/minutes/seconds to the Shubh Muhurat.
- 🎵 **Shehnai Background Music**: Local MP3 (`public/song.mp3`) with remote CDN fallback.
- 📦 **Single-File Bundle Ready**: Compiles cleanly into a standalone `dist/index.html` via `vite-plugin-singlefile`.

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **Vite 7** + **Tailwind CSS v4**
- **GSAP 3** (GreenSock Animation Platform) + **ScrollTrigger**
- **Lucide React** Icons

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type-check + build singlefile production bundle
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
src/
  components/   Intro, FilmView, Hero, Invitation, Celebrations, Story,
                Gallery, Footer, MusicPlayer, PersonalizedInvitationModal,
                TravelGuideModal, BlessingsModal, FamilyBlessings, Ornaments
  hooks/        useModalBehavior (focus trap + Esc + scroll lock)
  utils/        downloadCard (canvas PNG generator)
  assets/       Couple photography (DSC_*.jpg, fun.jpg)
public/         favicon.svg, og-image.jpg (WhatsApp preview), song.mp3
```

## 🚢 Deployment

Deploys to **Vercel** automatically on push to `main` (Vite preset → `npm run build` → `dist/`).
Backup: also publishes to **GitHub Pages** via `.github/workflows/deploy.yml` (Node 20 → `npm ci` → `npm run build` → deploy `dist/`).
