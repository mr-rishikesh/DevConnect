import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore.js";
import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX, FiChevronDown, FiLogOut } from 'react-icons/fi';
import ThemeToggle from '../ThemeToggle';

const Navbar = () => {
  const { authUser, signout } = useAuthStore();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [window.location.pathname]);

  const handleSignout = () => {
    signout();
    navigate('/login');
  };

  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/explore", label: "Explore" },
    { to: "/messages", label: "Messages" },
    { to: "/about", label: "About" },
  ];

  const userMenuItems = [
    { to: "/profile", label: "Profile" },
    { to: "/users", label: "Connect To Others" },
    { to: "/earnings", label: "Earnings" },
  ];

  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-white dark:bg-secondary-900 border-b border-gray-200 dark:border-secondary-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and mobile menu button */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                className="h-8 w-auto" 
                src="/assets/logo.png" 
                alt="DevConnect" 
              />
              <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white hidden sm:block transition-colors duration-200">
                DevConnect
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block ml-10">
              <div className="flex space-x-2">
                {navLinks.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                        isActive 
                          ? 'bg-primary-100 text-primary-700 dark:bg-accent-900/30 dark:text-accent-400' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-accent-400'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {authUser ? (
              <div className="relative ml-3" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                  className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-accent-500 focus:ring-offset-white dark:focus:ring-offset-secondary-900 transition-all duration-200"
                  id="user-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 rounded-full border-2 border-white dark:border-secondary-700"
                      src={authUser.avatar || "https://avatars.githubusercontent.com/u/160262729"}
                      alt="User profile"
                    />
                    <FiChevronDown 
                      className={`ml-1 text-gray-500 dark:text-gray-400 transition-all duration-200 ${
                        isDropdownOpen ? 'transform rotate-180 text-primary-600 dark:text-accent-400' : ''
                      }`} 
                      size={16} 
                    />
                  </div>
                </button>

                {/* Dropdown menu */}
                <div
                  className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-secondary-800 ring-1 ring-black/10 dark:ring-white/10 focus:outline-none transition-all duration-200 overflow-hidden ${
                    isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <div className="py-1" role="none">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-secondary-700 bg-gray-50/50 dark:bg-secondary-900/50">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {authUser.fullName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {authUser.email}
                      </p>
                    </div>
                    {userMenuItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-secondary-700/50 transition-colors duration-150"
                        role="menuitem"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 dark:border-secondary-700 my-1"></div>
                    <button
                      onClick={handleSignout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 flex items-center transition-colors duration-150"
                      role="menuitem"
                    >
                      <FiLogOut className="mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none dark:bg-accent-600 dark:hover:bg-accent-700 transition-colors duration-200 shadow-sm rounded-md"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-primary-700 bg-primary-50 dark:bg-secondary-800 dark:text-accent-100 rounded-md hover:bg-primary-100 dark:hover:bg-secondary-700 focus:outline-none transition-colors duration-200 border border-primary-200 dark:border-secondary-700"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileOpen(!isMobileOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:focus:ring-accent-500 transition-colors duration-200"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileOpen ? (
                  <FiX className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <FiMenu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-secondary-900 border-t border-gray-100 dark:border-secondary-700">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-md text-base font-medium transition-colors duration-150 ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-accent-900/30 dark:text-accent-400'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-accent-400'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          {authUser && (
            <>
              <div className="border-t border-gray-700 my-2"></div>
              {userMenuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-secondary-800 transition-colors duration-150"
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  handleSignout();
                  setMobileOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors duration-150 flex items-center"
              >
                Sign out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
