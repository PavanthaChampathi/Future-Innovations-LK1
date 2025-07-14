import React, { useState } from 'react';
import { FileText, Eye, Send, Edit, Plus, Search, Filter } from 'lucide-react';

const QuotationManager = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const quotations = [
    {
      id: 'QT001',
      customer: 'Tech Startup LK',
      email: 'info@techstartup.lk',
      service: '3D Printing',
      material: 'PLA+',
      quantity: 50,
      amount: 15000,
      status: 'Pending Review',
      date: '2025-01-15',
      files: ['prototype.stl', 'assembly.stl']
    },
    {
      id: 'QT002',
      customer: 'Creative Agency',
      email: 'hello@creative.lk',
      service: 'Laser Cutting',
      material: 'Acrylic',
      quantity: 10,
      amount: 8500,
      status: 'Sent',
      date: '2025-01-14',
      files: ['logo-cut.dxf']
    },
    {
      id: 'QT003',
      customer: 'Engineering Firm',
      email: 'projects@engineering.lk',
      service: 'Both',
      material: 'Multiple',
      quantity: 25,
      amount: 25000,
      status: 'Under Review',
      date: '2025-01-13',
      files: ['part1.stl', 'part2.dxf', 'assembly.pdf']
    },
    {
      id: 'QT004',
      customer: 'Local Manufacturer',
      email: 'orders@manufacturer.lk',
      service: '3D Printing',
      material: 'ABS',
      quantity: 100,
      amount: 35000,
      status: 'Approved',
      date: '2025-01-12',
      files: ['production.stl']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Sent': return 'bg-blue-100 text-blue-800';
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
      case 'Under Review': return 'bg-purple-100 text-purple-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredQuotations = quotations.filter(quote => {
    const matchesSearch = quote.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    
    const statusMap = {
      'pending': ['Pending Review', 'Under Review'],
      'sent': ['Sent'],
      'approved': ['Approved'],
      'rejected': ['Rejected']
    };
    
    return matchesSearch && statusMap[activeTab as keyof typeof statusMap]?.includes(quote.status);
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quotation Manager</h1>
          <p className="text-gray-600">Manage customer quotations and pricing</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>New Quote</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search quotations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex space-x-2">
            {['all', 'pending', 'sent', 'approved', 'rejected'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quotations Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Quote ID</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Customer</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Service</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Amount</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Date</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredQuotations.map((quote, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{quote.id}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">{quote.customer}</p>
                      <p className="text-sm text-gray-600">{quote.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">{quote.service}</p>
                      <p className="text-sm text-gray-600">{quote.material} • Qty: {quote.quantity}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-lg font-semibold text-gray-900">
                      LKR {quote.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(quote.status)}`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {quote.date}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredQuotations.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No quotations found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default QuotationManager;