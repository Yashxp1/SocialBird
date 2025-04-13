import { create } from 'zustand';
import { useAuthStore, AuthUser } from './userAuthStore';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';

type Message = {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: string;
};

type MessageData = {
  text: string;
};

type chatStoreData = {
  messages: Message[];
  users: AuthUser[];
  selectedUser: AuthUser | null;
  isUserLoading: boolean;
  isMessageLoading: boolean;

  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (messageData: MessageData) => Promise<void>;
  subscribeToMessages: () => void;
  unSubscribeToMessages: () => void;
  setSelectedUser: (user: AuthUser) => void;
};

export const useChatStore = create<chatStoreData>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get<AuthUser[]>('/messages/users');
      set({ users: res.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get<Message[]>(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return;
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },
  subscribeToMessages: async () => {},
  unSubscribeToMessages: async () => {},
  setSelectedUser: async () => {},
}));
