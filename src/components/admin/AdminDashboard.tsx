import React from 'react';
import { FileText, ShoppingCart, TrendingUp, Users, DollarSign, Clock } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { name: 'Total Orders', value: '124', change: '+12%', icon: ShoppingCart, color: 'bg-blue-500' },
    { name: 'Pending Quotes', value: '23', change: '+5%', icon: FileText, color: 'bg-orange-500' },
    { name: 'Revenue (LKR)', value: '486,500', change: '+18%', icon: DollarSign, color: 'bg-green-500' },
    { name: 'Active Projects', value: '42', change: '+8%', icon: TrendingUp, color: 'bg-purple-500' },
  ];

  const recentOrders = [
    { id: 'FI001', customer: 'John Silva', service: '3D Printing', status: 'In Progress', amount: 'LKR 2,500' },
    { id: 'FI002', customer: 'Sarah Fernando', service: 'Laser Cutting', status: 'Completed', amount: 'LKR 4,200' },
    { id: 'FI003', customer: 'David Perera', service: '3D Printing', status: 'Pending', amount: 'LKR 1,800' },
    { id: 'FI004', customer: 'Maria Rodrigo', service: 'Laser Cutting', status: 'In Progress', amount: 'LKR 3,600' },
  ];

  const recentQuotes = [
    { id: 'QT001', customer: 'Tech Startup LK', service: '3D Printing', status: 'Pending Review', amount: 'LKR 15,000' },
    { id: 'QT002', customer: 'Creative Agency', service: 'Laser Cutting', status: 'Sent', amount: 'LKR 8,500' },
    { id: 'QT003', customer: 'Engineering Firm', service: 'Both', status: 'Under Review', amount: 'LKR 25,000' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Sent': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-2">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{order.customer}</p>
                    <p className="text-sm text-gray-600">{order.id} • {order.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{order.amount}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Quotes */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Recent Quotes</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentQuotes.map((quote, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{quote.customer}</p>
                    <p className="text-sm text-gray-600">{quote.id} • {quote.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{quote.amount}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(quote.status)}`}>
                      {quote.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;