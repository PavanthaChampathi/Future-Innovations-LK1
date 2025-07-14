import React from 'react';
import { Printer, Zap, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/Logo_S.png" alt="Future Innovations LK" className="h-8 w-8" />
              <span className="text-xl font-bold">Future Innovations LK</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Premier 3D printing and laser cutting services in Sri Lanka. Bringing your ideas to life with precision, quality, and innovation.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-red-400" />
                <span className="text-gray-300">info@futureinnovationslk.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red-400" />
                <span className="text-gray-300">+94 77 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-red-400" />
                <span className="text-gray-300">Colombo, Sri Lanka</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>3D Printing</li>
              <li>Laser Cutting</li>
              <li>Prototyping</li>
              <li>Custom Manufacturing</li>
              <li>Design Consultation</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Materials</h3>
            <ul className="space-y-2 text-gray-300">
              <li>PLA+ Filament</li>
              <li>ABS Filament</li>
              <li>eTU-95A Flexible</li>
              <li>Wood Cutting</li>
              <li>Acrylic Cutting</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            © 2025 Future Innovations LK. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;