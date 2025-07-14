import React, { useState } from 'react';
import { Upload, FileText, Calculator, CheckCircle, AlertCircle } from 'lucide-react';
import { quotationService } from '../services/quotationService';

const QuoteUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [service, setService] = useState('3d-printing');
  const [material, setMaterial] = useState('pla+');
  const [quantity, setQuantity] = useState(1);
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const calculateQuote = async () => {
    setLoading(true);
    
    try {
      // For demo purposes, we'll use placeholder customer data
      // In a real app, you'd collect this from a form
      const response = await quotationService.create({
        customerName: 'Demo Customer',
        customerEmail: 'demo@example.com',
        serviceType: service === '3d-printing' ? '3D Printing' : 'Laser Cutting',
        material: material.toUpperCase(),
        quantity,
        files
      });

      setQuote({
        service,
        material,
        quantity,
        estimatedPrice: response.estimatedPrice,
        deliveryTime: response.deliveryTime,
        quoteId: response.quoteId
      });
    } catch (error) {
      console.error('Quote calculation failed:', error);
      // Fallback to demo calculation
      const basePrice = service === '3d-printing' ? 50 : 100;
      const materialMultiplier = material === 'abs' ? 1.2 : material === 'etpu' ? 1.5 : 1;
      const estimatedPrice = Math.floor(basePrice * materialMultiplier * quantity * (Math.random() * 5 + 1));
      
      setQuote({
        service,
        material,
        quantity,
        estimatedPrice,
        deliveryTime: service === '3d-printing' ? '2-3 days' : '1-2 days',
        quoteId: 'DEMO' + Math.random().toString(36).substr(2, 6).toUpperCase()
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="quote" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get Instant Quote</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Upload your files and get an automated quote in minutes
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
          {!quote ? (
            <div className="space-y-8">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Upload Files</label>
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    dragActive ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-red-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Drop files here or click to upload
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Supports STL, DXF, AI, PDF, and more
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".stl,.dxf,.ai,.pdf,.svg,.dwg"
                  />
                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-center space-x-2 text-sm text-green-600">
                          <FileText className="h-4 w-4" />
                          <span>{file.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Service Selection */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Service Type</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="3d-printing">3D Printing</option>
                    <option value="laser-cutting">Laser Cutting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {service === '3d-printing' ? 'Material' : 'Material Type'}
                  </label>
                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:text-white"
                  >
                    {service === '3d-printing' ? (
                      <>
                        <option value="pla+">PLA+ (LKR 50/gram)</option>
                        <option value="abs">ABS (LKR 60/gram)</option>
                        <option value="etpu">eTU-95A (LKR 75/gram)</option>
                      </>
                    ) : (
                      <>
                        <option value="wood">Wood (LKR 100/min)</option>
                        <option value="acrylic">Acrylic (LKR 120/min)</option>
                        <option value="cardboard">Cardboard (LKR 80/min)</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <button
                onClick={calculateQuote}
                disabled={files.length === 0 || loading}
                className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Calculating Quote...</span>
                  </>
                ) : (
                  <>
                    <Calculator className="h-5 w-5" />
                    <span>Get Quote</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="inline-flex p-4 bg-green-100 rounded-full">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quote Generated!</h3>
                <p className="text-gray-600 dark:text-gray-400">Quote ID: {quote.quoteId}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Service:</span>
                    <p className="font-medium capitalize">{quote.service.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Material:</span>
                    <p className="font-medium uppercase">{quote.material}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Quantity:</span>
                    <p className="font-medium">{quote.quantity}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Delivery:</span>
                    <p className="font-medium">{quote.deliveryTime}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-900 dark:text-white">Total Price:</span>
                    <span className="text-3xl font-bold text-red-600">LKR {quote.estimatedPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setQuote(null)}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  New Quote
                </button>
                <button className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">
                  Confirm Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuoteUpload;