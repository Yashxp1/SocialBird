import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io';

const BASEURL = 'http://localhost:3000';

export type AuthUser = {
  _id: string;
  name: string;
  username: string;
  profilePic?: string;
};

type AuthCredentials = {
  username: string;
  password: string;
};

type RegisterData = {
  name: string;
  username: string;
  password: string;
};

type updateProfileData = {
  name?: string;
  profilePic?: string;
};

type AuthStore = {
  authUser: AuthUser | null;
  isRegistering: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
  socket: Socket | null;

  checkAuth: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  login: (data: AuthCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: updateProfileData) => Promise<void>;

  connectSocket: () => void;
  disconnectSocket: () => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  isRegistering: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get<AuthUser>('/auth/check');
      set({ authUser: res.data });
      // get().connectSocket()
    } catch (error: any) {
      console.log('Error in checkAuth:', error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  register: async (data: RegisterData) => {
    set({ isRegistering: true });
    try {
      const res = await axiosInstance.post<AuthUser>('/auth/register', data);
      set({ authUser: res.data });
      toast.success('Account created successfully');

      get().connectSocket();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      set({ isRegistering: false });
    }
  },

  login: async (data: AuthCredentials) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post<AuthUser>('/auth/login', data);
      set({ authUser: res.data });
      toast.success('Logged in successfully');

      get().connectSocket();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    set({ isUpdatingProfile: true });
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });
      toast.success('Logged out successfully');

      get().disconnectSocket();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  },

  updateProfile: async (data: updateProfileData) => {
    try {
      const res = await axiosInstance.put<AuthUser>(
        '/auth/update-profile',
        data
      );
      set({ authUser: res.data });
      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.log('Error in update profile:', error);
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: async () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASEURL, {
      query: {
        userId: authUser._id,
      },
    });

    set({ socket } as any);

    socket.on("getOnlineUsers", (userIds) => {
      set({onlineUsers: userIds})
    })
  },
  disconnectSocket: async () => {
    if (get().socket?.connected) get().socket?.disconnect();
  },
<<<<<<< HEAD
}));  
=======
}));
>>>>>>> d574bb69a93d812bd076e863e444cde99355ae52
