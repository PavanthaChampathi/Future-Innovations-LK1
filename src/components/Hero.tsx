import React from 'react';
import { ArrowRight, Printer, Zap } from 'lucide-react';

const Hero = () => {
  const scrollToQuote = () => {
    const element = document.getElementById('quote');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-16 min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Future <span className="text-red-600">Innovations</span> LK
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Premier 3D printing and laser cutting services in Sri Lanka. From prototyping to production, we bring your ideas to life with precision and quality.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToQuote}
                className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Get Instant Quote</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button 
                onClick={scrollToServices}
                className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 dark:border-red-500 dark:text-red-400 dark:hover:bg-red-500"
              >
                <span>View Services</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-red-100 rounded-lg dark:bg-red-900/30">
                  <Printer className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">3D Printing</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">PLA+, ABS, eTU-95A</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-lg dark:bg-blue-900/30">
                  <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Laser Cutting</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">CO2 130W Precision</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-red-100 to-blue-100 dark:from-red-900/30 dark:to-blue-900/30 p-8 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <Printer className="h-12 w-12 text-red-600 mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">3D Printing</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">High-quality prints with premium eSUN filaments</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300 mt-8">
                  <Zap className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Laser Cutting</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Precision cutting with 130W CO2 laser</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;