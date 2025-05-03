import { Link } from 'react-router-dom';
import Features from '../components/Features';
import Footer from '../components/Footer';
import DARKimg from '/DARKimg.png';
import LIGHTimg from '/LIGHTimg.png';
import { useDarkMode } from '../context/ThemeContext';

const Landing = () => {
  const { darkMode } = useDarkMode();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 dark:bg-blue-100">
      {/* Hero Section */}
      <section className="bg-gray-900 dark:bg-blue-100 pt-8 sm:pt-12 md:pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl pt-8 font-bold text-blue-600 leading-tight">
              Connect with anyone, anywhere, anytime
            </h1>
            <p className="text-gray-400 text-sm sm:text-md md:text-lg lg:text-xl pt-4 max-w-3xl mx-auto font-semibold">
              A simple and secure way to chat with friends, family, and
              colleagues. Stay connected with the people who matter most.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 py-6 md:py-10 mt-2">
              <Link to="/login" className="w-full sm:w-auto">
                <button className="w-full sm:w-40 px-6 py-3 flex justify-center items-center rounded-md bg-blue-500 text-white text-lg font-medium hover:bg-blue-600 hover:scale-105 transition-all duration-300">
                  Login
                </button>
              </Link>
              <button className="w-full sm:w-40 px-6 py-3 flex justify-center items-center rounded-md bg-white text-black text-lg font-medium hover:bg-gray-100 hover:scale-105 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
          
          {/* App Screenshot */}
          <div className="mt-10 md:mt-16 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-28">
            <img
              src={darkMode ? LIGHTimg : DARKimg}
              alt="SocialBird screenshot"
              className="w-full rounded-lg border-2 border-gray-700 dark:border-gray-300 object-cover shadow-lg shadow-purple-600/30 dark:shadow-blue-600/30"
            />
          </div>
        </div>
      </section>
      
      {/* Features Introduction */}
      <section className="pt-16 md:pt-24 px-4 sm:px-6 lg:px-8 bg-gray-900 dark:bg-blue-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col justify-center items-center text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-blue-600 font-bold">
              Why choose SocialBird?
            </h2>
            <p className="text-center pt-3 font-semibold text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Our platform offers everything you need for seamless communication.
            </p>
          </div>
        </div>
      </section>
      
      {/* Features Component */}
      <section className="bg-gray-900 dark:bg-blue-100">
        <Features />
      </section>
      
      {/* Call to Action */}
      <section className="mx-4 sm:mx-6 lg:mx-8 my-10">
        <div className="border dark:text-white flex flex-col justify-center text-center items-center rounded-lg border-gray-700 py-8 sm:py-10 md:py-12 bg-blue-600 px-4">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4">Ready to start chatting?</h3>
          <p className="py-6 md:py-8 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto">
            Join millions of users who trust SocialBird for their communication needs.
          </p>
          <Link to="/register">
            <button className="border hover:bg-blue-200 transition-colors cursor-pointer px-6 py-3 rounded-md bg-white text-blue-500 font-bold text-lg">
              Create A Free Account
            </button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <section className="mt-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="border border-gray-700 dark:border-gray-300 rounded-md">
          <Footer />
        </div>
      </section>
    </div>
  );
};

export default Landing;