import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState, useRef } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [showIdModal, setShowIdModal] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const scrollRef = useRef(null);
  const animationRef = useRef(null);

  const memberPhotos = [
    '/images/img1.jpg',
    '/images/img2.jpg',
    '/images/img3.jpg',
    '/images/img4.jpg',
    '/images/img5.jpg',
    '/images/img6.jpg',
    '/images/img7.jpg',
    '/images/img8.jpg',
    '/images/img9.jpg',
    '/images/img10.jpg'
  ];

  // Double the array for seamless infinite scroll
  const duplicatedPhotos = [...memberPhotos, ...memberPhotos];

  useEffect(() => {
    // Fetch posts with error handling
    const fetchPosts = async () => {
      try {
        const res = await fetch(
  `${import.meta.env.VITE_BACKEND_URL}/api/post/home`
);

        if (res.ok) {
          const data = await res.json();
          setPosts(data || []);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
    fetchPosts();

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
    const handleMouseEnter = () => { isPaused = true; };
    const handleMouseLeave = () => { isPaused = false; };
    
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [imagesLoaded]);

  return (
    <div>
      <div className="flex flex-col gap-6 p-10 px-3 max-w-6xl mx-auto pt-4">

        <h1 className="text-3xl font-bold lg:text-6xl pt-10">
          Narayan Pur Bipader Bondhu Welfare Society
        </h1>

        <p className="text-gray-500 text-xs sm:text-sm">
          Welcome to Narayan Pur Bipader Bondhu Welfare Society. We are a non-profit
          organization dedicated to serving humanity through social welfare
          initiatives, disaster relief, and support for underprivileged communities.
          Our mission is to stand beside people in times of need and work towards
          building a compassionate and inclusive society.
        </p>

        {/* BUTTONS */}
        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          <a
            href="https://drive.google.com/file/d/1EI5mRZY-mGfezAxVz605lU3yC6Al9xfo/preview"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 text-sm sm:text-base font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition"
          >
            View Registration Certificate
          </a>

          <button
            onClick={() => setShowIdModal(true)}
            className="relative px-5 py-2 text-sm sm:text-base font-medium text-white bg-green-600 rounded hover:bg-green-700 transition"
          >
            Apply Identity Card
            <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-bold text-white bg-red-600 rounded-full animate-pulse">
              NEW
            </span>
          </button>
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
              <div ref={scrollRef} className="flex gap-6" style={{ willChange: 'transform' }}>
                {duplicatedPhotos.map((photo, index) => (
                  <div
                    key={`member-${index}`}
                    className="flex-shrink-0 group"
                  >
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
                            e.target.src = 'https://via.placeholder.com/112/4F46E5/ffffff?text=M' + ((index % memberPhotos.length) + 1);
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

          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
            
          </p>
        </div>

        <div className="p-3 bg-amber-100 dark:bg-slate-700 rounded-lg">
          <CallToAction />
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-3">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-3">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to="/search"
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}