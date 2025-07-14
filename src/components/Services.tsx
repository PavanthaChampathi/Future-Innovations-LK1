import React from 'react';
import { Printer, Zap, Clock, Shield, Award, Wrench } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Printer,
      title: '3D Printing Services',
      description: 'Professional 3D printing with K1 Max printer using premium eSUN filaments.',
      features: ['PLA+ for durability', 'ABS for strength', 'eTU-95A for flexibility', 'High precision prints'],
      price: 'From LKR 50/gram',
      color: 'blue'
    },
    {
      icon: Zap,
      title: 'Laser Cutting',
      description: 'Precision laser cutting with our CO2 130W laser on 900x1300mm bed.',
      features: ['Wood cutting', 'Acrylic cutting', 'Cardboard & paper', 'Custom designs'],
      price: 'From LKR 100/min',
      color: 'orange'
    }
  ];

  const features = [
    { icon: Clock, title: 'Fast Turnaround', description: 'Quick delivery on all projects' },
    { icon: Shield, title: 'Quality Guaranteed', description: 'Premium materials and finishes' },
    { icon: Award, title: 'Expert Team', description: 'Experienced professionals' },
    { icon: Wrench, title: 'Custom Solutions', description: 'Tailored to your needs' }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Professional manufacturing services with cutting-edge technology and premium materials
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const colorClasses = {
              blue: 'bg-red-100 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
              orange: 'bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
            };
            
            return (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border dark:border-gray-700">
                <div className={`inline-flex p-4 rounded-xl mb-6 ${colorClasses[service.color as keyof typeof colorClasses]}`}>
                  <IconComponent className="h-8 w-8" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{service.price}</span>
                  <button className="bg-gray-900 dark:bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-red-700 transition-colors">
                    Get Quote
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="inline-flex p-3 bg-red-100 dark:bg-red-900/30 rounded-xl mb-4">
                  <IconComponent className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;