import { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { useAuthStore } from '../store/userAuthStore';
import { formatMessageTime } from '../lib/timeFormat';

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessageLoading,

    selectedUser,
    subscribeToMessages,
    unSubscribeToMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!selectedUser?._id) return;
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unSubscribeToMessages();
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unSubscribeToMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages)
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (isMessageLoading) return <div>LOADING...</div>;

  return (
    <div className="flex-1 dark:bg-blue-100 flex flex-col border-l border border-gray-700 dark:border-gray-300 ml-1 rounded-lg">
      <ChatHeader />

      <div className="flex-1 overflow-auto p-4  space-y-0">
        {messages.map((message) => (
          <div
            ref={messageEndRef}
            key={message._id}
            className={`${
              message.senderId === authUser?._id
                ? ' justify-end flex text-end'
                : ''
            }`}
          >
            <div className="flex items-center">
             
              <div className="inline-block">
                <div className="mb-1">
                  <time className="text-[10px] dark:text-gray-700 opacity-50 m-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>

                {message.image && (
                  <img
                    src={message.image}
                    alt="attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && (
                  <div>
                    <p className="px-2 py-1 inline-block dark:bg-blue-700 rounded-md bg-[#23272F]">
                      {message.text}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
