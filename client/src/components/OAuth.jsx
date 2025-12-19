import { Button, Alert } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      setLoading(true);
      setError(null);

      const resultsFromGoogle = await signInWithPopup(auth, provider);

      // Validate Google user data
      if (!resultsFromGoogle?.user?.email) {
        throw new Error('Failed to get user information from Google');
      }

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: resultsFromGoogle.user.displayName || 'Google User',
            email: resultsFromGoogle.user.email,
            googlePhotoUrl: resultsFromGoogle.user.photoURL || '',
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      if (res.ok && data) {
        dispatch(signInSuccess(data));
        setLoading(false);
        navigate('/');
      }
    } catch (error) {
      // console.error('Google sign-in error:', error);
      setLoading(false);

      // ✅ Better error messages for users
      let errorMessage = 'Failed to sign in with Google';

      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign in cancelled';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Please allow popups for this site';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);

      // Auto-clear error after 5 seconds
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <>
      <Button
        type='button'
        gradientDuoTone='pinkToOrange'
        outline
        onClick={handleGoogleClick}
        disabled={loading}
      >
        <AiFillGoogleCircle className='w-6 h-6 mr-2' />
        {loading ? 'Signing in...' : 'Continue with Google'}
      </Button>
      {/* ✅ Show error message instead of alert() */}
      {error && (
        <Alert color='failure' className='mt-3'>
          <span className='font-medium'>Error:</span> {error}
        </Alert>
      )}
    </>
  );
}