/**
 * Renders the personalized royal invitation as a PNG.
 *
 * Text is measured and shrunk to fit its plate, so long guest names and
 * long family lines never bleed past the gold border.
 */

const W = 1200;
const H = 1600;

const INK = "#1F040A";
const MAROON = "#2E060F";
const MAROON_SOFT = "#5F1324";
const GOLD = "#C9A24B";
const GOLD_DARK = "#84652C";
const GOLD_LIGHT = "#FBF5E6";
const PAPER = "#FFFDF9";

const HINDI = "'Tiro Devanagari Hindi', 'Noto Sans Devanagari', 'Nirmala UI', 'Georgia', serif";
const DISPLAY = "'Cormorant Garamond', 'Georgia', serif";
const SCRIPT = "'Great Vibes', 'Cormorant Garamond', 'Georgia', serif";

type Ctx = CanvasRenderingContext2D;

/** Draw centred text, shrinking the font until it fits maxWidth. */
function fitText(
  ctx: Ctx,
  text: string,
  cx: number,
  y: number,
  maxWidth: number,
  startPx: number,
  fontOf: (px: number) => string,
  minPx = 16
) {
  let px = startPx;
  ctx.font = fontOf(px);
  while (px > minPx && ctx.measureText(text).width > maxWidth) {
    px -= 2;
    ctx.font = fontOf(px);
  }
  ctx.fillText(text, cx, y);
  return px;
}

function roundRectPath(ctx: Ctx, x: number, y: number, w: number, h: number, r: number) {
  if (typeof ctx.roundRect === "function") {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    return;
  }
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function generateWeddingCardImage(guestName: string): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return resolve("");

    // 1. Royal ivory background
    ctx.fillStyle = "#FAF7F2";
    ctx.fillRect(0, 0, W, H);

    const grad = ctx.createRadialGradient(W / 2, H / 2, 80, W / 2, H / 2, 950);
    grad.addColorStop(0, "rgba(251, 245, 230, 0.95)");
    grad.addColorStop(1, "rgba(235, 224, 199, 0.55)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // 2. Double gold border
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 6;
    ctx.strokeRect(40, 40, W - 80, H - 80);

    ctx.strokeStyle = GOLD_DARK;
    ctx.lineWidth = 2;
    ctx.strokeRect(55, 55, W - 110, H - 110);

    const drawCorner = (x: number, y: number) => {
      ctx.fillStyle = GOLD;
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = GOLD_DARK;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.stroke();
    };
    drawCorner(55, 55);
    drawCorner(W - 55, 55);
    drawCorner(55, H - 55);
    drawCorner(W - 55, H - 55);

    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";

    // 3. Header
    ctx.fillStyle = GOLD_DARK;
    ctx.font = `bold 32px ${HINDI}`;
    ctx.fillText("॥ श्री गणेशाय नमः ॥", W / 2, 130);

    ctx.font = `italic 22px ${SCRIPT}`;
    ctx.fillStyle = MAROON_SOFT;
    ctx.fillText("॥ माङ्गल्यं तनोतु सर्वदा ॥", W / 2, 170);

    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(380, 205);
    ctx.lineTo(820, 205);
    ctx.stroke();

    // 4. Honoured guest plate
    ctx.fillStyle = PAPER;
    ctx.strokeStyle = "#D4AF37";
    ctx.lineWidth = 3;
    roundRectPath(ctx, 140, 240, 920, 185, 20);
    ctx.fill();
    ctx.stroke();

    ctx.font = `bold 22px ${HINDI}`;
    ctx.fillStyle = GOLD_DARK;
    ctx.fillText("सादर आमंत्रण · CORDIAL INVITATION", W / 2, 285);

    ctx.fillStyle = INK;
    const displayName = guestName.trim() || "सम्मानित अतिथि";
    fitText(ctx, displayName, W / 2, 355, 840, 46, (px) => `bold ${px}px ${DISPLAY}`);

    ctx.font = `20px ${HINDI}`;
    ctx.fillStyle = MAROON_SOFT;
    ctx.fillText("(सपरिवार / With Family)", W / 2, 395);

    // 5. Invitation body
    ctx.font = `26px ${HINDI}`;
    ctx.fillStyle = MAROON;
    fitText(ctx, "परमपिता परमेश्वर की असीम अनुकंपा से हमारे सुपुत्र", W / 2, 475, 900, 26, (px) => `${px}px ${HINDI}`);

    ctx.fillStyle = INK;
    fitText(ctx, "Ashwin", W / 2, 550, 860, 60, (px) => `bold ${px}px ${DISPLAY}`);

    ctx.fillStyle = MAROON_SOFT;
    fitText(
      ctx,
      "(सुपुत्र: श्री विजय नारायण मौर्य एवं श्रीमती निर्मला मौर्य)",
      W / 2,
      592,
      900,
      22,
      (px) => `${px}px ${HINDI}`
    );

    ctx.font = `bold 32px ${SCRIPT}`;
    ctx.fillStyle = GOLD;
    ctx.fillText("— संग (weds) —", W / 2, 642);

    ctx.fillStyle = INK;
    fitText(ctx, "Aarti", W / 2, 720, 860, 60, (px) => `bold ${px}px ${DISPLAY}`);

    ctx.fillStyle = MAROON_SOFT;
    fitText(
      ctx,
      "(सुपुत्री: श्री राधेश्याम मौर्य एवं श्रीमती सुमन मौर्य)",
      W / 2,
      762,
      900,
      22,
      (px) => `${px}px ${HINDI}`
    );

    ctx.fillStyle = MAROON;
    fitText(
      ctx,
      "के शुभ विवाह के पावन अवसर पर आप सपरिवार सादर आमंत्रित हैं।",
      W / 2,
      835,
      940,
      26,
      (px) => `${px}px ${HINDI}`
    );

    ctx.fillStyle = MAROON_SOFT;
    fitText(
      ctx,
      "आपकी गरिमामयी उपस्थिति वर-वधू को नवजीवन का आशीष प्रदान करेगी।",
      W / 2,
      875,
      940,
      22,
      (px) => `italic ${px}px ${HINDI}`
    );

    // 6. Auspicious dates box
    ctx.fillStyle = GOLD_LIGHT;
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 2;
    roundRectPath(ctx, 140, 930, 920, 240, 16);
    ctx.fill();
    ctx.stroke();

    ctx.font = `bold 24px ${HINDI}`;
    ctx.fillStyle = GOLD_DARK;
    ctx.fillText("॥ मांगलिक उत्सव एवं शुभ तिथि ॥", W / 2, 980);

    ctx.fillStyle = INK;
    fitText(ctx, "बुधवार, 09 दिसम्बर 2026 (Wednesday)", W / 2, 1035, 860, 36, (px) => `bold ${px}px ${DISPLAY}`);

    ctx.font = `22px ${HINDI}`;
    ctx.fillStyle = MAROON_SOFT;
    ctx.fillText("शुभ विवाह मुहूर्त एवं प्रीतिभोज", W / 2, 1075);

    fitText(
      ctx,
      "तिलक: 05 Dec · हल्दी: 07 Dec · संगीत: 08 Dec · विवाह: 09 Dec",
      W / 2,
      1120,
      880,
      22,
      (px) => `${px}px ${HINDI}`
    );

    // 7. Venue
    ctx.font = `bold 26px ${HINDI}`;
    ctx.fillStyle = GOLD_DARK;
    ctx.fillText("शुभ स्थल (Wedding Venue)", W / 2, 1225);

    ctx.fillStyle = INK;
    fitText(
      ctx,
      "ग्राम बिगहपुर, पोस्ट दुबारी, मऊ — उत्तर प्रदेश",
      W / 2,
      1275,
      900,
      34,
      (px) => `bold ${px}px ${DISPLAY}`
    );

    ctx.fillStyle = MAROON_SOFT;
    fitText(
      ctx,
      "Village Bigrahpur, Post Dubari, Mau (Uttar Pradesh)",
      W / 2,
      1315,
      900,
      20,
      (px) => `${px}px ${HINDI}`
    );

    // 8. Footer
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(350, 1365);
    ctx.lineTo(850, 1365);
    ctx.stroke();

    ctx.fillStyle = GOLD_DARK;
    fitText(
      ctx,
      "स्वागताकांक्षी: समस्त मौर्य परिवार",
      W / 2,
      1420,
      880,
      28,
      (px) => `bold ${px}px ${HINDI}`
    );

    ctx.fillStyle = MAROON_SOFT;
    fitText(
      ctx,
      "निमंत्रक: अश्विन मौर्य (+91 99583 00518)",
      W / 2,
      1465,
      880,
      22,
      (px) => `${px}px ${HINDI}`
    );

    resolve(canvas.toDataURL("image/png"));
  });
}
