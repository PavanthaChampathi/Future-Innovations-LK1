import React, { useState } from 'react';
import { ShoppingCart, Eye, Edit, Package, Truck, Check, Search } from 'lucide-react';

const OrderManager = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const orders = [
    {
      id: 'FI001',
      customer: 'John Silva',
      email: 'john@email.com',
      service: '3D Printing',
      material: 'PLA+',
      quantity: 5,
      amount: 2500,
      status: 'In Progress',
      date: '2025-01-15',
      deadline: '2025-01-18',
      progress: 60
    },
    {
      id: 'FI002',
      customer: 'Sarah Fernando',
      email: 'sarah@email.com',
      service: 'Laser Cutting',
      material: 'Acrylic',
      quantity: 10,
      amount: 4200,
      status: 'Completed',
      date: '2025-01-14',
      deadline: '2025-01-16',
      progress: 100
    },
    {
      id: 'FI003',
      customer: 'David Perera',
      email: 'david@email.com',
      service: '3D Printing',
      material: 'ABS',
      quantity: 3,
      amount: 1800,
      status: 'Pending',
      date: '2025-01-13',
      deadline: '2025-01-17',
      progress: 0
    },
    {
      id: 'FI004',
      customer: 'Maria Rodrigo',
      email: 'maria@email.com',
      service: 'Laser Cutting',
      material: 'Wood',
      quantity: 8,
      amount: 3600,
      status: 'In Progress',
      date: '2025-01-12',
      deadline: '2025-01-15',
      progress: 30
    },
    {
      id: 'FI005',
      customer: 'Tech Solutions LK',
      email: 'orders@techsolutions.lk',
      service: 'Both',
      material: 'Multiple',
      quantity: 15,
      amount: 12500,
      status: 'Shipped',
      date: '2025-01-10',
      deadline: '2025-01-14',
      progress: 100
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return Check;
      case 'In Progress': return Package;
      case 'Pending': return ShoppingCart;
      case 'Shipped': return Truck;
      default: return ShoppingCart;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    
    const statusMap = {
      'pending': ['Pending'],
      'progress': ['In Progress'],
      'completed': ['Completed'],
      'shipped': ['Shipped']
    };
    
    return matchesSearch && statusMap[activeTab as keyof typeof statusMap]?.includes(order.status);
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order Manager</h1>
          <p className="text-gray-600">Track and manage customer orders</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors">
            Export Orders
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex space-x-2">
            {['all', 'pending', 'progress', 'completed', 'shipped'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab === 'progress' ? 'in progress' : tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Order ID</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Customer</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Service</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Amount</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Progress</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Deadline</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order, index) => {
                const StatusIcon = getStatusIcon(order.status);
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <StatusIcon className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{order.customer}</p>
                        <p className="text-sm text-gray-600">{order.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{order.service}</p>
                        <p className="text-sm text-gray-600">{order.material} • Qty: {order.quantity}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-lg font-semibold text-gray-900">
                        LKR {order.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${order.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 mt-1">{order.progress}%</span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {order.deadline}
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
                          <Package className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No orders found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default OrderManager;