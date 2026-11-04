export function generateWeddingCardImage(guestName: string): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1600;
    const ctx = canvas.getContext("2d");
    if (!ctx) return resolve("");

    // 1. Royal Ivory Background
    ctx.fillStyle = "#FAF7F2";
    ctx.fillRect(0, 0, 1200, 1600);

    // Subtle golden ambient gradient
    const grad = ctx.createRadialGradient(600, 800, 80, 600, 800, 950);
    grad.addColorStop(0, "rgba(251, 245, 230, 0.95)");
    grad.addColorStop(1, "rgba(235, 224, 199, 0.55)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 1600);

    // 2. Double Royal Gold Borders
    ctx.strokeStyle = "#C9A24B";
    ctx.lineWidth = 6;
    ctx.strokeRect(40, 40, 1120, 1520);

    ctx.strokeStyle = "#84652C";
    ctx.lineWidth = 2;
    ctx.strokeRect(55, 55, 1090, 1490);

    // Corner Ornaments
    const drawCorner = (x: number, y: number) => {
      ctx.fillStyle = "#C9A24B";
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#84652C";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.stroke();
    };
    drawCorner(55, 55);
    drawCorner(1145, 55);
    drawCorner(55, 1545);
    drawCorner(1145, 1545);

    // 3. Top Header: Lord Ganesha Blessing
    ctx.textAlign = "center";
    ctx.fillStyle = "#84652C";
    ctx.font = "bold 32px 'Tiro Devanagari Hindi', 'Noto Sans Devanagari', 'Georgia', serif";
    ctx.fillText("॥ श्री गणेशाय नमः ॥", 600, 130);

    ctx.font = "italic 22px 'Great Vibes', 'Cormorant Garamond', 'Georgia', serif";
    ctx.fillStyle = "#5F1324";
    ctx.fillText("॥ माङ्गल्यं तनोतु सर्वदा ॥", 600, 170);

    // Gold Divider Line
    ctx.strokeStyle = "#C9A24B";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(380, 205);
    ctx.lineTo(820, 205);
    ctx.stroke();

    // 4. Honoured Guest Plate
    ctx.fillStyle = "#FFFDF9";
    ctx.strokeStyle = "#D4AF37";
    ctx.lineWidth = 3;
    if (ctx.roundRect) {
      ctx.roundRect(140, 240, 920, 185, 20);
    } else {
      ctx.rect(140, 240, 920, 185);
    }
    ctx.fill();
    ctx.stroke();

    ctx.font = "bold 22px 'Tiro Devanagari Hindi', sans-serif";
    ctx.fillStyle = "#84652C";
    ctx.fillText("सादर आमंत्रण · CORDIAL INVITATION", 600, 285);

    ctx.font = "bold 46px 'Cormorant Garamond', 'Tiro Devanagari Hindi', 'Georgia', serif";
    ctx.fillStyle = "#1F040A";
    const displayName = guestName.trim() || "सम्मानित अतिथि";
    ctx.fillText(displayName, 600, 355);

    ctx.font = "20px 'Tiro Devanagari Hindi', sans-serif";
    ctx.fillStyle = "#5F1324";
    ctx.fillText("(सपरिवार / With Family)", 600, 395);

    // 5. Main Invitation Body
    ctx.font = "26px 'Tiro Devanagari Hindi', 'Noto Sans Devanagari', serif";
    ctx.fillStyle = "#2E060F";
    ctx.fillText("परमपिता परमेश्वर की असीम अनुकंपा से हमारे सुपुत्र", 600, 475);

    // Groom & Bride
    ctx.font = "bold 60px 'Cormorant Garamond', 'Georgia', serif";
    ctx.fillStyle = "#1F040A";
    ctx.fillText("Ashwin", 600, 550);

    ctx.font = "22px 'Tiro Devanagari Hindi', sans-serif";
    ctx.fillStyle = "#5F1324";
    ctx.fillText("(सुपुत्र: श्री विजय नारायण मौर्य एवं श्रीमती निर्मला मौर्य)", 600, 592);

    ctx.font = "bold 32px 'Great Vibes', 'Georgia', serif";
    ctx.fillStyle = "#C9A24B";
    ctx.fillText("— संग (weds) —", 600, 642);

    ctx.font = "bold 60px 'Cormorant Garamond', 'Georgia', serif";
    ctx.fillStyle = "#1F040A";
    ctx.fillText("Aarti", 600, 720);

    ctx.font = "22px 'Tiro Devanagari Hindi', sans-serif";
    ctx.fillStyle = "#5F1324";
    ctx.fillText("(सुपुत्री: श्री राधेश्याम मौर्य एवं श्रीमती सुमन मौर्य)", 600, 762);

    ctx.font = "26px 'Tiro Devanagari Hindi', serif";
    ctx.fillStyle = "#2E060F";
    ctx.fillText("के शुभ विवाह के पावन अवसर पर आप सपरिवार सादर आमंत्रित हैं।", 600, 835);

    ctx.font = "italic 22px 'Tiro Devanagari Hindi', serif";
    ctx.fillStyle = "#5F1324";
    ctx.fillText("आपकी गरिमामयी उपस्थिति वर-वधू को नवजीवन का आशीष प्रदान करेगी।", 600, 875);

    // 6. Auspicious Dates Box
    ctx.fillStyle = "#FBF5E6";
    ctx.strokeStyle = "#C9A24B";
    ctx.lineWidth = 2;
    if (ctx.roundRect) {
      ctx.roundRect(140, 930, 920, 240, 16);
    } else {
      ctx.rect(140, 930, 920, 240);
    }
    ctx.fill();
    ctx.stroke();

    ctx.font = "bold 24px 'Tiro Devanagari Hindi', sans-serif";
    ctx.fillStyle = "#84652C";
    ctx.fillText("॥ मांगलिक उत्सव एवं शुभ तिथि ॥", 600, 980);

    ctx.font = "bold 36px 'Cormorant Garamond', 'Georgia', serif";
    ctx.fillStyle = "#1F040A";
    ctx.fillText("बुधवार, 09 दिसम्बर 2026 (Wednesday)", 600, 1035);

    ctx.font = "22px 'Tiro Devanagari Hindi', sans-serif";
    ctx.fillStyle = "#5F1324";
    ctx.fillText("शुभ विवाह मुहूर्त एवं प्रीतिभोज", 600, 1075);
    ctx.fillText("तिलक: 05 Dec · हल्दी: 07 Dec · संगीत: 08 Dec · विवाह: 09 Dec", 600, 1120);

    // 7. Venue Box
    ctx.font = "bold 26px 'Tiro Devanagari Hindi', sans-serif";
    ctx.fillStyle = "#84652C";
    ctx.fillText("शुभ स्थल (Wedding Venue)", 600, 1225);

    ctx.font = "bold 34px 'Cormorant Garamond', 'Georgia', serif";
    ctx.fillStyle = "#1F040A";
    ctx.fillText("ग्राम बिगहपुर, पोस्ट दुबारी, मऊ — उत्तर प्रदेश", 600, 1275);

    ctx.font = "20px 'Tiro Devanagari Hindi', sans-serif";
    ctx.fillStyle = "#5F1324";
    ctx.fillText("Village Bigrahpur, Post Dubari, Mau (Uttar Pradesh)", 600, 1315);

    // 8. Footer Maurya Parivar
    ctx.strokeStyle = "#C9A24B";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(350, 1365);
    ctx.lineTo(850, 1365);
    ctx.stroke();

    ctx.font = "bold 28px 'Tiro Devanagari Hindi', 'Georgia', serif";
    ctx.fillStyle = "#84652C";
    ctx.fillText("स्वागताकांक्षी: समस्त मौर्य परिवार", 600, 1420);

    ctx.font = "22px 'Tiro Devanagari Hindi', sans-serif";
    ctx.fillStyle = "#5F1324";
    ctx.fillText("निमंत्रक: अश्विन मौर्य (+91 99583 00518)", 600, 1465);

    resolve(canvas.toDataURL("image/png"));
  });
}
