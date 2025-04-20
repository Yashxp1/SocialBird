import { Link, useNavigate } from 'react-router-dom';
import { LogOut, MessageSquareText, Settings, User } from 'lucide-react';
import { useAuthStore } from '../store/userAuthStore';

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-all"
        >
          <div className="p-2 rounded-md bg-blue-500/20">
            <MessageSquareText className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-xl font-semibold">ChatGram</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/settings"
            className="flex items-center gap-1 hover:text-blue-400 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-1 hover:text-blue-400 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
