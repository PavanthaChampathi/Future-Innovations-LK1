import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, Wrench, AlertTriangle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const NotFound = () => {
  const location = useLocation();
  const { isDark } = useTheme();
  const currentPath = location.pathname;

  const suggestions = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/#services', label: 'Our Services', icon: Wrench },
    { path: '/#quote', label: 'Get Quote', icon: Search },
    { path: '/admin', label: 'Admin Panel', icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 */}
        <div className="mb-8">
          <div className="relative">
            <h1 className="text-9xl font-bold text-red-600 dark:text-red-400 opacity-20 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/Logo_S.png" 
                alt="Future Innovations LK" 
                className="h-24 w-24 animate-pulse"
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Oops! Page Not Found
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Sorry, the page you're looking for doesn't exist:
            </p>
            <code className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 px-3 py-2 rounded-md font-mono text-sm break-all">
              {currentPath}
            </code>
          </div>
        </div>

        {/* Animated Gears */}
        <div className="mb-8 flex justify-center space-x-4">
          <div className="w-12 h-12 border-4 border-red-600 dark:border-red-400 border-t-transparent rounded-full animate-spin"></div>
          <div className="w-8 h-8 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDelay: '0.2s' }}></div>
          <div className="w-6 h-6 border-4 border-gray-600 dark:border-gray-400 border-t-transparent rounded-full animate-spin" style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* Suggestions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Maybe you were looking for:
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {suggestions.map((suggestion, index) => {
              const IconComponent = suggestion.icon;
              return (
                <Link
                  key={index}
                  to={suggestion.path}
                  className="group bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg border dark:border-gray-700 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                      <IconComponent className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {suggestion.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Go Back</span>
          </button>
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
          >
            <Home className="h-5 w-5" />
            <span>Go Home</span>
          </Link>
        </div>

        {/* Fun Message */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-blue-800 dark:text-blue-300 text-sm">
            💡 <strong>Did you know?</strong> Our 3D printers and laser cutters never get lost - 
            they always know exactly where to go! Unlike this page... 😅
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;