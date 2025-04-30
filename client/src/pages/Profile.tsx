import { useState } from 'react';
import { useAuthStore } from '../store/userAuthStore';
import { Camera, Mail, Pencil, User } from 'lucide-react';

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(authUser?.name || '');

  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result as any;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen dark:bg-blue-100 dark:text-gray-700 pt-20 bg-zinc-950 text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-zinc-900 border dark:bg-blue-100 dark:border-gray-300 border-zinc-800 rounded-xl p-6 space-y-8 shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="mt-2 text-zinc-400">Your profile information</p>
          </div>

      
          <div className="flex flex-col  items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser?.profilePic || '/avatar.png'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-zinc-700 dark:border-gray-300"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 dark:bg-gray-300 bg-zinc-700 hover:scale-105
                  p-2 rounded-full cursor-pointer transition duration-200
                  ${
                    isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''
                  }
                `}
              >
                <Camera className="w-5 h-5 dark:text-gray-700  text-gray-300" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? 'Uploading...'
                : 'Click the camera icon to change your photo'}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-zinc-400 dark:text-gray-700">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="mt-1 flex justify-between items-center px-4 py-2.5 bg-zinc-800 dark:bg-blue-100 dark:border-gray-300 rounded-lg border border-zinc-700">
                {isEditingName ? (
                  <input
                    type="text"
                    className="bg-transparent  outline-none flex-1"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onBlur={async () => {
                      if (newName !== authUser?.name) {
                        await updateProfile({ name: newName });
                      }
                      setIsEditingName(false);
                    }}
                    onKeyDown={async (e) => {
                      if (e.key === 'Enter') {
                        (e.target as HTMLInputElement).blur();
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <p className="flex-1">{authUser?.name}</p>
                )}
                
                <Pencil
                  onClick={() => {
                    setIsEditingName(true);
                    setNewName(authUser?.name || '');
                  }}
                  className="w-4 h-4"
                />
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm text-zinc-400 dark:text-gray-700">
                <Mail className="w-4 h-4" />
                Username
              </div>
              <p className="mt-1 px-4 py-2.5 bg-zinc-800 rounded-lg border border-zinc-700 dark:bg-blue-100 dark:border-gray-300">
                {authUser?.username}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-zinc-900 dark:bg-blue-100 dark:border-gray-300 rounded-xl border border-zinc-800 p-6">
            <h2 className="text-lg font-semibold mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b dark:border-gray-300 border-zinc-700">
                <span>Member Since</span>
               
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-400 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
