import { Link } from 'react-router-dom';
import Features from '../components/Features';
import Footer from '../components/Footer';
import image from '/image.png';

const Landing = () => {
  return (
    <div className="bg-gray-900 dark:bg-blue-100 pt-16 px-4">
      <div className="flex flex-col justify-center items-center ">
        <span className="flex flex-col justify-center items-center">
          <h1 className="text-4xl text-blue-600 md:text-6xl lg:text-6xl pt-10 md:pt-18 font-bold">
            Connect with anyone, anywhere, anytime
          </h1>
          <p className="text-gray-400 text-md md:text-lg lg:text-2xl pt-3  font-semibold">
            A simple and secure way to chat with friends, family, and
            colleagues. Stay connected with the people who matter most.
          </p>
        </span>

        <div className="flex md:flex-row gap-4 py-6 md:py-14">
          <Link to={'/login'}>
            <button className="w-42 cursor-pointer py-3 flex justify-center items-center rounded-md bg-blue-500 text-xl hover:scale-105 transition-all">
              Login
            </button>
          </Link>
          <button className="w-42 cursor-pointer py-3 flex justify-center items-center rounded-md bg-white text-black text-xl hover:scale-105 transition-all">
            Learn More
          </button>
        </div>

        <div className="md:px-28 pt-12 rounded-md border-gray-700 ">
          <img
            src={image}
            alt="chat-screenshot"
            className="border-2 border-gray-700 w-full rounded-md object-cover shadow-2xl shadow-purple-600 dark:shadow-blue-600"
          />
        </div>
        <div className="pt-24">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl text-blue-600 md:text-5xl border-gray-700 pt-8 rounded-md font-bold ">
              Why choose SocialBird?
            </h2>
            <p className="text-center pt-4 font-bold text-gray-400">
              Our platform offers everything you need for seamless
              communication.
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <Features />
      </div>

      <div className="border dark:text-white flex flex-col justify-center text-center items-center rounded-md border-gray-700 my-10 py-10 bg-blue-600">
        <p className="text-5xl font-bold mt-8">Ready to start chatting?</p>
        <p className="py-10 text-2xl mx-4 lg:mx-auto">
          Join millions of users who trust ChatNow for their communication
          needs.
        </p>
        <Link to={'/register'}>
          <button className="border hover:bg-blue-200 transition-colors cursor-pointer px-6 py-4 rounded-md bg-white text-blue-500 font-bold">
            Create A Free Account
          </button>
        </Link>
      </div>

      <div className="pb-2">
        <div className="border border-gray-700 dark:border-gray-300 rounded-md pb-6">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Landing;
