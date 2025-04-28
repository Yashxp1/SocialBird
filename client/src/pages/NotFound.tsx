import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-900 h-screen justify-center flex flex-col items-center pt-15">
      <span className="text-blue-800  text-9xl font-extrabold">
        Not Found - 404
      </span>
      <button onClick={() => navigate('/')} className="my-18 px-16 py-4 rounded-md font-bold text-white bg-blue-500">
        GO HOME
      </button>
    </div>
  );
};

export default NotFound;
