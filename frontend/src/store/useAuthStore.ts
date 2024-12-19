import { create } from 'zustand';
import axios from 'axios';

// Configure axios defaults
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
// Remove withCredentials as we're using token-based auth
// axios.defaults.withCredentials = true;

interface User {
  id: string;
  username: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (userId: string, username: string, token: string, role: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: (userId, username, token, role) => {
    const user = { id: userId, username, role };
    set({ user, token, isAuthenticated: true });
    
    // Set Authorization header for future requests
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  },
  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    // Clear authorization header
    delete axios.defaults.headers.common['Authorization'];
  },
}));