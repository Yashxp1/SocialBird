import { X } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/userAuthStore';

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  return (
    <div className="p-2.5 border-b-1 border-slate-700 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className=" size-10 rounded-full">
            <div className="relative">
              <img
                className="rounded-full"
                src={selectedUser?.profilePic || '/avatar.png'}
                alt={selectedUser?.name}
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium">{selectedUser?.name}</h3>
            <p className="text-sm text-base-content/70">
              {selectedUser && onlineUsers.includes(selectedUser._id)
                ? 'Online'
                : 'Offline'}
            </p>
          </div>
        </div>

        <button
          className="cursor-pointer"
          onClick={() => setSelectedUser(null)}
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
