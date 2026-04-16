import axios, { AxiosError } from 'axios';
import { supabase } from './supabase';
import Toast from 'react-native-toast-message';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Request Interceptor: Attach JWT from Supabase session
api.interceptors.request.use(async (config) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }
  } catch (error) {
    console.error('API Request Interceptor Error:', error);
  }
  return config;
}, (error) => Promise.reject(error));

// Response Interceptor: Global Error Handling
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      const detail = (error.response.data as any)?.detail || 'An unexpected error occurred';

      if (status === 401) {
        Toast.show({
          type: 'error',
          text1: 'Session Expired',
          text2: 'Please log in again',
        });
        // We don't call logout here directly to avoid circular dependencies with the store,
        // but the authStore will handle session state changes via supabase listeners.
      } else if (status === 429) {
        Toast.show({
          type: 'error',
          text1: 'Rate Limit Exceeded',
          text2: detail,
        });
      } else if (status >= 500) {
        Toast.show({
          type: 'error',
          text1: 'Server Error',
          text2: 'Our AI providers are having trouble. Please try again later.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: detail,
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Please check your internet connection',
      });
    }
    return Promise.reject(error);
  }
);
