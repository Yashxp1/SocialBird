import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import { useAuthStore } from './store/userAuthStore';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  if (isCheckingAuth) {
    return <div>LOADING SKELETION TO BE ADDED</div>;
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={'/login'} />}
        />

        <Route
          path="/register"
          element={!authUser ? <Register /> : <Navigate to={'/'} />}
        />

        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={'/'} />}
        />

        <Route
          path="/settings"
          element={authUser ? <Settings /> : <Navigate to={'/login'} />}
        />

        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to={'/'} />}
        />
      </Routes>

      
      <Toaster />
    </div>
  );
};

export default App;
