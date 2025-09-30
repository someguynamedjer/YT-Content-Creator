import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Configure axios defaults
axios.defaults.timeout = 10000; // 10 seconds

// API service functions
export const api = {
  // Portfolio API
  getPortfolioItems: async (type = null, active = true) => {
    try {
      const params = new URLSearchParams();
      if (type) params.append('type', type);
      if (active !== null) params.append('active', active.toString());
      
      const response = await axios.get(`${API}/portfolio?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
      throw error;
    }
  },

  // Testimonials API
  getTestimonials: async (active = true) => {
    try {
      const params = active ? '?active=true' : '';
      const response = await axios.get(`${API}/testimonials${params}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  },

  // Stats API
  getStats: async () => {
    try {
      const response = await axios.get(`${API}/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  },

  // Contact Form API
  submitContactForm: async (formData) => {
    try {
      const response = await axios.post(`${API}/contact`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },

  // Health check
  checkHealth: async () => {
    try {
      const response = await axios.get(`${API}/`);
      return response.data;
    } catch (error) {
      console.error('API health check failed:', error);
      throw error;
    }
  }
};

// Error handling helper
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const message = error.response.data?.detail || error.response.data?.message || 'An error occurred';
    
    switch (status) {
      case 404:
        return 'Resource not found';
      case 422:
        return 'Invalid data provided';
      case 500:
        return 'Server error occurred';
      default:
        return message;
    }
  } else if (error.request) {
    // Request made but no response received
    return 'Unable to connect to server. Please check your internet connection.';
  } else {
    // Something else happened
    return 'An unexpected error occurred';
  }
};

export default api;