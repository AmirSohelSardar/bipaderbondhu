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
    const startDate = new Date("2026-06-07T00:00:00");
    const endDate = new Date("2026-06-10T23:59:59");

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
        Countdown to the blessed day • 7 Jun – 10 Jun 2026
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
