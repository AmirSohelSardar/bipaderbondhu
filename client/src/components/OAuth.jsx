import { Button, Alert, Spinner } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function OAuth() {
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

      // 🔥 GOOGLE POPUP LOGIN (WORKS EVERYWHERE)
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 🔥 SEND USER TO BACKEND
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
      if (!res.ok) throw new Error(data.message || 'Login failed');

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (err) {
      console.error('Google login error:', err);
      setError('Google sign-in failed');
    } finally {
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
          <span className="font-medium">Error:</span> {error}
        </Alert>
      )}
    </>
  );
}
