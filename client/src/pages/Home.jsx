import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [showIdModal, setShowIdModal] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/post/getposts`
      );
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

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
          {/* Registration Certificate */}
          <a
            href="https://drive.google.com/file/d/1EI5mRZY-mGfezAxVz605lU3yC6Al9xfo/preview"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 text-sm sm:text-base font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition"
          >
            View Registration Certificate
          </a>

          {/* Apply Identity Card */}
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

        {/* ✅ FIXED MODAL */}
        {showIdModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm text-center">

              <h2 className="text-lg font-bold mb-4">
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
                className="mt-4 text-sm text-gray-500 hover:underline"
              >
                Cancel
              </button>

            </div>
          </div>
        )}

        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>

        <div className="p-3 bg-amber-100 dark:bg-slate-700">
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