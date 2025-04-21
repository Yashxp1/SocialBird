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
    if (!selectedUser) return;
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unSubscribeToMessages();
  }, [selectedUser?._id, getMessages]);

  useEffect(() => {
    if(messageEndRef.current && messages)
      messageEndRef.current.scrollIntoView({behavior: "smooth"})
  },[messages])

  if (isMessageLoading) return <div>LOADING...</div>;

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader />

      <div className="flex-1 overflow-auto p-4  space-y-0">
        {messages.map((message) => (
          <div
            ref={messageEndRef}
            key={message._id}
            className={`${
              message.senderId === authUser?._id ? ' justify-end flex text-end' : ''
            }`}
           >
            {/* <div className="chat-image avatar border-red-700 border">
              <div className="size-10">
                <img
                  src={
                    message.senderId === authUser?._id
                      ? authUser.profilePic || '/avatar.png'
                      : selectedUser?.profilePic || '/avatar.png'
                  }
                   className='rounded-full border-red-500 border-2'
                />
              </div>
            </div> */}

            {/* <div className="mb-1">
              <time className="text-xs opacity-50 m-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div> */}

            <div className="inline-block">

            <div className="mb-1">
              <time className="text-xs opacity-50 m-1">
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
              {message.text && <p className='px-2 inline-block rounded-md bg-[#23272F]'>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
