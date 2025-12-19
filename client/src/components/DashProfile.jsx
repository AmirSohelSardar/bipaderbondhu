import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const xhrRef = useRef(null); // Store XHR reference for cleanup
  const isMountedRef = useRef(true); // Track component mount status

  const isGoogleUser = currentUser?.authProvider === 'google';

  // Set initial profile picture from currentUser
  useEffect(() => {
    if (currentUser?.profilePicture) {
      setImageFileUrl(currentUser.profilePicture);
    }
  }, [currentUser]);

  // ✅ Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      // Abort ongoing upload if component unmounts
      if (xhrRef.current) {
        xhrRef.current.abort();
        xhrRef.current = null;
      }
    };
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setImageFileUploadError('Please select an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setImageFileUploadError('Image must be less than 5MB');
        return;
      }

      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
      setImageFileUploadError(null);
    }
  };
  // ✅ Cleanup blob URLs to prevent memory leak
useEffect(() => {
  return () => {
    if (imageFileUrl && imageFileUrl.startsWith('blob:')) {
      URL.revokeObjectURL(imageFileUrl);
    }
  };
}, [imageFileUrl]);

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    if (!isMountedRef.current) return; // Don't start if unmounted

    setImageFileUploading(true);
    setImageFileUploadError(null);
    setImageFileUploadProgress(0);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', imageFile);

      const xhr = new XMLHttpRequest();
      xhrRef.current = xhr; // Store reference for cleanup

      // ✅ Track upload progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && isMountedRef.current) {
          const progress = Math.round((e.loaded / e.total) * 100);
          setImageFileUploadProgress(progress);
        }
      });

      // ✅ Handle successful upload
      xhr.addEventListener('load', async () => {
        if (!isMountedRef.current) return; // Don't update state if unmounted

        xhrRef.current = null; // Clear reference

        if (xhr.status === 200) {
          try {
            const data = JSON.parse(xhr.responseText);

            if (data.url) {
              // ✅ IMPROVEMENT: Single atomic update
              // Update local state and Redux together
              setImageFileUrl(data.url);
              setImageFileUploadProgress(null);
              setImageFileUploading(false);

              // Update Redux store immediately
              dispatch(
                updateSuccess({
                  ...currentUser,
                  profilePicture: data.url,
                })
              );

              setUpdateUserSuccess('Profile picture updated successfully!');
              setTimeout(() => {
                if (isMountedRef.current) setUpdateUserSuccess(null);
              }, 3000);
            } else {
              throw new Error('No URL returned from server');
            }
          } catch (parseError) {
            // console.error('Parse error:', parseError);
            if (isMountedRef.current) {
              setImageFileUploadError('Invalid response from server');
              setImageFileUploadProgress(null);
              setImageFileUploading(false);
            }
          }
        } else {
          try {
            const errorData = JSON.parse(xhr.responseText);
            if (isMountedRef.current) {
              setImageFileUploadError(
                errorData.message || `Upload failed with status ${xhr.status}`
              );
            }
          } catch {
            if (isMountedRef.current) {
              setImageFileUploadError(`Upload failed with status ${xhr.status}`);
            }
          }
          if (isMountedRef.current) {
            setImageFileUploadProgress(null);
            setImageFileUploading(false);
          }
        }
      });

      // ✅ Handle network errors
      xhr.addEventListener('error', () => {
        console.error('XHR error');
        if (isMountedRef.current) {
          setImageFileUploadError('Network error during upload');
          setImageFileUploading(false);
          setImageFileUploadProgress(null);
        }
        xhrRef.current = null;
      });

      // ✅ Handle upload abort
      xhr.addEventListener('abort', () => {
        if (isMountedRef.current) {
          setImageFileUploadError('Upload cancelled');
          setImageFileUploading(false);
          setImageFileUploadProgress(null);
        }
        xhrRef.current = null;
      });

      const uploadUrl = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/user/upload/profile-picture`;

      xhr.open('POST', uploadUrl);
      xhr.withCredentials = true;
      xhr.send(uploadFormData);
    } catch (error) {
      console.error('Upload error:', error);
      if (isMountedRef.current) {
        setImageFileUploadError(`Could not upload image: ${error.message}`);
        setImageFileUploading(false);
        setImageFileUploadProgress(null);
      }
      xhrRef.current = null;
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }

    if (imageFileUploading) {
      setUpdateUserError('Please wait for image to upload');
      return;
    }

    // Validate username if provided
    if (formData.username) {
      if (formData.username.length < 7 || formData.username.length > 20) {
        setUpdateUserError('Username must be between 7 and 20 characters');
        return;
      }
      if (formData.username !== formData.username.toLowerCase()) {
        setUpdateUserError('Username must be lowercase');
        return;
      }
      if (!formData.username.match(/^[a-z0-9]+$/)) {
        setUpdateUserError(
          'Username can only contain lowercase letters and numbers'
        );
        return;
      }
    }

    // Validate password if provided
    if (formData.password) {
      if (isGoogleUser) {
        setUpdateUserError('Cannot update password for Google accounts');
        return;
      }
      if (formData.password.length < 6) {
        setUpdateUserError('Password must be at least 6 characters');
        return;
      }
    }

    // Validate email if provided
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setUpdateUserError('Please provide a valid email');
        return;
      }
    }

    try {
      dispatch(updateStart());
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/update/${currentUser._id}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
        setFormData({});
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/delete/${currentUser._id}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/signout`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.error('Signout error:', data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.error('Signout error:', error.message);
    }
  };

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && imageFileUploadProgress < 100 && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}
            onError={(e) => {
              e.target.src =
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
            }}
          />
        </div>
        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}
        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        {!isGoogleUser && (
          <TextInput
            type='password'
            id='password'
            placeholder='password'
            onChange={handleChange}
          />
        )}
        {isGoogleUser && (
          <Alert color='info'>
            You signed in with Google. Password cannot be changed.
          </Alert>
        )}
        <Button
          type='submit'
          gradientDuoTone='purpleToBlue'
          outline
          disabled={loading || imageFileUploading}
        >
          {loading ? 'Loading...' : 'Update'}
        </Button>
        {currentUser.isAdmin && (
          <Link to={'/create-post'}>
            <Button
              type='button'
              gradientDuoTone='purpleToPink'
              className='w-full'
            >
              Create a post
            </Button>
          </Link>
        )}
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={() => setShowModal(true)} className='cursor-pointer'>
          Delete Account
        </span>
        <span onClick={handleSignout} className='cursor-pointer'>
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
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
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
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