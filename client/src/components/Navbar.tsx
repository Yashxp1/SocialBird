import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Origami, User } from 'lucide-react';
import { useAuthStore } from '../store/userAuthStore';
import { useChatStore } from '../store/useChatStore';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const { selectedUser } = useChatStore();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="fixed dark:bg-blue-100 top-0 w-full z-50 bg-gray-900 text-white dark:text-black  shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-all"
        >
          <div className="p-2 rounded-md bg-blue-500/20">
            <Origami className="w-5 h-5 dark:text-[#3D90D7] text-blue-400" />
          </div>
          <span className="text-xl font-semibold dark:text-blue-600">SocialBird</span>
        </Link>

        <div className="flex items-center gap-4">
          {authUser && (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-1 px-2 rounded-md py-1 hover:bg-blue-900 dark:hover:text-white dark:hover:bg-blue-500  transition-colors"
              >
                {' '}
                <div className="flex items-center justify-center gap-2">
                  <img
                    src={authUser?.profilePic || '/avatar.png'}
                    className="size-6 border dark:border-gray-300 border-gray-700 rounded-full object-cover"
                  />
                  <span className="hidden sm:inline">{authUser?.username}</span>
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-2 rounded-md py-1 hover:bg-red-600 dark:hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
          <div className="flex justify-end items-center">
            <DarkModeToggle/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
