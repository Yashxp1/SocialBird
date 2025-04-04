
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { useEffect } from 'react';
import { useAuthStore } from './store/useAuthStore';
import { Route, Routes, Navigate } from 'react-router-dom';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  if (isCheckingAuth && !authUser)
    return <div className="text-4xl">LOADING SKELETON TO BE ADDED HERE</div>;

  return (
    <div className="bg-[#101012] h-screen">
      <Routes>
       
        <Route
          path="/register"
          element={!authUser ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/profile"
          element={!authUser ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;
