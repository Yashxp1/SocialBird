import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    element: <Home />,
    path: '/',
  },
  {
    element: <Register />,
    path: '/register',
  },
  {
    element: <Login />,
    path: '/login',
  },
]);

const App = () => {
  return (
    <div className="bg-[#101012] h-screen">
    <RouterProvider router={router} />
    </div>
  );
};

export default App;
