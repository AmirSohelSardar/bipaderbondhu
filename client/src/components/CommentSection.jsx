import { Alert, Button, Modal, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setCommentError(null);

  const trimmedComment = comment.trim();

  if (!trimmedComment) {
    setCommentError('Comment cannot be empty');
    return;
  }

  if (trimmedComment.length > 200) {
    setCommentError('Comment must be less than 200 characters');
    return;
  }

    if (comment.length > 200) {
      setCommentError('Comment must be less than 200 characters');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/comment/create`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
         body: JSON.stringify({
  content: trimmedComment,
  postId,
  userId: currentUser._id,
}),
        }
      );
      const data = await res.json();

      if (res.ok) {
        setComment('');
        setCommentError(null);
        setLoading(false);
        fetchComments();
      } else {
        setCommentError(data.message || 'Failed to post comment');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      setCommentError('Network error. Please try again.');
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      setFetchError(null);
      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/comment/getPostComments/${postId}`
      );
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      } else {
        const data = await res.json();
        setFetchError(data.message || 'Failed to load comments');
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      setFetchError('Failed to load comments. Please refresh the page.');
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/comment/likeComment/${commentId}`,
        {
          method: 'PUT',
          credentials: 'include',
        }
      );
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      } else {
        const data = await res.json();
        console.error('Failed to like comment:', data.message);
        // ✅ Show error to user
        setCommentError(data.message || 'Failed to like comment');
        setTimeout(() => setCommentError(null), 3000);
      }
    } catch (error) {
      console.error('Error liking comment:', error);
      // ✅ Show error to user
      setCommentError('Network error. Please try again.');
      setTimeout(() => setCommentError(null), 3000);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }

      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/comment/deleteComment/${commentId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );

      if (res.ok) {
        setComments(comments.filter((comment) => comment._id !== commentId));
        setShowModal(false);
      } else {
        const data = await res.json();
        console.error('Failed to delete comment:', data.message);
        // ✅ Show error to user
        setCommentError(data.message || 'Failed to delete comment');
        setTimeout(() => setCommentError(null), 3000);
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      // ✅ Show error to user
      setCommentError('Network error. Please try again.');
      setTimeout(() => setCommentError(null), 3000);
      setShowModal(false);
    }
  };

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
          <p>Signed in as:</p>
          <img
            className='h-5 w-5 object-cover rounded-full'
            src={currentUser.profilePicture}
            alt=''
            onError={(e) => {
              e.target.src =
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
            }}
          />
          <Link
            to={'/dashboard?tab=profile'}
            className='text-xs text-cyan-600 hover:underline'
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className='text-sm text-teal-500 my-5 flex gap-1'>
          You must be signed in to comment.
          <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className='border border-teal-500 rounded-md p-3'
        >
          <Textarea
            placeholder='Add a comment...'
            rows='3'
            maxLength='200'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className='flex justify-between items-center mt-5'>
           <p className='text-gray-500 text-xs'>
  {200 - comment.length} characters remaining
</p>
            <Button
              outline
              gradientDuoTone='purpleToBlue'
              type='submit'
              disabled={loading}
            >
              {loading ? 'Posting...' : 'Submit'}
            </Button>
          </div>
          {commentError && (
            <Alert color='failure' className='mt-5'>
              {commentError}
            </Alert>
          )}
        </form>
      )}

      {/* ✅ Show fetch error if comments failed to load */}
      {fetchError && (
        <Alert color='failure' className='mt-5'>
          {fetchError}
          <Button
            size='xs'
            className='ml-2'
            onClick={fetchComments}
            color='gray'
          >
            Retry
          </Button>
        </Alert>
      )}

      {comments.length === 0 && !fetchError ? (
        <p className='text-sm my-5'>No comments yet!</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this comment?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button
                color='failure'
                onClick={() => handleDelete(commentToDelete)}
              >
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}