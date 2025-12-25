import { Button, Alert, Spinner } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  getAuth,
} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔁 Handle Google redirect result (VERY IMPORTANT)
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (!result) return;

        const user = result.user;
        console.log('✅ Google Sign-In successful:', user.email);

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`,
          {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: user.displayName || 'Google User',
              email: user.email,
              googlePhotoUrl: user.photoURL || '',
            }),
          }
        );

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Authentication failed');
        }

        dispatch(signInSuccess(data));
        navigate('/');
      } catch (err) {
        console.error('❌ Google redirect error:', err);
        setError('Google sign-in failed');
      } finally {
        setLoading(false);
      }
    };

    handleRedirectResult();
  }, [auth, dispatch, navigate]);

  // 🔘 Google login button click
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      setLoading(true);
      setError(null);
      await signInWithRedirect(auth, provider); // ✅ MOBILE SAFE
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError('Failed to start Google sign-in');
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
        {loading ? (
          <>
            <Spinner size='sm' className='mr-2' />
            Signing in...
          </>
        ) : (
          <>
            <AiFillGoogleCircle className='w-6 h-6 mr-2' />
            Continue with Google
          </>
        )}
      </Button>

      {error && (
        <Alert color='failure' className='mt-3'>
          <span className='font-medium'>Error:</span> {error}
        </Alert>
      )}
    </>
  );
}
