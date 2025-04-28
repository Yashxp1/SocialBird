import { Globe, ShieldEllipsis, MessageCircle, Image } from 'lucide-react';

const features = [
  {
    title: 'Real-time Messaging',
    description:
      'Instant message delivery with read receipts and typing indicators.',
    icon: <MessageCircle />,
  },
  {
    title: 'Available Everywhere',
    description:
      'Access your chats from any device with our web, mobile, and desktop apps.',
    icon: <Globe />,
  },
  {
    title: 'End-to-End Encryption',
    description:
      'Your conversations are secure with state-of-the-art encryption technology.',
    icon: <ShieldEllipsis />,
  },
  {
    title: 'Media Sharing',
    description:
      'Share photos seamlessly.',
    icon: <Image />,
  },
];

const Features = () => {
  return (
    <div className='pt-10 md:px-22 w-full'>
      {features.map((items, idx) => (
        <div key={idx} className='p-8 border border-gray-700 rounded-md my-4 transition-colors hover:bg-blue-950'>
          <div className='text-blue-500'>{items.icon}</div>
          <h3 className='text-2xl font-semibold py-3'>{items.title}</h3>
          <p className='text-gray-400'>{items.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;
