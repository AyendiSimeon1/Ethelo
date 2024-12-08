export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-center md:text-left">
            &copy; 2024 Ethelo. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-400 transition-colors">
              Facebook
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              LinkedIn
            </a>
          </div>
          <div className="text-sm text-center md:text-right">
            <a href="#" className="hover:text-gray-400 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    );
  }
  