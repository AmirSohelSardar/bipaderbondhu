import { Button, Alert } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Handle redirect result when user comes back from Google
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        
        if (result?.user?.email) {
          setLoading(true);
          
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`,
            {
              method: 'POST',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: result.user.displayName || 'Google User',
                email: result.user.email,
                googlePhotoUrl: result.user.photoURL || '',
              }),
            }
          );

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || 'Authentication failed');
          }

          if (res.ok && data) {
            dispatch(signInSuccess(data));
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Google redirect error:', error);
        
        let errorMessage = 'Failed to sign in with Google';

        if (error.code === 'auth/network-request-failed') {
          errorMessage = 'Network error. Please check your connection';
        } else if (error.message) {
          errorMessage = error.message;
        }

        setError(errorMessage);
        setTimeout(() => setError(null), 5000);
      } finally {
        setLoading(false);
      }
    };

    handleRedirectResult();
  }, [auth, dispatch, navigate]);

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      setLoading(true);
      setError(null);

      // ✅ Use redirect instead of popup - NO MORE COOP ERRORS
      await signInWithRedirect(auth, provider);
      
    } catch (error) {
      console.error('Google sign-in error:', error);
      setLoading(false);

      let errorMessage = 'Failed to sign in with Google';

      if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Please allow redirects for this site';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
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
      {error && (
        <Alert color='failure' className='mt-3'>
          <span className='font-medium'>Error:</span> {error}
        </Alert>
      )}
    </>
  );
}