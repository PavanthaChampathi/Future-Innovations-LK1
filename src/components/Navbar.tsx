import React, { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <img src="/Logo_S.png" alt="Future Innovations LK" className="h-10 w-10" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Future Innovations LK</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <button onClick={() => scrollToSection('home')} className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors dark:text-gray-300 dark:hover:text-red-400">
                Services
              </button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors dark:text-gray-300 dark:hover:text-red-400">
                About
              </button>
              <button onClick={() => scrollToSection('quote')} className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors dark:text-gray-300 dark:hover:text-red-400">
                Get Quote
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors dark:text-gray-300 dark:hover:text-red-400">
                Contact
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-700 hover:text-red-600 rounded-md transition-colors dark:text-gray-300 dark:hover:text-red-400"
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <a href="/admin" className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors">
                Admin
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t dark:border-gray-700">
            <button onClick={() => scrollToSection('home')} className="text-gray-900 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors dark:text-white dark:hover:text-red-400">
              Home
            </button>
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors dark:text-gray-300 dark:hover:text-red-400">
              Services
            </button>
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors dark:text-gray-300 dark:hover:text-red-400">
              About
            </button>
            <button onClick={() => scrollToSection('quote')} className="text-gray-700 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors dark:text-gray-300 dark:hover:text-red-400">
              Get Quote
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors dark:text-gray-300 dark:hover:text-red-400">
              Contact
            </button>
            <div className="flex items-center justify-between px-3 py-2">
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors dark:text-gray-300 dark:hover:text-red-400"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
            <a href="/admin" className="bg-red-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-red-700 transition-colors">
              Admin
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;