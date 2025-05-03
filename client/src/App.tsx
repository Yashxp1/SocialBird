import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { useAuthStore } from './store/userAuthStore';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';
import LoadingText from './components/LoadingText';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  if (isCheckingAuth) {
    return <LoadingText />;
  }

  return (
    <>
      <ThemeProvider>
        <div className="text-white font-urbanist">
          <Navbar />
          <Routes>
            <Route path="/" element={!authUser ? <Landing /> : <Navigate to={'/chat'}/>} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/chat"
              element={authUser ? <Home /> : <Navigate to={'/login'} />}
            />

            <Route
              path="/register"
              element={!authUser ? <Register /> : <Navigate to={'/chat'} />}
            />

            <Route
              path="/login"
              element={!authUser ? <Login /> : <Navigate to={'/chat'} />}
            />

            <Route
              path="/profile"
              element={authUser ? <Profile /> : <Navigate to={'/'} />}
            />
          </Routes>

          <Toaster />
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
