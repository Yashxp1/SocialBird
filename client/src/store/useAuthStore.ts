import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

// const baseURL =
//   import.meta.env.MODE === 'development' ? 'http://localhost:5001' : '/';

export type AuthUser = {
  _id: string;
  name: string;
  username: string;
  email: string;
  profilePic?: string;
};

type AuthCredentials = {
  username: string;
  email?: string;
  password: string;
};

type updateProfileData = {
  name?: string;
  username?: string;
  profilePic?: string;
};

type RegisterData = {
  name: string;
  email: string;
  username: string;
  password: string;
};

type AuthStore = {
  authUser: AuthUser | null;
  isRegistering: boolean;
  isLoggingIn: boolean;
  isUpdating: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
  // socket: Socket | null

  checkAuth: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  login: (data: AuthCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: updateProfileData) => Promise<void>;
  // connectedSocket: () => void;
  // disconnectSocket: () => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  isRegistering: false,
  isLoggingIn: false,
  isUpdating: false,
  isCheckingAuth: true,
  onlineUsers: [],
  // socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get<AuthUser>('auth/check');
      set({ authUser: res.data });
    } catch (error) {
      console.log('Error in checkAuth:', error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  register: async (data: RegisterData) => {
    try {
      const res = await axiosInstance.post<AuthUser>('auth/check', data);
      set({ authUser: res.data });
    } catch (error: any) {
      console.log('Error in checkAuth:', error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (data: AuthCredentials) => {
    try {
      const res = await axiosInstance.post<AuthUser>('/auth/login', data);
      set({ authUser: res.data });
      // get().connectSocket();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  },

  updateProfile: async (data: updateProfileData) => {
    set({ isUpdating: true });
    try {
      const res = await axiosInstance.put<AuthUser>(
        '/auth/update-profile',
        data
      );
      set({ authUser: res.data });
    } catch (error: any) {
      console.log('Error in update profile:', error);
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      set({ isUpdating: false });
    }
  },
}));
