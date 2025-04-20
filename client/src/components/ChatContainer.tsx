import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';

const ChatContainer = () => {
  const { messages, getMessages, isMessageLoading, selectedUser } =
    useChatStore();

  if (isMessageLoading) return <div>LOADING...</div>;

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <p>Messages Loading...</p>
      <MessageInput/>
    </div>
  );
};

export default ChatContainer;
