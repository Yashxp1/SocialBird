import { FormEvent, useRef, useState, ChangeEvent } from 'react';
import { useChatStore } from '../store/useChatStore';
import { ImagePlus, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';

const MessageInput = () => {
  const [text, setText] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        //@ts-ignore
        image: imagePreview,
      });

      setText('');
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="w-full p-4">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              type="button"
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-zinc-800 text-white flex items-center justify-center"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex flex-1 gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="w-full px-4 py-2 text-sm sm:text-base rounded-md border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`hidden sm:flex items-center justify-center w-10 h-10 rounded-full border-2 border-zinc-300 transition-colors ${
              imagePreview ? 'text-emerald-500' : 'text-zinc-400'
            } hover:bg-zinc-100`}
          >
             <ImagePlus size={20}/>
          </button>
        </div>
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500 text-white disabled:opacity-50 hover:bg-blue-600 transition-colors"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
