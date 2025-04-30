import { Origami } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16">
      <div className="max-w-md text-center space-y-6">

        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-64 h-64 rounded-2xl flex items-center
             justify-center"
            >
              <Origami className="w-96 h-96 dark:text-blue-400 text-gray-700" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl text-gray-500 font-bold">Welcome to <span className="rounded-md text-blue-500">SocialBird</span></h2>
        <p className="text-gray-500 font-semibold">
          Select a chat from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;