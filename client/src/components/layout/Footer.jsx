import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-secondary-900 text-gray-900 dark:text-white pt-12 pb-6 border-t border-gray-100 dark:border-secondary-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary-600 dark:text-accent-500">DevConnect</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Connecting developers worldwide to build, collaborate, and grow together in the ever-evolving tech landscape.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/mr-rishikesh/DevConnect" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-accent-500 transition-colors duration-300 text-xl"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a 
                href="https://www.instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-accent-500 transition-colors duration-300 text-xl"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://www.linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-accent-500 transition-colors duration-300 text-xl"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Explore', 'Messages', 'About'].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item.toLowerCase()}`} 
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-accent-500 transition-colors duration-300 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4 text-lg">Resources</h3>
            <ul className="space-y-3">
              {['Documentation', 'Blog', 'Tutorials', 'Community'].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item.toLowerCase()}`} 
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-accent-500 transition-colors duration-300 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4 text-lg">Legal</h3>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-accent-500 transition-colors duration-300 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-gray-800 my-6"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} DevConnect. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <span className="block md:inline-block">Made with ❤️ for developers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;