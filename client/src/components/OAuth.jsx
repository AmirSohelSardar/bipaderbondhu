import { Button, Alert, Spinner } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Handle redirect result (iOS only)
useEffect(() => {
  let mounted = true;

  const handleRedirect = async () => {
    

    try {
      const result = await getRedirectResult(auth);
      if (!result || !mounted) return;
      await sendUserToBackend(result.user);
    } catch {
      mounted && setError('Google sign-in failed');
    } finally {
      mounted && setLoading(false);
    }
  };

  handleRedirect();
  return () => (mounted = false);
}, []);


  // ✅ Send user to backend
  const sendUserToBackend = async (user) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`,
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          googlePhotoUrl: user.photoURL,
        }),
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    dispatch(signInSuccess(data));
    navigate('/');
  };

  // ✅ Fast Google login
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      setLoading(true);
      setError(null);

      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

      // 🍎 iOS Safari → Redirect (popup blocked)
      if (isIOS) {
        await signInWithRedirect(auth, provider);
      }
      // 🖥️ Desktop + 🤖 Android → Popup (FAST)
      else {
        const result = await signInWithPopup(auth, provider);
        await sendUserToBackend(result.user);
      }
    } catch (err) {
      console.error(err);
      setError('Google sign-in failed');
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        gradientDuoTone="pinkToOrange"
        outline
        onClick={handleGoogleClick}
        disabled={loading}
      >
        {loading ? (
          <>
            <Spinner size="sm" className="mr-2" />
            Signing in...
          </>
        ) : (
          <>
            <AiFillGoogleCircle className="w-6 h-6 mr-2" />
            Continue with Google
          </>
        )}
      </Button>

      {error && (
        <Alert color="failure" className="mt-3">
          {error}
        </Alert>
      )}
    </>
  );
}
