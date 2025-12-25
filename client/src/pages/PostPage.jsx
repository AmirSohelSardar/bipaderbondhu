import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';
import { Modal } from 'flowbite-react';
import DOMPurify from 'dompurify';
export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const [showImage, setShowImage] = useState(false);
useEffect(() => {
  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/post/post/${postSlug}`
      );

      const data = await res.json();

      if (!res.ok || !data) {
        setError(true);
        setLoading(false);
        return;
      }

      setPost(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching post:', error);
      setError(true);
      setLoading(false);
    }
  };

  fetchPost();
}, [postSlug]);


  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/post/getposts?limit=3`
        );
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      }
    };
    fetchRecentPosts();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-700 dark:text-gray-300 mb-4'>
            Post not found
          </h1>
          <Link to='/'>
            <Button gradientDuoTone='purpleToPink'>Go back home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover cursor-pointer hover:opacity-90 transition-opacity'
        onClick={() => setShowImage(true)}
        onError={(e) => {
          e.target.src =
            'https://via.placeholder.com/800x600?text=Image+Not+Available';
        }}
      />
     <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
  <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
  <span className='italic'>
    {post?.content ? Math.ceil(post.content.length / 1000) : 0} mins read
  </span>
</div>

{post?.content && (
  <div
    className='p-3 max-w-2xl mx-auto w-full max-h-[600px] overflow-y-auto break-words post-content'
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(post.content),
    }}
  />
)}

<div className='max-w-4xl mx-auto w-full'>
  <CallToAction />
</div>

      <CommentSection postId={post._id} />

      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>

      {/* ✅ FIXED: Full Image Popup with higher z-index */}
      <Modal
        show={showImage}
        size='7xl'
        onClose={() => setShowImage(false)}
        popup
        className='z-[70]'
      >
        <Modal.Header className='z-[70]' />
        <Modal.Body className='z-[70] p-0'>
          <div className='flex justify-center items-center bg-black'>
            <img
              src={post && post.image}
              alt={post && post.title}
              className='max-h-[90vh] w-auto object-contain'
              onError={(e) => {
                e.target.src =
                  'https://via.placeholder.com/800x600?text=Image+Not+Available';
              }}
            />
          </div>
        </Modal.Body>
      </Modal>

      {/* ✅ Add custom style to ensure modal is above everything */}
      <style>{`
        .z-\\[70\\] {
          z-index: 70 !important;
        }
      `}</style>
    </main>
  );
}