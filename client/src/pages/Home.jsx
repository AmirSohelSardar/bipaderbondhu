// import { Link } from "react-router-dom";
// import CallToAction from "../components/CallToAction";
// import { useEffect, useState, useRef, useMemo } from "react";
// import PostCard from "../components/PostCard";
// import SkeletonPostCard from "../components/SkeletonPostCard";

// /* ─── SCROLL REVEAL HOOK ──────────────────────────────────────────── */
// function useScrollReveal(threshold = 0.15) {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
//       { threshold }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [threshold]);
//   return [ref, visible];
// }

// /* ─── EID COUNTDOWN ──────────────────────────────────────────────── */
// function EidUlAdhaWidget() {
//   const [timeLeft, setTimeLeft] = useState(null);
//   const [isDuring, setIsDuring] = useState(false);
//   const [isOver, setIsOver] = useState(false);

//   useEffect(() => {
//     const startDate = new Date(2026, 4, 27);
//     const endDate = new Date(2026, 4, 27, 23, 59, 59);
//     const tick = () => {
//       const now = new Date();
//       if (now >= startDate && now <= endDate) {
//         setIsDuring(true); setIsOver(false);
//         const diff = endDate - now;
//         setTimeLeft({ days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), mins: Math.floor((diff % 3600000) / 60000), secs: Math.floor((diff % 60000) / 1000) });
//         return;
//       }
//       if (now > endDate) { setIsOver(true); setIsDuring(false); return; }
//       setIsDuring(false); setIsOver(false);
//       const diff = startDate - now;
//       setTimeLeft({ days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), mins: Math.floor((diff % 3600000) / 60000), secs: Math.floor((diff % 60000) / 1000) });
//     };
//     tick();
//     const t = setInterval(tick, 1000);
//     return () => clearInterval(t);
//   }, []);

//   if (isOver) return null;
//   if (!timeLeft) return <p>Loading...</p>;

//   return (
//     <div>
//       <div className="eid-widget">
//         <div className="eid-glow" />
//         <div className="eid-inner">
//           <span className="eid-moon">🕌</span>
//           <h3 className="eid-title">{isDuring ? "Eid ul-Adha Mubarak!" : "Eid ul-Adha 2026"}</h3>
//           <p className="eid-arabic">عيد الأضحى مبارك</p>
//           <p className="eid-sub">{isDuring ? "May Allah accept your sacrifices ✨" : "Countdown to the blessed day • 27 May 2026"}</p>
//           <div className="eid-countdown">
//             {[{ val: timeLeft.days, label: "Days" }, { val: timeLeft.hours, label: "Hours" }, { val: timeLeft.mins, label: "Mins" }, { val: timeLeft.secs, label: "Secs" }].map(({ val, label }) => (
//               <div key={label} className="eid-box">
//                 <span className="eid-num">{String(val).padStart(2, "0")}</span>
//                 <span className="eid-label">{label}</span>
//               </div>
//             ))}
//           </div>
//           {isDuring && <p className="eid-footer">🌙 Eid Mubarak to all! May Allah bless us all!</p>}
//           {!isDuring && <p className="eid-footer">🌙 Eid ul-Adha is coming — May Allah bless us all!</p>}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ─── YOUTUBE ─────────────────────────────────────────────────────── */
// const YOUTUBE_VIDEOS = [
//   { id: "f1miCme5za0", title: "মানবতার সৈনিক সংগঠন এর তরফ থেকে রক্ত দান শিবির" },
//   { id: "u2E-IXbCsxs", title: "রক্ত দান জীবন দান, আসুন সবাই এই মহৎ কাজে সঙ্গ দিই" },
//   { id: "mncbUIk813U", title: "bipader bondhu annually program 2026" },
//   { id: "XybksDJaFzE", title: "26th January – 77তম প্রজাতন্ত্র দিবস উদযাপন 2026" },
//   { id: "z6WF5N0dLcw", title: "space science # Narayanpur bipader bondhu welfare society 2025" },
//   { id: "x1q0lAJ1cMw", title: "নদিয়া এসপির নেতৃত্বে থানাপাড়া থানার অনুষ্ঠান 2025" },
//   { id: "4hP8xRZC3lQ", title: "B-negative রক্তদান করলেন ভাই 11তম" },
//   { id: "jzUKKI2HbPc", title: "দুর্গাপূজা উপলক্ষে বস্ত্র দান 2025" },
// ];

// function VideoThumb({ video, index, isActive, onClick }) {
//   const [hovered, setHovered] = useState(false);
//   return (
//     <div
//       onClick={onClick}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       className="video-thumb-wrap"
//       style={{ animationDelay: `${index * 0.07}s` }}
//     >
//       <div className={`video-thumb ${isActive ? "active" : ""} ${hovered ? "hovered" : ""}`}>
//         <div className="video-thumb-border" />
//         <div className="video-thumb-img-wrap">
//           <img src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} alt={video.title} loading="lazy" />
//           <div className="video-overlay" />
//           <div className="video-play-btn">
//             <div className="play-icon-wrap">
//               {isActive
//                 ? <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><rect x="6" y="5" width="4" height="14" rx="1.5" /><rect x="14" y="5" width="4" height="14" rx="1.5" /></svg>
//                 : <svg width="14" height="14" viewBox="0 0 24 24" fill="#0d9488"><polygon points="7,4 21,12 7,20" /></svg>
//               }
//             </div>
//           </div>
//           {index === 0 && <span className="badge-new">NEW</span>}
//           {isActive && <span className="badge-playing">▶ PLAYING</span>}
//         </div>
//         <p className="video-title">{video.title}</p>
//       </div>
//     </div>
//   );
// }

// function YouTubeSection() {
//   const [activeVideo, setActiveVideo] = useState(null);
//   const scrollRef = useRef(null);
//   const [ref, visible] = useScrollReveal(0.1);

//   const scrollLeft = () => {
//     scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
//   };

//   const scrollRight = () => {
//     scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
//   };

//   return (
//     <section ref={ref} className={`yt-section reveal-block ${visible ? "revealed" : ""}`}>
//       <div className="section-label" style={{ textAlign: "center" }}>
//         🎬 Official Activities
//       </div>
//       <h2 className="section-heading" style={{ textAlign: "center" }}>
//         Our Videos
//       </h2>
//       <p className="section-sub">{YOUTUBE_VIDEOS.length} videos · tap to watch</p>
//       {activeVideo !== null && (
//         <div className="yt-player">
//           <iframe
//             src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEOS[activeVideo].id}?autoplay=1&rel=0&modestbranding=1&fs=1`}
//             title={YOUTUBE_VIDEOS[activeVideo].title}
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
//             allowFullScreen
//           />
//           <button className="yt-close" onClick={() => setActiveVideo(null)}>✕</button>
//           <div className="yt-now-playing">▶ {YOUTUBE_VIDEOS[activeVideo].title}</div>
//         </div>
//       )}
//       <div className="yt-strip-wrap">
//         <button className="yt-btn left" onClick={scrollLeft}>◀</button>
//         <div className="yt-fade-left" />
//         <div className="yt-fade-right" />
//         <div className="yt-strip" ref={scrollRef}>
//           {YOUTUBE_VIDEOS.map((v, i) => (
//             <VideoThumb
//               key={v.id}
//               video={v}
//               index={i}
//               isActive={activeVideo === i}
//               onClick={() => setActiveVideo(i)}
//             />
//           ))}
//         </div>
//         <button className="yt-btn right" onClick={scrollRight}>▶</button>
//       </div>
//       {activeVideo === null && <p className="yt-hint">👆 Tap any thumbnail to watch here</p>}
//     </section>
//   );
// }

// /* ─── STATS ──────────────────────────────────────────────────────── */
// function AnimatedStat({ target, suffix = "+", label, icon }) {
//   const [count, setCount] = useState(0);
//   const [ref, visible] = useScrollReveal();
//   useEffect(() => {
//     if (!visible) return;
//     let start = 0;
//     const step = Math.ceil(target / 60);
//     const t = setInterval(() => {
//       start += step;
//       if (start >= target) { setCount(target); clearInterval(t); }
//       else setCount(start);
//     }, 25);
//     return () => clearInterval(t);
//   }, [visible, target]);
//   return (
//     <div ref={ref} className={`stat-card reveal-block ${visible ? "revealed" : ""}`}>
//       <span className="stat-icon">{icon}</span>
//       <span className="stat-number">{count.toLocaleString()}{suffix}</span>
//       <span className="stat-label">{label}</span>
//     </div>
//   );
// }

// /* ─── MEMBERS CAROUSEL ───────────────────────────────────────────── */
// function MembersCarousel() {
//   const scrollRef = useRef(null);
//   const animRef = useRef(null);
//   const [ready, setReady] = useState(false);
//   const [ref, visible] = useScrollReveal(0.05);

//   const memberPhotos = useMemo(
//     () => Array.from({ length: 10 }, (_, i) => `/images/img${i + 1}.jpg`),
//     []
//   );
//   const doubled = useMemo(() => [...memberPhotos, ...memberPhotos], [memberPhotos]);

//   useEffect(() => {
//     let loaded = 0;
//     memberPhotos.forEach(src => {
//       const img = new Image();
//       img.src = src;
//       img.onload = img.onerror = () => {
//         loaded++;
//         if (loaded === memberPhotos.length) setReady(true);
//       };
//     });
//   }, [memberPhotos]);

//   useEffect(() => {
//     if (!ready || !scrollRef.current) return;
//     const el = scrollRef.current;
//     let pos = -(el.scrollWidth / 2);
//     let paused = false;
//     const animate = () => {
//       if (!paused) {
//         pos += 0.4;
//         if (pos >= 0) pos = -(el.scrollWidth / 2);
//         el.style.transform = `translateX(${pos}px)`;
//       }
//       animRef.current = requestAnimationFrame(animate);
//     };
//     animRef.current = requestAnimationFrame(animate);
//     const onEnter = () => { paused = true; };
//     const onLeave = () => { paused = false; };
//     el.addEventListener("mouseenter", onEnter);
//     el.addEventListener("mouseleave", onLeave);
//     return () => {
//       cancelAnimationFrame(animRef.current);
//       el.removeEventListener("mouseenter", onEnter);
//       el.removeEventListener("mouseleave", onLeave);
//     };
//   }, [ready]);

//   return (
//     <section ref={ref} className={`members-section reveal-block ${visible ? "revealed" : ""}`}>
//       <div className="members-header">
//         <div className="section-label">👥 Community</div>
//         <h2 className="section-heading">Our Active Members</h2>
//       </div>
//       <div className="members-track-wrap">
//         <div className="members-fade-l" />
//         <div className="members-fade-r" />
//         <div className="members-overflow">
//           {!ready ? (
//             <div className="members-skeletons">
//               {Array(8).fill(0).map((_, i) => <div key={i} className="member-skeleton" />)}
//             </div>
//           ) : (
//             <div ref={scrollRef} className="members-track">
//               {doubled.map((photo, i) => (
//                 <div key={i} className="member-item">
//                   <div className="member-ring" />
//                   <img src={photo} alt={`Member ${(i % memberPhotos.length) + 1}`} loading="lazy"
//                     onError={e => e.target.src = `https://ui-avatars.com/api/?name=M${(i % memberPhotos.length) + 1}&background=0d9488&color=fff`}
//                   />
//                   <span className="member-dot" />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ─── HERO ────────────────────────────────────────────────────────── */
// function HeroSection({ onShowDocs, onShowId }) {
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

//   return (
//     <section className={`hero-section ${mounted ? "hero-in" : ""}`}>
//       <div className="hero-bg">
//         <div className="hero-orb orb1" />
//         <div className="hero-orb orb2" />
//         <div className="hero-orb orb3" />
//         <div className="hero-grid" />
//       </div>

//       <div className="hero-content">
//         <div className="hero-badge">
//           <span className="badge-dot" />
//           <span>Govt. Registered NGO · Reg. No: S0042589 of 2024–2025</span>
//         </div>

//         <h1 className="hero-title">
//           <span className="hero-title-line1">Narayan Pur</span>
//           <span className="hero-title-accent">Bipader Bondhu</span>
//           <span className="hero-title-line3">Welfare Society</span>
//         </h1>

//         <div className="hero-meta">
//           <span className="hero-estd">ESTD: 2020</span>
//           <span className="hero-sep">·</span>
//           <span className="hero-location">📍 Nadia, West Bengal, India</span>
//         </div>

//         <p className="hero-desc">
//           Standing beside people in times of need — disaster relief, social welfare,
//           and community empowerment rooted in compassion and humanity.
//         </p>

//         <div className="hero-actions">
//           <button onClick={onShowDocs} className="btn-primary">
//             <span>📋</span> Official Documents
//           </button>
//           <a href="https://github.com/AmirSohelSardar/bipader-bondhu/releases/download/v1.0/app-arm64-v8a-release.apk"
//             download className="btn-secondary">
//             <span>📱</span> Download App
//             <span className="btn-badge">APK</span>
//           </a>
//           <button onClick={onShowId} className="btn-outline">
//             <span>🪪</span> Identity Card
//             <span className="btn-badge-red">NEW</span>
//           </button>
//           <a href="/blood-donation" className="btn-blood">
//             <span>🩸</span> NGO Event Hub
//             <span className="btn-badge-gold">NEW</span>
//           </a>
//         </div>
//       </div>

//       <div className="hero-scroll-hint">
//         <div className="scroll-arrow" />
//         <span>Scroll to explore</span>
//       </div>
//     </section>
//   );
// }

// /* ─── MISSION CARD ───────────────────────────────────────────────── */
// function MissionCard() {
//   const [ref, visible] = useScrollReveal();
//   return (
//     <div ref={ref} className={`mission-wrap reveal-block ${visible ? "revealed" : ""}`}>
//       <CallToAction />
//     </div>
//   );
// }

// /* ─── MAIN EXPORT ────────────────────────────────────────────────── */
// export default function Home() {
//   const [posts, setPosts] = useState([]);
//   const [postsLoading, setPostsLoading] = useState(true);
//   const [postsError, setPostsError] = useState(false);
//   const [showIdModal, setShowIdModal] = useState(false);
//   const [showDocsModal, setShowDocsModal] = useState(false);
//   const [activeDoc, setActiveDoc] = useState("reg");
//   const [postsRef, postsVisible] = useScrollReveal(0.05);

//   useEffect(() => {
//     (async () => {
//       try {
//         setPostsLoading(true);
//         const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/home`);
//         if (!res.ok) throw new Error();
//         setPosts(await res.json() || []);
//       } catch { setPostsError(true); }
//       finally { setPostsLoading(false); }
//     })();
//   }, []);

//   const docSrc = activeDoc === "reg"
//     ? "/images/register.pdf"
//     : activeDoc === "tax12a"
//     ? "/images/bipader1.pdf"
//     : "/images/bipader2.pdf";

//   return (
//     <>
//       <style>{`
//         /* ── TOKENS ── */
//         :root {
//           --navy:    #050d1a;
//           --navy2:   #0a1628;
//           --navy3:   #0f2040;
//           --teal:    #0d9488;
//           --teal2:   #14b8a6;
//           --teal3:   #5eead4;
//           --gold:    #f59e0b;
//           --gold2:   #fbbf24;
//           --rose:    #e11d48;
//           --white:   #f0f9ff;
//           --muted:   #94a3b8;
//           --card-bg: rgba(10,22,40,0.85);
//           --border:  rgba(13,148,136,0.25);
//         }

//         /* ── SCROLL REVEAL ── */
//         .reveal-block { opacity: 0; transform: translateY(40px); transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1); }
//         .revealed { opacity: 1; transform: translateY(0); }

//         /* ── PAGE BG ── */
//         body, #root { background: var(--navy) !important; }
//         .home-wrap { background: var(--navy); min-height: 100vh; font-family: 'Georgia', serif; color: var(--white); }

//         /* ── HERO ── */
//         .hero-section {
//           position: relative; min-height: 92vh; display: flex; flex-direction: column;
//           justify-content: center; align-items: center; text-align: center;
//           padding: 6rem 1.5rem 5rem; overflow: hidden;
//           opacity: 0; transform: translateY(24px);
//           transition: opacity 1s ease, transform 1s ease;
//         }
//         .hero-section.hero-in { opacity: 1; transform: translateY(0); }

//         .hero-bg { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
//         .hero-grid {
//           position: absolute; inset: 0;
//           background-image: linear-gradient(rgba(13,148,136,0.06) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(13,148,136,0.06) 1px, transparent 1px);
//           background-size: 60px 60px;
//         }
//         .hero-orb {
//           position: absolute; border-radius: 50%; filter: blur(80px); animation: orbFloat 8s ease-in-out infinite;
//         }
//         .orb1 { width: 500px; height: 500px; top: -150px; left: -150px; background: radial-gradient(circle, rgba(13,148,136,0.18), transparent 70%); animation-delay: 0s; }
//         .orb2 { width: 400px; height: 400px; bottom: -100px; right: -100px; background: radial-gradient(circle, rgba(245,158,11,0.12), transparent 70%); animation-delay: -3s; }
//         .orb3 { width: 300px; height: 300px; top: 40%; left: 55%; background: radial-gradient(circle, rgba(225,29,72,0.09), transparent 70%); animation-delay: -5s; }
//         @keyframes orbFloat {
//           0%,100% { transform: translateY(0) scale(1); }
//           50% { transform: translateY(-30px) scale(1.05); }
//         }

//         .hero-content { position: relative; z-index: 2; max-width: 860px; }

//         .hero-badge {
//           display: inline-flex; align-items: center; gap: 8px;
//           background: rgba(13,148,136,0.12); border: 1px solid var(--border);
//           backdrop-filter: blur(10px); padding: 6px 16px; border-radius: 999px;
//           font-size: 0.72rem; font-family: 'Courier New', monospace; letter-spacing: 0.08em;
//           color: var(--teal3); margin-bottom: 2rem; text-transform: uppercase;
//           animation: badgePop 0.6s 0.3s both;
//         }
//         @keyframes badgePop { from { opacity:0; transform: scale(0.85); } to { opacity:1; transform: scale(1); } }
//         .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--teal2); animation: pulse 2s infinite; }
//         @keyframes pulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.5;transform:scale(1.3);} }

//         .hero-title { display: flex; flex-direction: column; gap: 0.2em; line-height: 1.1; margin-bottom: 1.2rem; }
//         .hero-title-line1, .hero-title-line3 {
//           font-size: clamp(2.2rem, 5vw, 4.2rem); font-weight: 700;
//           color: var(--white); letter-spacing: -0.02em;
//           animation: slideUp 0.8s both;
//         }
//         .hero-title-line3 { animation-delay: 0.15s; }
//         .hero-title-accent {
//           font-size: clamp(2.8rem, 6.5vw, 5.5rem); font-weight: 800; letter-spacing: -0.03em;
//           background: linear-gradient(135deg, var(--teal2), var(--gold), var(--teal3));
//           -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
//           animation: slideUp 0.8s 0.07s both;
//           text-shadow: none;
//           filter: drop-shadow(0 0 40px rgba(13,148,136,0.35));
//         }
//         @keyframes slideUp { from { opacity:0; transform: translateY(30px); } to { opacity:1; transform: translateY(0); } }

//         .hero-meta { display: flex; align-items: center; gap: 12px; justify-content: center; margin-bottom: 1.2rem; flex-wrap: wrap; }
//         .hero-estd { background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.3); color: var(--gold2); padding: 3px 12px; border-radius: 999px; font-size: 0.78rem; font-family: 'Courier New', monospace; }
//         .hero-sep { color: var(--muted); }
//         .hero-location { color: var(--muted); font-size: 0.82rem; font-family: sans-serif; }

//         .hero-desc {
//           max-width: 600px; margin: 0 auto 2.5rem; font-size: clamp(0.9rem, 2vw, 1.05rem);
//           color: #94a3b8; line-height: 1.7; font-family: 'Georgia', serif;
//           animation: slideUp 0.8s 0.25s both;
//         }

//         .hero-actions {
//           display: flex; flex-wrap: wrap; gap: 12px; justify-content: center;
//           animation: slideUp 0.8s 0.35s both;
//         }
//         .btn-primary, .btn-secondary, .btn-outline, .btn-blood {
//           position: relative; display: inline-flex; align-items: center; gap: 7px;
//           padding: 11px 22px; border-radius: 12px; font-size: 0.9rem; font-weight: 600;
//           font-family: sans-serif; cursor: pointer; border: none; text-decoration: none;
//           transition: transform 0.2s, box-shadow 0.2s;
//         }
//         .btn-primary { background: linear-gradient(135deg, var(--teal), #0a7c73); color: #fff; box-shadow: 0 4px 20px rgba(13,148,136,0.4); }
//         .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(13,148,136,0.55); }
//         .btn-secondary { background: linear-gradient(135deg, #7c3aed, #ec4899, #f97316); color: #fff; box-shadow: 0 4px 20px rgba(124,58,237,0.3); }
//         .btn-secondary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(124,58,237,0.45); }
//         .btn-outline { background: rgba(13,148,136,0.1); border: 1px solid var(--teal); color: var(--teal2); }
//         .btn-outline:hover { background: rgba(13,148,136,0.2); transform: translateY(-2px); }
//         .btn-blood { background: linear-gradient(135deg, #7f0000, #e53935); color: #fff; box-shadow: 0 4px 20px rgba(183,28,28,0.4); }
//         .btn-blood:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(183,28,28,0.55); }
//         .btn-badge, .btn-badge-red, .btn-badge-gold {
//           position: absolute; top: -10px; right: -10px;
//           font-size: 0.6rem; font-weight: 900; padding: 2px 6px; border-radius: 999px; color: #fff;
//         }
//         .btn-badge { background: var(--gold); color: #000; }
//         .btn-badge-red { background: var(--rose); animation: pulse 2s infinite; }
//         .btn-badge-gold { background: linear-gradient(135deg, var(--gold), var(--gold2)); color: #000; }

//         .hero-scroll-hint {
//           position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
//           display: flex; flex-direction: column; align-items: center; gap: 6px;
//           color: var(--muted); font-size: 0.72rem; font-family: sans-serif; letter-spacing: 0.1em;
//           animation: fadeInDelay 1.5s 1.2s both;
//         }
//         @keyframes fadeInDelay { from{opacity:0;transform:translateX(-50%) translateY(10px);} to{opacity:1;transform:translateX(-50%) translateY(0);} }
//         .scroll-arrow {
//           width: 20px; height: 20px; border-right: 2px solid var(--teal); border-bottom: 2px solid var(--teal);
//           transform: rotate(45deg); animation: arrowBounce 1.5s infinite;
//         }
//         @keyframes arrowBounce { 0%,100%{transform:rotate(45deg) translateY(0);} 50%{transform:rotate(45deg) translateY(6px);} }

//         /* ── STATS STRIP ── */
//         .stats-strip {
//           display: flex; gap: 1px; background: var(--border);
//           border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
//           overflow: hidden; margin-bottom: 5rem;
//         }
//         .stat-card {
//           flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px;
//           padding: 2.5rem 1rem; background: var(--navy2);
//           transition: background 0.3s;
//         }
//         .stat-card:hover { background: var(--navy3); }
//         .stat-icon { font-size: 1.8rem; }
//         .stat-number { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; color: var(--teal2); font-family: 'Courier New', monospace; }
//         .stat-label { font-size: 0.75rem; font-family: sans-serif; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; text-align: center; }

//         /* ── SECTION LABELS ── */
//         .section-label {
//           display: inline-block; font-size: 0.7rem; font-family: sans-serif;
//           text-transform: uppercase; letter-spacing: 0.12em; color: var(--teal2);
//           background: rgba(13,148,136,0.1); border: 1px solid var(--border);
//           padding: 4px 14px; border-radius: 999px; margin-bottom: 0.75rem;
//         }
//         .section-heading {
//           font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 700; color: var(--white);
//           letter-spacing: -0.02em; margin-bottom: 0.4rem; line-height: 1.15;
//         }
//         .section-sub { font-size: 0.82rem; font-family: sans-serif; color: var(--muted); margin-bottom: 2rem; }

//         /* ── MEMBERS ── */
//         .members-section { padding: 4rem 0; }
//         .members-header { text-align: center; padding: 0 1.5rem; margin-bottom: 2.5rem; }
//         .members-track-wrap { position: relative; }
//         .members-overflow { overflow: hidden; padding: 1rem 0; }
//         .members-track { display: flex; gap: 24px; width: max-content; will-change: transform; }
//         .members-fade-l, .members-fade-r {
//           position: absolute; top: 0; bottom: 0; width: 80px; z-index: 2; pointer-events: none;
//         }
//         .members-fade-l { left: 0; background: linear-gradient(90deg, var(--navy), transparent); }
//         .members-fade-r { right: 0; background: linear-gradient(-90deg, var(--navy), transparent); }
//         .member-item { flex-shrink: 0; position: relative; cursor: pointer; }
//         .member-item:hover .member-ring { opacity: 1; transform: scale(1.12); }
//         .member-ring {
//           position: absolute; inset: -4px; border-radius: 50%;
//           background: linear-gradient(135deg, var(--teal2), var(--gold));
//           opacity: 0; transition: all 0.35s ease; z-index: 0;
//         }
//         .member-item img {
//           width: 88px; height: 88px; border-radius: 50%; object-fit: cover;
//           border: 3px solid var(--navy3); position: relative; z-index: 1;
//           transition: transform 0.35s ease;
//         }
//         .member-item:hover img { transform: scale(1.08); }
//         .member-dot {
//           position: absolute; bottom: 4px; right: 4px; z-index: 2;
//           width: 12px; height: 12px; border-radius: 50%; background: #22c55e;
//           border: 2px solid var(--navy2);
//         }
//         .members-skeletons { display: flex; gap: 24px; padding: 0 2rem; }
//         .member-skeleton { width: 88px; height: 88px; border-radius: 50%; background: var(--navy3); animation: shimmer 1.5s infinite; }
//         @keyframes shimmer { 0%,100%{opacity:0.5;} 50%{opacity:1;} }

//         /* ── EID ── */
//         .eid-widget {
//           position: relative; border-radius: 24px; overflow: hidden;
//           background: linear-gradient(135deg, #042f2e, #064e3b, #065f46);
//           border: 1px solid rgba(52,211,153,0.2);
//           box-shadow: 0 20px 60px rgba(4,47,46,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
//           margin: 2rem auto; max-width: 700px;
//         }
//         .eid-glow {
//           position: absolute; inset: 0; pointer-events: none;
//           background: radial-gradient(ellipse at 50% 0%, rgba(52,211,153,0.15), transparent 70%);
//         }
//         .eid-inner { position: relative; z-index: 1; padding: 2.5rem 2rem; text-align: center; }
//         .eid-moon { font-size: 3rem; display: block; margin-bottom: 0.5rem; animation: eidFloat 3s ease-in-out infinite; }
//         @keyframes eidFloat { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
//         .eid-title { font-size: clamp(1.5rem, 4vw, 2rem); color: #fcd34d; font-weight: 700; margin-bottom: 0.25rem; }
//         .eid-arabic { font-size: 1.1rem; color: #6ee7b7; margin-bottom: 0.25rem; }
//         .eid-sub { font-size: 0.82rem; color: #a7f3d0; font-family: sans-serif; margin-bottom: 1.5rem; }
//         .eid-countdown { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 1rem; }
//         .eid-box { background: rgba(255,255,255,0.08); border: 1px solid rgba(252,211,77,0.25); border-radius: 14px; padding: 14px 18px; min-width: 72px; }
//         .eid-num { display: block; font-size: 2rem; font-weight: 700; color: #fcd34d; font-family: 'Courier New', monospace; }
//         .eid-label { display: block; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.12em; color: #6ee7b7; font-family: sans-serif; }
//         .eid-footer { font-size: 0.8rem; color: #fcd34d; font-family: sans-serif; }

//         /* ── YOUTUBE ── */
//         .yt-section { padding: 4rem 0; }
//         .yt-player {
//           position: relative; width: 100%; aspect-ratio: 16/9; max-height: 480px;
//           border-radius: 20px; overflow: hidden; margin-bottom: 2rem;
//           border: 1px solid var(--border); box-shadow: 0 20px 60px rgba(0,0,0,0.5);
//         }
//         .yt-player iframe { width: 100%; height: 100%; border: none; }
//         .yt-close {
//           position: absolute; top: 12px; right: 12px; z-index: 10;
//           width: 36px; height: 36px; border-radius: 50%; background: rgba(0,0,0,0.7);
//           border: 1px solid rgba(255,255,255,0.2); color: #fff; font-size: 14px; font-weight: 700;
//           cursor: pointer; transition: transform 0.2s; display: flex; align-items: center; justify-content: center;
//         }
//         .yt-close:hover { transform: scale(1.15); }
//         .yt-now-playing {
//           position: absolute; bottom: 0; left: 0; right: 0; padding: 10px 16px;
//           font-size: 0.78rem; color: #fff; font-family: sans-serif;
//           background: linear-gradient(to top, rgba(0,0,0,0.75), transparent);
//           white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
//         }
//         .yt-strip-wrap { position: relative; }
//         .yt-strip {
//           display: flex; gap: 16px; overflow-x: auto; padding: 0 44px 12px;
//           scrollbar-width: thin; scrollbar-color: var(--teal) var(--navy2);
//         }
//         .yt-strip::-webkit-scrollbar { height: 4px; }
//         .yt-strip::-webkit-scrollbar-thumb { background: var(--teal); border-radius: 2px; }
//         .yt-fade-left, .yt-fade-right {
//           position: absolute; top: 0; bottom: 16px; width: 60px; z-index: 2; pointer-events: none;
//         }
//         .yt-fade-left { left: 0; background: linear-gradient(90deg, var(--navy), transparent); }
//         .yt-fade-right { right: 0; background: linear-gradient(-90deg, var(--navy), transparent); }
//         .yt-hint { text-align: center; font-size: 0.78rem; font-family: sans-serif; color: var(--muted); margin-top: 0.5rem; }

//         .yt-btn {
//           position: absolute; top: 40%; transform: translateY(-50%);
//           z-index: 5; background: rgba(0,0,0,0.6);
//           border: 1px solid rgba(255,255,255,0.2); color: white;
//           width: 36px; height: 36px; border-radius: 50%; cursor: pointer;
//           display: flex; align-items: center; justify-content: center;
//           font-size: 12px; transition: background 0.2s;
//         }
//         .yt-btn.left { left: 4px; }
//         .yt-btn.right { right: 4px; }
//         .yt-btn:hover { background: rgba(13,148,136,0.8); }

//         .video-thumb-wrap {
//           flex-shrink: 0; width: clamp(160px, 38vw, 210px);
//           position: relative;
//         }
//         .video-thumb { cursor: pointer; position: relative; }
//         .video-thumb-border {
//           position: absolute; inset: -2px; border-radius: 14px;
//           background: linear-gradient(135deg, #334155, #475569); z-index: 0; transition: background 0.25s;
//         }
//         .video-thumb.active .video-thumb-border { background: linear-gradient(135deg, var(--teal), var(--teal2)); box-shadow: 0 0 20px rgba(13,148,136,0.5); }
//         .video-thumb.hovered .video-thumb-border { background: linear-gradient(135deg, #6366f1, #8b5cf6); box-shadow: 0 8px 24px rgba(99,102,241,0.3); }
//         .video-thumb-img-wrap {
//           position: relative; border-radius: 12px; overflow: hidden;
//           aspect-ratio: 16/9; background: #000; z-index: 1;
//           transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1);
//         }
//         .video-thumb.active .video-thumb-img-wrap,
//         .video-thumb.hovered .video-thumb-img-wrap { transform: translateY(-3px) scale(1.03); }
//         .video-thumb-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
//         .video-overlay {
//           position: absolute; inset: 0;
//           background: linear-gradient(to top, rgba(0,0,0,0.5), transparent 60%);
//         }
//         .video-play-btn {
//           position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
//         }
//         .badge-new, .badge-playing {
//           position: absolute; font-size: 0.6rem; font-weight: 900; padding: 2px 7px; border-radius: 999px; color: #fff;
//         }
//         .badge-new { top: 6px; left: 6px; background: linear-gradient(135deg, #ef4444, #f97316); }
//         .badge-playing { top: 6px; right: 6px; background: linear-gradient(135deg, var(--teal), var(--teal2)); }
//         .video-title {
//   margin-top: 8px;
//   font-size: 0.8rem;
//   font-family: sans-serif;
//   color: #cbd5e1;
//   line-height: 1.4;
//   max-height: 2.8em;
//   overflow: hidden;
// }
//         .video-thumb.active .video-title { color: var(--teal2); }
//         .video-thumb.hovered .video-title { color: #a5b4fc; }

//         /* ── PLAY BTN WRAPPER ── */
//         .play-icon-wrap {
//           width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.9);
//           display: flex; align-items: center; justify-content: center;
//           color: var(--teal); transition: all 0.25s ease;
//         }
//         .video-thumb.active .play-icon-wrap { background: rgba(13,148,136,0.95); }

//         /* ── POSTS ── */
//         .posts-section { padding: 4rem 0; }
//         .posts-section .section-heading { text-align: center; }
//         .posts-section .section-label { display: block; text-align: center; margin: 0 auto 0.5rem; }
//         .posts-grid { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; margin-top: 2rem; }
//         .posts-view-all { display: block; text-align: center; margin-top: 2rem; color: var(--teal2); font-family: sans-serif; font-size: 0.95rem; text-decoration: none; transition: color 0.2s; }
//         .posts-view-all:hover { color: var(--teal3); }

//         /* ── MODALS ── */
//         .modal-overlay {
//           position: fixed; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(8px);
//           display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 1rem;
//           animation: fadeIn 0.2s;
//         }
//         @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
//         .modal-box {
//           background: var(--navy2); border: 1px solid var(--border); border-radius: 20px;
//           width: 90%; max-width: 420px; padding: 2rem;
//           animation: scaleIn 0.25s cubic-bezier(0.34,1.56,0.64,1);
//         }
//         @keyframes scaleIn { from{transform:scale(0.88);opacity:0;} to{transform:scale(1);opacity:1;} }
//         .modal-title { font-size: 1.2rem; font-weight: 700; color: var(--white); margin-bottom: 1.2rem; text-align: center; font-family: sans-serif; }
//         .modal-btn {
//           display: block; width: 100%; padding: 11px; margin-bottom: 10px; border-radius: 10px;
//           font-size: 0.9rem; font-weight: 600; font-family: sans-serif; cursor: pointer; border: none;
//           transition: transform 0.18s, box-shadow 0.18s; color: #fff;
//         }
//         .modal-btn.green { background: linear-gradient(135deg, #16a34a, #15803d); }
//         .modal-btn.red { background: linear-gradient(135deg, #dc2626, #b91c1c); }
//         .modal-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,0,0,0.3); }
//         .modal-cancel { display: block; text-align: center; margin-top: 8px; color: var(--muted); font-size: 0.83rem; font-family: sans-serif; cursor: pointer; }
//         .modal-cancel:hover { color: var(--white); }

//         /* ── DOCS MODAL ── */
//         .docs-modal {
//           background: var(--navy2); border: 1px solid var(--border); border-radius: 20px;
//           width: 95%; max-width: 860px; max-height: 90vh; display: flex; flex-direction: column;
//           animation: scaleIn 0.25s cubic-bezier(0.34,1.56,0.64,1); overflow: hidden;
//         }
//         .docs-header { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border); }
//         .docs-header h2 { font-size: 1.05rem; font-weight: 700; color: var(--white); font-family: sans-serif; }
//         .docs-close { background: none; border: none; color: var(--muted); font-size: 1.4rem; cursor: pointer; line-height: 1; transition: color 0.2s; }
//         .docs-close:hover { color: var(--white); }
//         .docs-tabs { display: flex; gap: 0; border-bottom: 1px solid var(--border); padding: 0 1.5rem; }
//         .docs-tab {
//           padding: 0.9rem 1.1rem; font-size: 0.82rem; font-family: sans-serif; cursor: pointer;
//           background: none; border: none; border-bottom: 2px solid transparent;
//           color: var(--muted); transition: all 0.2s; white-space: nowrap;
//         }
//         .docs-tab.active { border-bottom-color: var(--teal); color: var(--teal2); }
//         .docs-tab:hover:not(.active) { color: var(--white); }
//         .docs-body { flex: 1; overflow: hidden; padding: 1rem; }
//         .docs-body iframe { width: 100%; height: 60vh; border-radius: 10px; border: 1px solid var(--border); }
//         .docs-footer { padding: 0.75rem 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; }
//         .docs-open-btn { color: var(--teal2); font-size: 0.83rem; font-family: sans-serif; text-decoration: none; padding: 6px 14px; border: 1px solid var(--border); border-radius: 8px; transition: background 0.2s; }
//         .docs-open-btn:hover { background: rgba(13,148,136,0.1); }

//         /* ── MISSION WRAP ── */
//         .mission-wrap { max-width: 900px; margin: 0 auto; }

//         /* ── INNER PAGE ── */
//         .inner-page { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem 4rem; }

//         /* ── DIVIDER ── */
//         .teal-divider { height: 1px; background: linear-gradient(90deg, transparent, var(--teal), transparent); margin: 3rem 0; opacity: 0.4; }

//         @media (max-width: 640px) {
//           .hero-actions { flex-direction: column; align-items: center; }
//           .hero-actions > * { width: 100%; max-width: 300px; justify-content: center; }
//           .stats-strip { flex-direction: column; gap: 0; }
//           .stat-card { padding: 1.5rem; flex-direction: row; justify-content: center; gap: 16px; }
//           .eid-countdown { gap: 8px; }
//           .eid-box { min-width: 58px; padding: 10px 12px; }
//         }
//       `}</style>

//       <div className="home-wrap">
//         {/* HERO */}
//         <HeroSection onShowDocs={() => setShowDocsModal(true)} onShowId={() => setShowIdModal(true)} />

//         {/* STATS STRIP */}
//         <div className="stats-strip">
//           <AnimatedStat target={2500} suffix="+" label="Blood Donors Served" icon="🩸" />
//           <AnimatedStat target={300} suffix="+" label="Financial Aid Cases" icon="🤝" />
//           <AnimatedStat target={5} suffix="+" label="Years of Service" icon="📅" />
//           <AnimatedStat target={3000} suffix="+" label="Website Visits" icon="👁" />
//         </div>

//         <div className="inner-page">
//           {/* MEMBERS */}
//           <MembersCarousel />

//           <div className="teal-divider" />

//           {/* EID */}
//           <EidUlAdhaWidget />

//           <div className="teal-divider" />

//           {/* CALL TO ACTION */}
//           <MissionCard />

//           <div className="teal-divider" />

//           {/* VIDEOS */}
//           <YouTubeSection />

//           <div className="teal-divider" />

//           {/* POSTS */}
//           <section ref={postsRef} className={`posts-section reveal-block ${postsVisible ? "revealed" : ""}`}>
//             <div className="section-label">📰 Activity Updates</div>
//             <h2 className="section-heading">Recent Posts</h2>
//             <div className="posts-grid">
//               {postsLoading && Array(6).fill(0).map((_, i) => <SkeletonPostCard key={i} />)}
//               {!postsLoading && postsError && (
//                 <p style={{ color: "#f87171", fontFamily: "sans-serif", fontSize: "0.9rem" }}>
//                   Failed to load posts. Please refresh the page.
//                 </p>
//               )}
//               {!postsLoading && !postsError && posts.map(post => <PostCard key={post._id} post={post} />)}
//             </div>
//             {!postsLoading && posts.length > 0 && (
//               <Link to="/search" className="posts-view-all">View all posts →</Link>
//             )}
//           </section>
//         </div>

//         {/* IDENTITY MODAL */}
//         {showIdModal && (
//           <div className="modal-overlay" onClick={() => setShowIdModal(false)}>
//             <div className="modal-box" onClick={e => e.stopPropagation()}>
//               <p className="modal-title">🪪 Apply Identity Card</p>
//               <button className="modal-btn green" onClick={() => { setShowIdModal(false); window.open("/identity-user.html", "_blank"); }}>
//                 User Login
//               </button>
//               <button className="modal-btn red" onClick={() => { setShowIdModal(false); window.open("/identity-admin.html", "_blank"); }}>
//                 Admin Login
//               </button>
//               <span className="modal-cancel" onClick={() => setShowIdModal(false)}>Cancel</span>
//             </div>
//           </div>
//         )}

//         {/* DOCUMENTS MODAL */}
//         {showDocsModal && (
//           <div className="modal-overlay" onClick={() => setShowDocsModal(false)}>
//             <div className="docs-modal" onClick={e => e.stopPropagation()}>
//               <div className="docs-header">
//                 <h2>📋 Official Documents</h2>
//                 <button className="docs-close" onClick={() => setShowDocsModal(false)}>✕</button>
//               </div>
//               <div className="docs-tabs">
//                 {[
//                   { id: "reg", label: "🏛️ Registration" },
//                   { id: "tax12a", label: "📄 12A Certificate" },
//                   { id: "tax80g", label: "📄 80G Certificate" }
//                 ].map(tab => (
//                   <button
//                     key={tab.id}
//                     className={`docs-tab ${activeDoc === tab.id ? "active" : ""}`}
//                     onClick={() => setActiveDoc(tab.id)}
//                   >
//                     {tab.label}
//                   </button>
//                 ))}
//               </div>
//               <div className="docs-body">
//                 <iframe key={activeDoc} src={docSrc} title="Document Viewer" />
//               </div>
//               <div className="docs-footer">
//                 <a href={docSrc} target="_blank" rel="noopener noreferrer" className="docs-open-btn">
//                   Open in New Tab ↗
//                 </a>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }


import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState, useRef } from "react";
import PostCard from "../components/PostCard";
import SkeletonPostCard from "../components/SkeletonPostCard";

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
        setIsDuring(true);
        setIsOver(false);
        const diff = endDate - now;
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((diff % (1000 * 60)) / 1000),
        });
        return;
      }

      if (now > endDate) {
        setIsOver(true);
        setIsDuring(false);
        return;
      }

      setIsDuring(false);
      setIsOver(false);
      const diff = startDate - now;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  if (isOver) return null;
  if (!timeLeft) return null;

  if (isDuring) {
    return (
      <div
        className="w-full rounded-2xl p-8 text-center my-4"
        style={{
          background: "linear-gradient(135deg, #064e3b, #065f46, #047857, #064e3b)",
        }}
      >
        <div className="text-5xl mb-3" style={{ animation: "float 3s ease-in-out infinite" }}>🕌</div>
        <h2 className="text-3xl font-semibold mb-1" style={{ color: "#fcd34d" }}>
          Eid ul-Adha Mubarak!
        </h2>
        <p className="text-xl mb-2" style={{ color: "#6ee7b7" }}>عيد الأضحى مبارك 🌙</p>
        <p className="text-sm max-w-sm mx-auto mb-4" style={{ color: "#a7f3d0" }}>
          May Allah accept your sacrifices and devotion. Wishing you and your
          family peace, joy, and countless blessings this Eid. Eid Mubarak! ✨
        </p>
        {timeLeft && (
          <div>
            <p className="text-xs mb-3" style={{ color: "#fcd34d" }}>⏳ Eid celebrations end in</p>
            <div className="flex gap-3 justify-center flex-wrap">
              {[
                { val: timeLeft.days, label: "Days" },
                { val: timeLeft.hours, label: "Hours" },
                { val: timeLeft.mins, label: "Mins" },
                { val: timeLeft.secs, label: "Secs" },
              ].map(({ val, label }) => (
                <div
                  key={label}
                  className="rounded-xl px-4 py-3 min-w-[70px]"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(252,211,77,0.3)",
                  }}
                >
                  <span className="text-3xl font-medium block" style={{ color: "#fcd34d" }}>{val}</span>
                  <span className="text-xs uppercase tracking-widest mt-1 block" style={{ color: "#6ee7b7" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Countdown before Eid
  return (
    <div
      className="w-full rounded-2xl p-6 text-center my-4"
      style={{
        background: "linear-gradient(135deg, #064e3b, #065f46, #047857, #064e3b)",
      }}
    >
      <div className="text-4xl mb-2" style={{ animation: "float 3s ease-in-out infinite" }}>🕌</div>
      <h3 className="text-xl font-medium mb-1" style={{ color: "#fcd34d" }}>
        Eid ul-Adha 2026
      </h3>
      <p className="text-xs mb-1" style={{ color: "#6ee7b7" }}>عيد الأضحى مبارك</p>
      <p className="text-xs mb-4" style={{ color: "#6ee7b7" }}>
       Countdown to the blessed day • 27 May 2026
      </p>

      <div className="flex gap-3 justify-center flex-wrap">
        {[
          { val: timeLeft.days, label: "Days" },
          { val: timeLeft.hours, label: "Hours" },
          { val: timeLeft.mins, label: "Mins" },
          { val: timeLeft.secs, label: "Secs" },
        ].map(({ val, label }) => (
          <div
            key={label}
            className="rounded-xl px-4 py-3 min-w-[70px]"
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(252,211,77,0.3)",
            }}
          >
            <span className="text-3xl font-medium block" style={{ color: "#fcd34d" }}>{val}</span>
            <span className="text-xs uppercase tracking-widest mt-1 block" style={{ color: "#6ee7b7" }}>{label}</span>
          </div>
        ))}
      </div>

      <p className="text-xs mt-4" style={{ color: "#fcd34d" }}>
        🌙 Eid ul-Adha is coming — May Allah bless us all!
      </p>
    </div>
  );
}

// ── ADD YOUR YOUTUBE VIDEOS HERE (newest first) ──────────────────────────────
const YOUTUBE_VIDEOS = [
  // { id: "new id here", title: "new vide here" },
  { id: "f1miCme5za0", title: "মানবতার সৈনিক সংগঠন এর তরফ থেকে রক্ত দান শিবির এ উপস্থিত ছিলাম।" },
  { id: "u2E-IXbCsxs", title: "রক্ত দান জীবন দান, আসুন সবাই এই মহৎ কাজে সঙ্গ দিই" },
  { id: "mncbUIk813U", title: "bipader bondhu annually program 2026" },
  { id: "XybksDJaFzE", title: "26 th. January. 77 তম প্রজাতন্ত্র দিবস উদযাপিত করা হইল বিপদের বন্ধু ওয়েলফেয়ার সোসাইটির অফিসে 2026" },
  { id: "z6WF5N0dLcw", title: "space science # Narayanpur bipader bondhu welfare society 2025" },
  { id: "x1q0lAJ1cMw", title: "নদিয়া এসপির নেতৃত্বে অ্যাডিশনাল এসপি উপস্থিতিতে ও থানাপাড়া থানার ওসি সৌরভ কুমার চট্টোপাধ্যায় 2025" },
  { id: "4hP8xRZC3lQ", title: "B - negative রক্তদান করলেন ভাই 11 তম।" },
  { id: "jzUKKI2HbPc", title: "নারায়নপুর বিপদের বন্ধু ওয়েলফেয়ার সোসাইটির পক্ষ থেকে দুর্গাপূজা উপলক্ষে বস্ত্র দান 2025" },
  // To add more: paste { id: "VIDEO_ID", title: "Title" }, above this line
];
// ─────────────────────────────────────────────────────────────────────────────

function VideoThumb({ video, index, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);
  const thumb = `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`;

  return (
   <div
      onClick={() => { setHovered(true); onClick(); setTimeout(() => setHovered(false), 400); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setTimeout(() => setHovered(false), 400)}
      className="flex-shrink-0 cursor-pointer"
      style={{ width: "clamp(155px, 40vw, 210px)" }}
    >
      <div
        className="relative rounded-2xl p-[2px] transition-all duration-300"
        style={{
          background: isActive
            ? "linear-gradient(135deg, #0d9488, #06b6d4, #0d9488)"
            : hovered
            ? "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)"
            : "linear-gradient(135deg, #e5e7eb, #d1d5db)",
          boxShadow: isActive
            ? "0 0 20px rgba(13,148,136,0.5), 0 8px 32px rgba(13,148,136,0.25)"
            : hovered
            ? "0 8px 28px rgba(99,102,241,0.35)"
            : "0 2px 10px rgba(0,0,0,0.1)",
          transform: hovered || isActive ? "translateY(-4px) scale(1.03)" : "translateY(0) scale(1)",
          transition: "all 0.28s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <div className="relative rounded-2xl overflow-hidden bg-black" style={{ aspectRatio: "16/9" }}>
          <img
            src={thumb}
            alt={video.title}
            className="w-full h-full object-cover"
            style={{ transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 0.5s ease" }}
            loading="lazy"
          />
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
              opacity: hovered ? 1 : 0.6,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="flex items-center justify-center rounded-full shadow-2xl"
              style={{
                width: hovered || isActive ? 48 : 40,
                height: hovered || isActive ? 48 : 40,
                background: isActive ? "rgba(13,148,136,0.95)" : "rgba(255,255,255,0.92)",
                backdropFilter: "blur(4px)",
                transition: "all 0.28s ease",
              }}
            >
              {isActive ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <rect x="6" y="5" width="4" height="14" rx="1.5" />
                  <rect x="14" y="5" width="4" height="14" rx="1.5" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#0d9488">
                  <polygon points="7,4 21,12 7,20" />
                </svg>
              )}
            </div>
          </div>
          {index === 0 && (
            <span
              className="absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded-full text-white shadow-lg animate-pulse"
              style={{ background: "linear-gradient(135deg, #ef4444, #f97316)" }}
            >
              NEW
            </span>
          )}
          {isActive && (
            <span
              className="absolute top-2 right-2 text-[10px] font-black px-2 py-0.5 rounded-full text-white shadow-lg"
              style={{ background: "linear-gradient(135deg, #0d9488, #06b6d4)" }}
            >
              ▶ PLAYING
            </span>
          )}
        </div>
      </div>
      <p
        className="mt-2 text-xs sm:text-sm font-semibold truncate px-1 transition-colors duration-200"
        style={{ color: isActive ? "#0d9488" : hovered ? "#6366f1" : undefined }}
      >
        {video.title}
      </p>
    </div>
  );
}

function YouTubeSection() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className="w-full my-4">

      {/* Header — centered */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">🎬</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 dark:text-white tracking-tight">
            Our Videos
          </h2>
        </div>
        <div className="h-1 w-16 rounded-full bg-teal-500 mb-1" />
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {YOUTUBE_VIDEOS.length} videos • tap to watch
        </p>
      </div>

      {/* Featured Player with ✕ close button */}
      {activeVideo !== null && (
        <div
          className="relative mb-6 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 bg-black w-full"
          style={{ aspectRatio: "16/9", maxHeight: 480 }}
        >
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEOS[activeVideo].id}?autoplay=1&rel=0&modestbranding=1&fs=1`}
            title={YOUTUBE_VIDEOS[activeVideo].title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            className="w-full h-full"
            style={{ border: "none" }}
          />
          {/* Close button */}
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-3 right-3 z-20 flex items-center justify-center w-9 h-9 rounded-full text-white font-bold text-base shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
            style={{
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(6px)",
              border: "1.5px solid rgba(255,255,255,0.25)",
            }}
          >
            ✕
          </button>
          {/* Now playing bar */}
          <div
            className="absolute bottom-0 left-0 right-0 px-4 py-2 text-xs text-white font-medium truncate"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}
          >
            ▶ {YOUTUBE_VIDEOS[activeVideo].title}
          </div>
        </div>
      )}

      {/* Thumbnail Strip */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />
        <div
          className="flex gap-3 sm:gap-4 overflow-x-auto pb-3"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {YOUTUBE_VIDEOS.map((video, idx) => (
            <VideoThumb
              key={video.id}
              video={video}
              index={idx}
              isActive={activeVideo === idx}
              onClick={() => setActiveVideo(idx)}
            />
          ))}
        </div>
      </div>

      {activeVideo === null && (
        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-2">
          👆 Tap any thumbnail to watch here
        </p>
      )}
    </div>
  );
}

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

  const memberPhotos = [
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.jpg",
    "/images/img4.jpg",
    "/images/img5.jpg",
    "/images/img6.jpg",
    "/images/img7.jpg",
    "/images/img8.jpg",
    "/images/img9.jpg",
    "/images/img10.jpg",
  ];

  // Double the array for seamless infinite scroll
  const duplicatedPhotos = [...memberPhotos, ...memberPhotos];

  // Fetch posts with error handling
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setPostsLoading(true);
        setPostsError(false);

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/post/home`,
        );

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

    fetchPosts(); // ✅ THIS LINE WAS MISSING

    // Preload images
    let loadedCount = 0;
    const totalImages = memberPhotos.length;

    memberPhotos.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  // Smooth infinite scroll with JavaScript (LEFT TO RIGHT)
  useEffect(() => {
    if (!imagesLoaded || !scrollRef.current) return;

    const scrollContainer = scrollRef.current;
    const scrollSpeed = 0.3; // pixels per frame (lower = slower)
    let isPaused = false;

    // Calculate single set width after images load
    const getSingleSetWidth = () => {
      const firstChild = scrollContainer.firstElementChild;
      if (!firstChild) return 0;
      // Width of one image + gap (24px = gap-6 in Tailwind)
      const imageWidth = firstChild.offsetWidth + 24;
      return imageWidth * memberPhotos.length;
    };

    // Start from negative position (one full set to the left)
    let scrollPosition = -getSingleSetWidth();

    const animate = () => {
      if (!isPaused) {
        scrollPosition += scrollSpeed; // Add for left-to-right

        const singleSetWidth = getSingleSetWidth();

        // When we reach 0, reset back to starting position
        if (scrollPosition >= 0) {
          scrollPosition = -singleSetWidth;
        }

        scrollContainer.style.transform = `translateX(${scrollPosition}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Pause on hover
    const handleMouseEnter = () => {
      isPaused = true;
    };
    const handleMouseLeave = () => {
      isPaused = false;
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [imagesLoaded]);

  return (
    <div>
      <div className="flex flex-col gap-6 p-10 px-3 max-w-6xl mx-auto pt-4">
  <h1 className="text-3xl font-bold lg:text-6xl pt-10">
    Narayan Pur Bipader Bondhu Welfare Society
  </h1>

  {/* NEW LINE ADDED */}
  <p className="text-sm text-gray-700 font-semibold tracking-wide">
  ESTD: 2020
</p>

  <p className="text-sm text-gray-600 font-medium">
    Govt. Registered NGO • Reg. No: S0042589 of 2024–2025
  </p>

        <p className="text-xs text-gray-500 flex items-start gap-1">
          <span>📍</span>
          <span>
            Vill- Narayan Pur, P.O- Amiya Narayan Pur, P.S- Thanar Para, Dist-
            Nadia, Pin- 741165, West Bengal, India
          </span>
        </p>

        <p className="text-gray-500 text-xs sm:text-sm">
          Welcome to Narayan Pur Bipader Bondhu Welfare Society. We are a
          non-profit organization dedicated to serving humanity through social
          welfare initiatives, disaster relief, and support for underprivileged
          communities. Our mission is to stand beside people in times of need
          and work towards building a compassionate and inclusive society.
        </p>

       {/* BUTTONS */}
        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          <button
            onClick={() => setShowDocsModal(true)}
            className="px-6 py-2.5 text-sm sm:text-base font-semibold text-white bg-teal-700 rounded-lg hover:bg-teal-800 transition shadow-md"
          >
            📋 View Official Documents
          </button>

          {/* NEW DOWNLOAD APP BUTTON */}
          <a
            href="https://github.com/AmirSohelSardar/bipader-bondhu/releases/download/v1.0/app-arm64-v8a-release.apk"
            download
            className="relative px-6 py-2 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 animate-pulse"
          >
            📱 Download Our Official App
            <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-bold text-white bg-yellow-500 rounded-full">
              APK
            </span>
          </a>

          {/* IDENTITY CARD + BLOOD DONATION side by side */}
          <div className="flex gap-3 flex-wrap justify-center">
            <button
              onClick={() => setShowIdModal(true)}
              className="relative px-5 py-2 text-sm sm:text-base font-medium text-white bg-green-600 rounded hover:bg-green-700 transition"
            >
              Apply Identity Card
              <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-bold text-white bg-red-600 rounded-full animate-pulse">
                NEW
              </span>
            </button>
            <a
              href="/blood-donation"
              className="relative inline-flex items-center gap-2 px-6 py-2.5 text-sm sm:text-base font-bold text-white rounded-xl hover:scale-105 transition-all duration-300"
              style={{
                background: "linear-gradient(135deg,#7f0000,#e53935)",
                boxShadow: "0 4px 14px rgba(183,28,28,0.5)",
              }}
            >
              <span style={{ fontSize: 18 }}>🩸</span>
              <span className="tracking-wide">
                NGO Event & Certification Hub
              </span>
              <span
                className="absolute -top-2.5 -right-2.5 px-2 py-0.5 text-[10px] font-black text-white rounded-full"
                style={{
                  background: "linear-gradient(135deg,#f59e0b,#fbbf24)",
                }}
              >
                NEW
              </span>
            </a>
          </div>
        </div>

        {/* MODAL */}
        {showIdModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-[90%] max-w-sm text-center">
              <h2 className="text-lg font-bold mb-4 dark:text-white">
                Apply Identity Card
              </h2>

              <div className="flex flex-col gap-3">
                <button
                  className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  onClick={() => {
                    setShowIdModal(false);
                    window.open("/identity-user.html", "_blank");
                  }}
                >
                  User Login
                </button>

                <button
                  className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  onClick={() => {
                    setShowIdModal(false);
                    window.open("/identity-admin.html", "_blank");
                  }}
                >
                  Admin Login
                </button>
              </div>

              <button
                onClick={() => setShowIdModal(false)}
                className="mt-4 text-sm text-gray-500 hover:underline dark:text-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* DOCUMENTS MODAL */}
        {showDocsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
              
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-bold dark:text-white">Official Documents</h2>
                <button
                  onClick={() => setShowDocsModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-2xl leading-none"
                >
                  ✕
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700 px-5 gap-1">
                {[
                  { id: "reg", label: "🏛️ Registration" },
                  { id: "tax12a", label: "📄 12A Certificate" },
                  { id: "tax80g", label: "📄 80G Certificate" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveDoc(tab.id)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition ${
                      activeDoc === tab.id
                        ? "border-teal-600 text-teal-700 dark:text-teal-400"
                        : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* PDF Viewer */}
              <div className="flex-1 overflow-hidden p-4">
                <iframe
                  key={activeDoc}
                  src={
                    activeDoc === "reg"
                      ? "/images/register.pdf"
                      : activeDoc === "tax12a"
                      ? "/images/bipader1.pdf"
                      : "/images/bipader2.pdf"
                  }
                  className="w-full h-[60vh] rounded-lg border border-gray-200 dark:border-gray-700"
                  title="Document Viewer"
                />
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                <a
                  href={
                    activeDoc === "reg"
                      ? "/images/register.pdf"
                      : activeDoc === "tax12a"
                      ? "/images/bipader1.pdf"
                      : "/images/bipader2.pdf"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm text-teal-700 border border-teal-600 rounded hover:bg-teal-50 transition"
                >
                  Open in New Tab ↗
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ACTIVE MEMBERS AUTO-SLIDING SECTION */}
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-8 my-6 overflow-hidden">
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
            Our Active Members
          </h3>

          {/* Loading skeleton */}
          {!imagesLoaded ? (
            <div className="flex gap-6 justify-center px-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="relative overflow-hidden">
              <div
                ref={scrollRef}
                className="flex gap-6"
                style={{ willChange: "transform" }}
              >
                {duplicatedPhotos.map((photo, index) => (
                  <div key={`member-${index}`} className="flex-shrink-0 group">
                    <div className="relative">
                      {/* Outer glow ring */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-75 blur transition-opacity duration-500"></div>

                      {/* Image container */}
                      <div className="relative">
                        <img
                          src={photo}
                          alt={`Member ${(index % memberPhotos.length) + 1}`}
                          loading="lazy"
                          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/112/4F46E5/ffffff?text=M" +
                              ((index % memberPhotos.length) + 1);
                          }}
                        />

                        {/* Active status badge */}
                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4"></p>
        </div>

        
        {/* EID UL-ADHA */}
<EidUlAdhaWidget />

        <div className="p-3 bg-amber-100 dark:bg-slate-700 rounded-lg">
          <CallToAction />
        </div>
      </div>

     <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-3">

        {/* YOUTUBE VIDEO SECTION */}
        <YouTubeSection />

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>

          <div className="flex flex-wrap gap-3 justify-center">
            {/* Loading */}
            {postsLoading &&
              Array(6)
                .fill(0)
                .map((_, i) => <SkeletonPostCard key={i} />)}

            {/* Error */}
            {!postsLoading && postsError && (
              <p className="text-red-500 text-sm text-center">
                Failed to load posts. Please refresh the page.
              </p>
            )}

            {/* Success */}
            {!postsLoading &&
              !postsError &&
              posts.map((post) => <PostCard key={post._id} post={post} />)}
          </div>

          {!postsLoading && posts.length > 0 && (
            <Link
              to="/search"
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}




