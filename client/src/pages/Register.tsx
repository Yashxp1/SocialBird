import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';

const Register = () => {
  const { formData, setFormData } = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const { Register, isRegistering } = useAuthStore();

  const validateForm = () => {
    if (!formData.name.trim()) return toast.error('Full name is required');
    if (!formData.username.trim()) return toast.error(' Username is required');
    if (!formData.email.trim()) return toast.error('Email is required');
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error('Invalid email format');
    if (!formData.password) return toast.error('Password is required');
    if (formData.password.length < 6)
      return toast.error('Password must be at least 6 characters');

    return true;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) Register(formData);
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className=" p-3 flex flex-col justify-center items-center w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%]">
        <h2 className="text-center text-white text-4xl font-semibold p-4">

          Register
        </h2>

        <div className="flex flex-col">
          <input
            placeholder="Name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            placeholder="Username"
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, userame: e.target.value })
            }
          />
          <input
            placeholder="Email"
            type={'text'}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            placeholder={'Password'}
            type={'password'}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <button onClick={handleSubmit} />
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>
          <Link to={'/Login'}>
            <button onClick={() => console.log('Clicked')} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
