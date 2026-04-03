import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState, useRef, useCallback } from "react";
import PostCard from "../components/PostCard";
import SkeletonPostCard from "../components/SkeletonPostCard";

/* ─── Global styles injected once ─────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --teal:   #0d9488;
    --teal2:  #0f766e;
    --gold:   #f59e0b;
    --red:    #dc2626;
    --dark:   #0a0f1a;
    --ink:    #111827;
    --mist:   #f0fdf4;
    --glass:  rgba(255,255,255,0.06);
    --border: rgba(255,255,255,0.12);
  }

  @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes fadeUp  { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
  @keyframes scaleIn { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }
  @keyframes pulse2  { 0%,100%{box-shadow:0 0 0 0 rgba(13,148,136,.5)} 50%{box-shadow:0 0 0 14px rgba(13,148,136,0)} }
  @keyframes float3d { 0%,100%{transform:translateY(0) rotateX(0)} 50%{transform:translateY(-10px) rotateX(4deg)} }
  @keyframes shimmer { from{background-position:-200% 0} to{background-position:200% 0} }
  @keyframes spin360 { to{transform:rotate(360deg)} }
  @keyframes blob    { 0%,100%{border-radius:60% 40% 70% 30%/50% 60% 40% 50%} 50%{border-radius:30% 60% 40% 70%/60% 30% 70% 40%} }
  @keyframes lineGrow{ from{width:0} to{width:60px} }
  @keyframes tickIn  { from{transform:scale(0) rotate(-20deg);opacity:0} to{transform:scale(1) rotate(0deg);opacity:1} }

  .fade-up     { animation: fadeUp .7s ease both }
  .scale-in    { animation: scaleIn .5s ease both }
  .hero-float  { animation: float3d 6s ease-in-out infinite }

  .glass-card {
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(20px);
    border: 1px solid var(--border);
    border-radius: 20px;
  }

  .shimmer-btn {
    background: linear-gradient(135deg, var(--teal), #06b6d4, var(--teal2));
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite;
    transition: transform .2s, box-shadow .2s;
  }
  .shimmer-btn:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 12px 30px rgba(13,148,136,.45); }

  .stat-card {
    position: relative; overflow: hidden;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    transition: transform .3s, box-shadow .3s;
  }
  .stat-card::before {
    content:''; position:absolute; inset:0;
    background: linear-gradient(135deg, rgba(13,148,136,.15), transparent);
    opacity:0; transition: opacity .3s;
  }
  .stat-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(13,148,136,.2); }
  .stat-card:hover::before { opacity:1; }

  .section-reveal {
    opacity: 0; transform: translateY(50px);
    transition: opacity .8s ease, transform .8s ease;
  }
  .section-reveal.visible { opacity: 1; transform: translateY(0); }

  .video-thumb {
    transition: transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s;
  }
  .video-thumb:hover { transform: translateY(-6px) scale(1.04); box-shadow: 0 16px 40px rgba(13,148,136,.35); }

  .btn-glow {
    position: relative;
    transition: all .25s ease;
  }
  .btn-glow::after {
    content: ''; position: absolute; inset: -2px; border-radius: inherit;
    background: linear-gradient(135deg, var(--teal), #06b6d4);
    filter: blur(10px); opacity: 0; z-index: -1;
    transition: opacity .3s;
  }
  .btn-glow:hover::after { opacity: .7; }
  .btn-glow:hover { transform: translateY(-2px); }

  .scrollbar-hide::-webkit-scrollbar { display:none }
  .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none }

  .text-gradient {
    background: linear-gradient(135deg, #0d9488, #06b6d4, #14b8a6);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-bg {
    background:
      radial-gradient(ellipse 80% 60% at 20% 40%, rgba(13,148,136,.18) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 80% 70%, rgba(6,182,212,.12) 0%, transparent 55%),
      linear-gradient(160deg, #0a0f1a 0%, #0d1a15 50%, #0a1520 100%);
  }

  .blob-shape {
    position:absolute; filter:blur(60px); opacity:.25;
    animation: blob 10s ease-in-out infinite;
  }

  .member-ring {
    position:relative;
    transition: transform .3s ease;
  }
  .member-ring:hover { transform: scale(1.12) translateY(-4px); }
  .member-ring::before {
    content:''; position:absolute; inset:-3px;
    border-radius:50%;
    background: conic-gradient(from 0deg, #0d9488, #06b6d4, #f59e0b, #0d9488);
    opacity:0; transition: opacity .3s; z-index:0;
    animation: spin360 3s linear infinite;
  }
  .member-ring:hover::before { opacity:1; }

  .doc-tab-active {
    border-bottom: 2px solid #0d9488;
    color: #0d9488;
  }

  @media (prefers-color-scheme: dark) {
    .card-bg { background: rgba(10,15,26,0.95); }
  }
`;

/* ─── useReveal hook ──────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".section-reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── EidUlAdha Widget ────────────────────────────────────────────────────── */
function EidUlAdhaWidget() {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isDuring, setIsDuring] = useState(false);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const startDate = new Date("2026-05-27T00:00:00");
    const endDate = new Date("2026-05-27T23:59:59");

    const tick = () => {
      const now = new Date();
      if (now >= startDate && now <= endDate) {
        setIsDuring(true); setIsOver(false);
        const diff = endDate - now;
        setTimeLeft({ days: Math.floor(diff/(1000*60*60*24)), hours: Math.floor((diff%(1000*60*60*24))/(1000*60*60)), mins: Math.floor((diff%(1000*60*60))/(1000*60)), secs: Math.floor((diff%(1000*60))/1000) });
        return;
      }
      if (now > endDate) { setIsOver(true); setIsDuring(false); return; }
      setIsDuring(false); setIsOver(false);
      const diff = startDate - now;
      setTimeLeft({ days: Math.floor(diff/(1000*60*60*24)), hours: Math.floor((diff%(1000*60*60*24))/(1000*60*60)), mins: Math.floor((diff%(1000*60*60))/(1000*60)), secs: Math.floor((diff%(1000*60))/1000) });
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  if (isOver || !timeLeft) return null;

  return (
    <div className="section-reveal w-full rounded-3xl overflow-hidden my-8" style={{ background: "linear-gradient(135deg,#064e3b,#065f46,#047857)" }}>
      <div className="p-8 text-center relative">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(255,255,255,.1) 20px,rgba(255,255,255,.1) 21px)" }} />
        <div className="text-5xl mb-4" style={{ animation:"float3d 3s ease-in-out infinite" }}>🕌</div>
        <h2 className="text-3xl font-bold mb-1" style={{ fontFamily:"'Playfair Display',serif", color:"#fcd34d" }}>
          {isDuring ? "Eid ul-Adha Mubarak!" : "Eid ul-Adha 2026"}
        </h2>
        <p className="text-lg mb-1" style={{ color:"#6ee7b7" }}>عيد الأضحى مبارك 🌙</p>
        <p className="text-sm mb-6" style={{ color:"#a7f3d0" }}>
          {isDuring ? "May Allah accept your sacrifices and devotion. Wishing peace, joy, and countless blessings." : "Countdown to the blessed day • 27 May 2026"}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          {[{val:timeLeft.days,label:"Days"},{val:timeLeft.hours,label:"Hours"},{val:timeLeft.mins,label:"Mins"},{val:timeLeft.secs,label:"Secs"}].map(({val,label})=>(
            <div key={label} className="rounded-2xl px-5 py-4 min-w-[80px] text-center" style={{ background:"rgba(0,0,0,0.25)", border:"1px solid rgba(252,211,77,0.3)" }}>
              <span className="text-4xl font-bold block" style={{ color:"#fcd34d", fontFamily:"'Playfair Display',serif" }}>{String(val).padStart(2,"0")}</span>
              <span className="text-xs uppercase tracking-widest mt-1 block" style={{ color:"#6ee7b7" }}>{label}</span>
            </div>
          ))}
        </div>
        {!isDuring && <p className="text-xs mt-5" style={{ color:"#fcd34d" }}>🌙 May Allah bless us all!</p>}
      </div>
    </div>
  );
}

/* ─── YouTube Section ─────────────────────────────────────────────────────── */
const YOUTUBE_VIDEOS = [
  { id: "f1miCme5za0", title: "মানবতার সৈনিক সংগঠন রক্ত দান শিবির" },
  { id: "u2E-IXbCsxs", title: "রক্ত দান জীবন দান — আসুন সবাই এই মহৎ কাজে সঙ্গ দিই" },
  { id: "mncbUIk813U", title: "Bipader Bondhu Annually Program 2026" },
  { id: "XybksDJaFzE", title: "77তম প্রজাতন্ত্র দিবস উদযাপন — 26 January 2026" },
  { id: "z6WF5N0dLcw", title: "Space Science — Narayanpur Bipader Bondhu 2025" },
  { id: "x1q0lAJ1cMw", title: "নদিয়া এসপির নেতৃত্বে বিশেষ অনুষ্ঠান 2025" },
  { id: "4hP8xRZC3lQ", title: "B-Negative রক্তদান — ১১তম বার" },
  { id: "jzUKKI2HbPc", title: "দুর্গাপূজা উপলক্ষে বস্ত্র দান 2025" },
];

function YouTubeSection() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [hovered, setHovered] = useState(null);

  return (
    <div className="section-reveal w-full my-8">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <span className="text-xs uppercase tracking-widest text-teal-500 font-semibold mb-2">Watch & Learn</span>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily:"'Playfair Display',serif" }}>Our Videos</h2>
        <div className="h-1 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500" style={{ width:60 }} />
        <p className="text-sm text-gray-400 mt-3">{YOUTUBE_VIDEOS.length} videos • tap to watch</p>
      </div>

      {/* Player */}
      {activeVideo !== null && (
        <div className="relative mb-8 rounded-3xl overflow-hidden shadow-2xl w-full" style={{ aspectRatio:"16/9", maxHeight:480, background:"#000" }}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEOS[activeVideo].id}?autoplay=1&rel=0&modestbranding=1&fs=1`}
            title={YOUTUBE_VIDEOS[activeVideo].title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen className="w-full h-full" style={{ border:"none" }}
          />
          <button onClick={()=>setActiveVideo(null)}
            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full text-white font-bold text-lg shadow-xl transition-all hover:scale-110"
            style={{ background:"rgba(0,0,0,0.7)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.2)" }}>✕</button>
          <div className="absolute bottom-0 left-0 right-0 px-5 py-3 text-xs text-white font-medium truncate"
            style={{ background:"linear-gradient(to top,rgba(0,0,0,0.8),transparent)" }}>
            ▶ {YOUTUBE_VIDEOS[activeVideo].title}
          </div>
        </div>
      )}

      {/* Thumbnail Grid */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {YOUTUBE_VIDEOS.map((video, idx) => {
            const isActive = activeVideo === idx;
            const isHov = hovered === idx;
            return (
              <div key={video.id} className="flex-shrink-0 cursor-pointer video-thumb"
                style={{ width:"clamp(160px,38vw,220px)" }}
                onClick={()=>setActiveVideo(idx)}
                onMouseEnter={()=>setHovered(idx)} onMouseLeave={()=>setHovered(null)}>
                <div className="rounded-2xl p-[2px]" style={{
                  background: isActive ? "linear-gradient(135deg,#0d9488,#06b6d4)" : isHov ? "linear-gradient(135deg,#6366f1,#ec4899)" : "linear-gradient(135deg,#e5e7eb,#d1d5db)",
                  boxShadow: isActive ? "0 0 20px rgba(13,148,136,.5)" : "none"
                }}>
                  <div className="relative rounded-2xl overflow-hidden bg-black" style={{ aspectRatio:"16/9" }}>
                    <img src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} alt={video.title}
                      className="w-full h-full object-cover" loading="lazy"
                      style={{ transform: isHov?"scale(1.08)":"scale(1)", transition:"transform .5s ease" }} />
                    <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 60%)" }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-11 h-11 flex items-center justify-center rounded-full shadow-xl"
                        style={{ background: isActive?"rgba(13,148,136,.95)":"rgba(255,255,255,0.92)", transition:"all .25s" }}>
                        {isActive
                          ? <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><rect x="6" y="5" width="4" height="14" rx="1.5"/><rect x="14" y="5" width="4" height="14" rx="1.5"/></svg>
                          : <svg width="13" height="13" viewBox="0 0 24 24" fill="#0d9488"><polygon points="7,4 21,12 7,20"/></svg>}
                      </div>
                    </div>
                    {idx === 0 && <span className="absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded-full text-white animate-pulse" style={{ background:"linear-gradient(135deg,#ef4444,#f97316)" }}>NEW</span>}
                    {isActive && <span className="absolute top-2 right-2 text-[10px] font-black px-2 py-0.5 rounded-full text-white" style={{ background:"linear-gradient(135deg,#0d9488,#06b6d4)" }}>▶ PLAYING</span>}
                  </div>
                </div>
                <p className="mt-2 text-xs font-semibold truncate px-1" style={{ color: isActive?"#0d9488":isHov?"#6366f1":undefined }}>{video.title}</p>
              </div>
            );
          })}
        </div>
      </div>
      {activeVideo === null && <p className="text-center text-xs text-gray-400 mt-3">👆 Tap any thumbnail to watch</p>}
    </div>
  );
}

/* ─── Animated Counter ────────────────────────────────────────────────────── */
function CountUp({ to, duration = 2000, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(ease * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Main Home Component ─────────────────────────────────────────────────── */
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState(false);
  const [showIdModal, setShowIdModal] = useState(false);
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [activeDoc, setActiveDoc] = useState("reg");
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const scrollRef = useRef(null);
  const animationRef = useRef(null);

  useReveal();

  const memberPhotos = [
    "/images/img1.jpg","/images/img2.jpg","/images/img3.jpg","/images/img4.jpg",
    "/images/img5.jpg","/images/img6.jpg","/images/img7.jpg","/images/img8.jpg",
    "/images/img9.jpg","/images/img10.jpg",
  ];
  const duplicatedPhotos = [...memberPhotos, ...memberPhotos];

  useEffect(() => {
    // Inject CSS
    if (!document.getElementById("home-global-css")) {
      const style = document.createElement("style");
      style.id = "home-global-css";
      style.textContent = GLOBAL_CSS;
      document.head.appendChild(style);
    }

    const fetchPosts = async () => {
      try {
        setPostsLoading(true); setPostsError(false);
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/home`);
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        setPosts(data || []);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setPostsError(true);
      } finally {
        setPostsLoading(false);
      }
    };
    fetchPosts();

    let loadedCount = 0;
    const total = memberPhotos.length;
    memberPhotos.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => { loadedCount++; if (loadedCount === total) setImagesLoaded(true); };
    });
  }, []);

  // Smooth infinite scroll LEFT→RIGHT
  useEffect(() => {
    if (!imagesLoaded || !scrollRef.current) return;
    const container = scrollRef.current;
    const speed = 0.4;
    let paused = false;
    const getSingleWidth = () => {
      const c = container.firstElementChild;
      return c ? (c.offsetWidth + 24) * memberPhotos.length : 0;
    };
    let pos = -getSingleWidth();
    const animate = () => {
      if (!paused) {
        pos += speed;
        if (pos >= 0) pos = -getSingleWidth();
        container.style.transform = `translateX(${pos}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    const pause = () => (paused = true);
    const resume = () => (paused = false);
    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", resume);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", resume);
    };
  }, [imagesLoaded]);

  const stats = [
    { icon: "🩸", value: 2500, suffix: "+", label: "Blood Donors" },
    { icon: "💰", value: 300, suffix: "+", label: "Financial Aid" },
    { icon: "🤝", value: 5, suffix: "K+", label: "Lives Touched" },
    { icon: "🕐", value: 24, suffix: "/7", label: "Support" },
  ];

  const docTabs = [
    { id: "reg", label: "🏛️ Registration", src: "/images/register.pdf" },
    { id: "tax12a", label: "📄 12A Certificate", src: "/images/bipader1.pdf" },
    { id: "tax80g", label: "📄 80G Certificate", src: "/images/bipader2.pdf" },
  ];

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif" }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="hero-bg relative overflow-hidden" style={{ minHeight:"100vh", display:"flex", alignItems:"center" }}>
        {/* Blobs */}
        <div className="blob-shape" style={{ width:500, height:500, top:-100, left:-150, background:"linear-gradient(135deg,#0d9488,#06b6d4)" }} />
        <div className="blob-shape" style={{ width:400, height:400, bottom:-100, right:-100, background:"linear-gradient(135deg,#064e3b,#14b8a6)", animationDelay:"5s" }} />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage:"linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize:"60px 60px" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Text */}
            <div className="flex-1 text-center lg:text-left" style={{ animationDelay:".1s" }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 fade-up"
                style={{ background:"rgba(13,148,136,.15)", border:"1px solid rgba(13,148,136,.3)", color:"#5eead4", animationDelay:".1s" }}>
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                Govt. Registered NGO • Reg. No: S0042589 of 2024–2025
              </div>

              <h1 className="fade-up text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white mb-4"
                style={{ fontFamily:"'Playfair Display',serif", animationDelay:".2s" }}>
                Narayan Pur<br />
                <span className="text-gradient">Bipader Bondhu</span><br />
                Welfare Society
              </h1>

              <p className="fade-up text-sm font-semibold tracking-widest uppercase mb-2"
                style={{ color:"#5eead4", animationDelay:".3s" }}>Estd. 2020</p>

              <p className="fade-up text-sm mb-2 flex items-center justify-center lg:justify-start gap-2"
                style={{ color:"#94a3b8", animationDelay:".35s" }}>
                <span>📍</span>
                Narayan Pur, Nadia, West Bengal — Pin 741165
              </p>

              <p className="fade-up text-base leading-relaxed mb-10 max-w-xl"
                style={{ color:"#94a3b8", animationDelay:".4s" }}>
                A non-profit organization dedicated to serving humanity through social welfare initiatives, disaster relief, and support for underprivileged communities.
              </p>

              {/* CTA Buttons */}
              <div className="fade-up flex flex-wrap gap-3 justify-center lg:justify-start" style={{ animationDelay:".5s" }}>
                <button onClick={()=>setShowDocsModal(true)}
                  className="shimmer-btn btn-glow px-6 py-3 rounded-xl text-sm font-semibold text-white shadow-lg">
                  📋 View Documents
                </button>

                <a href="https://github.com/AmirSohelSardar/bipader-bondhu/releases/download/v1.0/app-arm64-v8a-release.apk"
                  download
                  className="btn-glow relative px-6 py-3 rounded-xl text-sm font-semibold text-white shadow-lg"
                  style={{ background:"linear-gradient(135deg,#7c3aed,#ec4899)" }}>
                  📱 Download App
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[9px] font-black text-white bg-yellow-500 rounded-full">APK</span>
                </a>

                <button onClick={()=>setShowIdModal(true)}
                  className="btn-glow relative px-6 py-3 rounded-xl text-sm font-semibold text-white shadow-lg"
                  style={{ background:"linear-gradient(135deg,#059669,#10b981)" }}>
                  🪪 Identity Card
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[9px] font-black text-white bg-red-500 rounded-full animate-pulse">NEW</span>
                </button>

                <a href="/blood-donation"
                  className="btn-glow relative px-6 py-3 rounded-xl text-sm font-semibold text-white shadow-lg inline-flex items-center gap-2"
                  style={{ background:"linear-gradient(135deg,#7f0000,#e53935)", boxShadow:"0 4px 14px rgba(183,28,28,.4)" }}>
                  🩸 NGO Event Hub
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[9px] font-black text-white rounded-full animate-pulse" style={{ background:"linear-gradient(135deg,#f59e0b,#fbbf24)" }}>NEW</span>
                </a>
              </div>
            </div>

            {/* Stats Card */}
            <div className="flex-shrink-0 w-full lg:w-auto hero-float fade-up" style={{ animationDelay:".6s" }}>
              <div className="rounded-3xl p-8 w-full max-w-sm mx-auto"
                style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", backdropFilter:"blur(20px)" }}>
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full flex items-center justify-center"
                    style={{ background:"rgba(13,148,136,.2)", border:"2px solid rgba(13,148,136,.4)", animation:"pulse2 2s infinite" }}>
                    <span className="text-3xl">🌿</span>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color:"#5eead4" }}>Actively Serving</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map(s => (
                    <div key={s.label} className="stat-card p-4 text-center">
                      <div className="text-2xl mb-1">{s.icon}</div>
                      <div className="text-2xl font-black" style={{ color:"#f59e0b", fontFamily:"'Playfair Display',serif" }}>
                        <CountUp to={s.value} suffix={s.suffix} />
                      </div>
                      <div className="text-xs" style={{ color:"#64748b" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACTIVE MEMBERS ─────────────────────────────────────────────── */}
      <section className="section-reveal py-20 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-10 text-center">
          <span className="text-xs uppercase tracking-widest text-teal-500 font-semibold">Community</span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-3" style={{ fontFamily:"'Playfair Display',serif" }}>Our Active Members</h2>
          <div className="h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-teal-400 to-cyan-500" />
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10" style={{ background:"linear-gradient(to right,white,transparent)" }} />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10" style={{ background:"linear-gradient(to left,white,transparent)" }} />

          {!imagesLoaded ? (
            <div className="flex gap-6 justify-center px-4">
              {[...Array(8)].map((_,i) => (
                <div key={i} className="w-24 h-24 rounded-full animate-pulse" style={{ background:"linear-gradient(135deg,#e5e7eb,#d1d5db)" }} />
              ))}
            </div>
          ) : (
            <div ref={scrollRef} className="flex gap-6" style={{ willChange:"transform" }}>
              {duplicatedPhotos.map((photo, idx) => (
                <div key={`m-${idx}`} className="flex-shrink-0 member-ring" style={{ position:"relative" }}>
                  <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden"
                    style={{ border:"3px solid white", boxShadow:"0 4px 20px rgba(13,148,136,.2)" }}>
                    <img src={photo} alt={`Member ${(idx%memberPhotos.length)+1}`} loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e)=>{ e.target.src=`https://via.placeholder.com/112/0d9488/ffffff?text=M${(idx%memberPhotos.length)+1}`; }} />
                  </div>
                  <div className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full z-20"
                    style={{ background:"#22c55e", border:"2px solid white" }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── EID WIDGET ────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6">
        <EidUlAdhaWidget />
      </div>

      {/* ── CALL TO ACTION ─────────────────────────────────────────────── */}
      <div className="section-reveal max-w-6xl mx-auto px-6 py-6">
        <div className="rounded-3xl overflow-hidden" style={{ background:"linear-gradient(135deg,#0a0f1a,#0d1a15)", border:"1px solid rgba(13,148,136,.2)" }}>
          <div className="p-8">
            <CallToAction />
          </div>
        </div>
      </div>

      {/* ── VIDEOS + POSTS ─────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <YouTubeSection />

        {/* Recent Posts */}
        <div className="section-reveal mt-16">
          <div className="flex flex-col items-center mb-10">
            <span className="text-xs uppercase tracking-widest text-teal-500 font-semibold">Updates</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-3" style={{ fontFamily:"'Playfair Display',serif" }}>Recent Posts</h2>
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500" />
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {postsLoading && Array(6).fill(0).map((_,i) => <SkeletonPostCard key={i} />)}
            {!postsLoading && postsError && (
              <p className="text-red-500 text-sm text-center">Failed to load posts. Please refresh the page.</p>
            )}
            {!postsLoading && !postsError && posts.map(post => <PostCard key={post._id} post={post} />)}
          </div>

          {!postsLoading && posts.length > 0 && (
            <div className="text-center mt-8">
              <Link to="/search"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold text-white shimmer-btn shadow-lg">
                View All Posts →
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ── MODALS ─────────────────────────────────────────────────────── */}

      {/* Identity Card Modal */}
      {showIdModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background:"rgba(0,0,0,0.7)", backdropFilter:"blur(8px)" }}
          onClick={e=>e.target===e.currentTarget&&setShowIdModal(false)}>
          <div className="w-full max-w-xs rounded-3xl p-8 text-center scale-in"
            style={{ background:"linear-gradient(135deg,#0d1a15,#0a1520)", border:"1px solid rgba(13,148,136,.3)" }}>
            <div className="text-4xl mb-4">🪪</div>
            <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily:"'Playfair Display',serif" }}>Apply Identity Card</h2>
            <div className="flex flex-col gap-3">
              <button className="w-full py-3 rounded-xl font-semibold text-white btn-glow"
                style={{ background:"linear-gradient(135deg,#059669,#10b981)" }}
                onClick={()=>{ setShowIdModal(false); window.open("/identity-user.html","_blank"); }}>
                👤 User Login
              </button>
              <button className="w-full py-3 rounded-xl font-semibold text-white btn-glow"
                style={{ background:"linear-gradient(135deg,#dc2626,#ef4444)" }}
                onClick={()=>{ setShowIdModal(false); window.open("/identity-admin.html","_blank"); }}>
                🔐 Admin Login
              </button>
            </div>
            <button onClick={()=>setShowIdModal(false)} className="mt-5 text-sm text-gray-500 hover:text-gray-400 transition">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Documents Modal */}
      {showDocsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background:"rgba(0,0,0,0.7)", backdropFilter:"blur(8px)" }}
          onClick={e=>e.target===e.currentTarget&&setShowDocsModal(false)}>
          <div className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl scale-in overflow-hidden"
            style={{ background:"#fff" }}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor:"#e5e7eb" }}>
              <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily:"'Playfair Display',serif" }}>📂 Official Documents</h2>
              <button onClick={()=>setShowDocsModal(false)} className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition text-xl">✕</button>
            </div>
            {/* Tabs */}
            <div className="flex border-b px-6 gap-1" style={{ borderColor:"#e5e7eb" }}>
              {docTabs.map(tab => (
                <button key={tab.id} onClick={()=>setActiveDoc(tab.id)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition ${activeDoc===tab.id ? "doc-tab-active" : "border-transparent text-gray-400 hover:text-gray-700"}`}>
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Viewer */}
            <div className="flex-1 overflow-hidden p-5">
              <iframe key={activeDoc} src={docTabs.find(t=>t.id===activeDoc)?.src}
                className="w-full rounded-xl border" style={{ height:"60vh", border:"1px solid #e5e7eb" }} title="Document" />
            </div>
            {/* Footer */}
            <div className="px-6 py-4 border-t flex justify-end" style={{ borderColor:"#e5e7eb" }}>
              <a href={docTabs.find(t=>t.id===activeDoc)?.src} target="_blank" rel="noopener noreferrer"
                className="px-5 py-2 text-sm font-semibold rounded-xl border transition hover:bg-teal-50"
                style={{ color:"#0d9488", borderColor:"#0d9488" }}>
                Open in New Tab ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}