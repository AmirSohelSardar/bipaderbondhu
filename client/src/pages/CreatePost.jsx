import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setImageUploadError('Please select a valid image file');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setImageUploadError('Image size must be less than 5MB');
        return;
      }

      setImageUploadError(null);
      setImageUploadProgress(0);
      setIsUploading(true);

      const formDataImage = new FormData();
      formDataImage.append('image', file);

      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          setImageUploadProgress(progress);
        }
      });

      // Handle successful upload
      xhr.addEventListener('load', () => {
        setIsUploading(false);
        
        if (xhr.status === 200) {
          try {
            const data = JSON.parse(xhr.responseText);

            if (data.imageUrl) {
              setFormData({ ...formData, image: data.imageUrl });
              setImageUploadProgress(null);
              setImageUploadError(null);
            } else {
              throw new Error('No image URL returned from server');
            }
          } catch (parseError) {
            console.error('Parse error:', parseError);
            setImageUploadError('Invalid response from server');
            setImageUploadProgress(null);
          }
        } else {
          try {
            const errorData = JSON.parse(xhr.responseText);
            setImageUploadError(errorData.message || `Upload failed with status ${xhr.status}`);
          } catch {
            setImageUploadError(`Upload failed with status ${xhr.status}`);
          }
          setImageUploadProgress(null);
        }
      });

      // Handle network errors
      xhr.addEventListener('error', () => {
        console.error('XHR error');
        setImageUploadError('Network error during upload');
        setIsUploading(false);
        setImageUploadProgress(null);
      });

      // Handle upload abort
      xhr.addEventListener('abort', () => {
        setImageUploadError('Upload cancelled');
        setIsUploading(false);
        setImageUploadProgress(null);
      });

      const uploadUrl = `${import.meta.env.VITE_BACKEND_URL}/api/upload/blog-image`;
      xhr.open('POST', uploadUrl);
      xhr.withCredentials = true;
      xhr.send(formDataImage);

    } catch (error) {
      console.error('Upload error:', error);
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.title || !formData.content) {
      setPublishError('Please provide title and content');
      return;
    }

    if (formData.title.length < 3) {
      setPublishError('Title must be at least 3 characters long');
      return;
    }

    if (formData.content.length < 50) {
      setPublishError('Content must be at least 50 characters long');
      return;
    }

    try {
      setPublishError(null);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/post/create`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message || 'Failed to create post');
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      console.error('Publish error:', error);
      setPublishError('Something went wrong while publishing');
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value='uncategorized'>Select a category</option>
            <option value='relief'>Relief</option>
            <option value='welfare'>Welfare</option>
            <option value='updates'>Updates</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUploadImage}
            disabled={isUploading || imageUploadProgress !== null}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=Image+Failed+to+Load';
            }}
          />
        )}
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}