import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/userAuthStore';

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  return (
    <div className="p-2.5  border-b border-blue-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser?.profilePic || '/avatar.png'}
                alt={selectedUser?.name}
              />
            </div>
          </div>

       
          <div>
            <h3 className="font-medium">{selectedUser?.name}</h3>
            <p className="text-sm text-base-content/70">
              {selectedUser && onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>


        <button onClick={() => setSelectedUser(null)}>
          X
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
