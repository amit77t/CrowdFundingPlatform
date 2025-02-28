import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  login: async (email, password) => {
    const response = await api.post('/users/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/users', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
};

// Campaign Services
export const campaignService = {
  getAllCampaigns: async (page = 1, industry = '', status = 'active') => {
    const response = await api.get('/campaigns', {
      params: { pageNumber: page, industry, status },
    });
    return response.data;
  },

  getCampaignById: async (id) => {
    const response = await api.get(`/campaigns/${id}`);
    return response.data;
  },

  createCampaign: async (campaignData) => {
    const response = await api.post('/campaigns', campaignData);
    return response.data;
  },

  updateCampaign: async (id, campaignData) => {
    const response = await api.put(`/campaigns/${id}`, campaignData);
    return response.data;
  },

  addCampaignUpdate: async (id, updateData) => {
    const response = await api.post(`/campaigns/${id}/updates`, updateData);
    return response.data;
  },
};

// Investment Services
export const investmentService = {
  createInvestment: async (investmentData) => {
    const response = await api.post('/investments', investmentData);
    return response.data;
  },

  getUserInvestments: async (page = 1) => {
    const response = await api.get('/investments', {
      params: { pageNumber: page },
    });
    return response.data;
  },

  getInvestmentById: async (id) => {
    const response = await api.get(`/investments/${id}`);
    return response.data;
  },
};