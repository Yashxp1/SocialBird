import { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { useAuthStore } from '../store/userAuthStore';
import { formatMessageTime } from '../lib/timeFormat';

const ChatContainer = () => {
  const { messages, getMessages, isMessageLoading, selectedUser } =
    useChatStore();

  const { authUser } = useAuthStore();

  useEffect(() => {
    if (!selectedUser) return;
    getMessages(selectedUser._id);
  }, [selectedUser?._id, getMessages]);

  if (isMessageLoading) return <div>LOADING...</div>;

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-0">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser?._id ? 'chat-end' : 'chat-start'
            }`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rouded-full border">
                <img
                  src={
                    message.senderId === authUser?._id
                      ? authUser.profilePic || '/avatar.png'
                      : selectedUser?.profilePic || '/avatar.png'
                  }
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <p>Messages Loading...</p>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
