import { Globe, ShieldEllipsis, MessageCircle, Image } from 'lucide-react';

const features = [
  {
    title: 'Real-time Messaging',
    description:
      'Instant message delivery with read receipts and typing indicators.',
    icon: <MessageCircle size={24} />,
  },
  {
    title: 'Available Everywhere',
    description:
      'Access your chats from any device with our web, mobile, and desktop apps.',
    icon: <Globe size={24} />,
  },
  {
    title: 'End-to-End Encryption',
    description:
      'Your conversations are secure with state-of-the-art encryption technology.',
    icon: <ShieldEllipsis size={24} />,
  },
  {
    title: 'Media Sharing',
    description:
      'Share photos seamlessly.',
    icon: <Image size={24} />,
  },
];

const Features = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <div 
            key={idx} 
            className="p-6 border dark:border-gray-300 border-gray-700 rounded-lg 
                     hover:shadow-md transition-all duration-300
                     dark:hover:bg-blue-600 hover:bg-blue-950
                     dark:hover:text-white dark:text-black"
          >
            <div className="text-blue-400 mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;