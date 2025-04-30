import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/userAuthStore';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });

  const { register, isRegistering } = useAuthStore();

  const validateForm = () => {
    if (!formData.name.trim()) return toast.error('Name is required');
    if (!formData.username.trim()) return toast.error('Username is required');
    if (!formData.password) return toast.error('Password is required');
    if (formData.password.length < 6)
      return toast.error('Password must be at least 6 characters');

    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) register(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 dark:bg-blue-100 text-white dark:text-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 dark:bg-blue-100 p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border dark:text-black rounded-md dark:bg-blue-100 border-gray-700 bg-gray-700 dark:border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className="w-full px-4 py-2 border dark:text-black rounded-md dark:bg-blue-100 border-gray-700 bg-gray-700 dark:border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full px-4 py-2 border dark:text-black rounded-md dark:bg-blue-100 border-gray-700 bg-gray-700 dark:border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={isRegistering}
          className="w-full py-2 bg-blue-600 dark:text-white hover:bg-blue-700 transition rounded-md font-medium"
        >
          {isRegistering ? 'Loading...' : 'Create an Account'}
        </button>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
