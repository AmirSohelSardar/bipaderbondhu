// src/utils/api.js
// Create this file and use it for ALL API calls

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export const apiRequest = async (endpoint, options = {}) => {
  const config = {
    credentials: 'include', // ✅ CRITICAL: Include cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await response.json();

    return { response, data };
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Usage examples:

// GET request
// const { response, data } = await apiRequest('/api/post/getposts');

// POST request
// const { response, data } = await apiRequest('/api/auth/signin', {
//   method: 'POST',
//   body: JSON.stringify({ email, password }),
// });

// PUT request
// const { response, data } = await apiRequest('/api/user/update/123', {
//   method: 'PUT',
//   body: JSON.stringify(formData),
// });

// DELETE request
// const { response, data } = await apiRequest('/api/post/deletepost/123', {
//   method: 'DELETE',
// });