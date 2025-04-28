import Features from '../components/Features';
import image from '/image.png';
const Landing = () => {
  return (
    <div className="bg-gray-900 pt-16 px-4">
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
          <button className="w-42 py-3 flex justify-center items-center rounded-md bg-blue-500 text-xl">
            Login
          </button>
          <button className="w-42 py-3 flex justify-center items-center rounded-md bg-white text-black text-xl">
            Get Started
          </button>
        </div>

        <div className="md:px-28 rounded-md border-gray-700 ">
          <img
            src={image}
            alt="chat-screenshot"
            className="border-2 border-gray-700 w-full rounded-md object-cover shadow-2xl shadow-purple-600"
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
    </div>
  );
};

export default Landing;
