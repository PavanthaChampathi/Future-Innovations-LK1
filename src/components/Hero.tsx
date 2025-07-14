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
    <section id="home" className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Future <span className="text-blue-600">Innovations</span> LK
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Premier 3D printing and laser cutting services in Sri Lanka. From prototyping to production, we bring your ideas to life with precision and quality.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToQuote}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Get Instant Quote</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button 
                onClick={scrollToServices}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>View Services</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Printer className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">3D Printing</h3>
                  <p className="text-sm text-gray-600">PLA+, ABS, eTU-95A</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Zap className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Laser Cutting</h3>
                  <p className="text-sm text-gray-600">CO2 130W Precision</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-100 to-orange-100 p-8 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white rounded-xl p-6 shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <Printer className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">3D Printing</h3>
                  <p className="text-sm text-gray-600">High-quality prints with premium eSUN filaments</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300 mt-8">
                  <Zap className="h-12 w-12 text-orange-500 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Laser Cutting</h3>
                  <p className="text-sm text-gray-600">Precision cutting with 130W CO2 laser</p>
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