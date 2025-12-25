import { Button, Alert, Spinner } from 'flowbite-react';
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

  // ✅ Check for redirect result on component mount
  useEffect(() => {
    let isMounted = true;
    
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        
        if (!isMounted) return; // Prevent state updates if unmounted
        
        if (result) {
          setLoading(true); // Only set loading if we have a result
        }
        
        // If there's a result, user just came back from Google
        if (result?.user?.email) {
          console.log('✅ Redirect successful:', result.user.email);
          
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
          console.log('Backend response:', data);

          if (!res.ok) {
            throw new Error(data.message || 'Authentication failed');
          }

          dispatch(signInSuccess(data));
          navigate('/');
        }
      } catch (error) {
        console.error('❌ Redirect error:', error);
        
        let errorMessage = 'Failed to sign in with Google';
        if (error.message) {
          errorMessage = error.message;
        }
        
        setError(errorMessage);
        setTimeout(() => setError(null), 5000);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkRedirectResult();
    
    return () => {
      isMounted = false; // Cleanup
    };
  }, [auth, dispatch, navigate]);

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      setLoading(true);
      setError(null);
      
      // ✅ This will redirect to Google (page will leave)
      await signInWithRedirect(auth, provider);
      
    } catch (error) {
      console.error('❌ Redirect initiation error:', error);
      setLoading(false);
      
      let errorMessage = 'Failed to initiate Google sign-in';
      if (error.message) {
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
        {loading ? (
          <>
            <Spinner size='sm' className='mr-2' />
            Processing...
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