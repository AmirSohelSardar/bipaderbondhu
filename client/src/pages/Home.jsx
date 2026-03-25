import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState, useRef } from "react";
import PostCard from "../components/PostCard";
import SkeletonPostCard from "../components/SkeletonPostCard";

function EidCountdown() {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isEid, setIsEid] = useState(false);

  useEffect(() => {
    const eidDate = new Date("2026-03-21T00:00:00");

    const tick = () => {
      const now = new Date();
      const diff = eidDate - now;

      if (diff <= 0) {
        setIsEid(true);
        return;
      }

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

  if (isEid) {
    return (
      <div
        className="w-full rounded-2xl p-8 text-center my-4"
        style={{
          background: "linear-gradient(135deg, #1a472a, #2d6a4f, #1a472a)",
        }}
      >
        <div className="text-5xl mb-3 animate-bounce">🌙</div>
        <h2 className="text-3xl font-semibold text-yellow-400 mb-1">
          Eid Mubarak!
        </h2>
        <p className="text-green-200 text-xl mb-3">عيد مبارك</p>
        <p className="text-green-100 text-base max-w-sm mx-auto">
          Wishing you and your family joy, peace, and blessings this Eid
          ul-Fitr. May Allah accept your prayers. 🌟
        </p>
      </div>
    );
  }

  if (!timeLeft) return null;

  return (
    <div
      className="w-full rounded-2xl p-6 text-center my-4"
      style={{
        background: "linear-gradient(135deg, #1a472a, #2d6a4f, #1a472a)",
      }}
    >
      <div
        className="text-4xl mb-2"
        style={{ animation: "float 3s ease-in-out infinite" }}
      >
        🌙
      </div>
      <h3 className="text-yellow-400 text-xl font-medium mb-1">
        Eid ul-Fitr 2026
      </h3>
      <p className="text-green-300 text-xs mb-4">
        Countdown to the blessed celebration
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
              border: "1px solid rgba(255,215,0,0.3)",
            }}
          >
            <span className="text-yellow-400 text-3xl font-medium block">
              {val}
            </span>
            <span className="text-green-300 text-xs uppercase tracking-widest mt-1 block">
              {label}
            </span>
          </div>
        ))}
      </div>

      <p className="text-green-400 text-xs mt-4">
        🌟 Ramadan Mubarak — Eid is coming!
      </p>
    </div>
  );
}

// ── ADD YOUR YOUTUBE VIDEOS HERE (newest first) ──────────────────────────────
const YOUTUBE_VIDEOS = [
  // { id: "new id here", title: "new vide here" },
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
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex-shrink-0 cursor-pointer"
      style={{ width: "clamp(160px, 42vw, 220px)" }}
    >
      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          aspectRatio: "16/9",
          boxShadow: isActive
            ? "0 0 0 3px #0d9488, 0 8px 24px rgba(13,148,136,0.4)"
            : hovered
            ? "0 6px 20px rgba(0,0,0,0.22)"
            : "0 2px 8px rgba(0,0,0,0.13)",
          transform: hovered || isActive ? "scale(1.04)" : "scale(1)",
          transition: "all 0.22s ease",
        }}
      >
        <img
          src={thumb}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0 bg-black transition-opacity duration-200"
          style={{ opacity: hovered ? 0.22 : 0.08 }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transition: "transform 0.2s", transform: hovered ? "scale(1.18)" : "scale(1)" }}
        >
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-xl"
            style={{ background: isActive ? "#0d9488" : "rgba(255,255,255,0.93)" }}
          >
            {isActive ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#0d9488">
                <polygon points="7,4 21,12 7,20" />
              </svg>
            )}
          </div>
        </div>
        {index === 0 && (
          <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500 text-white shadow-md animate-pulse">
            NEW
          </span>
        )}
        {isActive && (
          <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-600 text-white shadow-md">
            PLAYING
          </span>
        )}
      </div>
      <p className="mt-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 truncate px-0.5">
        {video.title}
      </p>
    </div>
  );
}

function YouTubeSection() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className="w-full my-6 px-0">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-7 bg-teal-600 rounded-full" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
          🎬 Our Videos
        </h2>
        <span className="ml-auto text-xs text-gray-400 dark:text-gray-500 font-medium">
          {YOUTUBE_VIDEOS.length} videos
        </span>
      </div>

      {/* Featured Player */}
      {activeVideo !== null && (
        <div
          className="mb-5 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 bg-black w-full"
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
        </div>
      )}

      {/* Thumbnail Strip */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />
        <div
          className="flex gap-3 sm:gap-4 overflow-x-auto pb-2"
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
        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-3">
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

        {/* EID UL-FITR COUNTDOWN */}
        <EidCountdown />

        {/* YOUTUBE VIDEO SECTION */}
        <YouTubeSection />

        <div className="p-3 bg-amber-100 dark:bg-slate-700 rounded-lg">
          <CallToAction />
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-3">
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
