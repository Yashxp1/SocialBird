const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:text-black dark:bg-blue-100 text-gray-400 px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 ">


        <div className="">
          <h4 className="font-semibold text-white dark:hover:text-gray-900 dark:text-black mb-4">Product</h4>
          <ul className="space-y-2">
            <li><a href="#" className="">Features</a></li>
            <li><a href="#" className="">Pricing</a></li>
            <li><a href="#" className="">Security</a></li>
            <li><a href="#" className="">Enterprise</a></li>
            <li><a href="#" className="">Customer Stories</a></li>
          </ul>
        </div>

 
        <div>
          <h4 className="font-semibold dark:text-black text-white mb-4">Resources</h4>
          <ul className="space-y-2">
            <li><a href="#" className="">Documentation</a></li>
            <li><a href="#" className="">Tutorials</a></li>
            <li><a href="#" className="">Blog</a></li>
            <li><a href="#" className="">Support Center</a></li>
            <li><a href="#" className="">Contact</a></li>
          </ul>
        </div>

   
        <div>
          <h4 className="font-semibold dark:text-black text-white mb-4">Company</h4>
          <ul className="space-y-2">
            <li><a href="#" className="">About Us</a></li>
            <li><a href="#" className="">Careers</a></li>
            <li><a href="#" className="">Press</a></li>
            <li><a href="#" className="">Privacy Policy</a></li>
            <li><a href="#" className="">Terms of Service</a></li>
          </ul>
        </div>
      </div>

   
      <div className=" border-gray-700  mt-12 pt-8 text-sm text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} ChatNow. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
