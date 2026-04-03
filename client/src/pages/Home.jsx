import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState, useRef, useCallback } from "react";
import PostCard from "../components/PostCard";
import SkeletonPostCard from "../components/SkeletonPostCard";

/* ─────────────────────────────────────────────
   GLOBAL STYLES  (injected once into <head>)
───────────────────────────────────────────── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

:root {
  --forest:  #071c10;
  --emerald: #0d4a28;
  --jade:    #16a34a;
  --mint:    #4ade80;
  --gold:    #f59e0b;
  --cream:   #fefce8;
  --smoke:   #f0fdf4;
  --glass:   rgba(255,255,255,0.06);
  --border:  rgba(74,222,128,0.18);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body { font-family: 'Outfit', sans-serif; }

.home-root {
  background: #fafffe;
  color: #1a2e1f;
  overflow-x: hidden;
}

/* ── Scroll reveal ── */
.reveal {
  opacity: 0;
  transform: translateY(44px);
  transition: opacity 0.75s cubic-bezier(.16,1,.3,1),
              transform 0.75s cubic-bezier(.16,1,.3,1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
.reveal-left  { transform: translateX(-60px); }
.reveal-right { transform: translateX(60px); }
.reveal-left.visible, .reveal-right.visible { transform: translateX(0); }

.delay-1 { transition-delay: 0.1s !important; }
.delay-2 { transition-delay: 0.2s !important; }
.delay-3 { transition-delay: 0.3s !important; }
.delay-4 { transition-delay: 0.4s !important; }
.delay-5 { transition-delay: 0.5s !important; }

/* ── Aurora background ── */
@keyframes aurora1 {
  0%,100% { transform: translate(-10%,-20%) scale(1.1) rotate(0deg); }
  50%      { transform: translate(5%,10%) scale(0.95) rotate(180deg); }
}
@keyframes aurora2 {
  0%,100% { transform: translate(10%,5%) scale(1) rotate(0deg); }
  50%      { transform: translate(-5%,-15%) scale(1.15) rotate(-120deg); }
}
@keyframes aurora3 {
  0%,100% { transform: translate(0%,0%) scale(1.05); }
  50%      { transform: translate(-8%,8%) scale(0.9); }
}
@keyframes float-slow {
  0%,100% { transform: translateY(0px); }
  50%      { transform: translateY(-18px); }
}
@keyframes float-med {
  0%,100% { transform: translateY(0px) rotate(0deg); }
  50%      { transform: translateY(-12px) rotate(8deg); }
}
@keyframes pulse-ring {
  0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(74,222,128,0.45); }
  70%  { transform: scale(1);    box-shadow: 0 0 0 16px rgba(74,222,128,0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(74,222,128,0); }
}
@keyframes shimmer {
  0%   { background-position: -1000px 0; }
  100% { background-position:  1000px 0; }
}
@keyframes ticker {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes countup {
  from { opacity:0; transform:translateY(20px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes badge-bounce {
  0%,100% { transform: scale(1); }
  50%      { transform: scale(1.15); }
}

/* ── Gradient text ── */
.gradient-text {
  background: linear-gradient(135deg, #16a34a 0%, #4ade80 50%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.gold-text {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Glassmorphism card ── */
.glass-card {
  background: rgba(255,255,255,0.72);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(74,222,128,0.2);
  box-shadow: 0 8px 40px rgba(0,0,0,0.07), 0 2px 8px rgba(22,163,74,0.08);
}

/* ── Hero section ── */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(160deg, #071c10 0%, #0d2d18 40%, #0a3d20 70%, #051408 100%);
}
.hero-aurora {
  position: absolute; inset: 0; pointer-events: none; overflow: hidden;
}
.aurora-blob {
  position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.35;
}
.blob1 { width:700px; height:700px; background:radial-gradient(circle,#16a34a,transparent 70%); top:-200px; left:-200px; animation: aurora1 18s ease-in-out infinite; }
.blob2 { width:600px; height:600px; background:radial-gradient(circle,#065f46,transparent 70%); top:200px; right:-150px; animation: aurora2 22s ease-in-out infinite; }
.blob3 { width:500px; height:500px; background:radial-gradient(circle,#f59e0b,transparent 70%); bottom:-100px; left:30%; animation: aurora3 16s ease-in-out infinite; opacity:0.18; }
.hero-grid {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(74,222,128,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(74,222,128,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* ── Ticker ── */
.ticker-wrapper {
  background: linear-gradient(90deg, #dc2626, #b91c1c);
  overflow: hidden; white-space: nowrap; padding: 10px 0;
  border-top: 1px solid rgba(255,255,255,0.15);
  border-bottom: 1px solid rgba(255,255,255,0.15);
}
.ticker-track {
  display: inline-flex; gap: 0;
  animation: ticker 28s linear infinite;
}
.ticker-track:hover { animation-play-state: paused; }

/* ── Stats ── */
.stat-card {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(74,222,128,0.25);
  border-radius: 16px;
  padding: 20px 24px;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, border-color 0.3s ease;
}
.stat-card:hover { transform: translateY(-6px); border-color: rgba(74,222,128,0.5); }

/* ── Buttons ── */
.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px; border-radius: 14px; font-weight: 600;
  font-size: 15px; cursor: pointer; border: none; font-family: 'Outfit', sans-serif;
  background: linear-gradient(135deg, #16a34a, #4ade80);
  color: #fff;
  box-shadow: 0 6px 24px rgba(22,163,74,0.4);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.btn-primary:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 12px 32px rgba(22,163,74,0.5); }

.btn-outline {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 27px; border-radius: 14px; font-weight: 600;
  font-size: 15px; cursor: pointer; font-family: 'Outfit', sans-serif;
  background: transparent;
  color: #4ade80; border: 1.5px solid rgba(74,222,128,0.5);
  transition: all 0.25s ease;
}
.btn-outline:hover { background: rgba(74,222,128,0.08); border-color: #4ade80; transform: translateY(-2px); }

.btn-gold {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 26px; border-radius: 14px; font-weight: 600;
  font-size: 15px; cursor: pointer; border: none; font-family: 'Outfit', sans-serif;
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
  color: #1a1a1a;
  box-shadow: 0 6px 20px rgba(245,158,11,0.4);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.btn-gold:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 12px 28px rgba(245,158,11,0.5); }

.btn-blood {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 26px; border-radius: 14px; font-weight: 600;
  font-size: 15px; cursor: pointer; border: none; font-family: 'Outfit', sans-serif;
  background: linear-gradient(135deg, #7f0000, #dc2626);
  color: #fff;
  box-shadow: 0 6px 20px rgba(220,38,38,0.4);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  text-decoration: none;
}
.btn-blood:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 12px 28px rgba(220,38,38,0.5); }

/* ── Section wrapper ── */
.section-tag {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 14px; border-radius: 100px;
  background: rgba(22,163,74,0.1); border: 1px solid rgba(22,163,74,0.25);
  color: #16a34a; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
  margin-bottom: 12px;
}

/* ── Member carousel ── */
.member-ring {
  position: relative; display: inline-block;
}
.member-ring::before {
  content: ''; position: absolute; inset: -3px; border-radius: 50%;
  background: linear-gradient(135deg, #4ade80, #16a34a, #f59e0b);
  z-index: 0;
  transition: opacity 0.3s ease;
  opacity: 0;
}
.member-ring:hover::before { opacity: 1; }
.member-ring img { position: relative; z-index: 1; display: block; }

/* ── Video section ── */
.video-thumb-wrap {
  position: relative; border-radius: 18px; overflow: hidden;
  aspect-ratio: 16/9; background: #000;
  transition: transform 0.35s cubic-bezier(.34,1.56,.64,1), box-shadow 0.35s ease;
  cursor: pointer;
}
.video-thumb-wrap:hover { transform: translateY(-8px) scale(1.03); box-shadow: 0 20px 50px rgba(0,0,0,0.25); }
.video-thumb-wrap img { width:100%; height:100%; object-fit:cover; transition: transform 0.5s ease; }
.video-thumb-wrap:hover img { transform: scale(1.1); }

/* ── Modal ── */
.modal-overlay {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(0,0,0,0.75); backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center; padding: 16px;
  animation: fadeIn 0.25s ease;
}
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
.modal-box {
  background: #fff; border-radius: 24px;
  box-shadow: 0 32px 80px rgba(0,0,0,0.3);
  animation: slideUp 0.3s cubic-bezier(.16,1,.3,1);
  overflow: hidden;
}
@keyframes slideUp {
  from { opacity:0; transform: translateY(40px) scale(0.97); }
  to   { opacity:1; transform: translateY(0) scale(1); }
}

/* ── Eid widget ── */
.eid-box {
  background: linear-gradient(135deg, #064e3b 0%, #065f46 40%, #047857 70%, #064e3b 100%);
  border-radius: 28px;
  border: 1px solid rgba(74,222,128,0.2);
  position: relative; overflow: hidden;
}
.eid-box::before {
  content: ''; position: absolute; inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234ade80' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
.eid-counter-box {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(252,211,77,0.3);
  border-radius: 16px; padding: 16px 20px; text-align: center; min-width: 80px;
  backdrop-filter: blur(8px);
  transition: transform 0.3s ease;
}
.eid-counter-box:hover { transform: translateY(-4px); }

/* ── Horizontal scroll ── */
.scroll-x::-webkit-scrollbar { display: none; }
.scroll-x { -ms-overflow-style: none; scrollbar-width: none; }

/* ── Posts ── */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

/* dark mode compat */
.dark .home-root { background: #040f07; }
.dark .glass-card { background: rgba(10,40,20,0.7); border-color: rgba(74,222,128,0.15); }
`;

/* ─────────────────────────────────────────────
   INJECT STYLES HOOK
───────────────────────────────────────────── */
function useGlobalStyles(css) {
  useEffect(() => {
    const id = "home-global-styles";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
    return () => { const el = document.getElementById(id); if (el) el.remove(); };
  }, []);
}

/* ─────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─────────────────────────────────────────────
   COUNTER ANIMATION
───────────────────────────────────────────── */
function AnimatedCounter({ to, duration = 1800, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0; const step = to / (duration / 16);
        const t = setInterval(() => { start = Math.min(start + step, to); setVal(Math.floor(start)); if (start >= to) clearInterval(t); }, 16);
        io.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ─────────────────────────────────────────────
   EID UL-ADHA WIDGET
───────────────────────────────────────────── */
function EidUlAdhaWidget() {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isDuring, setIsDuring] = useState(false);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const startDate = new Date("2026-05-27T00:00:00");
    const endDate   = new Date("2026-05-27T23:59:59");
    const tick = () => {
      const now = new Date();
      if (now >= startDate && now <= endDate) {
        setIsDuring(true); setIsOver(false);
        const d = endDate - now;
        setTimeLeft({ days: Math.floor(d/(1000*60*60*24)), hours: Math.floor((d%(1000*60*60*24))/(1000*60*60)), mins: Math.floor((d%(1000*60*60))/(1000*60)), secs: Math.floor((d%(1000*60))/1000) });
        return;
      }
      if (now > endDate) { setIsOver(true); setIsDuring(false); return; }
      setIsDuring(false); setIsOver(false);
      const d = startDate - now;
      setTimeLeft({ days: Math.floor(d/(1000*60*60*24)), hours: Math.floor((d%(1000*60*60*24))/(1000*60*60)), mins: Math.floor((d%(1000*60*60))/(1000*60)), secs: Math.floor((d%(1000*60))/1000) });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  if (isOver || !timeLeft) return null;

  const units = [{ val: timeLeft.days, label: "Days" }, { val: timeLeft.hours, label: "Hours" }, { val: timeLeft.mins, label: "Mins" }, { val: timeLeft.secs, label: "Secs" }];

  return (
    <div className="reveal eid-box p-8 md:p-12 text-center my-8" style={{ position: "relative", zIndex: 1 }}>
      <div style={{ animation: "float-slow 3s ease-in-out infinite", fontSize: 52, marginBottom: 16 }}>🕌</div>
      {isDuring ? (
        <>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,5vw,42px)", color: "#fcd34d", fontWeight: 700, marginBottom: 8 }}>
            Eid ul-Adha Mubarak!
          </h2>
          <p style={{ color: "#6ee7b7", fontSize: 18, marginBottom: 8 }}>عيد الأضحى مبارك 🌙</p>
          <p style={{ color: "#a7f3d0", fontSize: 13, maxWidth: 400, margin: "0 auto 24px", lineHeight: 1.7 }}>
            May Allah accept your sacrifices and devotion. Wishing you and your family peace, joy, and countless blessings this Eid. ✨
          </p>
          <p style={{ color: "#fcd34d", fontSize: 12, marginBottom: 14, letterSpacing: "0.5px" }}>⏳ Eid celebrations end in</p>
        </>
      ) : (
        <>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(24px,4vw,36px)", color: "#fcd34d", fontWeight: 700, marginBottom: 6 }}>
            Eid ul-Adha 2026
          </h3>
          <p style={{ color: "#6ee7b7", fontSize: 13, marginBottom: 4 }}>عيد الأضحى مبارك</p>
          <p style={{ color: "#a7f3d0", fontSize: 12, marginBottom: 24 }}>Countdown to the blessed day • 27 May 2026</p>
        </>
      )}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        {units.map(({ val, label }) => (
          <div key={label} className="eid-counter-box">
            <span style={{ color: "#fcd34d", fontSize: 36, fontWeight: 700, display: "block", fontFamily: "'Cormorant Garamond',serif" }}>{val}</span>
            <span style={{ color: "#6ee7b7", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", marginTop: 4, display: "block" }}>{label}</span>
          </div>
        ))}
      </div>
      {!isDuring && (
        <p style={{ color: "#fcd34d", fontSize: 12, marginTop: 20, letterSpacing: "0.3px" }}>🌙 May Allah bless us all!</p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   YOUTUBE VIDEOS
───────────────────────────────────────────── */
const YOUTUBE_VIDEOS = [
  { id: "f1miCme5za0", title: "মানবতার সৈনিক সংগঠন রক্তদান শিবির" },
  { id: "u2E-IXbCsxs", title: "রক্ত দান জীবন দান" },
  { id: "mncbUIk813U", title: "Bipader Bondhu Annually Program 2026" },
  { id: "XybksDJaFzE", title: "77তম প্রজাতন্ত্র দিবস উদযাপন 2026" },
  { id: "z6WF5N0dLcw", title: "Space Science • Narayanpur 2025" },
  { id: "x1q0lAJ1cMw", title: "নদিয়া এসপির নেতৃত্বে অনুষ্ঠান 2025" },
  { id: "4hP8xRZC3lQ", title: "B-negative রক্তদান • ১১তম বার" },
  { id: "jzUKKI2HbPc", title: "দুর্গাপূজা উপলক্ষে বস্ত্র দান 2025" },
];

function VideoCard({ video, index, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ flexShrink: 0, width: "clamp(200px, 38vw, 260px)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div
        className="video-thumb-wrap"
        style={{
          boxShadow: isActive
            ? "0 0 0 3px #4ade80, 0 16px 40px rgba(22,163,74,0.4)"
            : hovered
            ? "0 16px 40px rgba(0,0,0,0.25)"
            : "0 4px 16px rgba(0,0,0,0.12)",
        }}
      >
        <img
          src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
          alt={video.title}
          loading="lazy"
          style={{ transform: hovered ? "scale(1.1)" : "scale(1)", transition: "transform 0.5s ease" }}
        />
        {/* overlay */}
        <div style={{ position:"absolute",inset:0, background:"linear-gradient(to top,rgba(0,0,0,0.6),transparent 60%)", opacity: hovered ? 1 : 0.5, transition:"opacity 0.3s" }} />
        {/* play btn */}
        <div style={{ position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div style={{ width: isActive||hovered?52:44, height:isActive||hovered?52:44, borderRadius:"50%", display:"flex",alignItems:"center",justifyContent:"center", background: isActive?"rgba(22,163,74,0.95)":"rgba(255,255,255,0.92)", backdropFilter:"blur(4px)", transition:"all 0.28s ease", boxShadow:"0 4px 20px rgba(0,0,0,0.3)" }}>
            {isActive
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><rect x="6" y="5" width="4" height="14" rx="2"/><rect x="14" y="5" width="4" height="14" rx="2"/></svg>
              : <svg width="14" height="14" viewBox="0 0 24 24" fill="#16a34a"><polygon points="7,4 21,12 7,20"/></svg>
            }
          </div>
        </div>
        {index === 0 && (
          <span style={{ position:"absolute",top:10,left:10,background:"linear-gradient(135deg,#ef4444,#f97316)",color:"#fff",fontSize:9,fontWeight:800,padding:"3px 9px",borderRadius:100,letterSpacing:"0.8px", animation:"badge-bounce 2s ease-in-out infinite" }}>NEW</span>
        )}
        {isActive && (
          <span style={{ position:"absolute",top:10,right:10,background:"linear-gradient(135deg,#16a34a,#4ade80)",color:"#fff",fontSize:9,fontWeight:800,padding:"3px 9px",borderRadius:100,letterSpacing:"0.8px" }}>▶ PLAYING</span>
        )}
      </div>
      <p style={{ marginTop:10,fontSize:12,fontWeight:600,color: isActive?"#16a34a":hovered?"#4ade80":"#374151",transition:"color 0.2s",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",lineHeight:1.5 }}>
        {video.title}
      </p>
    </div>
  );
}

function YouTubeSection() {
  const [activeVideo, setActiveVideo] = useState(null);
  return (
    <div className="reveal" style={{ margin: "48px 0" }}>
      {/* Header */}
      <div style={{ textAlign:"center", marginBottom:32 }}>
        <div className="section-tag" style={{ margin:"0 auto 12px" }}>
          <span>🎬</span> Our Videos
        </div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(28px,4vw,42px)", fontWeight:700, color:"#1a2e1f", marginBottom:6 }}>
          Watch Our Journey
        </h2>
        <p style={{ color:"#6b7280", fontSize:13 }}>{YOUTUBE_VIDEOS.length} videos • tap a thumbnail to watch</p>
      </div>

      {/* Player */}
      {activeVideo !== null && (
        <div style={{ position:"relative", borderRadius:20, overflow:"hidden", background:"#000", aspectRatio:"16/9", maxHeight:500, marginBottom:28, boxShadow:"0 24px 64px rgba(0,0,0,0.3)" }}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEOS[activeVideo].id}?autoplay=1&rel=0&modestbranding=1&fs=1`}
            title={YOUTUBE_VIDEOS[activeVideo].title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            style={{ width:"100%", height:"100%", border:"none" }}
          />
          <button onClick={() => setActiveVideo(null)} style={{ position:"absolute",top:14,right:14,zIndex:20,width:40,height:40,borderRadius:"50%",background:"rgba(0,0,0,0.7)",backdropFilter:"blur(6px)",border:"1.5px solid rgba(255,255,255,0.2)",color:"#fff",fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s" }}>✕</button>
          <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"12px 18px",background:"linear-gradient(to top,rgba(0,0,0,0.75),transparent)",color:"#fff",fontSize:12,fontWeight:500 }}>
            ▶ {YOUTUBE_VIDEOS[activeVideo].title}
          </div>
        </div>
      )}

      {/* Thumbnail strip */}
      <div style={{ position:"relative" }}>
        <div style={{ position:"absolute",left:0,top:0,bottom:0,width:48,background:"linear-gradient(to right,#fafffe,transparent)",zIndex:10,pointerEvents:"none" }} />
        <div style={{ position:"absolute",right:0,top:0,bottom:0,width:48,background:"linear-gradient(to left,#fafffe,transparent)",zIndex:10,pointerEvents:"none" }} />
        <div className="scroll-x" style={{ display:"flex",gap:16,overflowX:"auto",paddingBottom:12 }}>
          {YOUTUBE_VIDEOS.map((v, i) => (
            <VideoCard key={v.id} video={v} index={i} isActive={activeVideo===i} onClick={() => setActiveVideo(i)} />
          ))}
        </div>
      </div>
      {activeVideo === null && (
        <p style={{ textAlign:"center",fontSize:12,color:"#9ca3af",marginTop:12 }}>👆 Tap any thumbnail to watch inline</p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN HOME PAGE
───────────────────────────────────────────── */
export default function Home() {
  useGlobalStyles(GLOBAL_CSS);
  useScrollReveal();

  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState(false);
  const [showIdModal, setShowIdModal] = useState(false);
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [activeDoc, setActiveDoc] = useState("reg");
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const scrollRef = useRef(null);
  const animationRef = useRef(null);

  const memberPhotos = [
    "/images/img1.jpg","/images/img2.jpg","/images/img3.jpg","/images/img4.jpg","/images/img5.jpg",
    "/images/img6.jpg","/images/img7.jpg","/images/img8.jpg","/images/img9.jpg","/images/img10.jpg",
  ];
  const duplicatedPhotos = [...memberPhotos, ...memberPhotos];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setPostsLoading(true); setPostsError(false);
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/home`);
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        setPosts(data || []);
      } catch { setPostsError(true); }
      finally { setPostsLoading(false); }
    };
    fetchPosts();

    let loaded = 0;
    memberPhotos.forEach(src => {
      const img = new Image(); img.src = src;
      const done = () => { loaded++; if (loaded === memberPhotos.length) setImagesLoaded(true); };
      img.onload = done; img.onerror = done;
    });
  }, []);

  useEffect(() => {
    if (!imagesLoaded || !scrollRef.current) return;
    const c = scrollRef.current;
    const speed = 0.35;
    let paused = false;
    const getW = () => { const ch = c.firstElementChild; return ch ? (ch.offsetWidth + 24) * memberPhotos.length : 0; };
    let pos = -getW();
    const animate = () => {
      if (!paused) {
        pos += speed;
        if (pos >= 0) pos = -getW();
        c.style.transform = `translateX(${pos}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    const on = () => paused = true, off = () => paused = false;
    c.addEventListener("mouseenter", on); c.addEventListener("mouseleave", off);
    return () => { cancelAnimationFrame(animationRef.current); c.removeEventListener("mouseenter",on); c.removeEventListener("mouseleave",off); };
  }, [imagesLoaded]);

  /* re-run reveal after posts load */
  useEffect(() => {
    if (!postsLoading) {
      setTimeout(() => {
        const els = document.querySelectorAll(".reveal:not(.visible)");
        const io = new IntersectionObserver(
          (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }),
          { threshold: 0.1 }
        );
        els.forEach(el => io.observe(el));
      }, 100);
    }
  }, [postsLoading]);

  return (
    <div className="home-root">

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section className="hero-section">
        <div className="hero-aurora">
          <div className="aurora-blob blob1" />
          <div className="aurora-blob blob2" />
          <div className="aurora-blob blob3" />
        </div>
        <div className="hero-grid" />

        <div style={{ position:"relative", zIndex:10, width:"100%", padding:"80px 24px 60px", maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:40, alignItems:"center" }}>
            {/* Left content */}
            <div>
              {/* Tag */}
              <div style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"8px 16px",borderRadius:100,background:"rgba(74,222,128,0.12)",border:"1px solid rgba(74,222,128,0.3)",color:"#4ade80",fontSize:11,fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:24,animation:"fadeIn 0.8s ease 0.2s both" }}>
                <span style={{ width:7,height:7,borderRadius:"50%",background:"#4ade80",animation:"pulse-ring 2s ease-in-out infinite",display:"inline-block" }} />
                Govt. Registered NGO • Est. 2020
              </div>

              {/* Heading */}
              <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(34px,5vw,72px)", fontWeight:700, lineHeight:1.1, color:"#fff", marginBottom:20, animation:"fadeIn 0.8s ease 0.4s both" }}>
                Narayan Pur<br />
                <span className="gradient-text">Bipader Bondhu</span><br />
                <span style={{ color:"rgba(255,255,255,0.7)", fontWeight:400 }}>Welfare Society</span>
              </h1>

              {/* Reg */}
              <p style={{ color:"rgba(255,255,255,0.5)",fontSize:13,marginBottom:24,letterSpacing:"0.3px",animation:"fadeIn 0.8s ease 0.55s both" }}>
                Reg. No: S0042589 of 2024–2025 &nbsp;·&nbsp;
                <span style={{ color:"rgba(255,255,255,0.35)" }}>📍 Narayan Pur, Nadia, West Bengal 741165</span>
              </p>

              {/* Description */}
              <p style={{ color:"rgba(255,255,255,0.65)",fontSize:15,maxWidth:560,lineHeight:1.75,marginBottom:36,animation:"fadeIn 0.8s ease 0.65s both" }}>
                A non-profit organization dedicated to serving humanity through social welfare, disaster relief, and support for underprivileged communities — standing beside people in times of need.
              </p>

              {/* CTA Buttons */}
              <div style={{ display:"flex",gap:12,flexWrap:"wrap",animation:"fadeIn 0.8s ease 0.8s both" }}>
                <button className="btn-primary" onClick={() => setShowDocsModal(true)}>
                  📋 Official Documents
                </button>
                <a href="/blood-donation" className="btn-blood" style={{ textDecoration:"none" }}>
                  🩸 NGO Event Hub
                </a>
                <a
                  href="https://github.com/AmirSohelSardar/bipader-bondhu/releases/download/v1.0/app-arm64-v8a-release.apk"
                  download
                  style={{ textDecoration:"none" }}
                  className="btn-gold"
                >
                  📱 Download App
                  <span style={{ background:"#dc2626",color:"#fff",fontSize:9,fontWeight:800,padding:"2px 7px",borderRadius:100,marginLeft:4 }}>APK</span>
                </a>
                <button className="btn-outline" onClick={() => setShowIdModal(true)} style={{ position:"relative" }}>
                  🪪 Identity Card
                  <span style={{ position:"absolute",top:-10,right:-10,background:"#dc2626",color:"#fff",fontSize:9,fontWeight:800,padding:"2px 7px",borderRadius:100,animation:"badge-bounce 2s ease-in-out infinite" }}>NEW</span>
                </button>
              </div>
            </div>

            {/* Stats column — hidden on small screens */}
            <div style={{ display:"flex",flexDirection:"column",gap:16,minWidth:200, animation:"fadeIn 0.8s ease 1s both" }} className="hide-mobile">
              {[
                { icon:"🩸", num:2500, label:"Blood Donors", suffix:"+" },
                { icon:"💰", num:300,  label:"Financial Aid", suffix:"+" },
                { icon:"⏰", num:24,   label:"Hour Support", suffix:"/7" },
                { icon:"👥", num:500,  label:"Members", suffix:"+" },
              ].map(({ icon, num, label, suffix }) => (
                <div key={label} className="stat-card">
                  <div style={{ fontSize:26,marginBottom:6 }}>{icon}</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:32,fontWeight:700,color:"#4ade80" }}>
                    <AnimatedCounter to={num} suffix={suffix} />
                  </div>
                  <div style={{ color:"rgba(255,255,255,0.55)",fontSize:11,letterSpacing:"0.8px",textTransform:"uppercase",marginTop:2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile stats row */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginTop:48 }}>
            {[
              { icon:"🩸", num:2500, label:"Donors", suffix:"+" },
              { icon:"💰", num:300,  label:"Aid Cases", suffix:"+" },
              { icon:"👥", num:500,  label:"Members", suffix:"+" },
              { icon:"📅", num:5,    label:"Years", suffix:"+" },
            ].map(({ icon, num, label, suffix }) => (
              <div key={label} style={{ background:"rgba(255,255,255,0.06)",border:"1px solid rgba(74,222,128,0.2)",borderRadius:14,padding:"14px 10px",textAlign:"center" }}>
                <div style={{ fontSize:22,marginBottom:4 }}>{icon}</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:700,color:"#4ade80" }}>
                  <AnimatedCounter to={num} suffix={suffix} />
                </div>
                <div style={{ color:"rgba(255,255,255,0.5)",fontSize:10,letterSpacing:"0.7px",textTransform:"uppercase" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TICKER
      ══════════════════════════════════════ */}
      <div className="ticker-wrapper">
        <div className="ticker-track">
          {[...Array(4)].map((_, i) => (
            <span key={i} style={{ padding:"0 32px", color:"#fff", fontSize:13, fontWeight:500, letterSpacing:"0.3px" }}>
              🌿 নারায়নপুর বিপদের বন্ধু ওয়েলফেয়ার সোসাইটি মানবতার সেবায় রক্তদান, সমাজকল্যাণ ও সচেতনতামূলক কার্যক্রম পরিচালনা করে। সর্বশেষ আপডেটের জন্য আমাদের সঙ্গে যুক্ত থাকুন। &nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════ */}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 20px" }}>

        {/* ── Active Members ── */}
        <div className="reveal" style={{ margin:"64px 0 0" }}>
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <div className="section-tag" style={{ margin:"0 auto 12px" }}><span>👥</span> Our Team</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(28px,4vw,42px)", fontWeight:700, color:"#1a2e1f" }}>
              Active Members
            </h2>
          </div>
        </div>

        <div className="reveal" style={{ background:"linear-gradient(135deg,#f0fdf4,#ecfdf5)", borderRadius:28, border:"1px solid rgba(22,163,74,0.15)", padding:"40px 0", overflow:"hidden", marginBottom:8 }}>
          {!imagesLoaded ? (
            <div style={{ display:"flex",gap:24,justifyContent:"center",padding:"0 24px" }}>
              {[...Array(8)].map((_,i) => (
                <div key={i} style={{ width:96,height:96,borderRadius:"50%",background:"linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%)",backgroundSize:"1000px 100%",animation:"shimmer 1.5s infinite",flexShrink:0 }} />
              ))}
            </div>
          ) : (
            <div style={{ overflow:"hidden", position:"relative" }}>
              <div ref={scrollRef} style={{ display:"flex",gap:24,willChange:"transform" }}>
                {duplicatedPhotos.map((photo, index) => (
                  <div key={`m-${index}`} style={{ flexShrink:0 }} className="member-ring">
                    <img
                      src={photo}
                      alt={`Member ${(index % memberPhotos.length)+1}`}
                      loading="lazy"
                      style={{ width:96,height:96,borderRadius:"50%",objectFit:"cover",border:"3px solid #fff",boxShadow:"0 4px 16px rgba(0,0,0,0.1)",display:"block",transition:"all 0.3s ease" }}
                      onError={e => { e.target.src=`https://via.placeholder.com/96/16a34a/fff?text=M${(index%memberPhotos.length)+1}`; }}
                    />
                    <div style={{ position:"absolute",bottom:4,right:4,width:14,height:14,borderRadius:"50%",background:"#22c55e",border:"2px solid #fff",zIndex:2 }} />
                  </div>
                ))}
              </div>
            </div>
          )}
          <p style={{ textAlign:"center",marginTop:20,color:"#6b7280",fontSize:12,letterSpacing:"0.5px" }}>
            ● All members are actively serving the community
          </p>
        </div>

        {/* ── Eid Widget ── */}
        <EidUlAdhaWidget />

        {/* ── Call To Action ── */}
        <div className="reveal" style={{ marginBottom:64 }}>
          <div style={{ borderRadius:28,overflow:"hidden",background:"linear-gradient(135deg,#f0fdf4,#dcfce7)",border:"1px solid rgba(22,163,74,0.15)",padding:32 }}>
            <CallToAction />
          </div>
        </div>

        {/* ── YouTube Videos ── */}
        <YouTubeSection />

        {/* ── Recent Posts ── */}
        <div className="reveal" style={{ marginBottom:80 }}>
          <div style={{ textAlign:"center",marginBottom:36 }}>
            <div className="section-tag" style={{ margin:"0 auto 12px" }}><span>📰</span> Latest Updates</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(28px,4vw,42px)", fontWeight:700, color:"#1a2e1f", marginBottom:8 }}>
              Recent Posts
            </h2>
            <p style={{ color:"#6b7280", fontSize:14 }}>Stay updated with our latest activities and announcements</p>
          </div>

          <div className="posts-grid">
            {postsLoading && Array(6).fill(0).map((_,i) => <SkeletonPostCard key={i} />)}
            {!postsLoading && postsError && (
              <div style={{ gridColumn:"1/-1",textAlign:"center",padding:40 }}>
                <div style={{ fontSize:40,marginBottom:12 }}>⚠️</div>
                <p style={{ color:"#dc2626",fontSize:14 }}>Failed to load posts. Please refresh the page.</p>
              </div>
            )}
            {!postsLoading && !postsError && posts.map(post => <PostCard key={post._id} post={post} />)}
          </div>

          {!postsLoading && posts.length > 0 && (
            <div style={{ textAlign:"center",marginTop:40 }}>
              <Link to="/search" style={{ textDecoration:"none" }}>
                <button className="btn-primary" style={{ margin:"0 auto" }}>
                  View All Posts →
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════
          MODALS
      ══════════════════════════════════════ */}

      {/* Identity Card Modal */}
      {showIdModal && (
        <div className="modal-overlay" onClick={() => setShowIdModal(false)}>
          <div className="modal-box" style={{ width:"100%",maxWidth:380 }} onClick={e => e.stopPropagation()}>
            <div style={{ background:"linear-gradient(135deg,#064e3b,#16a34a)",padding:"28px 28px 20px",textAlign:"center" }}>
              <div style={{ fontSize:40,marginBottom:8 }}>🪪</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:700,color:"#fff",marginBottom:4 }}>Identity Card</h2>
              <p style={{ color:"rgba(255,255,255,0.7)",fontSize:13 }}>Select your login type to continue</p>
            </div>
            <div style={{ padding:28,display:"flex",flexDirection:"column",gap:12 }}>
              <button
                onClick={() => { setShowIdModal(false); window.open("/identity-user.html","_blank"); }}
                style={{ padding:"13px 20px",background:"linear-gradient(135deg,#16a34a,#4ade80)",color:"#fff",border:"none",borderRadius:14,fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit',sans-serif",transition:"all 0.2s ease" }}
                onMouseEnter={e => e.target.style.transform="translateY(-2px)"}
                onMouseLeave={e => e.target.style.transform="translateY(0)"}
              >
                👤 User Login
              </button>
              <button
                onClick={() => { setShowIdModal(false); window.open("/identity-admin.html","_blank"); }}
                style={{ padding:"13px 20px",background:"linear-gradient(135deg,#dc2626,#ef4444)",color:"#fff",border:"none",borderRadius:14,fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit',sans-serif",transition:"all 0.2s ease" }}
                onMouseEnter={e => e.target.style.transform="translateY(-2px)"}
                onMouseLeave={e => e.target.style.transform="translateY(0)"}
              >
                🔐 Admin Login
              </button>
              <button onClick={() => setShowIdModal(false)} style={{ padding:"10px",background:"transparent",border:"1px solid #e5e7eb",borderRadius:12,fontSize:14,color:"#6b7280",cursor:"pointer",fontFamily:"'Outfit',sans-serif" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Documents Modal */}
      {showDocsModal && (
        <div className="modal-overlay" onClick={() => setShowDocsModal(false)}>
          <div className="modal-box" style={{ width:"100%",maxWidth:"min(90vw,900px)",maxHeight:"92vh",display:"flex",flexDirection:"column" }} onClick={e => e.stopPropagation()}>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px 24px",borderBottom:"1px solid #f0f0f0" }}>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <span style={{ fontSize:22 }}>📋</span>
                <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:"#1a2e1f" }}>Official Documents</h2>
              </div>
              <button onClick={() => setShowDocsModal(false)} style={{ width:36,height:36,borderRadius:"50%",border:"1px solid #e5e7eb",background:"#f9fafb",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",color:"#6b7280",transition:"all 0.2s" }}>✕</button>
            </div>
            <div style={{ display:"flex",borderBottom:"1px solid #f0f0f0",padding:"0 24px",gap:4 }}>
              {[
                { id:"reg",    label:"🏛️ Registration" },
                { id:"tax12a", label:"📄 12A Certificate" },
                { id:"tax80g", label:"📄 80G Certificate" },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveDoc(tab.id)} style={{ padding:"14px 16px",border:"none",borderBottom: activeDoc===tab.id?"2px solid #16a34a":"2px solid transparent",background:"transparent",cursor:"pointer",fontSize:13,fontWeight:600,color: activeDoc===tab.id?"#16a34a":"#6b7280",fontFamily:"'Outfit',sans-serif",transition:"all 0.2s" }}>
                  {tab.label}
                </button>
              ))}
            </div>
            <div style={{ flex:1,overflow:"hidden",padding:20 }}>
              <iframe
                key={activeDoc}
                src={activeDoc==="reg"?"/images/register.pdf":activeDoc==="tax12a"?"/images/bipader1.pdf":"/images/bipader2.pdf"}
                style={{ width:"100%",height:"min(60vh,500px)",borderRadius:12,border:"1px solid #e5e7eb" }}
                title="Document"
              />
            </div>
            <div style={{ padding:"14px 24px",borderTop:"1px solid #f0f0f0",display:"flex",justifyContent:"flex-end" }}>
              <a
                href={activeDoc==="reg"?"/images/register.pdf":activeDoc==="tax12a"?"/images/bipader1.pdf":"/images/bipader2.pdf"}
                target="_blank" rel="noopener noreferrer"
                style={{ padding:"10px 20px",border:"1.5px solid #16a34a",borderRadius:10,color:"#16a34a",fontSize:13,fontWeight:600,textDecoration:"none",transition:"all 0.2s",fontFamily:"'Outfit',sans-serif" }}
              >
                Open in New Tab ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Responsive: hide stats column on small */}
      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}