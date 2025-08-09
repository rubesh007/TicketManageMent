import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="backdrop-blur-md bg-white/30 shadow-lg fixed w-full z-10 b-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              TicketHub
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              
                <>
                  <Link
                    to="/raise-ticket"
                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white/20"
                  >
                    Raise Ticket
                  </Link>
                  <Link
                    to="/my-tickets"
                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white/20"
                  >
                    My Tickets
                  </Link>
                </>
            

              
                <>
                  <Link
                    to="/"
                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white/20"
                  >
                    Login
                  </Link>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white/20"
                  >
                    Dashboard
                  </Link>
                </>
           

              {/* User Profile Dropdown */}
              {/* <div className="ml-4 relative">
                <div className="flex items-center space-x-2 cursor-pointer group">
                  <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                    User Name
                  </div>
                  <span className="text-gray-700 group-hover:text-indigo-600 font-medium">
                React
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-500 group-hover:text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <div className="absolute right-0 mt-2 w-48 bg-white/80 backdrop-blur-md rounded-md shadow-lg py-1 hidden group-hover:block z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
                  >
                    Sign out
                  </Link>
                </div>
              </div> */}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-white/20 focus:outline-none">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white/90 backdrop-blur-md">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
         
            <>
              <Link
                to="/raise-ticket"
                className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                Raise Ticket
              </Link>
              <Link
                to="/my-tickets"
                className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                My Tickets
              </Link>
            </>
         
          
            <>
              <Link
                to="/tickets"
                className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                All Tickets
              </Link>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                Dashboard
              </Link>
            </>
      
          <div className="border-t border-gray-200 pt-4 pb-3">
            <div className="flex items-center px-5">
              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
              
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                 
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                to="/profile"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md"
              >
                Profile
              </Link>
              <Link
                to="/logout"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md"
              >
                Sign out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}