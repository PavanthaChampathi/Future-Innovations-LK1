import React from 'react';
import { Settings, MapPin, Users, Star } from 'lucide-react';

const About = () => {
  const equipment = [
    {
      name: 'K1 Max 3D Printer',
      specs: ['300x300x300mm build volume', 'High-speed printing', 'Auto bed leveling', 'Enclosed chamber'],
      image: '🖨️'
    },
    {
      name: 'CO2 Laser Cutter',
      specs: ['130W power output', '900x1300mm bed size', 'Precision cutting', 'Multiple material support'],
      image: '⚡'
    }
  ];

  const materials = [
    { name: 'PLA+', properties: 'Strong, easy to print, biodegradable', color: 'bg-green-100 text-green-800' },
    { name: 'ABS', properties: 'Heat resistant, durable, flexible', color: 'bg-blue-100 text-blue-800' },
    { name: 'eTU-95A', properties: 'Flexible, rubber-like, impact resistant', color: 'bg-purple-100 text-purple-800' }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About Future Innovations LK</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Leading provider of advanced manufacturing services in Sri Lanka, specializing in 3D printing and laser cutting with state-of-the-art equipment.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Settings className="h-6 w-6 text-red-600 mr-3" />
              Our Equipment
            </h3>
            <div className="space-y-6">
              {equipment.map((item, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{item.image}</div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{item.name}</h4>
                      <ul className="space-y-2">
                        {item.specs.map((spec, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                            <span className="text-gray-700 dark:text-gray-300">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Premium Materials</h3>
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold text-gray-900 dark:text-white">High-Quality eSUN Filaments</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We exclusively use premium eSUN filaments, known for their consistency, quality, and excellent printing results.
              </p>
            </div>

            <div className="space-y-4">
              {materials.map((material, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-red-200 dark:hover:border-red-700 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{material.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${material.color}`}>
                      Premium
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{material.properties}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-xl">
            <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/20 rounded-xl">
              <div className="flex items-center space-x-3 mb-3">
                <MapPin className="h-5 w-5 text-red-600" />
                <h4 className="font-semibold text-gray-900 dark:text-white">Located in Sri Lanka</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Serving customers across Sri Lanka with fast delivery and local support. Contact us for your manufacturing needs.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-red-600 mb-2">500+</div>
            <div className="text-gray-600 dark:text-gray-400">Projects Completed</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-red-600 mb-2">99%</div>
            <div className="text-gray-600 dark:text-gray-400">Customer Satisfaction</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-red-600 mb-2">24h</div>
            <div className="text-gray-600 dark:text-gray-400">Average Turnaround</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;